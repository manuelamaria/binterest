import React from 'react'
import { Link } from 'react-router-dom';
import firebase from 'firebase';

const logout = () => {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}
export default (props) => {
  let controls
  console.log('loggedIn:', props.loggedIn)

  if (props.loggedIn !== true) {
      controls = (
      <div style={styles.links}>
        <Link style={styles.link} className="authButton" to="/signup">Signup</Link>
        <Link style={styles.link} className="authButton" to="/login">Login</Link>
      </div>
    )
  } else {
    controls = (
      <div style={styles.links}>
        <a style={styles.link} className="authButton" href="#" onClick={() => {console.log('logout!'); logout(); return false;}}>logout</a>
      </div>
    )
  }
   return (
     <div className="App-header">
       <div style={styles.logo}>
         <h2><Link to="/">kukubooks</Link></h2>
       </div>
       <div className="search-bar">
         <input defaultValue={props.term}
           onKeyPress={props.onKeyPress}
           onFocus={(e) => e.target.value=''}
         />
       </div>
      {controls}
    </div>)
}

const styles = {
  links: {
    paddingRight: '30px',
    paddingTop: '25px'
  },
  link: {
    marginRight: '30px',
    backgroundColor: 'white',
    white: 'white',
    padding: '10px'
  },
  logo: {
    marginLeft: '30px'
  }
}
