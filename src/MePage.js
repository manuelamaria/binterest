import React from 'react'
import Header from './Header';

export default (props) => (
  <div>
    <Header {...props} />
    <h1>My profile</h1>
    <hr />
    <h2>Settings</h2>
    <label>Email</label>
    <input type="text" />
  </div>
)
