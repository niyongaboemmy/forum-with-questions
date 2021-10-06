import React, { Component } from 'react'
import Tree from 'react-d3-tree';
import { LogoutTheUser } from "../../actions/auth";
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import axios from 'axios';
import { API_URL } from '../../utils/api';
import { Link } from 'react-router-dom';
import setAuthToken from '../../utils/setAuthToken';
import { Unions } from './Union';


const containerStyles = {
    width: '100%',
    height: '100vh',
}

export class UnionTree extends Component {
    state = {
        coop_id: "",
        union_id: "",
        cooperative_name: "",
        union_name: "",
        members: "",
        cooperatives: "",
        male: 0,
        female: 0,
        pulledCoops: "",
        number_rows: "",
        loading: "",
        error: "",
    }
    setUnionName = () => {
        if (this.props.auth.user === null) {
            if (this.props.auth.userCategory === "union") {
                this.setState({ union_name: this.props.auth.data.register_name });
                this.setState({ union_id: this.props.auth.data.register_id })
            }
        } else {
            if (this.props.auth.userCategory === "union") {
                this.setState({ union_name: this.props.auth.user.data.register_name });
                this.setState({ union_id: this.props.auth.user.data.register_id })
            }
        }
    }

    getCooperatives = () => {
        var union_id = "";
        if (this.props.auth.user === null) {
            union_id = this.props.auth.data.register_id;
        } else {
            union_id = this.props.auth.user.data.register_id;
        }
        this.setState({ loading: true });
        Unions(union_id, (status, data) => {
        if (status === true) {
            // "data" will be accesed here
            this.setState({
                pulledCoops: data,
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
        this.setUnionName();
        this.getCooperatives();
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
            name: this.state.union_name + ` ( ${this.state.number_rows} cooperatives )`,
            attributes: {
                Male: this.state.pulledCoops.male,
                Female: this.state.pulledCoops.female,
            },
            children: this.state.pulledCoops.data,
        };
        return (
            <div className="body-container animate__animated animate__zoomIn">
                <div className="body-container-page">
                    <div className="title-txt"><center>Tree structure of cooperatives</center></div>
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

UnionTree.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser })(
    UnionTree
);