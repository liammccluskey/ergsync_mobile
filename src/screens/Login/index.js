import React, {useState, useEffect} from 'react'
import { SafeAreaView, View, Image, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import {connect} from 'react-redux'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'

import {fetchThisMongoUser, postMongoUser} from '../../redux/user'
import { getTheme, setThemeColor, setTintColor } from '../../redux/theme'
import { auth } from '../../networking'
import {getFirebaseErrorMessage} from '../../networking/utils'
import { Button } from '../../components/common/Button'
import { TextInput } from '../../components/common/TextInput'

const getStyles = theme => StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: theme.tint,
    },
    pageContainer: {
        flex: 1,
        alignSelf: 'center',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: theme.tint,
        paddingTop: 50
    },
    header: {
        backgroundColor: theme.bgcLight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: theme.bc,
    },
    headerContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        height: 20,
        width: 20,
        marginRight: 10
    },
    logoText: {
        fontSize: 20
    },
    contentContainer: {
        alignItems: 'stretch'
    },
    formContainer: {
        backgroundColor: theme.bgcLight,
        padding: 20,
        display: 'flex',
        alignItems: 'stretch',
        borderRadius: 20,
        width: 300
    },
    headerText: {
        fontSize: 20,
        marginBottom: 20
    },
    errorText: {
        fontSize: 13,
        marginBottom: 20,
        color: theme.error
    },
    bottomRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    },
    bottomLeftText: {
        fontSize: 15,
        color: 'black'
    },
    bottomRightText: {
        fontSize: 15,
        color: 'white',
        textTransform: 'underline'
    }
})

const LoginScreenComponent = props => {
    const {
        ...rest
    } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [isLogin, setIsLogin] = useState(true)

    useEffect(() => {
        props.setThemeColor(0)
        props.setTintColor(0)
    }, [])

    useEffect(() => {
        setError('')
    }, [email, password, name])

    const styles = getStyles(props.theme)

    const onPressSubmitLogin = async () => {
        if (!email || !password){
            setError('You must submit an email and password to login.')
        } else {
            try {
                await signInWithEmailAndPassword(auth, email, password)
            } catch (error) {
                const errorMessage = getFirebaseErrorMessage(error) || 'The email and password you entered are incorrect.'
                setError(errorMessage)
            }
        }
    }

    const onPressSubmitSignup = async () => {
        if (!email || !name || !password){
            setError('You must submit your email, name, and password to sign up.')
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                if (userCredential) {
                    let {user} = userCredential
                    user = {
                        ...user,
                        displayName: name
                    }
                    props.postMongoUser(
                        user,
                        () => props.fetchThisMongoUser(user, undefined, undefined, true)
                    )
                }
            } catch (error) {
                const errorMessage = getFirebaseErrorMessage(error) || 'Could not register with the information you provided.'
                setError(errorMessage)
            }
        }
    }

    const onPressLogin = () => {
        setIsLogin(true)
        setEmail('liammail100@gmail.com')
        setPassword('password')
        setName('liam mccluskey')
        setError('')
    }

    const onPressSignup = () => {
        setIsLogin(false)
        setEmail('')
        setPassword('')
        setName('')
        setError('')
    }

    return (
        <View style={styles.root}>
            <SafeAreaView style={styles.header}>
                <View style={styles.header}>
                    <View style={styles.headerContentContainer}>
                        <Image source={require('../../assets/logo.png')} style={styles.logo} />
                        <Text style={styles.logoText}>Ergsync</Text>
                    </View>
                </View>
            </SafeAreaView>
            <View style={styles.pageContainer}>
                {isLogin ?
                    <View style={styles.contentContainer}>
                        <View style={styles.formContainer}>
                            <Text style={styles.headerText}>Log in</Text>
                            <TextInput
                                value={email} 
                                onChangeText={setEmail} 
                                placeholder='Email'
                                style={{marginBottom: 10}}
                            />
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={true}
                                placeholder='Password'
                                style={{marginBottom: 20}}
                            />
                            {error ? 
                                <Text style={styles.errorText}>{error}</Text>
                                : null
                            }
                            <Button title='Submit' onPress={onPressSubmitLogin} priority={0} type='solid'/>
                        </View>
                        <View style={styles.bottomRowContainer}>
                            <Text style={styles.bottomLeftText}>Don't have an account?</Text>
                            <TouchableWithoutFeedback onPress={onPressSignup}>
                                <Text style={styles.bottomRightText}>Sign up</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    : <View style={styles.contentContainer}>
                        <View style={styles.formContainer}>
                            <Text style={styles.headerText}>Create an account</Text>
                            <TextInput
                                value={email} 
                                onChangeText={setEmail} 
                                placeholder='Email'
                                style={{marginBottom: 10}}
                            />
                            <TextInput
                                value={name} 
                                onChangeText={setName} 
                                placeholder='Full name'
                                style={{marginBottom: 10}}
                            />
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={true}
                                placeholder='Password'
                                style={{marginBottom: 20}}
                            />
                            {error ? 
                                <Text style={styles.errorText}>{error}</Text>
                                : null
                            }
                            <Button title='Submit' onPress={onPressSubmitSignup} priority={0} type='solid'/>
                        </View>
                        <View style={styles.bottomRowContainer}>
                            <Text style={styles.bottomLeftText}>Already have an account?</Text>
                            <TouchableWithoutFeedback onPress={onPressLogin}>
                                <Text style={styles.bottomRightText}>Login</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                }
            </View>
        </View>
    )
}

const mapStateToProps = state => ({
    theme: getTheme(state),
})

const mapDispatchToProps = {
    fetchThisMongoUser,
    postMongoUser,
    setThemeColor,
    setTintColor
}

export const LoginScreen = connect(mapStateToProps, mapDispatchToProps)(LoginScreenComponent)