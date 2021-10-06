import React, { Component } from 'react'
import Tree from 'react-d3-tree';
import { LogoutTheUser } from "../../actions/auth";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import axios from 'axios';
import { API_URL } from '../../utils/api';
import { Link } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';
import { Federation } from './Federation';


const containerStyles = {
    width: '100%',
    height: '100vh',
}

export class FederationTree extends Component {
    state = {
        coop_id: "",
        union_id: "",
        cooperative_name: "",
        union_name: "",
        members: "",
        cooperatives: "",
        federation_id: "",
        federation_name: "",
        unions: "",
        male: 0,
        female: 0,
        pulledFeds: "",
        number_rows: 0,
    }
    setFederationName = () => {
        if (this.props.auth.user === null) {
            if (this.props.auth.userCategory === "federation") {
                this.setState({ federation_name: this.props.auth.data.register_name });
                this.setState({ federation_id: this.props.auth.data.register_id })
            }
        } else {
            if (this.props.auth.userCategory === "federation") {
                this.setState({ federation_name: this.props.auth.user.data.register_name });
                this.setState({ federation_id: this.props.auth.user.data.register_id })
            }
        }
    }

    getUnions = async () => {
        var federation_id = "";
        var unions = [];
        if (this.props.auth.user === null) {
            federation_id = this.props.auth.data.register_id;
        } else {
            federation_id = this.props.auth.user.data.register_id;
        }
        this.setState({ loading: true });
        Federation(federation_id, (status, data) => {
            if (status === true) {
                // "data" will be accesed here
                this.setState({
                    pulledFeds: data,
                    number_rows: data.data.length,
                    loading: false,
                });
            } else {
                // display data
                this.setState({ error: "failed to laod member", loading: false });
        }
        });
    }
    
    componentDidMount() {
        this.setFederationName();
        this.getUnions();
        const dimensions = this.treeContainer.getBoundingClientRect();
        this.setState({
          translate: {
            x: dimensions.width,
            y: dimensions.height / 2
          }
        });
    }
    render() {
        const orgChart = {
            name: this.state.federation_name + ` ( ${this.state.number_rows} unions )`,
            attributes: {
                Male: this.state.pulledFeds.male,
                Female: this.state.pulledFeds.female,
            },
            children: this.state.pulledFeds.data,
        };
        return (
            <div className="body-container animate__animated animate__zoomIn">
                <div className="body-container-page">
                    <div className="title-txt"><center>Tree structure of unions</center></div>
                    <div className="body-container">
                        <div style={containerStyles} ref={tc => (this.treeContainer = tc)} id="" style={{ width: '100%', height: '100vh' }}>
                            <Tree 
                            translate={this.state.translate} 
                            orientation={'vertical'}
                            data={orgChart} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

FederationTree.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser })(
    FederationTree
);