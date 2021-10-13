import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BG_IMAGE from '../../assets/content/img2.gif'
import BG_IMAGE1 from '../../assets/content/img13.jpg'


export class Home extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <section className="section bg-white">
                    <div className="container">
                        <div className="row">
                            <div className="col s12 m6 img-display" style={{overflow: 'hidden',}}>
                                <img className="right-img" src={BG_IMAGE} alt="OPC" style={{transform: "translate3d(-50%, 169.284px, 0px); opacity: 1; top: -181px", width: "100%"}} />
                            </div>
                            <div className="col s12 m6">
                                <div className="">
                                    <h1 className="header home-title animate__animated animate__zoomIn" style={{fontWeight: 'bold', color: 'black', fontSize: '60px'}}>Online Physics Classroom</h1>
                                    <div className="row">
                                        <Link to="/topics" className="btn-large waves-effect outline-btn getStarted" style={{lineHeight: '48px !important', marginLeft: '10px'}}>Get Started</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col s12 m6 img-display1" style={{overflow: 'hidden',}}>
                                <img className="right-img" src={BG_IMAGE} alt="OPC" style={{transform: "translate3d(-50%, 169.284px, 0px); opacity: 1; top: -181px", width: "100%"}} />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section bg-white">
                    <div className="container">
                        <div>
                            <h4 className="my-title">Web-based Learning and Assessment Platform</h4>
                            <div className="second-text">
                            Web-based Learning and Assessment Platform (WLAP) is an online Collaboration board. It is a suitable methodology of teaching and learning simple harmonic motion (SHM) since it facilitates collaboration between teachers and learners within a digital environment. Any user can ask and respond to questions, send a comment as well as develop an argument to benefit the class. Additionally, the WLAP is useful for researchers and educators who are interested in collecting data and ideas from specific participants. Furthermore, this WLAP allows learners to share resources and discuss posted topics, enabling them to learn from one another and get enough access to online op-ed Physics materials.   
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section bg-white">
                    <div className="container">
                        <div className="row">
                            <div className="col s12 m12">
                                <div className="card vertical animate__animated animate__zoomIn">
                                    <div className="card-image" style={{height: '300px', overflow: 'hidden'}}>
                                        <img src={BG_IMAGE1} alt=""/>
                                    </div>
                                    <div className="card-stacked">
                                        <div className="card-content">
                                            <h5 className="my-title"><b>Students collaboration</b></h5>
                                        <p className="second-text">Collaborative learning is a setting in which two or more people learn or study something together. By employing WLAP as a physics teaching, learning, and assessment tool, learners have more flexibility to work at their own pace, which improves their learning experience and helps them build a better understanding of provided  physics concepts along with their teachers. </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </section>
                <Footer />
            </div>
        )
    }
}

export default Home
