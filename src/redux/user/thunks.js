import {updateProfile, updateEmail, signOut, deleteUser as deleteFirebaseUser} from 'firebase/auth'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'

import { SubscriptionTiers } from './constants'
import * as UserActions from './actions'
import * as ThemeActions from '../theme'
import * as UserUtils from './utils'
import { getFirebaseUser, getMongoUser } from './selectors'
import {api, auth, storage, getFirebaseErrorMessage} from '../../networking'
import { addMessage } from '../communication'

export const fetchThisMongoUser = (
    firebaseUser=getFirebaseUser(),
    onSuccess = () => {},
    onFailure = () => {},
    isInitialFetch = false
) => async (dispatch) => {
    isInitialFetch && dispatch(UserActions.setLoadingSignIn(true))
    dispatch(UserActions.setLoadingMongoUser(true))
    const {uid} = firebaseUser

    try {
        const res = await UserUtils.__fetchMongoUserByuid(uid)

        if (!res.data) {
            throw Error('No users matched those filters.')
        }

        dispatch(UserActions.setMongoUser(res.data))
        dispatch(ThemeActions.setThemeColor(res.data.themeColor))
        dispatch(ThemeActions.setTintColor(res.data.tintColor))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }

    dispatch(UserActions.setLoadingMongoUser(false))
    isInitialFetch && dispatch(UserActions.setLoadingSignIn(false))
}

export const postMongoUser = (
    firebaseUser,
    onSuccess,
    onFailure
) => async (dispatch, getState) => {
    const state = getState()
    
    try {
        const res = await UserUtils.__postMongoUser(firebaseUser)
        dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

// TODO : unused, consider deleting
export const patchUser = (
    partialUser,
    onSuccess = () => {},
    onFailure = () => {}
) => async (dispatch, getState) => {
    const state = getState()
    const {_id} = getMongoUser(state)
    const firebaseUser = getFirebaseUser()

    try {
        const res = await UserUtils.__patchMongoUser(partialUser, _id)
        dispatch(fetchThisMongoUser(
            firebaseUser,
            () => {
                dispatch(addMessage(res.data.message))
                onSuccess()
            },
            onFailure
        ))
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

export const patchUserDisplayName = (
    displayName,
    onSuccess = () => {},
    onFailure = () => {}
) => async (dispatch, getState) => {
    const state = getState()
    const {_id} = getMongoUser(state)
    const firebaseUser = getFirebaseUser()

    try {
        try {
            await updateProfile(firebaseUser, {displayName})
        } catch (error) {
            const errorMessage = getFirebaseErrorMessage(error)
            throw Error(errorMessage)
        }
        const res = await UserUtils.__patchMongoUser({displayName}, _id)
        dispatch(fetchThisMongoUser(
            firebaseUser,
            () => {
                dispatch(addMessage(res.data.message))
                onSuccess()
            },
            onFailure
        ))
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

export const patchUserPhoto = (
    photoFile,
    onSuccess = () => {},
    onFailure = () => {}
) => async (dispatch, getState) => {
    const state = getState()
    const {_id} = getMongoUser(state)
    const firebaseUser = getFirebaseUser()

    try {
        const storageRef = ref(storage, `/users/${_id}/photo`)
        let photoURL = null
        try {
            await uploadBytes(storageRef, photoFile)
            photoURL = await getDownloadURL(storageRef)
            await updateProfile(firebaseUser, {photoURL})
        } catch (error) {
            const errorMessage = getFirebaseErrorMessage(error)
            throw Error(errorMessage)
        }

        const res = await UserUtils.__patchMongoUser({iconURL: photoURL}, _id)
        dispatch(fetchThisMongoUser(
            firebaseUser,
            () => {
                dispatch(addMessage(res.data.message))
                onSuccess()
            },
            onFailure
        ))
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

export const patchUserThemeColor = (themeColor, onSuccess = () => {}) => async (dispatch, getState) => {
    dispatch(ThemeActions.setThemeColor(themeColor))
    dispatch(patchUserSettings('theme.themeColor', themeColor, onSuccess, undefined, true))
}

export const patchUserTintColor = (tintColor, onSuccess = () => {}) => async (dispatch, getState) => {
    const onPatchSuccess = () => {
        onSuccess()
        dispatch(addMessage('Changes saved.'))
    }
    
    dispatch(ThemeActions.setTintColor(tintColor))
    dispatch(patchUserSettings('theme.tintColor', tintColor, onPatchSuccess, undefined, true))
}

export const signOutUser = onSuccess => async (dispatch, getState) => {
    dispatch(UserActions.setLoadingLogout(true))
    try {
        await signOut(auth)
        dispatch(UserActions.clearUser())
        dispatch(UserActions.setLoadingLogout(false))

        dispatch(ThemeActions.setThemeColor(0))
        dispatch(ThemeActions.setTintColor(0))

        onSuccess()
    } catch (error) {
        dispatch(UserActions.setLoadingLogout(false))
        const errorMessage = getFirebaseErrorMessage(error)
        dispatch(addMessage(errorMessage, true))
        console.log(errorMessage)
    }
}

export const deleteUser = onSuccess => async (dispatch, getState) => {
    const state = getState()
    const {_id} = getMongoUser(state)
    const firebaseUser = getFirebaseUser()

    try {
        try {
            await deleteFirebaseUser(firebaseUser)
        } catch (error) {
            const errorMessage = getFirebaseErrorMessage(error)
            throw Error(errorMessage)
        }
        const res = await UserUtils.__deleteMongoUser(firebaseUser.uid, _id)
        dispatch(addMessage(res.data.message))
        dispatch(signOutUser(onSuccess))
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }
}

export const updateSubscription = (subscriptionTier, onSuccess = () => {}, onFailure = () => {}) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.patch('/membership/update-subscription', {
            userID: mongoUser._id,
            userEmail: mongoUser.email,
            subscriptionTier: SubscriptionTiers[subscriptionTier]
        })

        dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

export const cancelSubscription = (onSuccess, onFailure) => async (dispatch, getState) => {
    const state = getState()
    const mongoUser = getMongoUser(state)

    try {
        const res = await api.patch('/membership/cancel-subscription', {
            userID: mongoUser._id
        })

        dispatch(addMessage(res.data.message))
        onSuccess()
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        onFailure()
    }
}

export const fetchProfileUser = userID => async (dispatch) => {
    dispatch(UserActions.setLoadingProfileUser(true))
    dispatch(UserActions.setProfileUserNotFound(false))

    try {
        const res = await api.get(`/users/_id/${userID}`)

        dispatch(UserActions.setProfileUser(res.data))
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
        dispatch(UserActions.setProfileUserNotFound(true))
    }


    dispatch(UserActions.setLoadingProfileUser(false))
}

export const fetchUserStats = () => async dispatch => {
    dispatch(UserActions.setLoadingUserStats(true))

    try {
        const res = await api.get('/users/stats')

        dispatch(UserActions.setUserStats(res.data))
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(UserActions.setLoadingUserStats(false))
}