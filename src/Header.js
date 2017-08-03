import React from 'react'
import { Link } from 'react-router-dom';
export default (props) => (
  <div className="header">
    <div className="logo" />
    <div className="search-bar">
      <input defaultValue={props.term}
        onKeyPress={props.onKeyPress}
        onFocus={(e) => e.target.value=''}
        className="search-bar__input"
        placeholder="pick your poison"
        />
    </div>
  </div>
)
