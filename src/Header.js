import React from 'react'
export default (props) => (
  <div className="header">
    <div className="logo" />
    <div className="search-bar">
      <input defaultValue={props.term}
        onKeyPress={props.onKeyPress}
        className="search-bar__input"
        placeholder="pick your poison"
        />
    </div>
  </div>
)
