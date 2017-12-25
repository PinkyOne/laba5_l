import React from 'react';
import { Control, Form, actions } from 'react-redux-form';
import { login } from 'actions/app';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getBalance } from '../../actions/app';

const mapStateToProps = state => {
  const resp = state.app.get('login_response');
  const accountNumber = state.app.get('accountNumber');
  return {
    success: resp && resp.token,
    token: resp && resp.token,
    accountNumber: accountNumber,
    error: resp && resp.error,
  };
};

class Login extends React.Component {
  handleSubmit(user) {
    const { dispatch } = this.props;

    dispatch(login(user));
  }

  render() {
    if (this.props.success) {
      const { token, accountNumber } = this.props;
      const data = token && accountNumber && { token, accountNumber };
      this.props.dispatch(getBalance(data));
      return (
        <Redirect to='/' />
      );
    }
    return (
      <Form
        model='user'
        onSubmit={ (user) => this.handleSubmit(user) }
        style={ {
          display: 'flex',
          flexDirection: 'column',
        } }
      >
        <label htmlFor='user.accountName'>Имя пользователя:</label>
        <Control.text model='user.accountName' id='user.accountName' />

        <label htmlFor='user.accountNumber'>Номер счета:</label>
        <Control.text model='user.accountNumber' id='user.accountNumber' />

        <label htmlFor='user.pin'>PIN:</label>
        <Control.text model='user.pin' id='user.pin' />

        <button type='submit'>
          Войти!
        </button>
        <div>{this.props.error}</div>
      </Form>
    );
  }
}

export default connect(mapStateToProps)(Login);
