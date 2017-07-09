import React from 'react'

export default () => (
  <div>
    <h1>Create Account</h1>
    <form onSubmit={() => { console.log('signup!!')}} action="post">
      <label style={styles.label} >Email</label>
      <br />
      <input style={styles.input} type="email" name="email" id="email" />
      <br />
      <label style={styles.label}>Password</label>
      <br />
      <input style={styles.input} type="password" name="password" id="password" />
      <br />
      <label style={styles.label}>Confirm password</label>
      <br />
      <input style={styles.input} type="password" name="confirmPassword" id="confirmPassword" />
      <br />
      <button style={styles.button} type="submit">Create your account</button>
    </form>
  </div>
);

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
  }
};
