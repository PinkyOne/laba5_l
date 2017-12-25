import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { testAction, testAsync } from 'actions/app';
import CircleSvg from '../../../assets/svg/circle.svg';
import SquareSvg from '../../../assets/svg/square.svg';
import TriangleSvg from '../../../assets/svg/triangle.svg';
import bookImg from '../../../assets/img/book2.jpg';
import Form from './components/Form';
import { getBalance, sendWithdrawal, sendCashTransfer } from 'actions/app';

const mapStateToProps = state => {
  const resp = state.app.get('login_response');
  const accountNumber = state.app.get('accountNumber');
  const balanceCheck = state.app.get('balanceCheck');
  const balanceSaving = state.app.get('balanceSaving');
  const balanceError = state.app.get('balanceError');
  const withdrawal = state.app.get('withdrawal');
  const cashTransfer = state.app.get('cashTransfer');

  return {
    balanceCheck,
    balanceSaving,
    balanceError,
    token: resp && resp.token,
    accountNumber,
    withdrawalSuccess: withdrawal && withdrawal.data,
    withdrawalError: withdrawal && withdrawal.error,
    cashTransferSuccess: cashTransfer && cashTransfer.data,
    cashTransferError: cashTransfer && cashTransfer.error,
  };
};

@connect(mapStateToProps)

export default class Dashboard extends Component {
  static propTypes = {
    // from react-redux connect
    dispatch: PropTypes.func,
  }

  constructor() {
    super();
  }

  handleWithdrawalFormSubmit(model, typeBill) {
    const { dispatch, token, accountNumber } = this.props;

    dispatch(sendWithdrawal({ token, accountNumber, typeBill, ...model }));
  }

  handleCashTransferFormSubmit(model) {
    const { dispatch, token, accountNumber } = this.props;

    dispatch(sendCashTransfer({ token, accountNumber, ...model }));
  }

  renderCashWithdrawalForm(typeBill, withdrawalError) {
    return (
      <div
        style={ {
          display: 'flex',
          flexDirection: 'column',
        } }
      >
        <Form
          onSubmit={ model => this.handleWithdrawalFormSubmit(model, typeBill) }
          label={ `Снять наличные с ${ !typeBill ? 'чекового' : 'сберегательного' } счета` }
          submitText='Снять'
          model={ `cashWithdrawal${ typeBill ? 'Check' : 'Save' }` }
          disabled={ !!withdrawalError }
        />
        <div>{withdrawalError}</div>
      </div>
    );
  }

  renderCashTransferForm(cashTransferError) {
    return (
      <div
        style={ {
          display: 'flex',
          flexDirection: 'column',
        } }
      >
        <Form
          onSubmit={ model => this.handleCashTransferFormSubmit(model) }
          label='Перевести на сберегательный счет'
          submitText='Перевести'
          model='cashTransfer'
        />
        <div>{cashTransferError}</div>
      </div>
    );
  }

  renderBalance() {
    // или где он будет храниться
    // const balance = this.getBalance()
    const { balanceCheck = 0, balanceSaving } = this.props;
    return (
      <div>
        <hr />
        <span>Ваш чековый баланс: </span>
        <span>{balanceCheck}</span><br />
        {balanceSaving && <span>Ваш сберегательный баланс: </span>}
        {balanceSaving && <span>{balanceSaving}</span>}
      </div>
    );
  }

  render() {
    const {
      withdrawalError,
      cashTransferError,
      balanceCheck = 0,
      balanceSaving ,
    } = this.props;

    return (
      <section>
        <h1>Терминал</h1>
        {balanceCheck && this.renderCashWithdrawalForm(0, withdrawalError)}
        {balanceSaving && this.renderCashWithdrawalForm(1, withdrawalError)}
        {balanceSaving && this.renderCashTransferForm(cashTransferError)}
        {this.renderBalance()}
      </section>
    );
  }
}
