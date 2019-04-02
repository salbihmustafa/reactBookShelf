import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'

//Functional Component. No rendering.
function Library(props) {

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>Bookshelf</h1>
        </div>
        <div className="list-books-content">
          <Bookshelf name="Currently Reading"
                     books={props.books.filter(book => book.shelf === 'currentlyReading')}
                     onShelfChange={props.onShelfChange} />
          <Bookshelf name="Want To Read"
                     books={props.books.filter(book => book.shelf === 'wantToRead')} 
                     onShelfChange={props.onShelfChange}/>
          <Bookshelf name="Read"
                     books={props.books.filter(book => book.shelf === 'read')} 
                     onShelfChange={props.onShelfChange}/>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
}

export default Library