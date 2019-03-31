import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import throttle from 'lodash.throttle'
import { search } from './BooksAPI'


class SearchBooks extends Component {

    state = {
        query: "",
        searchBooks: [],
        books: this.props.books
    }

    runSearch = event => {
        const newText = event.target.value.trim();
        this.setState({ query: newText });
        if (newText.length > 0) {
            search(newText).then(searchBooks => {
                if (searchBooks.length > 0) {
                    this.setState({ searchBooks });
                }
            });
        }
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={this.runSearch}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchBooks.map((book, i) => (
                            <li key={i}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover"
                                            style={{
                                                width: 128,
                                                height: 193,
                                                backgroundImage: `url(${book.imageLinks.thumbnail})`
                                            }}>
                                        </div>
                                        <div className="book-shelf-changer">
                                            <select value={book.shelf}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks