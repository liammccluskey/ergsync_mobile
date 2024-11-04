import {ProfileActionTypes as Types} from './types'

const ProfileState = {
    viewingProfile: 'userID',
    loading: false,
    users: {
        userID: {
            user: {
                displayName: '',
                iconURL: null,
                bannerURL: null,
            },
            followers: 0,
            followees: 0,
            clubs: [],
            activities: [],
        }
    }
}

export const profileReducer = (state = ProfileState, action) => {
    switch (action.type) {
        case Types.SET_VIEWING_PROFILE:
            return {
                ...state,
                viewingProfile: action.value
            }
        case Types.SET_LOADING_PROFILE:
            return {
                ...state,
                loading: action.value
            }
        case Types.SET_PROFILE_USER:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.value.userID]: {
                        ...state.users[action.value.userID],
                        user: action.value.data
                    }
                }
            }
        case Types.SET_PROFILE_FOLLOWING:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.value.userID]: {
                        ...state.users[action.value.userID],
                        ...action.value.data
                    }
                }
            }
        case Types.SET_PROFILE_CLUBS:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.value.userID]: {
                        ...state.users[action.value.userID],
                        clubs: action.value.data
                    }
                }
            }
        default:
            return state
    }
}
