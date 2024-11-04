import { DashboardActionTypes as Types } from "./types"

export const setActivities = data => ({
    type: Types.SET_ACTIVITIES,
    value: data
})

export const setLoadingActivities = loading => ({
    type: Types.SET_LOADING_ACTIVITIES,
    value: loading
})

export const addActivities = data => ({
    type: Types.ADD_ACTIVITIES,
    value: data
})