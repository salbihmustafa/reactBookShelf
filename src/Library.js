import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'


class Library extends Component {

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>Bookshelf</h1>
        </div>
        <div className="list-books-content">
          <Bookshelf name="Currently Reading"
                     mappedBooks={this.props.mappedBooks}
                     shelf={this.props.shelves.currentlyReading} />
          <Bookshelf name="Want To Read"
                     mappedBooks={this.props.mappedBooks}
                     shelf={this.props.shelves.wantToRead} />
          <Bookshelf name="Read"
                     mappedBooks={this.props.mappedBooks}
                     shelf={this.props.shelves.read} />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Library