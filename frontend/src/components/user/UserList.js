import React from "react";

function UserList({ users }) {
  function renderUser() {
    return users.map((user, i) => (
      <li key={i}>
        <p>User ID: {user.userid}</p>
        <p>Username: {user.username}</p>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
      </li>
    ));
  }

  return (
    <div>
      <ul>{renderUser()}</ul>
    </div>
  );
}

export default UserList;
