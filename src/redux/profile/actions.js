import { ProfileActionTypes as Types } from "./types"

export const setViewingProfile = userID => ({
    type: Types.SET_VIEWING_PROFILE,
    value: userID
})

export const setLoadingProfile = (loading) => ({
    type: Types.SET_LOADING_PROFILE,
    value: loading
})

export const setProfileUser = (userID, data) => ({
    type: Types.SET_PROFILE_USER,
    value: {
        userID,
        data
    }
})

export const setProfileFollowing = (userID, data) => ({
    type: Types.SET_PROFILE_FOLLOWING,
    value: {
        userID,
        data
    }
})

export const setProfileClubs = (userID, data) => ({
    type: Types.SET_PROFILE_CLUBS,
    value: {
        userID,
        data
    }
})