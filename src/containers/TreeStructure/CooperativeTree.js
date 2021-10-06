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


const containerStyles = {
    width: '100%',
    height: '100vh',
}

export class CooperativeTree extends Component {
    state = {
        cooperative_name: "",
        members: "",
        pulledMembers: "",
        loading: false,
        error: "",
        number_rows: 0,
    }
    setCoopName = () => {
        if (this.props.auth.user === null) {
            if (this.props.auth.userCategory === "members") {
                for (let i in this.props.auth.data.allCoops) {
                    if (this.props.auth.data.allCoops[i].coop_id === this.props.auth.selectedCoop) {
                        this.setState({ coop_id: this.props.auth.data.allCoops[i].coop_id });
                        this.setState({ cooperative_name: this.props.auth.data.allCoops[i].cooperative_name });
                    }
                }
            }
        } else {
            if (this.props.auth.userCategory === "members") {
                for (let i in this.props.auth.user.data.allCoops) {
                    if (this.props.auth.user.data.allCoops[i].coop_id === this.props.auth.selectedCoop) {
                        this.setState({ coop_id: this.props.auth.user.data.allCoops[i].coop_id });
                        this.setState({ cooperative_name: this.props.auth.user.data.allCoops[i].cooperative_name });
                    }
                }
            }
        }
    }

    getMembers = () => {
        this.setState({ loading: true });
        Members(this.props.auth.selectedCoop, (status, data) => {
        if (status === true) {
            // "data" will be accesed here
            this.setState({
                pulledMembers: data,
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
        this.setCoopName();
        const dimensions = this.treeContainer.getBoundingClientRect();
        this.setState({
          translate: {
            x: dimensions.width,
            y: dimensions.height / 2
          }
        });
        this.getMembers();
    }
    render() {
        const orgChart = {
            name: this.state.cooperative_name + ` ( ${this.state.number_rows} members )`,
            attributes: {
                Male: this.state.pulledMembers.male,
                Female: this.state.pulledMembers.female,
            },
            children: this.state.pulledMembers.data,
        };
        return (
            <div className="body-container animate__animated animate__zoomIn">
                <div className="body-container-page">
                    <div className="title-txt"><center>Tree structure of members</center></div>
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

CooperativeTree.propTypes = {
    auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    auth: state.auth,
    userCategory: state.userCategory,
});
export default connect(mapStateToProps, { LogoutTheUser })(
    CooperativeTree
);