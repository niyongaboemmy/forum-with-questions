import React, { Component, Fragment } from 'react'
import AdminNav from '../../components/AdminNav'
import AdminSideNav from '../../components/AdminSideNav'
import { Link } from 'react-router-dom'
import CreateTopic from '../CreateTopic/CreateTopic'

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
                    <div className="col xl12 l12 m12 s12">
                        <CreateTopic />
                    </div>
                </div>
            </div>
          </Fragment>
        )
    }
}

export default PrepareTest
