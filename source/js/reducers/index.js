import { combineReducers } from 'redux';
import app from 'reducers/app';

import { createForms } from 'react-redux-form';

const initialUserState = {
  accountName: '',
  accountNumber: '',
  pin: '',
};
const initialCashTransferState = {
  amount: '',
};
const initialCashWithdrawalState = {
  amount: '',
};

export default combineReducers({
  app,
  ...createForms({
    user: initialUserState,
    cashTransfer: initialCashTransferState,
    cashWithdrawalCheck: initialCashWithdrawalState,
    cashWithdrawalSave: initialCashWithdrawalState,
  }),
});
