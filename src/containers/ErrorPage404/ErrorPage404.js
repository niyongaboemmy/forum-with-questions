import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class ErrorPage404 extends Component {
    render() {
        return (
            <div>
                <center>
                    <h1>Error 404</h1>
                    <small>Page not found!</small>
                    <hr />
                    <br/>
                    <div>
                        <Link to="/" className="my-btn bg-color">Go back to home</Link>
                    </div>
                </center>
            </div>
        )
    }
}

export default ErrorPage404
