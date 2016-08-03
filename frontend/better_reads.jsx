//React
const React = require('react');
const ReactDOM = require('react-dom');
//Router
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

//Components
const LoginForm = require('./components/login_form.jsx');

//Misc
const SessionsApiUtil = require('./util/sessions_api_util');
const SessionsStore = require('./stores/sessions_store');
const SessionsActions = require('./actions/sessions_actions');

const App = React.createClass({

  login: function (e) {
    e.preventDefault();
    hashHistory.push('/login');
  },

  signup: function (e) {
    e.preventDefault();
    hashHistory.push('/signup');
  },


  greeting: function () {
    if (SessionsStore.isUserLoggedIn()) {
      let currentUser = SessionsStore.currentUser();
      return (
        <hgroup>
          <h1 className='welcome-msg'>Welcome {currentUser.user.username}!</h1>
          <button className='logout-button button' onClick={this.handleLogout}>Logout</button>
        </hgroup>
      )
    } else {
      if (this.props.location.pathname !== "/login" && this.props.location.pathname !== "/signup") {
        return(
          <hgroup>
            <button className='login-button button' onClick={this.login} >Login</button>
            <button className='sigup-button button' onClick={this.signup} >Signup</button>
          </hgroup>
        )
      }
    }
  },

  handleLogout: function () {
    let currentUser = SessionsStore.currentUser();
    SessionsActions.logout(currentUser.user.id)
  },

  render () {
    return (
      <div>
        <header className='navBar'>
          <h1 className='title'>BetterReads</h1>
          {this.greeting()}
        </header>
        {this.props.children}
      </div>
    );
  }
});


const appRouter = (
  <Router history={ hashHistory } >
    <Route path='/' component={ App } >
      <Route path='/login' component={ LoginForm } />
      <Route path='/signup' component={ LoginForm } />

    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", function () {
  const root = document.getElementById('main');
  ReactDOM.render(appRouter, root);
});
