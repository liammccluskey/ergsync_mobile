import React from 'react'
import {connect} from 'react-redux'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'

import { getTheme } from '../../../redux/theme'

const getStyles = (theme, priority, type, customStyle) => StyleSheet.create({
    root: {
        ...customStyle,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: {
            0: 10,
            1: 5
        }[priority],
        backgroundColor: {
            solid: theme.tint,
            tint: theme.bgcLight,
            danger: theme.bgcLight,
        }[type],
        borderColor: {
            solid: theme.tint,
            tint: theme.tint,
            danger: theme.error,
        }[type],
        borderRadius: {
            0: 20,
            1: 15
        }[priority]
    },
    title: {
        fontSize: {
            0: 15,
            1: 12
        }[priority],
        color: {
            solid: theme.bgcLight,
            tint: theme.tint,
            danger: theme.error,
        }[type]
    }
})

export const ButtonComponent = props => {
    const {
        title,
        priority, // 0 : big | 1 : small
        type, // 'solid' | 'tint' | 'danger'

        onPress,

        ...rest
    } = props
    
    const styles = getStyles(props.theme, priority, type, rest.style)

    return (
        <TouchableOpacity
            {...rest}
            onPress={onPress}
            style={styles.root}
        >
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    )
}

const mapStateToProps = state => ({
    theme: getTheme(state)
})

const mapDispatchToProps = {

}

export const Button = connect(mapStateToProps, mapDispatchToProps)(ButtonComponent)