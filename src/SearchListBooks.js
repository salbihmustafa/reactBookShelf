import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class SearchListBooks extends Component {
    render() {
        return (
            <div className="search-books-results">
                <ol className="books-grid"></ol>
            </div>
        )
    }

}

export default SearchListBooks