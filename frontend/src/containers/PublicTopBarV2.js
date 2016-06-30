import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';

import logout from '../actions/session/logout';
import decodeJWT from '../actions/session/decode_jwt';

class PublicTopBarV2 extends Component {
  showSession() {
    const {
      session,
      router,
      pushState
    } = this.props;

    const redirect = router.location.pathname;

    if (session && session.isAuthenticated) {
      return (
        <div className='inline-block ml1'>
          <span className="h6">
            <span className='-fw-bold -ttu'></span>
          </span>
          <span className="h6">
            <button onClick={() => window.location('https://app.opencollective.com/')} className='border-none -btn -btn-medium -fw-bold'>OpenCollective App</button>
          </span>
          <span className="h6">
            <button onClick={() => pushState(null, '/subscriptions')} className='border-none -btn -btn-medium -fw-bold'>My Subscriptions</button>
          </span>


          <button onClick={logoutAndUpdate.bind(this)} className='border-none -btn -btn-medium -ff-sec -fw-bold' title={session.user.username || session.user.email}>Logout</button>
        </div>
      );
    }

    return (<a className='ml1 -btn -btn-medium -ttu -ff-sec -fw-bold' href={`/login?next=${redirect}`}>Login</a>);
  }

  render() {
    const { className = '' } = this.props;

    return (
      <div className={`clearfix ${className}`}>
        <div className='left'>
          <svg width='17' height='18' className='-light-blue align-middle mr1'>
            <use xlinkHref='#svg-isotype'/>
          </svg>
          <svg width='172' height='25' className='align-middle xs-hide'>
            <use xlinkHref='#svg-logotype' fill='#fff'/>
          </svg>
        </div>
        <div className='right'>
          <a className='mx1 -btn -btn-outline -btn-small px2 -ttu -ff-sec -fw-bold' href="https://opencollective.com#apply">Start a Collective!</a>
          {this.showSession()}
        </div>
      </div>
    );
  }
}

export function logoutAndUpdate() {
  this.props.logout();
  this.props.decodeJWT();
}

export default connect(mapStateToProps, {
  logout,
  pushState,
  decodeJWT
})(PublicTopBarV2);

export function mapStateToProps({ session, router }) {
  return {
    session,
    router };
}
