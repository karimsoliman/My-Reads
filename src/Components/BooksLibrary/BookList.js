import React, {Component} from 'react';
import BookShelf from './BookShelf';
import Shelf from '../../Constants/Shelf';
import AddBook from './AddBook';

class BookList extends Component{
    render(){
      const{books, error, loading, handleSearchNavigation, handleShelfChange} = this.props;
        return(
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            {loading && <h1 className="center">Loading....</h1>}
            {error && <h1 className="center">Network error, please try again.</h1>}
            {!error && !loading && 
              <div className="list-books-content">
                <div>
                  {Object.entries(Shelf).map(([key, value]) => (
                    <BookShelf key={key} bookShelfChange={handleShelfChange} title={value} books={books.filter(book => book.shelf === key.toString())} />
                  ))
                  }
                </div>
              </div>
            }
            <AddBook handleSearchNavigation={handleSearchNavigation}/>
          </div>
        );
    }
}

export default BookList;