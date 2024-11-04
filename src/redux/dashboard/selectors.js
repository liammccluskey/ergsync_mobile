import {createSelector} from '@reduxjs/toolkit'

export const getActivities = state => state.dashboard.activities
export const getLoadingActivities = state => state.dashboard.loadingActivities