import React, { Component, Fragment } from 'react'
import AdminNav from '../../components/AdminNav'
import AdminSideNav from '../../components/AdminSideNav'
import { Link } from 'react-router-dom'

export class PrepareTest extends Component {
    state = {
        modal: true,
    }
    render() {
        return (
          <Fragment>
            <div className="admin-container">
                {/* Nav Bar here */}
                <AdminNav />
                <div className="row">
                    <div className="col xl2 l2 m3 s12">
                        {/* Side Nav here */}
                        <AdminSideNav />
                    </div>
                    <div className="col xl10 l10 m10 s12">
                        <div class="main admin-container-main animate__animated animate__zoomIn">
                            <div class="container-fluid admin-bg">
                              <div className="row">
                                <div className="col xl6 l6 m6 s12">
                                  <div className="my-title" style={{fontSize: '23px'}}>Prepare test</div>
                                </div>
                                <div className="col xl6 l6 m6 s12">
                                  <button className="waves-effect waves-light right my-btn bg-color hoverable main-btn">View list</button>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </Fragment>
        )
    }
}

export default PrepareTest
