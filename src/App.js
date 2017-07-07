import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import BookPage from './BookPage.js';
import './App.css';

class App extends Component {

  constructor() {
        super();

        this.state = {
            results : []
        }

        this.term = '';
        this.startIndex = 0;
        this.maxResultsAtOnce = 20;
    }

  formatResults(items) {
    if (items !== undefined) {
      return items.map((item, i) => {
          let vi = item.volumeInfo;
          let title = vi ? vi.title : '';
          let id = item.id;
          let author = vi && vi.authors ? vi.authors[0] : '';
          let img = vi && vi.imageLinks ? vi.imageLinks.thumbnail : '';

          return (
            <div key={this.startIndex + i} className="item-container">
              <div className="title">
                <h3>{title}</h3>
                <i>by {author}</i><p/>
              </div>
              <Link to={`/b/${id}`}>
                <img src={img} alt="Missing" />
              </Link>
            </div>
          );
          
      });
    }

    return [];
  }

  queryApi() {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${this.term}&startIndex=${this.startIndex}&maxResults=${this.maxResultsAtOnce}&langRestrict=en&key=AIzaSyCDKtdupRrOGqUibyv2d7JfXKP8BN2DoQ8`)
            .then( response => response.json() )
            .then( ({items}) => {
                  this.setState({
                    'results' : this.state.results.concat(
                      this.formatResults(items)
                    )
                  })
            })
  }

  clearFilterData() {
    this.startIndex = 0;
    this.setState({
          'results' : []
    });
  }

  filter(e) {
    let searchTerm = e.target.value;
    if (e.which === 13 && searchTerm.length > 0) {
      this.term = searchTerm;
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
          
          <Route path="/b/:bookId" render={({match}) => (
              <BookPage bookId={match.params.bookId} />
          )} />

          <Route path="/" exact={true} render={() => (
            <div>
              <div className="App-header">
                <h2>Welcome to Binterest</h2>
                <input defaultValue="Pick your poison ..." 
                  onKeyPress={this.filter.bind(this)}
                  onFocus={(e) => e.target.value=''}
                  />
              </div>
              <div className="container">
                <InfiniteScroll
                  next={this.fetchData.bind(this)}
                  hasMore={true}
                  loader={<h4>Loading...</h4>}
                >
                {this.state.results}
                </InfiniteScroll>
              </div>
            </div>
          )} />
        </div>
      </Router>
    );
  }
}

export default App;

