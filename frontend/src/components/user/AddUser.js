import axios from "axios";
import React, { useState } from "react";

function AddUser({ getUser }) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  async function saveCustomer(e) {
    e.preventDefault();

    try {
        const registerData = {
            name,
            username,
            email,
            password,
          };
      // await axios.post("http://localhost:5000/customer/", customerData);
      await axios.post(
        "https://mern-auth-template-tutorial.herokuapp.com/customer/",
        registerData
      );
      getUser();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
    <h1>Add a new account</h1>
    <form onSubmit={register}>
    <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
    <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit">Add</button>
    </form>
  </div>
  );
}

export default CustomerForm;