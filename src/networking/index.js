import axios from 'axios'
import {initializeApp} from "firebase/app"
import {getAuth, setPersistence, browserLocalPersistence} from "firebase/auth"
import {getStorage} from 'firebase/storage'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { getReactNativePersistence } from 'firebase/auth/react-native'

import {
    HEROKU_API_BASE_URL,
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID,
} from '../../env'

// APIs
export const api = axios.create({
    baseURL: HEROKU_API_BASE_URL,
})

export const app = initializeApp({
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID
})

const auth = getAuth(app)
const storage = getStorage(app)

export {auth, storage}