import React, { Component } from 'react';
import SearchBook from './SearchBook';
import SearchResults from './SearchResults';

class BookSearchList extends Component {
  state = {
    bookQuery: ''
  };
  handleSearch = (query) => {
    this.setState({ bookQuery: query.trim() }, () => {
      this.props.handleBookSearch(this.state.bookQuery);
    });
  };

  render() {
    const { bookQuery } = this.state;
    const { books, error, loading, handleHomeNavigation, updateBookShelf } = this.props;

    return (
      <div className="search-books">
        <SearchBook handleHomeNavigation={handleHomeNavigation} handleSearch={this.handleSearch} />
        <SearchResults error={error} books={books} updateBookShelf={updateBookShelf} loading={loading} bookQuery={bookQuery} />
      </div>
    );
  }
}

export default BookSearchList;