import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AiFillHome, AiOutlineCustomerService, AiOutlineLogin, AiOutlineUser, AiOutlineUserSwitch, } from "react-icons/ai"
import PublicFooter from '../../components/PublicFooter'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BG_IMAGE from '../../assets/content/img1.png'


export class Home extends Component {
    render() {
        return (
            <div>
                <Navbar />
                {/* Homepage content */}
                    <div class="parallax-container">
                        <div class="section no-pad-bot">
                            <div class="home-container-shadow">
                                <h1 class="header center home-title animate__animated animate__zoomIn">Universal chemistry network</h1>
                                <div class="row center">
                                    <Link to="/topics" class="btn-large waves-effect outline-btn getStarted" style={{lineHeight: '48px !important'}}>Get Started</Link>
                                </div>
                            </div>
                        </div>
                        <div class="parallax"><img src={BG_IMAGE} alt="Unsplashed background img 1" style={{transform: "translate3d(-50%, 169.284px, 0px); opacity: 1; top: -181px"}} /></div>
                    </div>
                    <div class="row center container" style={{height: "0px", display: "flow-root", marginBottom: '0px'}}>
                        <div class="search-bar animate__animated animate__bounceIn">
                            <div class="row">
                                <div class="col xl2 l2 m2 s12"></div>
                                <div class="col xl8 l8 m8 s12">
                                    <h5 className="search-title">Search topic keyword</h5>
                                    <div class="input-field col s12" style={{margin: "0px"}}>
                                        <i class="fas fa-search prefix"></i>
                                        <input onChange={() => this.props.history.push("/topics")} id="home-search" type="text" class="home-search-input autocomplete" />
                                    </div>
                                </div>
                                <div class="col xl2 l2 m2 s12"></div>
                            </div>
                        </div>
                    </div>
                    <section class="section bg-white">
                        <div class="container">
                            <center>
                                <h4 class="my-title">The forum</h4>
                                <div class="second-text">
                                    The UNC aim is online discussion group. Any user can post the doubts topics and can reply for the other user doubts. This is useful for a researcher who is interested to correct data and idea from particular people. Facility to share the resource and post topic that can be viewed by registered user. User also be able to share his/her though on given topic.
                                </div>
                            </center>
                        </div>
                    </section>
                    <section class="section bg-white">
                        <div class="container">
                            <div class="row">
                                <div class="col s12 m12">
                                    <div class="card vertical animate__animated animate__zoomIn">
                                        <div class="card-image">
                                            <img src={BG_IMAGE} />
                                        </div>
                                        <div class="card-stacked">
                                            <div class="card-content">
                                                <h5><b>Students discussions</b></h5>
                                            <p class="second-text">Online discussion provides opportunities for collaboration and active learning that do not always take place in a traditional lecture context. OD also provides students with the opportunity to discuss, ask questions, and resulting in deeper learning in easy way.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div class="col s12 m6">
                                    <div class="card vertical">
                                    <div class="card-image">
                                        <img src={BG_IMAGE} />
                                    </div>
                                    <div class="card-stacked">
                                        <div class="card-content">
                                            <h5><b>Our services</b></h5>
                                        <p class="second-text">I am a very simple card. I am good at containing small bits of information.</p>
                                        </div>
                                    </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        
                    </section>
                <Footer />
            </div>
        )
    }
}

export default Home
