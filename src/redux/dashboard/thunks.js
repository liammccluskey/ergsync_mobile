import * as DashboardActions from './actions'
import {api} from '../../networking'
import { stringifyQuery } from '../../networking/utils'
import { PageSizes } from '../../networking/constants'
import { getMongoUser } from '../user'
import { addMessage } from '../communication'
import { getActivities } from './selectors'

export const fetchActivities = (
    page,
    onSuccess = () => {}, 
    onFailure = () => {}
) => async (dispatch, getState) => {
    dispatch(DashboardActions.setLoadingActivities(true))
    const state = getState()
    const mongoUser = getMongoUser(state)
    const activities = getActivities(state)

    const canLoadMore = activities.length % PageSizes.dashboardActivities == 0
    if (!canLoadMore) {
        onSuccess()
        return
    }

    const activitiesPage = page || Math.ceil(activities.length / PageSizes.dashboardActivities) + 1 
    const queryString = stringifyQuery({
        user: mongoUser._id,
        page: activitiesPage,
        pagesize: PageSizes.dashboardActivities
    })

    try {
        const res = await api.get('/feed/dashboard' + queryString)

        if (page > 1) dispatch(DashboardActions.addActivities(res.data))
        else  dispatch(DashboardActions.setActivities(res.data))

        onSuccess()
    } catch (error) {
        const errorMessage = error.response ?
            error.response.data.message
            : error.message
        console.log(errorMessage)
        dispatch(addMessage(errorMessage, true))
    }

    dispatch(DashboardActions.setLoadingActivities(false))
}