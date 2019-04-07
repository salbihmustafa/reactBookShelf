import React from 'react'
import { Route } from 'react-router-dom'
import SearchBooks from './SearchBooks'
import Library from './Library'
import * as BooksAPI from './BooksAPI'
import './App.css'

// JSON.stringify(object)
// to display a JS object on the website for debugging

class BooksApp extends React.Component {
  state = {
    books: [],
    loading: true,
  }

  fetchBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        loading: false,
        books: books
      });
      // check if all arrives well.
      console.log(this.state.books)
    })
  }

  componentDidMount() {
    this.fetchBooks()
  }

  //Call back function implemented in Book.js
  onShelfChange = (book, shelf) =>  {
    console.log("On shelf: " + shelf)
    book.shelf = shelf;
    //Calling the API to make sure books are updated when changed shelf
    BooksAPI.update(book, shelf).then(() => {
        this.setState((currentState) => ({
            books: currentState.books.filter(b => b.id !== book.id).concat([book])
        }))
    });
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (<SearchBooks books={this.state.books} onShelfChange={this.onShelfChange}/>
        )} />
        <Route exact path='/' render={() => (
          <Library books={this.state.books} onShelfChange={this.onShelfChange} />
        )} />
      </div>
    )
  }
}

export default BooksApp