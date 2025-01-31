import React, { useState } from 'react';
import axios from 'axios';

export default function AddUser({ onUserAdded }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    axios.post('http://localhost:8000/add', { name: name, password: password })
      .then(function () {
        alert('User added successfully');
        setName('');
        setPassword('');
        onUserAdded(); // Refresh user list
      })
      .catch(function (err) {
        console.error(err);
        alert('Failed to add user');
      });
  }

  return (
    <div className="container">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" value={name} onChange={function(e) { setName(e.target.value); }} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={function(e) { setPassword(e.target.value); }} required />
        </div>
        <button type="submit" className="btn btn-primary">Add User</button>
      </form>
    </div>
  );
}