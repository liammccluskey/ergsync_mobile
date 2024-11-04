import React from 'react'
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import moment from 'moment'

import { getTheme } from '../../../redux/theme'
import { ValueSpread } from '../../common/ValueSpread/index'

const getStyles = theme => StyleSheet.create({
    root: {
        alignItems: 'stretch',
        padding: 15,
        backgroundColor: theme.bgcLight,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    headerImage: {
        height: 30,
        width: 30,
        marginRight: 10
    },
    headerTextContent: {
        alignItems: 'flex-start'
    },
    nameText: {
        fontSize: 15,
        color: theme.textPrimary,
        fontWeight: 'bold'
    },
    secondaryText: {
        fontSize: 13,
        color: theme.textSecondary,
    },
    activityTitle: {
        fontSize: 20,
        color: theme.textPrimary,
        marginBottom: 10
    },

})

const ActivityCardComponent = props => {
    const {
        name,
        iconURL,
        timestamp,
        sessionTitle,
        activityTitle,
        distanceMeters,
        averagePaceSeconds,
        timeSeconds,
        averageStrokeRate,

        onPress,
        onPressUser,

        ...rest
    } = props

    const styles = getStyles(props.theme)

    const getAveragePace = () => {
        let hours = Math.floor(averagePaceSeconds / 60)
        hours = hours < 10 ? `0${hours}` : hours

        let minutes = Math.floor(averagePaceSeconds % 60)
        minutes = minutes < 10 ? `0${minutes}` : hours

        return `${hours}:${minutes}`
    }

    const getTimeHours = () => {
        return Math.floor(timeSeconds / 3600)
    }

    const getTimeMintues = () => {
        return Math.floor((timeSeconds % 3600) / 60)
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[props.style, styles.root]} onPress={onPress}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onPressUser}>
                        <Image source={{uri: iconURL}} style={styles.headerImage} />
                    </TouchableOpacity>
                    <View style={styles.headerTextContent}>
                        <Text style={styles.nameText}>{name}</Text>
                        <Text style={styles.secondaryText}>{moment(timestamp).format('LL')}</Text>
                        <Text style={styles.secondaryText}>{sessionTitle}</Text>
                    </View>
                </View>
                <Text style={styles.activityTitle}>{activityTitle}</Text>
                <ValueSpread
                    values={[
                        {title: 'meters', value: distanceMeters},
                        {title: 'time', value: `${getTimeHours()}h ${getTimeMintues()}m`},
                        {title: 'ave/500m', value: getAveragePace()},
                        {title: 'spm', value: averageStrokeRate},
                    ]}
                />
            </View>
        </TouchableOpacity>

    )
}

const mapStateToProps = state => ({
    theme: getTheme(state)
})

export const ActivityCard = connect(mapStateToProps)(ActivityCardComponent)