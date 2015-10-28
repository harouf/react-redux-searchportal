import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import * as authActions from 'redux/modules/auth';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';

@connect(
  state => ({user: state.auth.user, loginError: state.auth.loginError}),
  dispatch => bindActionCreators(authActions, dispatch)
)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    loginError: PropTypes.string,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  constructor( props ) {
    super( props );
    this.state = {
      formSubmitted: false
    };
  }

  componentDidMount() {
    // console.log('component did mount');
  }

  componentWillReceiveProps( nextProps ) {
    if (nextProps.loginError) {
      // this.setState( { loginError: nextProps.loginError } );
    }
  }

  static fetchData(getState, dispatch) {
    if (!isAuthLoaded(getState())) {
      return dispatch(loadAuth());
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const input = this.refs.username;
    const pwd = this.refs.password;
    this.props.login(input.value, pwd.value);
    input.value = '';
    pwd.value = '';
    this.setState( { formSubmitted: true } );
  }

  render() {
    const {user, loginError, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <DocumentMeta title="ReactJS Based Search Portal: Login"/>
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form" onSubmit={::this.handleSubmit}>
            <input type="text" ref="username" placeholder="Enter a username"/>
            <input type="password" ref="password" placeholder="Enter password"/>
            <button className="btn btn-success" onClick={::this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
            { this.state.formSubmitted && loginError &&
              <p style={{color: '#f00'}}>
                {loginError}
              </p>
            }
          </form>

        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
