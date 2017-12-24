import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { testAction, testAsync } from 'actions/app';
import CircleSvg from '../../../assets/svg/circle.svg';
import SquareSvg from '../../../assets/svg/square.svg';
import TriangleSvg from '../../../assets/svg/triangle.svg';
import bookImg from '../../../assets/img/book2.jpg';
import Form from './components/Form';

@connect(state => ({
  asyncData: state.app.get('asyncData'),
  asyncError: state.app.get('asyncError'),
  asyncLoading: state.app.get('asyncLoading'),
  counter: state.app.get('counter'),
}))

export default class Dashboard extends Component {
  static propTypes = {
    asyncData: PropTypes.object,
    asyncError: PropTypes.string,
    asyncLoading: PropTypes.bool,
    counter: PropTypes.number,
    // from react-redux connect
    dispatch: PropTypes.func,
  }

  constructor() {
    super();
  }

  handleWithdrawalFormSubit(model) {
    // side effect
    console.log('Submit!');
  }

  handleCashTransferFormSubit(model) {
    // side effect
    console.log('Submit!');
  }

  renderCashWithdrawalForm() {
    return (
      <Form
        onSubmit={ model => this.handleWithdrawalFormSubit(model) }
        label='Снять наличные'
        submitText='Снять'
        model='cashWithdrawal'
      />
    );
  }

  renderCashTransferForm() {
    return (
      <Form
        onSubmit={ model => this.handleCashTransferFormSubit(model) }
        label='Перевести на сберегательный счет'
        submitText='Перевести'
        model='cashTransfer'
      />
    );
  }

  renderBalance() {
    // или где он будет храниться
    // const balance = this.getBalance()
    const { balance = 0 } = this.props;
    return (
      <div>
        <hr />
        <span>Ваш баланс: </span>
        <span>{balance}</span>
      </div>
    );
  }

  render() {
    const {
      asyncData,
      asyncError,
      asyncLoading,
      counter,
    } = this.props;

    return (
      <section>
        <h1>Терминал</h1>
        {this.renderCashWithdrawalForm()}
        {this.renderCashTransferForm()}
        {this.renderBalance()}
      </section>
    );
  }
}
