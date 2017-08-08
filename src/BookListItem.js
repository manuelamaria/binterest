import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => (
  <div className="book-list__item">
    <Link to={`/b/${props.id}`}>
          <img src={props.img} alt="Loading" className="book-list__item__image"/>
    </Link>
  </div>
)
