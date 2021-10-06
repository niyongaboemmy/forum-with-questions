import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import setAuthToken from "../../utils/setAuthToken";
import { TOKEN } from "../../utils/api";
import { LoadUserDetails } from "../../actions/auth";
import { Fragment } from "react";
class AppContainer extends Component {
  state = {
    loading: true,
  };

  componentDidMount = () => {
    setAuthToken();

    if (TOKEN) {
      this.props.LoadUserDetails((status) => {
        this.setState({ loading: status });
      });
    }

  };

  render() {
    if (this.state.loading === true && TOKEN !== undefined) {
      return (
        <div className="container p-5 text-center">
          <br />
          <br />
          <br />
          <center>
            <div className="preloader-wrapper large active">
                <div className="spinner-layer" style={{borderColor: 'darkblue'}}>
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div><div className="gap-patch">
                        <div className="circle"></div>
                    </div><div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
            <h4 style={{color: 'darkblue'}}>Loading contents...</h4>
          </center>
        </div>
      );
    } else {
      return (
        <Fragment>
          <div
            className={`AppContainner ${
              this.props.auth.isAuthenticated === true ?
                this.props.auth.navOpen === true
                ? "active-navigation-side" : "" : ""
            }`}
          >
            {this.props.children}
          </div>
        </Fragment>
      );
    }
  }
}

AppContainer.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { LoadUserDetails })(AppContainer);