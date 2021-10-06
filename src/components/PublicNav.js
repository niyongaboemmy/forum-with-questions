import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LOGO from '../assets/content/LOGO.png'

export class PublicNav extends Component {
    render() {
        return (
            <nav>
                <div className="container nav-wrapper">
                    <Link to="/" className="brand-logo"><img src={LOGO} alt="Logo" /></Link>
                    <ul className="right hide-on-med-and-down">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login-category">Login</Link></li>
                        <li><Link to="/register-category">Register</Link></li>
                        <li><Link to="/login-category">Administration</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default PublicNav
