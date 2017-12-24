import React from 'react';
import { Control, Form, actions } from 'react-redux-form';
import { login } from 'actions/app';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const mapStateToProps = state => {
  const resp = state.app.get('login_response');
  return {
    success: resp && resp.token,
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
