import {api, stringifyQuery} from '../../networking'

import { SubscriptionTiers } from './constants'

// Networking

export const __fetchMongoUserByuid = async uid => {
    try {
        const res = await api.get(`/users/uid/${uid}`)
        return res
    } catch (error) {
        throw(error)
    }
}

export const __fetchMongoUserBy_id = async _id => {
    try {
        const res = await api.get(`/users/_id/${_id}`)
        return res
    } catch (error) {
        throw(error)
    }
}

export const __postMongoUser = async (firebaseUser, referralCode=undefined, isRecruiter) => {
    const {
        displayName,
        email,
        photoURL,
        uid
    } = firebaseUser

    try {
        const res = await api.post('/users', {
            user: {
                displayName,
                email,
                photoURL,
                uid,
                isRecruiter
            },
            referralCode,
        })
        return res
    } catch (error) {
        throw(error)
    }
}

export const __patchMongoUser = async (partialUser, _id) => {
    const field = Object.keys(partialUser)[0]
    try {
        const res = await api.patch(`/users/${_id}/${field}`, partialUser)
        return res
    } catch (error) {
        throw(error)
    }
}

export const __patchMongoUserSettings = async (settingPath, settingValue, userID) => {
    try {
        const res = await api.patch(`/users/settings/${userID}`, {
            path: settingPath,
            value: settingValue
        })
        return res
    } catch (error) {
        throw(error)
    }
}

export const __deleteMongoUser = async (uid, _id) => {
    const query = {
        uid,
        userID: _id
    }
    const queryString = stringifyQuery(query)

    try {
        const res = await api.delete(`/users${queryString}`)
        return res
    } catch (error) {
        throw(error)
    }
}

// Misc

export const isSuperAdmin = user => {
    const {isSuperAdmin, superAdminKey} = user
    return isSuperAdmin && superAdminKey === process.env.REACT_APP_SUPER_ADMIN_KEY
}

export const isAdmin = user => {
    const {adminKey} = user
    return user.isAdmin && adminKey === process.env.REACT_APP_ADMIN_KEY
}