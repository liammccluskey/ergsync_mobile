import axios from 'axios'
import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import {getStorage} from 'firebase/storage'

// APIs
export const api = axios.create({
    baseURL: process.env.HEROKU_API_BASE_URL,
})

export const app = initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_PP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
})

export const auth = getAuth(app)
export const storage = getStorage(app)