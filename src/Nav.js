import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
  render() {    
    let index = this.props.direction === 'prev' ? 0 : 1;
    let item = this.props.map.get(this.props.bookId)[index];
    let link = "/b/".concat(item);  

    return (
      item !== -1 
        ? <Link to={link} className={"navigation-".concat(this.props.direction)} />
        : <div className="navigation--empty" />
    );
  }
}

export default Nav;
