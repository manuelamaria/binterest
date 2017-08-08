import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import BookView from './BookView';
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
      books: [],
      term: ''
    };

    this.startIndex = 0;
    this.maxResultsAtOnce = 40;
  }

  buildNavigationMap(items) {
    var i = 1;
    var map = new Map();

    map.set(items[0].id, [-1, items[1].id]);  //first

    for (i = 1; i<items.length-1; i++) {
      map.set(items[i].id, [items[i-1].id, items[i+1].id])
    }

    map.set(items[items.length-1].id, [items[items.length-2], -1]);  //last
    
    return map;
  }

  async queryApi(term) {

    if (term === undefined) {
      term = this.state.term;
    }
    let res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${term}&startIndex=${this.startIndex}&maxResults=${this.maxResultsAtOnce}&key=AIzaSyCDKtdupRrOGqUibyv2d7JfXKP8BN2DoQ8`)

    if (res.status === 200) {
      const data = await res.json()
      const { items } = data
      this.setState({
        'books' : this.state.books.concat(items)
      })
    } else {
      // handle error
    }
  }

  clearBookList() {
    this.startIndex = 0;
    this.setState({
        'books' : []
    });
  }

  searchBooks(e) {
    let searchTerm = e.target.value;
    if (e.which === 13 && searchTerm.length > 0) {
      this.setState({'term': searchTerm});
      this.clearBookList();
      this.queryApi(searchTerm);
    }
  }

  fetchBooks() {
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

            let navPrev = this.state.books.length > 0 
              ? <Nav
                    map= {this.buildNavigationMap(this.state.books)}
                    bookId={match.params.bookId}
                    direction="prev"
                  />
              : '';

            let navNext =   this.state.books.length > 0 
              ? <Nav
                    map= {this.buildNavigationMap(this.state.books)}
                    bookId={match.params.bookId}
                    direction="next"
                  />
              : '';

            return (
              <div className="book-page">
                <div className="book-page__close">
                  <Link to="/">
                    <button className="book-page__close__button"></button>
                  </Link>
                </div>
                <div className="book-page__content">
                  {navPrev}
                  <BookView bookId={match.params.bookId} />
                  {navNext}
                </div>
              </div>
            )
          }} />

          <Route path="/" exact={true} render={() => (
            <div className="book-list-page">
              <Header
                term = {this.state.term}
                onKeyPress={this.searchBooks.bind(this)}
              />
              <BookList
                fetchData={this.fetchBooks.bind(this)}
                books = {this.state.books}
                startIndex = {this.startIndex}
              />
            </div>
          )} />
      </div>
    </Router>);
  }
}

export default App;
