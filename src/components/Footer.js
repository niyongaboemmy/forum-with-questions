import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Footer extends Component {
    render() {
        return (
            <footer class="page-footer">
                <div class="container">
                    <div class="row">
                        <div class="col l6 s12">
                            <h5 class="white-text">Social media</h5>
                            <p class="grey-text text-lighten-4">
                                <div class="addthis_inline_share_toolbox_oc40"></div>
                            </p>
                        </div>
                        <div class="col l4 offset-l2 s12">
                            <h5 class="white-text">Links</h5>
                            <ul>
                                <li><Link class="grey-text text-lighten-3" to="/">Home</Link></li>
                                <li><Link class="grey-text text-lighten-3" to="/login">Login</Link></li>
                                <li><Link class="grey-text text-lighten-3" to="/register">Register</Link></li>
                                <li><Link class="grey-text text-lighten-3" to="/topics">List of topics</Link></li>
                                <li><Link class="grey-text text-lighten-3" to="/create-topic">Create a topic</Link></li>
                                <li><Link class="grey-text text-lighten-3" to="/admin-login">Administrator</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="footer-copyright">
                    <div class="container">
                    © 2021 UCN
                    <Link class="grey-text text-lighten-4 right" to="https://universalbridge.rw">Developed by Universal Bridge Dev</Link>
                    </div>
                </div>
                <script async type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5c2f2b40e52f15d7"></script>
            </footer>
        )
    }
}

export default Footer
