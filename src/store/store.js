import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from 'redux-thunk';
import { authReducer } from "./reducers/authReducer";
import { profileReducer } from "./reducers/profileReducer";
import { usersReducer } from "./reducers/usersReducer";

const rootReducer = combineReducers({
    usersPage: usersReducer,
    profilePage: profileReducer,
    auth: authReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

window.store = store;