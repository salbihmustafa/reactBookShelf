import React, { Component } from 'react'

function Book(props) {

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${props.book.imageLinks.thumbnail})`
                        }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select
                            value={props.book.shelf}
                            onChange={(e) => props.onShelfChange(props.book, e.target.value)} //Pass entire book and the value of currentlyReading, read, etc..
                        >
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{props.book.title}</div>
                {props.book.authors.map((author, i) => (
                    <div className="book-authors" key={i}>{author}</div>
                ))}
            </div>
        )
 }

export default Book