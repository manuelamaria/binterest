import React from 'react';
import BookResult from './BookResult';
import InfiniteScroll from 'react-infinite-scroll-component';

class BookList extends React.Component {
  
  formatResults(items) {
    if (items !== undefined) {
      return items.map((item, i) => {
          let vi = item.volumeInfo;
          let title = vi ? vi.title : '';
          let id = item.id;
          let author = vi && vi.authors ? vi.authors[0] : '';
          let img = vi && vi.imageLinks ? vi.imageLinks.thumbnail : '';

          return (
            <BookResult 
              key={this.props.startIndex + i}
              title={title}
              author={author}
              id={id}
              img={img}
            />
          );
          
      });
    }

    return [];
  }


  render() {
    return (
      <div className="container">
        <InfiniteScroll
          next={this.props.fetchData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.formatResults(this.props.items)}
        </InfiniteScroll>
      </div>
    );
  }
}

export default BookList;