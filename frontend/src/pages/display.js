import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Display() {
  const [dataa, setData] = useState([]);

  // Fetch posts
  useEffect(() => {
    axios.get('http://localhost:8000/getuser')
      .then(function (res) {
        if (res.data.success) {
          setData(res.data.existingusers);
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  }, []);

  let content; //to minimize the brackets count
  if (dataa.length === 0) {
    content = <p>No users available</p>;
  } else {
    content = dataa.map(function(userss, index) {
      return (
        <div key={index} className="card my-3">
          <div className="card-body">
            <h3 className="card-title">User ID: {userss._id}</h3>
            <h5 className="card-text">Content: {userss.name}</h5>
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
