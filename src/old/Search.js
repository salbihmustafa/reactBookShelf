import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class Search extends Component {

    state = {
        query: '', //Set initial state
        books: []
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }));

        if (query.trim() !== null)
            this.searchBook(query.trim());
    }

    clearQuery = () => {
        this.updateQuery('') //Clears query
    }

    searchBook = (book) => {
        BooksAPI.search(book)
            .then((book) => {
                this.setState((currentState) => ({
                    books: currentState.books.concat([book])
                }))
            })
    }

    render() {
        const { query, books } = this.state

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <div className="list-books-content">
                        <div className="bookshelf">
                            <div className="bookshelf-books">
                                {books.map((book) => (
                                    <ol key={book.id} className="books-grid">
                                        <li>
                                            {book.map((b) => (
                                                <div className="book">
                                                    <div className="book-top">
                                                        <div className="book-cover" style={{ width: `128px`, height: `193px`, backgroundImage: `url(${b.imageLinks.smallThumbnail})` }}></div>
                                                        <div className="book-shelf-changer">
                                                            <select>
                                                                <option value="move" disabled>Move to...</option>
                                                                <option value="currentlyReading">Currently Reading</option>
                                                                <option value="wantToRead">Want to Read</option>
                                                                <option value="read">Read</option>
                                                                <option value="none">None</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="book-title">{b.title}</div>
                                                    <div className="book-authors">{b.publisher}</div>
                                                </div>
                                            ))}
                                        </li>
                                    </ol>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search