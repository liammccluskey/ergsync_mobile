import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { userReducer } from './user'
import { communicationReducer } from './communication'
import { themeReducer } from './theme'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    communication: communicationReducer,
    user: userReducer,
    theme: themeReducer,
})

export default persistReducer(persistConfig, rootReducer)