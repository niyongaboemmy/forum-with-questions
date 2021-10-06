import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class SubNav extends Component {
    render() {
        return (
            <div class="container-fluid">
                <div class="nav-bar-lower">
                    <div class="row">
                        <Link to="/topics" class="col xl3 l3 m3 s12" style={{color: '#fff'}}>
                            <i class="fas fa-bars"></i>
                            All topics
                        </Link>
                        <Link to="/topics" class="col xl3 l3 m3 s12" style={{color: '#fff'}}>
                            <i class="fas fa-calendar"></i>
                            Today topics
                        </Link>
                        <Link to="/create-topic" class="col xl3 l3 m3 s12" style={{color: '#fff'}}>
                            <i class="fas fa-edit"></i>
                            Post a topic
                        </Link>
                        <div class="col xl3 l3 m3 s12">
                            <div class="input-field" style={{margin: "0px", marginTop: "-11px"}}>
                                <i class="fas fa-search prefix" style={{fontSize: "19px", lineHeight: "46px"}}></i>
                                <input placeholder="Search" id="home-search" type="text" class="home-search-input autocomplete" style={{borderWidth: "2px !important", marginTop: "-14px"}} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SubNav
