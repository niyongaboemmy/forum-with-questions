import { STORE_AUTH, LOGOUT, USER_LOADED, TOOGLE_NAV, ACCOUNT_CATEGORY, USER_ID } from "../actions/types";
import { TOKEN_NAME } from "../utils/api";

const initialState = {
  token: localStorage.getItem(TOKEN_NAME),
  isAuthenticated: false,
  loading: true,
  user: null,
  navOpen: true,
  userCategory: null,
  user_id: null,
};

// registration
export default function auth (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        navOpen: true,
        loading: false,
        userCategory: localStorage.getItem(ACCOUNT_CATEGORY),
        user_id: localStorage.getItem(USER_ID),
        user: payload,
        errors: [],
      };
    case STORE_AUTH:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        navOpen: true,
        user_id: payload.data.user_id !== undefined ? payload.data.user_id : payload.data.admin_id,
        userCategory: state.userCategory,
        ...payload,
      };
    case LOGOUT:
      return {
        ...initialState,
        loading: false,
        token: null,
      };
    case TOOGLE_NAV:
      return {
        ...state,
        navOpen: !state.navOpen,
      };
    case ACCOUNT_CATEGORY:
      return {
        ...state,
        loading: false,
        userCategory: payload,
      };
    default:
      return state;
  }
}