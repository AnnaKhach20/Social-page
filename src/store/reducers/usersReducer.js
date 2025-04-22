import { SocialAPI } from "../../Api/api";

// Action Type-ery
export const GET_USERS = 'GET_USERS';
export const IS_FETCHING = 'IS_FETCHING';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const TOTAL_USERS_COUNT = 'TOTAL_USERS_COUNT';
export const SEARCH_USERS = 'SEARCH_USERS';

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

        case SEARCH_USERS:
            return {
                ...state,
                filteredUsers: action.payload
            }
        default:
            return state;
    }
};

// Action Creator-nery eli menak
export const getUsersAC = (users) => ({type: GET_USERS, payload: users});
export const isFetchingAC = (bool) => ({type: IS_FETCHING, payload: bool});
export const totalUsersCountAC = (totalCount) => ({type: TOTAL_USERS_COUNT, payload: totalCount});
export const changePageAC = (page) => ({type: CHANGE_PAGE, payload: page});
export const searchUsersAC = (users) => ({type: SEARCH_USERS, payload: users});

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

export const searchUsersThunk = (query) => {
    return (dispatch, getState) => {
      const { users } = getState().usersPage;
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      dispatch(searchUsersAC(filtered));
    };
  };