import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { Link } from 'react-router';
import Joi from 'joi';
import login from '../actions/session/login';
import notify from '../actions/notification/notify';
import resetNotifications from '../actions/notification/reset';
import validate from '../actions/form/validate_schema';

import Notification from '../containers/Notification';
import Input from '../components/Input';
import SubmitButton from '../components/SubmitButton';

export const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(128).required(),
});

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='Login'>
          <Notification {...this.props} />
          <div>
            <div className='Login-logo'>
              <img src='/static/images/logo.svg' />
            </div>
            <div className='Login-quote'>
              Collect & disburse money<br />transparently
            </div>
          </div>
          <form
            name='login'
            onSubmit={this.handleSubmit.bind(this)}
            className='Login-form'>
            <Input
              name='email'
              type='email'
              hasError={this.props.error.email}
              placeholder='email@example.com'
              value={this.state.email}
              handleChange={email => this.setState({email})} />
            <Input
              name='password'
              type='password'
              hasError={this.props.error.password}
              placeholder='******'
              value={this.state.password}
              handleChange={password => this.setState({password})} />
            <Link to='/forgot'>Forgot password?</Link>
            <div className='Login-buttonContainter'>
              <SubmitButton>
                Login
              </SubmitButton>
            </div>
          </form>
      </div>
    );
  }

  handleSubmit(event) {
    const {
      pushState,
      notify,
      redirectRoute,
      login,
      validate
    } = this.props;

    const user = this.state;

    event.preventDefault();

    validate(user, schema)
      .then(() => login(user))
      .then(() => {
        console.log("redirectRoute", redirectRoute);
        window.location = redirectRoute;
      })
      .catch(({message}) => notify('error', message));
  }

}

export default connect(mapStateToProps, {
  login,
  pushState,
  notify,
  validate,
  resetNotifications
})(Login);

function mapStateToProps({notification, router, form}) {
  return {
    notification,
    error: form.schema.error,
    redirectRoute: router.location.query.next || '/'
  };
}
