import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import SearchListBooks from './SearchListBooks'

class Search extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired
    }

    state = {
        query: '', //Set initial state
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()
        }))
    }

    clearQuery = () => {
        this.updateQuery('') //Clears query
    }

    render() {
        const { query } = this.state
        const { books } = this.props

        const showingBooks = query === ''
            ? books
            : books.filter((b) => (
                b.name.toLowerCase().includes(query.toLowerCase())
            ))

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
                    <div className="search-books-input-wrapper">
                        {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                    */}
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => this.updateQuery(event.target.value)}/>
                        <p>{query}</p>
                    </div>
                </div>
                {showingBooks.length !== books.length && (
                    <div>
                        <span>Now Showing {showingBooks.length} of {books.length}</span>
                    </div>
                )}
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((book) => (
                            <li key={book.id}>
                                <div>
                                    {book.name}
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
                {/*<SearchListBooks books={books}/>*/}
            </div>
        )
    }
}

export default Search