import React, {useEffect} from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native'
import {connect} from 'react-redux'

import { ScreenContainer } from '../../containers/ScreenContainer'
import { getTheme } from '../../redux/theme'
import { getMongoUser } from '../../redux/user'
import { 
    getLoadingProfile,
    getProfile
} from '../../redux/profile/selectors'
import { setViewingProfile } from '../../redux/profile/actions' 
import { fetchProfile } from '../../redux/profile/thunks'
import { ValueSpread } from '../../components/common/ValueSpread'
import { Button } from '../../components/common/Button'

const getStyles = theme => StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'stretch'
    },
    bannerImage: {
        width: '100%',
        height: 75
    },
    sectionContainer: {
        padding: 15,
        backgroundColor: theme.bgcLight,
        padding: 15,
        alignItems: 'stretch',
        marginBottom: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    subheader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerImage: {
        height: 50,
        width: 50,
        borderRadius: 25,
        marginRight: 15
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.textPrimary
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: theme.textPrimary
    },
    clubsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    clubContainer: {
        alignItems: 'center',
        padding: 10,
    },
    clubImage: {
        height: 50,
        width: 50,
        borderRadius: 5,
        marginBottom: 5
    },
    clubText: {
        fontSize: 12,
        color: theme.textMain,
    }
})

const BannerURLDefault = 'https://miro.medium.com/max/3600/1*i-PXQ3H7ork5fLqr2dQw6g.png'

const ProfileScreenComponent = props => {
    const {
        navigation,
        route,
        ...rest
    } = props

    const getProfileUserID = () => {
        if (route.params) return route.params.userID
        else return props.mongoUser._id
    }

    const isThisUsersProfile = getProfileUserID() == props.mongoUser._id
    const styles = getStyles(props.theme)

    useEffect(() => {
        const profileUserID = getProfileUserID()

        props.setViewingProfile(profileUserID)
        props.fetchProfile(profileUserID)
    }, [])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            props.fetchProfile(getProfileUserID())
        })
        return unsubscribe
      }, [navigation])

    const onPressFollowers = () => {

    }

    const onPressChangeFollow = () => {

    }

    const onPressEditProfile = () => {

    }

    const onPressClub = clubID => {

    }

    return (
        <ScreenContainer>
            {!props.loadingProfile && props.profile ?
                <ScrollView contentContainerStyle={styles.root}>
                    <Image 
                        style={styles.bannerImage} 
                        source={{uri: props.profile.user.bannerURL || BannerURLDefault}} 
                    />
                    <View style={styles.sectionContainer}>
                        <View style={styles.header}>
                            <Image 
                                style={styles.headerImage}
                                source={{uri: props.profile.user.iconURL}}
                            />
                            <Text style={styles.nameText}>{props.profile.user.displayName}</Text>
                        </View>
                        <View style={styles.subheader}>
                            <TouchableOpacity onPress={onPressFollowers}>
                                <ValueSpread 
                                    values={[
                                        {title: 'Followers', value: props.profile.followers},
                                        {title: 'Following', value: props.profile.followees}
                                    ]}
                                />
                            </TouchableOpacity>
                            {isThisUsersProfile ?
                                <Button
                                    onPress={onPressEditProfile}
                                    title='Edit profile'
                                    priority={1}
                                    type='tint'
                                />
                                : <Button
                                    onPress={onPressChangeFollow}
                                    title={true ? 'Unfollow' : 'follow'}
                                    priority={1}
                                    type='tint'
                                />
                            }
                        </View>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.headerText}>Clubs</Text>
                        <View style={styles.clubsContainer}>
                            {props.profile.clubs ? props.profile.clubs.map( ({name, iconURL, _id}) => (
                                <TouchableOpacity onPress={() => onPressClub(_id)}>
                                    <View style={styles.clubContainer}>
                                        <Image style={styles.clubImage} source={{uri: iconURL}} />
                                        <Text style={styles.clubText}>{name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )) : null}
                        </View>
                    </View>
                </ScrollView>
                : <ActivityIndicator size='large' color={props.theme.tint} style={{marginTop: 20}} />
            }
        </ScreenContainer>
    )
}

const mapStateToProps = state => ({
    theme: getTheme(state),
    mongoUser: getMongoUser(state),
    profile: getProfile(state),
    loadingProfile: getLoadingProfile(state),
})

const mapDispatchToProps = {
    setViewingProfile,
    fetchProfile,
}

export const ProfileScreen = connect(mapStateToProps, mapDispatchToProps)(ProfileScreenComponent)