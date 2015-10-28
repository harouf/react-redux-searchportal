import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';
import * as authActions from 'redux/modules/auth';

@connect(
    state => ({user: state.auth.user}),
    dispatch => bindActionCreators(authActions, dispatch)
)
export default
class LoginSuccess extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func
  }

  static fetchData(getState, dispatch) {
    if (!isAuthLoaded(getState())) {
      return dispatch(loadAuth());
    }
  }

  render() {
    const {user, logout} = this.props;
    return (user &&
      <div className="container">
        <h1>Login Success</h1>

        <div>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
      </div>
    );
  }
}
