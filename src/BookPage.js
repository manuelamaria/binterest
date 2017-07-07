import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class BookPage extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      'data' : [],
      'bookId' : props.bookId
    }

    this.queryApi();
  }

  queryApi(bookId) {
    if (bookId === undefined) {
      bookId = this.state.bookId;
    }
    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyCDKtdupRrOGqUibyv2d7JfXKP8BN2DoQ8`)
        .then( response => response.json() )
        .then( (data) => {
            this.setState(
              {'data' : data}
            );
      })
  }

  componentWillReceiveProps(nextProps)
  {
    if (this.props !== nextProps) {
      this.setState({
        'bookId' : nextProps.bookId
      });

      this.queryApi(nextProps.bookId);
    }
  }
  
  render() {
    let coverSrc = this.state.data && this.state.data.volumeInfo ? this.state.data.volumeInfo.imageLinks.small : '';
    let description = this.state.data && this.state.data.volumeInfo ? this.state.data.volumeInfo.description : '';
    
    return (
      <div className="book-page" >
          <h2><Link to="/">[x]</Link></h2>
          <img src={coverSrc} alt="" />
          <div dangerouslySetInnerHTML={{__html: description}}></div>
      </div>
    );
  }
}

export default BookPage;