import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import Library from './Library'
import * as BooksAPI from './BooksAPI'
import './App.css'

// JSON.stringify(object)
// to display a JS object on the website for debugging!!

class BooksApp extends React.Component {
  state = {
    books: [],
    mappedBooks: {},
    shelves: {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    },
    loading: true,
  }

  fetchBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        loading: false,
        books: books,
        mappedBooks: this.mapBooksToId(books),
        shelves: {
          currentlyReading: this.assignBooksToShelf(books, 'currentlyReading'),
          wantToRead: this.assignBooksToShelf(books, 'wantToRead'),
          read: this.assignBooksToShelf(books, 'read')
        }
      })
      // checkup if all arrives well.
      console.log(this.state.shelves.read)
      console.log(this.state.shelves.wantToRead)
      console.log(this.state.books)
      console.log(this.state.mappedBooks)
    })
  }

  mapBooksToId(books) {
  // creates a mapping of each book ID to the data of the associated book
  // allows for easier handling of book objects
    var mappedBooks = {}
    for (var i=0; i < books.length; i++) {
      mappedBooks[books[i].id] = books[i]
    }
    return mappedBooks
  }

  assignBooksToShelf(books, shelf) {
  // This function lets us track which books belong in which shelves.
    return books.filter(book => book.shelf === shelf).map(book => book.id)
  }

  componentDidMount() {
    this.fetchBooks()
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <SearchBooks books={this.state.books}/>
        )} />
        <Route exact path='/' render={() => (
          <Library mappedBooks={this.state.mappedBooks}
                     shelves={this.state.shelves}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp