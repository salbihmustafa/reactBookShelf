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
                     books={props.books.filter(book => book.shelf === 'currentlyReading')} //Filter on book that is on currentlyReading shelf
                     onShelfChange={props.onShelfChange} /> {/* Passed from onShelfChange method in App.js */}
          <Bookshelf name="Want To Read"
                     books={props.books.filter(book => book.shelf === 'wantToRead')} //Filter on book that is on wantToRead shelf
                     onShelfChange={props.onShelfChange}/> {/* Passed from onShelfChange method in App.js */}
          <Bookshelf name="Read"
                     books={props.books.filter(book => book.shelf === 'read')} //Filter on book that is on read shelf
                     onShelfChange={props.onShelfChange}/> {/* Passed from onShelfChange method in App.js */}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
}

export default Library