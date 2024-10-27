import { FirebaseErrors } from "./constants"

export const stringifyQuery = queryParams => {
    return '?' + Object
        .entries(queryParams)
        .map( ([key, value]) => `${key}=${value}`)
        .join('&')
}

export const getFirebaseErrorMessage = error => {
    if (!error.code) {
        return error.message
    }
    const [type, code] = error.code.split('/')
    return FirebaseErrors[type] && FirebaseErrors[type][code] ?
        FirebaseErrors[type][code]
        : code
}

export const getPaginatedDataForCurrentPage = (data, page, pageSize) => {
    return data.slice((page - 1)*pageSize, page*pageSize)
}

//   import axios from 'axios'
//   import moment from 'moment'
//   import {API_BASE_URL} from 'react-native-dotenv'
//   import { getData, postData } from './utils'
  
//   export const api = axios.create({
//       baseURL: API_BASE_URL
//   })
  
//   const routes = {
//       SESSIONS: '/sessions',
//       USERS: '/users',
//       CLUBS: '/clubs',
//       ACTIVITIES: '/activities',
//       FOLLOWS: '/follows',
//       CLUB_MEMBERSHIPS: '/clubmemberships',
//       COMMENTS: '/comments',
//       LIKES: '/likes',
//       FEED: '/feed'
//   }
  
//   // USERS
  
//   /**
//    * Get a user from MongoDB by their firebase uid
//    * @param {string} uidFB 
//    */
//   export const getUserByFirebaseUID = async (uidFB: string) => {
//       const reqURL = `${routes.USERS}/uid/${uidFB}`
//       return await getData(reqURL)
//   }
  
//   // SESSIONS
  
//   export const getSession = async (sessionID: string) => {
//       const reqURL = `${routes.SESSIONS}/${sessionID}`
//       return await getData(reqURL)
//   }
  
//   export const getSessionActivities = async (sessionID: string) => {
//       const reqURL = `${routes.SESSIONS}/${sessionID}/activities`
//       return await getData(reqURL)
//   }
  
//   export const getTodaySessions = async (uid: string) => {
//       const query = {
//           year: moment().year(),
//           month: moment().month(),
//           day: moment().date(),
//           sparse: 0
//       }
//       const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&')
//       const reqURL = `${routes.SESSIONS}/user/${uid}?${queryString}`
  
//       return await getData(reqURL)
//   }
  
//   // CLUBS
  
//   export const getClub = async (clubID: string): Promise<Object> => {
//       const reqURL = `${routes.CLUBS}/${clubID}`
//       return await getData(reqURL)
//   }
  
//   // CLUB MEMBERSHIPS
  
//   export const getClubsForUser = async (userID: string): Promise<Object> => {
//       const reqURL = `${routes.CLUB_MEMBERSHIPS}/user/${userID}`
//       return await getData(reqURL)
//   }
  
//   export const getUsersInClub = async (clubID: string): Promise<Object> => {
//       const reqURL = `${routes.CLUB_MEMBERSHIPS}/club/${clubID}`
//       return await getData(reqURL)
//   }
  
//   export const getClubMembershipForUser = async (clubID: string, userID: string): Promise<Object> => {
//       const reqURL = `${routes.CLUB_MEMBERSHIPS}/ismember`
//       const query = {
//           clubID,
//           userID
//       }
//       return await getData(reqURL, query)
//   }
  