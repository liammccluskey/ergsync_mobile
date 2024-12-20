import React from 'react'
import {SafeAreaView, View} from 'react-native'
import {connect} from 'react-redux'

import { getTheme } from '../../redux/theme'

const getStyles = theme => ({
    root: {
        flex: 1,
        backgroundColor: theme.bgc,
        alignItems: 'stretch'
    }
})

const ScreenContainerComponent = props => {
    const {
        children
    } = props

    const styles = getStyles(props.theme)

    return (
        <SafeAreaView style={styles.root}>
            {children}
        </SafeAreaView>
    )
}

const mapStateToProps = state => ({
    theme: getTheme(state),
})

export const ScreenContainer = connect(mapStateToProps)(ScreenContainerComponent)

