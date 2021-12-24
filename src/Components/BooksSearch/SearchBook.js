import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchBook extends Component {
    state = {
        bookQuery: ''
    };
    handleQueryChange = (searchText) => {
        this.setState({ bookQuery: searchText }, () => {
            this.props.handleSearch(this.state.bookQuery);
        });
    };

    render() {
        const { bookQuery } = this.state;
        return (
            <div className="search-books-bar">
                <Link to="/" onClick={this.props.handleHomeNavigation} className='close-search'>Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author"
                        value={bookQuery} onChange={(e) => this.handleQueryChange(e.target.value)} />
                </div>
            </div>
        )
    }
}

export default SearchBook;