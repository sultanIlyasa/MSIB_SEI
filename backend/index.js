import express, { request }  from "express"; // Import express
import { port, mongoUrl } from "./config.js"; // Import port from config.js
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routers/routes.js";
const app = express();// Create an express app object

app.use(express.json()); // Use express.json() middleware
app.use(cookieParser());
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        credentials: true,
    }
));

app.get('/',(request, response) =>{ // Create a route for GET /
    console.log(request);  // This will print the request object in the console
    return response.status(234).send('Test Koneksi'); // This will send the response to the client
});

app.use('/api',router);
mongoose 
    .connect(mongoUrl)
    .then(()=>{
     console.log('App has connected to database');
    app.listen(port,()=>{
        console.log(`Server is running on ${port}`);
     });

    })
    .catch((e)=>{
        console.log(e);
    });