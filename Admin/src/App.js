import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login_Plugin = React.lazy(() => import('./views/Pages/Login_plugin/Login'));
const Register = React.lazy(() => import('./views/Pages/Register/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500/Page500'));
const ChangePassword = React.lazy(() => import('./views/Pages/Login_plugin/ChangePassword'));
const ResetPassword = React.lazy(() => import('./views/Pages/Login_plugin/ResetPassword'));
const Message = React.lazy(() => import('./views/Pages/Login_plugin/Message'));
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: true
    };
  }

  render() {
    return (

      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={props => <Login_Plugin {...props} />} />
            <Route exact path="/logout" name="Logout Page" render={props => <Login_Plugin {...props} />} />
            <Route exact path="/register" name="Register Page" render={props => <Register {...props} />} />
            <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
            <Route exact path="/change_password" name="Change Password" render={props => <ChangePassword {...props} />} />
            <Route exact path="/change/:code" name="Reset Password" render={props => <ResetPassword {...props} />} />
            <Route exact path="/message" name="Message" render={props => <Message {...props} />} />
            <Route path="/" name="Home" render={props => <TheLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>

    );
  }
}

export default App;
