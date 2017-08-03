import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import BookPage from './BookPage';
import Nav from './Nav';
import Header from './Header';
import BookList from './BookList';
import SignupPage from './SignupPage';
import EmailConfirmationPage from './EmailConfirmationPage';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      items: [],
      term: ''
    };

    this.startIndex = 0;
    this.maxResultsAtOnce = 35;
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
          <Route path="/confirmation" render={() => (<EmailConfirmationPage />)} />
          <Route path="/signup" render={() => (<SignupPage />)} />
          <Route path="/b/:bookId" render={({match}) => {

            //let showNav = (this.state.items.length > 0);

            return (
              <div>
              <h2><Link to="/">x</Link></h2>
              <div className="book-page-container">
                <Nav
                  map={this.buildNavigationMap(this.state.items)}
                  bookId={match.params.bookId}
                  direction="prev"
                />
                <BookPage bookId={match.params.bookId} />
                <Nav
                  map={this.buildNavigationMap(this.state.items)}
                  bookId={match.params.bookId}
                  direction="next"
                />
              </div>
              </div>
            )

          }} />
          <Route path="/" exact={true} render={() => (
            <div className="book-list-page">
              <Header
                term = {this.state.term}
                onKeyPress={this.filter.bind(this)}
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
