import authType from './auth.type';

const initState = {
  loading: false,
  profile: {},
};

function reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case authType.LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case authType.LOGIN:
      return {
        ...state,
        loading: false,
      };
    case authType.PROFILE:
      return {
        ...state,
        loading: false,
        profile: payload.data,
      };
    case authType.LOADING_LOGOUT:
      return {
        ...state,
        loading: !state.loading,
      };
    case authType.LOGOUT:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}

export default reducer;
