import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
  <div className="item-container">
    <div className="image">
        <Link to={`/b/${props.id}`}>
          <img
            src={props.img} 
            alt="Loading"
            />
        </Link>
        </div>
        <div className="title">
          <p><b>{props.title}</b><br />
          <i>{props.author}</i><br />  
             {props.pageCount} pages, {props.publisher}, {props.publishedAt}
          </p>
        </div>
  </div>
)