import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

import { getTheme } from '../../../redux/theme'

const getStyles = theme => StyleSheet.create({
    root: {
        flexDirection: 'row',
    },
    container: {
        alignItems: 'flex-start',
        marginRight: 15
    },
    titleText: {
        fontSize: 15,
        color: theme.textSecondary,
        marginBottom: 5
    },
    valueText: {
        fontSize: 16,
        color: theme.textPrimary
    }
})

const ValueSpreadComponent = props => {
    const {
        values, // [{title, value}]
        ...rest
    } = props

    const styles = getStyles(props.theme)

    return (
        <View style={[props.style, styles.root]}>
            {values.map( ({title, value}) => (
                <View style={styles.container} key={title}>
                    <Text style={styles.titleText}>{title}</Text>
                    <Text style={styles.valueText}>{value}</Text>
                </View>
            ))}
        </View>
    )
}

const mapStateToProps = state => ({
    theme: getTheme(state)
})

export const ValueSpread = connect(mapStateToProps)(ValueSpreadComponent)