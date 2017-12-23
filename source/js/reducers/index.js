import { combineReducers } from 'redux';
import app from 'reducers/app';

import { createForms } from 'react-redux-form';

const initialUserState = {
  accountName: '',
  accountNumber: '',
  pin: '',
};

export default combineReducers({
  app,
  ...createForms({
    user: initialUserState,
  }),
});
