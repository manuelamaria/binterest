import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import firebase from './FirebaseClient'

require('dotenv').config()
export default class extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.RegisterForm = this.RegisterForm.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      valid: false,
      error: null,
    };
  }

  async handleSubmit (event){
    event.preventDefault();
    if (this.password !== this.confirmPassword) {
      this.setState({ valid: false, error: 'Password must match' });
      return;
    }
    try {
      const user = await this.createUserAccount(this.email, this.password)
      await user.sendEmailVerification()
      this.setState({ valid: true })
    } catch(e) {
      this.setState({ valid: false, error: e.message })
    }
  }

  async createUserAccount(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  handleChange(fieldName, value) {
    this[fieldName] = value
  }

  RegisterForm() {
    return (
      <div>
        <h1>Create Account</h1>
        <form onSubmit={this.handleSubmit} >
          <label style={styles.label} >Email</label>
          <br />
          <input
            style={styles.input}
            type="email"
            name="email"
            id="email"
            value={this.state.email}
            onChange={(event) => this.handleChange('email', event.target.value)}
          />
          <br />
          <label style={styles.label}>Password</label>
          <br />
          <input
            style={styles.input}
            type="password"
            name="password"
            id="password"
            value={this.state.password}
            onChange={(event) => this.handleChange('password', event.target.value)}
          />
          <br />
          <label style={styles.label}>Confirm password</label>
          <br />
          <input
            style={styles.input}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={this.state.confirmPassword}
            onChange={(event) => this.handleChange('confirmPassword', event.target.value)}
          />
          <br />
          <button style={styles.button} onClick={this.handleSubmit} type="button">Create your account</button>
        </form>
      </div>)
  }

  ErrorMessage(props) {
    return (
      <div style={styles.errorBox} >
        <h2>{props.msg}</h2>
      </div>
    )
  }

  render() {
    const { RegisterForm, ErrorMessage } = this
    if (!this.state.valid) {
      const error = (this.state.error)? <ErrorMessage msg={this.state.error} /> : null
      return <div>{error} <RegisterForm /></div>
    } else {
      return <Redirect to="/confirmation"/>
    }
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
