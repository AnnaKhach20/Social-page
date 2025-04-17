import { SocialAPI } from "../../Api/api";

// Action Type-ery
export const GET_USERS = 'GET_USERS';
export const IS_FETCHING = 'IS_FETCHING';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const TOTAL_USERS_COUNT = 'TOTAL_USERS_COUNT';

const initState = {
    users: [],
    isFetching: false,
    page: 1,
    totalUsersCount: 0,
    totalUsersPageCount: 100
};

export const usersReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload
            };
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            };
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.payload
            };
        case TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.payload
            };
        default:
            return state;
    }
};

// Action Creator-nery eli menak
export const getUsersAC = (users) => ({type: GET_USERS, payload: users});
export const isFetchingAC = (bool) => ({type: IS_FETCHING, payload: bool});
export const totalUsersCountAC = (totalCount) => ({type: TOTAL_USERS_COUNT, payload: totalCount});
export const changePageAC = (page) => ({type: CHANGE_PAGE, payload: page});

// Thunk-ery
export const getUsersThunk = (page) => {
    return (dispatch) => {
        dispatch(isFetchingAC(true));
        SocialAPI.getUsers(page)
            .then((res) => {
                dispatch(totalUsersCountAC(res.data.totalCount));
                dispatch(getUsersAC(res.data.items));
                dispatch(isFetchingAC(false));
            });
    };
};