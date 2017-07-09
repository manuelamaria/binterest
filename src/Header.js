import React from 'react'
import { Link } from 'react-router-dom';
export default (props) => (
  <div className="App-header">
    <div className="search-bar">
      <input defaultValue={props.term}
        onKeyPress={props.onKeyPress}
        onFocus={(e) => e.target.value=''}
        />
    </div>
    <div>
    <Link to="/signup">Signup</Link> 
    </div>
  </div>
)
