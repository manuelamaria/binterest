import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import firebase from 'firebase';
import Header from './Header';

export default class extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.LoginForm = this.LoginForm.bind(this);
    this.login = this.login.bind(this);
  }

  async login(email, password) {
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
    } catch (error) {
      const errorMessage = error.message;
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.login()
  }

  handleChange(fieldName, value) {
    this[fieldName] = value
  }
  LoginForm() {
    return (
    <div>
      <h1>Login</h1>
        <form onClick={this.handleSubmit} >
          <label style={styles.label}>Email:</label>
          <br/>
          <input
            type="email"
            name="email"
            style={styles.input}
            value={this.email}
            onChange={(event) => this.handleChange('email', event.target.value)}
            placeholder="type your email" />
          <br/>
          <label style={styles.label}>Password:</label>
          <br/>
          <input
            type="password"
            name="password"
            style={styles.input}
            value={this.password}
            onChange={(event) => this.handleChange('password', event.target.value)}
            placeholder="type your password" />
          <br/>
          <button onClick={this.handleSubmit} type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    )
  }
  render() {
    const { LoginForm } = this;
    const content = (this.props.loggedIn) ? <Redirect to="/me" {...this.props} />  : <LoginForm />
    return (
      <div>
        <Header {...this.props} />
        {content}
      </div>
    )
  }
}

const styles = {
  input: {
    width: '50%',
    padding: '12px 20px',
    margin: '8px 0',
    boxSizing: 'border-box'
  },
  label: {
    textAlign: 'border-box',
  },
  button: {
    backgroundColor: '#3399ff',
    color: 'white',
    border: '0px',
    width: '200px',
    height: '50px',
  },
  errorBox: {
    backgroundColor: "#f44336",
    color: "white",
    height: '30px',
  }
};

