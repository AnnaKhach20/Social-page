import { SocialAPI } from "../../Api/api";

// Action Type-ery menak
export const SET_LOGIN = "SET_LOGIN";
export const SET_LOGOUT = "SET_LOGOUT";

const initState = {
  userId: null,
  email: null,
  isAuth: false,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOGIN:
      return {
        ...state,
        userId: action.payload.userId,
        email: action.payload.email,
        isAuth: true,
      };
    case SET_LOGOUT:
      return {
        ...state,
        userId: null,
        email: null,
        isAuth: false,
      };
    default:
      return state;
  }
};

// Action Creatorner
export const setLoginAC = (userId, email) => ({
  type: SET_LOGIN,
  payload: { userId, email },
});
export const setLogoutAC = () => ({ type: SET_LOGOUT });

// Thunk-ery
export const setLoginThunk = (email, password, rememberMe = false) => {
  return (dispatch) => {
    SocialAPI.setLogin(email, password).then((res) => {
      dispatch(setLoginAC(res.data.data.userId, email));
      if (rememberMe) {
        localStorage.setItem(
          "authData",
          JSON.stringify({
            userId: res.data.data.userId,
            email,
          })
        );
      }
    });
  };
};

export const checkAuth = () => {
  return (dispatch) => {
    const data = JSON.parse(localStorage.getItem("authData"));
    if (data && data.userId) {
      dispatch(setLoginAC(data.userId, data.email));
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("authData");
    dispatch(setLogoutAC());
  };
};
