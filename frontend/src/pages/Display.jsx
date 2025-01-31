import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Display() {
  const [dataa, setData] = useState([]);

  // Function to fetch users
  function getUsers() {
    axios.get('http://localhost:8000/getuser')
      .then(function (res) {
        if (res.data.success) {
          setData(res.data.existingusers);
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  // Fetch users when the component mounts
  useEffect(getUsers, []);

  // Delete user
  function handleDelete(userId, username) {
    axios.delete(`http://localhost:8000/deleteuser/${userId}`)
      .then(function () {
        alert('{ ' + username + '} deleted successfully');
        getUsers(); // Refresh the user list
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  // Update user
  function handleUpdate(userId, username, userpass) {
    const newName = prompt('Current name is {'+ username +'}. Enter new name:');
    const newPass = prompt('Current password is {'+ userpass +'}. Enter new password:');
    if (!newName || !newPass) return;

    axios.put(`http://localhost:8000/updateuser/${userId}`, { name: newName , password: newPass })
      .then(function () {
        alert('User updated successfully');
        getUsers(); // Refresh the user list
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  let content;
  if (dataa.length === 0) {
    content = <p>No users available</p>;
  } else {
    content = dataa.map(function (userss, index) {
      return (
        <div key={index} className="card my-3">
          <div className="card-body">
            <h5 className="card-title">User ID: {userss._id}</h5>
            <h5 className="card-text">Name: {userss.name}</h5>
            <h5 className="card-text">Password: {userss.password}</h5>
            <button className="btn btn-warning me-2" onClick={function() { handleUpdate(userss._id, userss.name, userss.password); }}>
              Update
            </button>
            <button className="btn btn-danger" onClick={function() { handleDelete(userss._id, userss.name); }}>
              Delete
            </button>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="container">
      <h1>Users</h1>
      {content}
    </div>
  );
}