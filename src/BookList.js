import React from 'react';
import BookListItem from './BookListItem';
import InfiniteScroll from 'react-infinite-scroll-component';

class BookList extends React.Component {
  
  format(books) {
    if (books !== undefined) {
      return books.map((item, i) => {
          let {volumeInfo, id} = item;
          let img = volumeInfo && volumeInfo.imageLinks ? volumeInfo.imageLinks.thumbnail : '';
          
          return (
            <BookListItem
              key={this.props.startIndex + i}
              id={id}
              img={img}
            />
          );
          
      });
    }

    return [];
  }

  render() {
    if (this.props.books.length > 0) {
      return (
        <div className="book-list">
          <InfiniteScroll next={this.props.fetchData} hasMore={true} loader={<h4>Loading...</h4>}>
            {this.format(this.props.books)}
          </InfiniteScroll>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default BookList;
