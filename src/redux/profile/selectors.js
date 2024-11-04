import {createSelector} from '@reduxjs/toolkit'

export const getLoadingProfile = state => state.profile.loading
export const getProfile = state => state.profile.users[state.profile.viewingProfile]