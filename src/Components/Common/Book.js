import React, { Component } from 'react';
import ShelfSelect from './ShelfSelect';

class Book extends Component{
    render(){
        const {book, bookShelfChange} = this.props;
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
                    <ShelfSelect shelf={book.shelf} onShelfChange={(e) => {bookShelfChange(this.props.book, e.target.value)}}/>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors && book.authors.map(author => (
                    <div key={author} className="book-authors">{author}</div>
                ))}
            </div>
        );
    }
}

export default Book;