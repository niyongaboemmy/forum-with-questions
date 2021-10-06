import React, { Component } from 'react'
import Tree from 'react-d3-tree';
import { LogoutTheUser } from "../../actions/auth";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import axios from 'axios';
import { API_URL } from '../../utils/api';
import { Link } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';
import { Members } from './Members';
import { Confederation } from './Confederation';

const containerStyles = {
    width: '100%',
    height: '100vh',
}

export class ConfederationTree extends Component {
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
        confederation_id: "",
        confederation_name: "",
        federations: "",
        male: 0,
        female: 0,
        pulledConfed: "",
        number_rows: 0,
        loading: false,
        error: "",
    }
    setConfederationName = () => {
        if (this.props.auth.user === null) {
            if (this.props.auth.userCategory === "confederation") {
                this.setState({ confederation_name: this.props.auth.data.register_name });
                this.setState({ confederation_id: this.props.auth.data.register_id })
            }
        } else {
            if (this.props.auth.userCategory === "confederation") {
                this.setState({ confederation_name: this.props.auth.user.data.register_name });
                this.setState({ confederation_id: this.props.auth.user.data.register_id })
            }
        }
    }

    getFederations = async () => {
        var confederation_id = "";
        if (this.props.auth.user === null) {
            confederation_id = this.props.auth.data.register_id;
        } else {
            confederation_id = this.props.auth.user.data.register_id;
        }
        this.setState({ loading: true });
        Confederation(confederation_id, (status, data) => {
            if (status === true) {
                // "data" will be accesed here
                this.setState({
                    pulledConfed: data,
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
        this.setConfederationName();
        this.getFederations();
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
            name: this.state.confederation_name + ` ( ${this.state.number_rows} Federations )`,
            attributes: {
                Male: this.state.pulledConfed.male,
                Female: this.state.pulledConfed.female,
            },
            children: this.state.pulledConfed.data,
        };
        return (
            <div className="body-container animate__animated animate__zoomIn">
                <div className="body-container-page">
                    <div className="title-txt"><center>Tree structure of federations</center></div>
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

ConfederationTree.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser })(
    ConfederationTree
);
