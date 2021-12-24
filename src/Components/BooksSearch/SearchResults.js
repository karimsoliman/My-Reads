import React, { Component } from 'react';
import Book from '../Common/Book';

class SearchResults extends Component {
    render() {
        const { books, loading, bookQuery, error, updateBookShelf } = this.props;
        return (
            <div className="search-books-results">
                {loading && <h1 className="center">Loading....</h1>}
                {error && !loading && <h1 className="center">Network error, please try again.</h1>}
                {books.length === 0 && bookQuery !== '' && !error && !loading && <h1 className="center">No results found</h1>}
                {books.length > 0 && !loading && (
                    <ol className="books-grid">
                        {
                            books.length > 0 &&
                            books.map(book => (
                                <li key={book.id}>
                                    <Book
                                        bookShelfChange={updateBookShelf}
                                        book={book}
                                    />
                                </li>
                            ))
                        }
                    </ol>
                )}
            </div>
        );
    }
}

export default SearchResults;