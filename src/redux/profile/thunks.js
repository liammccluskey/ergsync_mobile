import * as Actions from './actions'
import {api} from '../../networking'

export const fetchProfile = (userID) => async dispatch => {
    dispatch(Actions.setLoadingProfile(true))

    try {
        const user = await api.get('/users/' + userID)
        dispatch(Actions.setProfileUser(userID, user.data))

        const following = await api.get('/follows/user/' + userID + '/summary')
        dispatch(Actions.setProfileFollowing(userID, following.data))

        const clubs = await api.get('/clubmemberships/user/' + userID)
        dispatch(Actions.setProfileClubs(userID, clubs.data))
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(Actions.setLoadingProfile(false))
}