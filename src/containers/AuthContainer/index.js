import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {onAuthStateChanged} from 'firebase/auth'
import { NavigationContainer } from '@react-navigation/native'
import {Text} from 'react-native'

import { auth } from '../../networking'
import { LoggedInNavigator, LoggedOutNavigator } from '../../navigation/AppNavigator'
import { 
    getFirebaseUser,
    getMongoUser,

    fetchThisMongoUser, 
    clearUser,
} from '../../redux/user'

const AuthContainerComponent = props => {
    const {
        children
    } = props

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
            if (firebaseUser) {
                props.fetchThisMongoUser(
                    firebaseUser,
                    undefined,
                    undefined,
                    true
                )
            }
        })

        return unsubscribe
    }, [])

    return (
        <NavigationContainer>
            <Text>Root screen</Text>
            {props.firebaseUser && props.mongoUser ? 
                <LoggedInNavigator />
                : <LoggedOutNavigator />
            }
        </NavigationContainer>
    )
}

const mapStateToProps = state => ({
    firebaseUser: getFirebaseUser(),
    mongoUser: getMongoUser(state),
})

const mapDispatchToProps = {
    fetchThisMongoUser,
    clearUser
}

export const AuthContainer = connect(mapStateToProps, mapDispatchToProps)(AuthContainerComponent)
