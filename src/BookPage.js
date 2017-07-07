import React, { Component } from 'react';

class BookPage extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      'data' : [],
    }

    this.queryApi();
  }

  queryApi(bookId) {
    if (bookId === undefined) {
      bookId = this.props.bookId;
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
      this.queryApi(nextProps.bookId);
    }
  }
  
  render() {
    let coverSrc = this.state.data && this.state.data.volumeInfo ? this.state.data.volumeInfo.imageLinks.small : '';
    let description = this.state.data && this.state.data.volumeInfo ? this.state.data.volumeInfo.description : '';
    
    return (
      <div className="book-page" >
        <img src={coverSrc} alt="" />
        <div className="description" dangerouslySetInnerHTML={{__html: description}}></div>
      </div>
    );
  }
}

export default BookPage;