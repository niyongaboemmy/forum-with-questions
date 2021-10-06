import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class PublicFooter extends Component {
    render() {
        return (
            <footer className="page-footer hide-sm">
                <div className="container">
                    <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">Ipfundo platform</h5>
                        <p className="grey-text text-lighten-4">Cooperative books of accounts management system</p>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="white-text">Links</h5>
                        <ul>
                            <li><Link className="grey-text text-lighten-3" to="/">Home</Link></li>
                            <li><Link className="grey-text text-lighten-3" to="/register-category">Register</Link></li>
                            <li><Link className="grey-text text-lighten-3" to="/login-category">Login</Link></li>
                            <li><Link className="grey-text text-lighten-3" to="/login">Cooperative Login</Link></li>
                            {/* <li><Link className="grey-text text-lighten-3" to="/contact">Contact</Link></li> */}
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container">
                    © Copyright 2020, Designed by Emmy Joseph Aristide
                    <Link className="grey-text text-lighten-4 right" to="/register-category">Get started now</Link>
                    </div>
                </div>
            </footer>
        )
    }
}

export default PublicFooter
