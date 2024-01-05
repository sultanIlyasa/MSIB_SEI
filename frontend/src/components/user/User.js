import axios from "axios";
import React, { useEffect, useState } from "react";
import CustomerForm from "./CustomerForm";
import CustomerList from "./CustomerList";

function User() {
  const [user, setUser] = useState([]);

  async function getUser() {
    // const customersRes = await axios.get("http://localhost:5000/customer/");
    const userRes = await axios.get(
      "http://localhost:5000/api/user"
    );
    setUser(userRes.data);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <userForm getUser={getUser} />
      <userList user={user} />
    </div>
  );
}

export default User;