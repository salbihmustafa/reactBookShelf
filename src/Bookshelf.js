import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'


class Bookshelf extends Component {

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { this.props.books.map((book) => (
                <li key={book.id}>
                  <Book book={book} onShelfChange={this.props.onShelfChange} />
                </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Bookshelf