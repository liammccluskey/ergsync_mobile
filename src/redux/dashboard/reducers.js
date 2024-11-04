import {DashboardActionTypes as Types} from './types'

const DashboardState = {
    loadingActivities: false,
    activities: []
}

export const dashboardReducer = (state = DashboardState, action) => {
    switch (action.type) {
        case Types.SET_LOADING_ACTIVITIES:
            return {
                ...state,
                loadingActivities: action.value
            }
        case Types.SET_ACTIVITIES:
            return {
                ...state,
                activities: action.value
            }
        case Types.ADD_ACTIVITIES:
            return {
                ...state,
                activities: [...state.activities, ...action.value]
            }
        default:
            return state
    }
}
