import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BookPage from './BookPage.js';
import Nav from './Nav.js';

import BookList from './BookList';
import './App.css';

class App extends Component {

  constructor() {
        super();

        this.state = {
            items: [],
            term: 'Pick your poison'
        }

        
        this.startIndex = 0;
        this.maxResultsAtOnce = 20;
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
              <AppHeader 
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
      </Router>
    );
  }
}

const AppHeader = (props) => (
  <div className="App-header">
    <h1>Show Me Covers</h1>
    <h3><i>Your visual tool for finding books</i></h3>
    <input defaultValue={props.term} 
      onKeyPress={props.onKeyPress}
      onFocus={(e) => e.target.value=''}
      />
  </div>
)

export default App;

