import { createContext, useReducer } from "react";

export const PopupContext = createContext(null);

const initialState = {
  loginError: {
    state: false,
    message: "",
  },
  loginPopup: {
    state: false,
  },
  logoutError: {
    state: false,
    message: "",
  },
  profileError: {
    state: false,
    message: "",
  },
  articlesError: {
    state: false,
    message: "",
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_ERROR": return {
        ...state,
        loginError: action.payload
      }      
    case "LOGIN_POPUP": return {
        ...state,
        loginPopup: action.payload
      }
    case "LOGOUT_ERROR": return {
        ...state,
        logoutError: action.payload
      }
    case "PROFILE_ERROR": return {
        ...state,
        profileError: action.payload
      }
    case "ARTICLES_ERROR": return {
        ...state,
        articlesError: action.payload
      }
    default:
      return state;
  }
};

export default function PopupProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    loginError: state.loginError,
    loginPopup: state.loginPopup,
    logoutError: state.logoutError,
    profileError: state.profileError,
    articlesError: state.articlesError,
    setLogoutError: (state, message) => {
      dispatch({ type: "LOGOUT_ERROR", payload: { state, message } });
    },
    setLoginError: (state, message) => {
      dispatch({ type: "LOGIN_ERROR", payload: { state, message } });
    },
    setLoginPopup: (state) => {
      dispatch({ type: "LOGIN_POPUP", payload: { state } });
    },
    setProfileError: (state, message) => {
      dispatch({ type: "PROFILE_ERROR", payload: { state, message } });
    },
    setArticlesError: (state, message) => {
      dispatch({ type: "ARTICLES_ERROR", payload: { state, message } });
    },
  };

  return (
    <PopupContext.Provider value={actions}>
      {children}
    </PopupContext.Provider>
  );
}
