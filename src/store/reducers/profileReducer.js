import { SocialAPI } from "../../Api/api";

export const GET_PROFILE = 'GET_PROFILE';

const initState = {
    profile: {}
};

export const profileReducer = (state = initState, action) => {
    switch(action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            };
        default:
            return state;
    }
};

export const getProfileAC = (data) => ({type: GET_PROFILE, payload: data});

export const getProfileThunk = (userId) => {
    return (dispatch) => {
        SocialAPI.getProfile(userId)
            .then((res) => dispatch(getProfileAC(res.data)));
    };
};