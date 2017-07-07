import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      'map' : props.map
    }
  }

  componentWillReceiveProps(nextProps)
  {
    if (this.props !== nextProps) {
      this.setState({
        'map' : nextProps.map
      });
    }
  }

  render() {
    let prev = this.state.map.get(this.props.bookId)[0];
    let linkPrev = "/b/".concat(prev);

    let next = this.state.map.get(this.props.bookId)[1];
    let linkNext = "/b/".concat(next);

    return (
      <div className="nav">
        <h2><Link to={linkPrev}>[prev]</Link></h2>
        <h2><Link to="/">[x]</Link></h2>
        <h2><Link to={linkNext}>[next]</Link></h2>
      </div>
    );
  }
}

export default Nav;