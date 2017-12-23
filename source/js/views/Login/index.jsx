import React from 'react';
import { Control, Form, actions } from 'react-redux-form';

class Login extends React.Component {
  handleSubmit(user) {
    // Do whatever you like in here.
    // If you connect the UserForm to the Redux store,
    // you can dispatch actions such as:
    // dispatch(actions.submit('user', somePromise));
    // etc.
  }
  render() {
    return (
      <Form
        model='user'
        onSubmit={ (user) => this.handleSubmit(user) }
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
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
      </Form>
    );
  }
}

export default Login;
