import React from 'react'
import { Route, Routes } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './Components/BooksLibrary/BookList'
import BookSearchList from './Components/BooksSearch/BookSearchList'
import { debounce } from "debounce";

class BooksApp extends React.Component {
  state = {
    Books: [],
    BooksSearch: [],
    error: null,
    loadingBooks: false,
    loadingSearch: false,
    searchError: null
  };

  fetchBooks() {
    this.setState({ loadingBooks: true, error: null }, () => {
      BooksAPI.getAll().then(books => {
        this.setState({ Books: books, loadingBooks: false });
      }).catch(error => {
        this.setState({ error: error, loadingBooks: false });
      })
    });
  };

  componentDidMount() {
    this.fetchBooks();
  };

  handleHomeNavigation = () => {
    this.fetchBooks();
  };

  handleSearchNavigation = () => {
    this.setState({ searchError: false, BooksSearch: [] })
  };

  handleSearchBooks = debounce((query) => {
    query.length > 0 ?
      (
        this.setState({ loadingSearch: true, searchError: false }, () => {
          BooksAPI.search(query).then(books => {
            books.length > 0 ?
              this.setState({
                loadingSearch: false,
                BooksSearch: books.map(book =>
                ({
                  ...book, shelf: this.state.Books.filter(b => b.id === book.id)[0] ?
                    this.state.Books.filter(b => b.id === book.id)[0].shelf : 'none'
                })
                )
              }) : this.setState({ loadingSearch: false, BooksSearch: []})
          }).catch(error => {
            this.setState({ searchError: error, loadingSearch: false })
          })
        })
      )
      : (this.setState({ BooksSearch: [] }))
  }, 250);

  handleUpdateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    this.state.Books.filter(b => b.id === book.id).length > 0 ? (
      this.setState({
        Books: this.state.Books.map(currentBook => (currentBook.id === book.id ? { ...currentBook, shelf: shelf } : currentBook))
      })
    ) : (
      this.setState({ Books: [...this.state.Books, { ...book, shelf: shelf }] })
    )
  };

  render() {
    return (
      <div className='app'>
        <Routes>
          <Route
            path="/search"
            element={
              <BookSearchList
                loading={this.state.loadingSearch}
                books={this.state.BooksSearch}
                updateBookShelf={this.handleUpdateBookShelf}
                handleBookSearch={this.handleSearchBooks}
                handleHomeNavigation={this.handleHomeNavigation}
                error={this.state.searchError}
              />
            }
          />
          <Route
            exact path="/"
            element=
            {
              <BookList
                loading={this.state.loadingBooks}
                error={this.state.error}
                handleShelfChange={this.handleUpdateBookShelf}
                books={this.state.Books}
                handleSearchNavigation={this.handleSearchNavigation}
              />
            }
          />
        </Routes>
      </div>
    );
  }
}

export default BooksApp
