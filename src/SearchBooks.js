import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import throttle from 'lodash.throttle'
import { search } from './BooksAPI'


class SearchBooks extends Component {

    constructor(props){
        super(props);

        this.state = {
            query: "", //Query being typed by user
            searchBooks: [], //Array of books in the search API
            visibleText: false, //Whether or not we are displaying the books on the search page
            hasError: false //Error handling
        }
    }

    runSearch = event => {
        const newText = event.target.value;
        this.setState({ query: newText });
        if (newText.length > 0) {
            search(newText).then(books => { //Imported function from BooksAPI
                console.log(books.length);
                if (books.length > 0) {
                    
                    books.filter(b => { 
                        if(b.imageLinks == null) 
                        {   
                            b.imageLinks = []
                            b.imageLinks.thumbnail = "default"
                            b.imageLinks.smallThumbnail = "default"
                            console.log(b)
                        }
                    })

                    this.props.books.map(homeBook => (
                        books.map(b => (
                            b.shelf = (b.id === homeBook.id) ? homeBook.shelf : 'none'
                        ))
                    ))

                    //Set the state but filter on the authors that have undefined. That is why I did != null
                    this.setState({
                        searchBooks: books.filter(b => b.authors != null),
                        visibleText: true
                    })
                }
                else if(books.length == null) {
                    this.setState({ visibleText: false, hasError: true }); //When the users query doesn't match the results in BookAPI throw error
                }
            });
        } else {
            console.log("visibleText set to false");
            this.setState({ visibleText: false, hasError: false }); //Don't show books and reset error message about false query
        }
    };

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.runSearch} multiple></input>
                    </div>
                </div>
                <div className="search-books-results">
                    {this.state.visibleText &&
                        <ol className="books-grid">
                            {this.state.searchBooks.map((book) => (
                                <Book book={book} onShelfChange={this.props.onShelfChange}/>
                            ))}
                        </ol>
                    }
                    {this.state.hasError &&
                        <h1>No Books Found</h1>
                    }
                </div>
            </div>
        )
    }
}

export default SearchBooks