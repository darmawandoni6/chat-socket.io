import httpService from '@helpers/httpService';

import messageType from './message.type';

export default {
  listRoom: () => async (dispatch) => {
    dispatch({ type: messageType.LOADING });
    try {
      const res = await httpService.get('/room');
      dispatch({ type: messageType.ROOM, payload: res.data });
    } catch (error) {
      dispatch({ type: messageType.LOADING });
    }
  },
  listMessage: (id) => async (dispatch) => {
    dispatch({ type: messageType.LOADING_LIST_MESSAGE });
    try {
      const res = await httpService.get(`/message/${id}`);
      dispatch({ type: messageType.LIST_MESSAGE, payload: res.data });
      return { data: res.data };
    } catch (error) {
      dispatch({ type: messageType.LOADING_LIST_MESSAGE });
      return { error };
    }
  },
  sendMessage: (payload) => async () => {
    try {
      await httpService.post('/send', payload);
    } catch (error) {
      return { error };
    }
  },
  listUser: (params) => async (dispatch) => {
    dispatch({ type: messageType.LOADING_SEARCH_USER });
    try {
      const res = await httpService.get('/users/q', { params });
      dispatch({ type: messageType.USERS_FIND, payload: res.data });
    } catch (error) {
      dispatch({ type: messageType.LOADING_SEARCH_USER });
      return error;
    }
  },
  createRoom: (data) => async () => {
    try {
      const res = await httpService.post('/room', data);
      return { data: res.data.data };
    } catch (error) {
      return { error };
    }
  },
  selectRoom: (data, idx) => (dispatch) =>
    dispatch({ type: messageType.SELECT_ROOM, payload: data, idx }),

  appendMessage: (data) => (dispatch) =>
    dispatch({ type: messageType.APPEND_MESSAGE, payload: data }),

  receiveMessage: (data) => (dispatch) =>
    dispatch({ type: messageType.RECEIVE_MESSAGE, payload: data }),

  onlineRoom: (data) => (dispatch) => dispatch({ type: messageType.ONLINE_ROOM, payload: data }),

  notifMessage: (data) => (dispatch) =>
    dispatch({ type: messageType.NOTIF_MESSAGE, payload: data }),
};
