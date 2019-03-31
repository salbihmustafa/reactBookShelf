import React from 'react'
//import Search from './Search'
import SearchBook from './SearchBook'
import CurrentShelf from './CurrentShelf'
import WantShelf from './WantShelf'
import ReadShelf from './ReadShelf'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  
  state = {
    books: []
  }

  //LifeCycle AJAX call
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBook />
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CurrentShelf />
                <WantShelf />
                <ReadShelf />
              </div>
            </div>
            <Link to='/search' className="open-search">
              <button>Add a book</button>
            </Link>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
