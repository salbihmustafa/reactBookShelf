import React from 'react'
import Search from './Search'
import CurrentShelf from './CurrentShelf'
import WantShelf from './WantShelf'
import ReadShelf from './ReadShelf'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={({ history }) => (
          <Search />
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
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
