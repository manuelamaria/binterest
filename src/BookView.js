import React, { Component } from 'react';

class BookView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      'bookData' : []
    }

    this.queryApi();
  }

  queryApi(bookId) {
    bookId = bookId || this.props.bookId;
    fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}?key=AIzaSyCDKtdupRrOGqUibyv2d7JfXKP8BN2DoQ8`)
        .then( response => response.json() )
        .then( (data) => {
            this.setState(
              {'bookData' : data}
            );
      })
  }

  componentWillReceiveProps(nextProps)
  {
    if (this.props !== nextProps) {
      this.queryApi(nextProps.bookId);
    }
  }
  
  render() {
    let {volumeInfo} = this.state.bookData;
    let {title, description} = volumeInfo || '';
    let author = volumeInfo ? volumeInfo.authors[0] : 'Unknown';
    let coverSrc = volumeInfo ? volumeInfo.imageLinks.small : '';
    
    return (
      <div className="book-information">
        <h1>{title}</h1>
        <h2>{author}</h2>
        <img src={coverSrc} alt="Loading" className="book-information__image" />
        <div 
          className="book-information__description"
          dangerouslySetInnerHTML={{__html: description}}>
        </div>
      </div>
    );
  }
}

export default BookView;
