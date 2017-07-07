import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
  <div key={props.key} className="item-container">
    <div className="title">
      <h3>{props.title}</h3>
      <i>by {props.author}</i><p/>
    </div>
    <Link to={`/b/${props.id}`}>
      <img src={props.img} alt="Missing" />
    </Link>
  </div>
)