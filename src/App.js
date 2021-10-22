
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store';
// Styles
import './styles/css.css'
import './styles/materialize.min.css'
import './styles/fontawesome/css/all.css'
import './styles/BackDrop.css'
import './styles/Modal.css'
import './styles/animate.min.css'
// Components
import AppContainer from './shared/AppContainer/AppContainer'
import PrivateRoute from "./shared/PrivateRoute/PrivateRoute"
// Pages
import Home from './containers/Home/Home'
import ErrorPage404 from './containers/ErrorPage404/ErrorPage404'
import Topics from "./containers/Topics/Topics";
import Details from "./containers/Details/Details";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import AdminCreateTopic from "./containers/AdminCreateTopic/AdminCreateTopic";
import Admin from "./containers/Admin/Admin";
import AdminLogin from "./containers/AdminLogin/AdminLogin";
import Users from "./containers/Users/Users";
import TopicsList from "./containers/TopicsList/TopicsList";
import TopicComments from "./containers/TopicComments/TopicComments";
import PrepareTest from "./containers/PrepareTest/PrepareTest";
import Tests from "./containers/PrepareTest/Tests/Tests";
import DoTest from "./containers/DoTest/DoTest";
import Admins from "./containers/Users/Admins";
import RegisterAdmin from "./containers/Users/RegisterAdmin";
import TestResults from "./containers/TestResults/TestResults";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppContainer>
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute exact path="/topics" component={Topics} />
              <PrivateRoute exact path="/details" component={Details} />
              <PrivateRoute exact path="/details/:topic_id" component={Details} />
              <PrivateRoute exact path="/admin-create-topic" component={AdminCreateTopic} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/register-admin" component={RegisterAdmin} />
              <PrivateRoute exact path="/admin" component={Admin} />
              <Route exact path="/admin-login" component={AdminLogin} />
              <PrivateRoute exact path="/users" component={Users} />
              <PrivateRoute exact path="/admins" component={Admins} />
              <PrivateRoute exact path="/test" component={PrepareTest} />
              <PrivateRoute exact path="/tests" component={Tests} />
              <PrivateRoute exact path="/tests/:test_id" component={TestResults} />
              <PrivateRoute exact path="/do-test" component={DoTest} />
              <PrivateRoute exact path="/topics-list" component={TopicsList} />
              <PrivateRoute exact path="/topic-comments/:topic_id" component={TopicComments} />

              <Route component={ErrorPage404} />
            </Switch>
          </AppContainer>
          
        </Router>
      </Provider>
      
    );
  }
}

export default App;