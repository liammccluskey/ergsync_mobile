import React, {useState, useEffect, useCallback} from 'react'
import { 
    View, 
    Text,
    StyleSheet,
    FlatList,
    RefreshControl
 } from 'react-native'
import {connect} from 'react-redux'
import moment from 'moment'

import { ScreenContainer } from '../../containers/ScreenContainer'
import { getTheme } from '../../redux/theme'
import { 
    getActivities,
    getLoadingActivities,
} from '../../redux/dashboard/selectors'
import { fetchActivities } from '../../redux/dashboard/thunks'
import { ActivityCard } from '../../components/dashboard/ActivityCard'

const getStyles = theme => StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'stretch',
    },
    headerText: {
        fontSize: 20,
        padding: 15,
        color: theme.textPrimary
    }
})

const DashboardScreenComponent = props => {
    const {
        navigation,
        ...rest
    } = props
    const [refreshing, setRefreshing] = useState(false)
    const [activitiesPage, setActivitiesPage] = useState(1)

    useEffect(() => {
        props.fetchActivities(activitiesPage)
    }, [])

    const styles = getStyles(props.theme)

    const onRefreshActivities = () => {
        const stopRefreshing = () => setRefreshing(false)
        setRefreshing(true)
        props.fetchActivities(1, stopRefreshing, stopRefreshing)
    }

    const loadMoreActivities = () => {
        props.fetchActivities()
    }

    const onPressActivityCard = sessionID => {
        navigation.navigate('Session', {sessionID})
    }

    const onPressUser = userID => {
        navigation.navigate('Profile', {userID})
    }

    return (
        <ScreenContainer>
            <View style={styles.root}>
                <Text style={styles.headerText}>Activity Feed</Text>
                <FlatList
                    data={props.activities}
                    keyExtractor={item => item._id}
                    renderItem={({item}) => (
                        <ActivityCard
                            name={item.user.displayName}
                            iconURL={item.user.iconURL}
                            timestamp={item.createdAt}
                            sessionTitle={item.session.title}
                            activityTitle={item.session.workoutItems[item.workoutItemIndex]}
                            distanceMeters={Math.ceil(item.distance)}
                            averagePaceSeconds={item.averagePace}
                            averageStrokeRate={item.avgStrokeRate}
                            timeSeconds={item.elapsedTime}
                            onPress={() => onPressActivityCard(item.session._id)}
                            onPressUser={() => onPressUser(item.user._id)}
                            style={{marginBottom: 20}}
                        />
                    )}
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={onRefreshActivities} 
                            tintColor={props.theme.tint}
                        />
                    }
                    onEndReached={loadMoreActivities}
                    onEndReachedThreshold={0}
                />
            </View>
        </ScreenContainer>
    )
}

const mapStateToProps = state => ({
    theme: getTheme(state),
    loadingActivities: getLoadingActivities(state),
    activities: getActivities(state)
})

const mapDispatchToProps = {
    fetchActivities
}

export const DashboardScreen = connect(mapStateToProps, mapDispatchToProps)(DashboardScreenComponent)