import React, { Component } from 'react';

class BookPage extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      'data' : [],
      'descriptionClass' : 'description hideContent',
      'descriptionContentAction' : 'show more'
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

  toggleDescription() 
  {
    if (this.state.descriptionClass === 'description hideContent') {
      this.setState({
        'descriptionClass' : 'description showContent',
        'descriptionContentAction' : 'show less'
      });
    } else {
      this.setState({
        'descriptionClass' : 'description hideContent',
        'descriptionContentAction' : 'show more'
      });
    }
  }
  
  render() {
    let coverSrc = this.state.data && this.state.data.volumeInfo ? this.state.data.volumeInfo.imageLinks.small : '';
    let description = this.state.data && this.state.data.volumeInfo ? this.state.data.volumeInfo.description : '';
    let title = this.state.data && this.state.data.volumeInfo ? this.state.data.volumeInfo.title : '';
    let author = this.state.data && this.state.data.volumeInfo ? this.state.data.volumeInfo.authors[0] : '';


    
    return (
      <div className="book-page-container">
      <div className="book-page" >
        <h1>{title}</h1>
        <h2>{author}</h2>
        <img src={coverSrc} alt="" />
        <div 
          className={this.state.descriptionClass}
          dangerouslySetInnerHTML={{__html: description}}></div>
          <span onClick={this.toggleDescription.bind(this)}>{this.state.descriptionContentAction}</span>
      </div>
      </div>
    );
  }
}

export default BookPage;
