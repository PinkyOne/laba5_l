import { combineReducers } from 'redux';
import app from 'reducers/app';

import { createForms } from 'react-redux-form';

const initialUserState = {
  accountName: '',
  accountNumber: '',
  pin: '',
};

const initialCashWithdrawalState = 0;

const initialCashTransferState = 0;

export default combineReducers({
  app,
  ...createForms({
    user: initialUserState,
    cashWithdrawal: initialCashWithdrawalState,
    cashTransfer: initialCashTransferState,
  }),
});
