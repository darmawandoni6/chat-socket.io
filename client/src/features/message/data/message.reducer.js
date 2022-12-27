import messages from '@helpers/messages';

import messageType from './message.type';

const initState = {
  loading: false,
  listRoom: null,
  selectRoom: {},
  message: {
    loading: false,
    data: [],
  },
  users: {
    loading: false,
    data: null,
  },
};

function reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case messageType.LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case messageType.ROOM:
      return {
        ...state,
        loading: false,
        listRoom: payload.data || [],
      };

    case messageType.SELECT_ROOM:
      return {
        ...state,
        selectRoom: payload || {},
      };
    case messageType.LOADING_LIST_MESSAGE:
      return {
        ...state,
        message: {
          ...state.message,
          loading: !state.message.loading,
        },
      };
    case messageType.LIST_MESSAGE:
      return {
        ...state,
        message: {
          ...state.message,
          loading: false,
          data: messages.handleListMessages(payload.data),
        },
      };
    case messageType.LOADING_SEARCH_USER:
      return {
        ...state,
        users: {
          ...state.users,
          loading: !state.users.loading,
        },
      };

    case messageType.USERS_FIND:
      return {
        ...state,
        users: {
          ...state.users,
          loading: false,
          data: payload.data,
        },
      };
    case messageType.APPEND_MESSAGE:
      return {
        ...state,
        message: {
          ...state.message,
          data: messages.handleSendMessage(state.message.data, payload),
        },
      };
    case messageType.RECEIVE_MESSAGE:
      return {
        ...state,
        message: {
          ...state.message,
          data: messages.handleReceiveMessages(state.message.data, payload),
        },
        // listRoom: messages.handleLastMessage(state.listRoom, payload),
      };
    case messageType.ONLINE_ROOM:
      return {
        ...state,
        listRoom: messages.handleOnlineRoom(state.listRoom || [], payload),
      };
    case messageType.NOTIF_MESSAGE:
      return {
        ...state,
        listRoom: messages.handleNotifMessage(state.listRoom || [], payload),
      };
    default:
      return state;
  }
}

export default reducer;
