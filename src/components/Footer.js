import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Footer extends Component {
    render() {
        return (
            <footer className="page-footer">
                <div className="container">
                    <div className="row">
                        <div className="col l12 s12">
                            <div className="center-align" style={{fontSize: '18px', marginTop: '20px', fontWeight: 'bold'}}>Web-based Learning and Assessment Platform</div>
                            <p className="grey-text text-lighten-4">
                                <div className="addthis_inline_share_toolbox_oc40"></div>
                            </p>
                        </div>
                        
                    </div>
                </div>
                <div className="footer-copyright" style={{paddingBottom: '50px'}}>
                    <div className="container">
                    © 2021 OPC
                    <Link className="grey-text text-lighten-4 right" to="https://universalbridge.rw">Developed by Universal Bridge Dev</Link>
                    </div>
                </div>
                <script async type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5c2f2b40e52f15d7"></script>
            </footer>
        )
    }
}

export default Footer
