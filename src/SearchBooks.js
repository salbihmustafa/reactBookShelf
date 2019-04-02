import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import throttle from 'lodash.throttle'
import { search } from './BooksAPI'


class SearchBooks extends Component {

    state = {
        query: "",
        searchBooks: [],
        visibleText: false
    }

    runSearch = event => {
        const newText = event.target.value.trim();
        this.setState({ query: newText });
        if (newText.length > 0) {
            search(newText).then(searchBooks => {
                if (searchBooks.length > 0) {
                    // map over the bookOnHomePage
                    // map over the bookOnSearchPage
                    // check bookOnHomePage.id === bookOnSearchPage.id
                    // Match the shelf bookOnSearchPage.shelf = bookOnHomePage.shelf
                    this.setState({ searchBooks, visibleText: true });
                }
            });
        } else {
            this.setState({ visibleText: false });
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
                    {this.state.visibleText &&
                        <ol className="books-grid">
                            {this.state.searchBooks.map((book, i) => (
                                <Book />
                            ))}
                        </ol>
                    }
                </div>
            </div>
        )
    }
}

export default SearchBooks