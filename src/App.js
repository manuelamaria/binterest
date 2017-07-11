import React, { Component } from 'react';
import firebase from 'firebase';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BookPage from './BookPage';
import Nav from './Nav';
import Header from './Header';
import BookList from './BookList';
import SignupPage from './SignupPage';
import LoginPage from './LoginPage';
import MePage from './MePage';
import EmailConfirmationPage from './EmailConfirmationPage';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      term: 'Pick your poison'
    };

    this.startIndex = 0;
    this.maxResultsAtOnce = 20;
  }

  componentDidMount() {
    console.log('the component was mounted')
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('logged in')
        this.setState({ loggedIn: true });
      } else {
        console.log('logged out')
        this.setState({ loggedIn: false });
      }
    }.bind(this));
  }

  buildNavigationMap(items) {
    var i = 1;
    var map = new Map();

    for (i = 1; i<items.length-1; i++) {
      map.set(items[i].id, [items[i-1].id, items[i+1].id])
    }

    return map;
  }

  async queryApi() {
    let res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.state.term}&startIndex=${this.startIndex}&maxResults=${this.maxResultsAtOnce}&langRestrict=en&key=AIzaSyCDKtdupRrOGqUibyv2d7JfXKP8BN2DoQ8`)

    if (res.status === 200) {
      const data = await res.json()
      const { items } = data
      this.setState({
      'items' : this.state.items.concat(items)
      })
    } else {
      // handle error
    }
  }

  clearFilterData() {
    this.startIndex = 0;
    this.setState({
        'items' : []
    });
  }

  filter(e) {
    let searchTerm = e.target.value;
    if (e.which === 13 && searchTerm.length > 0) {
      this.state.term = searchTerm;
      this.clearFilterData();
      this.queryApi();
    }
  }

  fetchData() {
    this.startIndex = this.startIndex + this.maxResultsAtOnce;
    this.queryApi();
  }

  render() {

    return (
      <Router>
        <div className="App">
          <Route path="/me" render={() => (<MePage />)} />
          <Route path="/confirmation" render={() => (<EmailConfirmationPage />)} />
          <Route path="/signup" render={() => (<SignupPage />)} />
          <Route path="/login" render={() => (
            <LoginPage
              loggedIn={this.state.loggedIn}
            />
          )} />
          <Route path="/b/:bookId" render={({match}) => {
            let nav = (this.state.items.length > 0)
            ? <Nav
                map={this.buildNavigationMap(this.state.items)}
                bookId={match.params.bookId}
              />
            : null;
            return (
              <div>
                {nav}
                <BookPage bookId={match.params.bookId} />
              </div>
            )
          }} />
        <Route path="/" exact={true} render={() => (
          <div>
            <Header
              term = {this.state.term}
              onKeyPress={this.filter.bind(this)}
              loggedIn={this.state.loggedIn}
            />
            <BookList
              fetchData={this.fetchData.bind(this)}
              items = {this.state.items}
              startIndex = {this.startIndex}
            />
          </div>
        )} />
      </div>
    </Router>);
  }
}

export default App;
