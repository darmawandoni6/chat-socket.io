import httpService from '@helpers/httpService';

import authType from './auth.type';

export default {
  login: (payload) => async (dispatch) => {
    dispatch({ type: authType.LOADING });
    try {
      await httpService.post('/auth/login', payload);
      dispatch({ type: authType.LOGIN });
    } catch (error) {
      dispatch({ type: authType.LOADING });
      return error;
    }
  },
  register: (payload) => async (dispatch) => {
    dispatch({ type: authType.LOADING });
    try {
      await httpService.post('/auth/register', payload);
      dispatch({ type: authType.LOGIN });
    } catch (error) {
      dispatch({ type: authType.LOADING });
      return error;
    }
  },
  profile: () => async (dispatch) => {
    dispatch({ type: authType.LOADING });
    try {
      const res = await httpService.get('/auth');
      dispatch({ type: authType.PROFILE, payload: res.data });
      return { data: res.data };
    } catch (error) {
      dispatch({ type: authType.LOADING });
      return { error };
    }
  },
  logOut: () => async (dispatch) => {
    try {
      dispatch({ type: authType.LOADING_LOGOUT });
      await httpService.post('/auth/log-out');
      dispatch({ type: authType.LOGOUT });
    } catch (error) {
      dispatch({ type: authType.LOADING_LOGOUT });
      return error;
    }
  },
};
