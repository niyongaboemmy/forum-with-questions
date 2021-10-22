import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class SubNav extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="nav-bar-lower">
                    <div className="row">
                        <Link to="/topics" className="col xl3 l3 m3 s12" style={{color: '#fff'}}>
                            <i className="fas fa-bars"></i>
                            All topics
                        </Link>
                        <Link to="/topics" className="col xl3 l3 m3 s12" style={{color: '#fff'}}>
                            <i className="fas fa-calendar"></i>
                            Today topics
                        </Link>
                        <Link to="/create-topic" className="col xl3 l3 m3 s12" style={{color: '#fff'}}>
                            <i className="fas fa-edit"></i>
                            Post a topic
                        </Link>
                        <div className="col xl3 l3 m3 s12">
                            <div className="input-field" style={{margin: "0px", marginTop: "-11px"}}>
                                <i className="fas fa-search prefix" style={{fontSize: "19px", lineHeight: "46px"}}></i>
                                <input placeholder="Search" id="home-search" type="text" className="home-search-input autocomplete" style={{borderWidth: "2px !important", marginTop: "-14px"}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SubNav
