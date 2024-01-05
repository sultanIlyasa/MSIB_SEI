import express from "express";
import { Counter } from "../models/userModels.js";
import {User}  from "../models/userModels.js";
import auth from "../middleware/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = 'd5rpmQYGtDcRhTLPJSe9AwzRuTEshJMB5SHdfkmcCAbPBVUf7g5daGTmyZq3kzSAnXzTwg2QF4rbWheEpaYnB8HUqSjwcTXvmuQxLZ5gG74aeD'
const router = express.Router();

// menambah user baru
router.post("/user", auth, async (req, res) => {
    const { username, password, email, name } = req.body;
    try {
        if (!req.body.name || !req.body.email || !req.body.username || !req.body.password) {
            return res.status(400).send({
                message: 'Send all required fields: name, email, username, password'
            });
        }

        let cd = await Counter.findOneAndUpdate(
            { _id: "autoval" },
            { "$inc": { "seq": 1 }},
            { new: true, upsert: true }
        );

        let seqId;
        if (cd === null) {
            const newval = new Counter({ _id: "autoval", seq: 1 });
            await newval.save();
            seqId = 1;
        } else {
            seqId = cd.seq;
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            userid: seqId,
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: passwordHash
        });

        const savedUser = await newUser.save();
        return res.status(201).send(savedUser);
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err.message);
    }
});


// mengambil semua data user
router.get("/user", auth, async (req, res) => {
    try {
        const users = await User.find({}); // Use a different variable name for the result
        return res.status(200).json(users); // Send the response with the fetched users
    } catch (err) {
        console.log(err.message);
        return res.status(500).json(err);
    }
});

router.post("/register", async (req, res) => {
    try {
        const { username, password, email, name } = req.body;

        if (!username || !password) {
            return res.status(400).send({
                message: 'Send username and password'
            });
        }

        if (password.length < 6) {
            return res.status(400).send({
                message: 'Password must be at least 6 characters'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).send({
                message: 'Email already registered'
            });
        }

        let cd = await Counter.findOneAndUpdate(
            { _id: "autoval" },
            { "$inc": { "seq": 1 } },
            { new: true, upsert: true }
        );

        let seqId;
        if (cd == null) {
            seqId = 1;
        } else {
            seqId = cd.seq;
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            userid: seqId,
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: passwordHash
        });

        const savedUser = await newUser.save();

        const token = jwt.sign({
            user: savedUser._id,
        }, JWT_SECRET);

        res.cookie('token', token, {
            httpOnly: true,
        });

        return res.status(201).json({ savedUser });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    }
});


// login user
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: 'Send username and password'
            });
        }

        const existingUser = await User.findOne({ username });

        if (!existingUser) {
            return res.status(401).json({
                message: 'Wrong username or password'
            });
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!passwordCorrect) {
            return res.status(401).json({
                message: 'Wrong username or password'
            });
        }

        const token = jwt.sign({
            user: existingUser._id,
        }, JWT_SECRET);

        res.cookie('token', token, {
            httpOnly: true,
        }).status(200).json({ existingUser });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});


// logout user
router.get("/logout", async (req, res) => {
    try {
        res.clearCookie('token', { // clear the token cookie
            httpOnly: true,
            expires: new Date(0)
        }).status(200).send("Logged out successfully"); // send response after clearing cookie
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
});


export default router; // export router agar bisa digunakan di file lain


