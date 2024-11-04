import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { userReducer } from './user'
import { communicationReducer } from './communication'
import { themeReducer } from './theme'
import { dashboardReducer } from './dashboard/reducers'
import { profileReducer } from './profile/reducers'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    communication: communicationReducer,
    user: userReducer,
    theme: themeReducer,
    dashboard: dashboardReducer,
    profile: profileReducer,
})

export default persistReducer(persistConfig, rootReducer)