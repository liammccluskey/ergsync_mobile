import {combineReducers} from 'redux-persist'
import {persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { themeReducer } from './theme'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    theme: themeReducer,
})

export default persistReducer(persistConfig, rootReducer)