import auth from '@features/auth/data/auth.reducer';
import message from '@features/message/data/message.reducer';
import { combineReducers } from 'redux';

// COMBINED REDUCERS
const reducers = {
  auth,
  message,
};

export default combineReducers(reducers);
