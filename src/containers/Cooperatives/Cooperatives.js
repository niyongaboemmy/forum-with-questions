import React, { Component } from 'react'
// Components
import Navbar from '../../components/Navbar'
import Sidenav from '../../components/Sidenav'
class Cooperatives extends Component {
    render() {
        return (
            <div className="body-container">
                <div className="body-container-page">
                    <div className="row">
                        <div className="col xl2 l2 m2 s12">
                            <div class="fixed-actin-btn">
                            <a class="btn-floating btn-large hoverable bg-color">
                                <i class="large material-icons">add</i>
                            </a>
                        </div>
                        </div>
                        <div className="col xl10 l19 m10 s12">
                            <h5><b className="title-txt">List of cooperatives</b></h5>
                        </div>
                    </div>
                    <hr/>
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th>Cooperative name</th>
                                <th>Item Name</th>
                                <th>Item Price</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr>
                                <td>Alvin</td>
                                <td>Eclair</td>
                                <td>$0.87</td>
                            </tr>
                            <tr>
                                <td>Alan</td>
                                <td>Jellybean</td>
                                <td>$3.76</td>
                            </tr>
                            <tr>
                                <td>Jonathan</td>
                                <td>Lollipop</td>
                                <td>$7.00</td>
                            </tr>
                            <tr>
                                <td>Jonathan</td>
                                <td>Lollipop</td>
                                <td>$7.00</td>
                            </tr>
                            <tr>
                                <td>Jonathan</td>
                                <td>Lollipop</td>
                                <td>$7.00</td>
                            </tr>
                            <tr>
                                <td>Jonathan</td>
                                <td>Lollipop</td>
                                <td>$7.00</td>
                            </tr>
                            <tr>
                                <td>Jonathan</td>
                                <td>Lollipop</td>
                                <td>$7.00</td>
                            </tr>
                            <tr>
                                <td>Jonathan</td>
                                <td>Lollipop</td>
                                <td>$7.00</td>
                            </tr>
                            <tr>
                                <td>Jonathan</td>
                                <td>Lollipop</td>
                                <td>$7.00</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
export default Cooperatives