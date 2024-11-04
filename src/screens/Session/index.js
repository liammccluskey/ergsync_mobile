import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {connect} from 'react-redux'

import { ScreenContainer } from '../../containers/ScreenContainer'
import { getTheme } from '../../redux/theme'

const getStyles = theme => StyleSheet.create({
    root: {
        flex: 1
    },
    titleText: {
        fontSize: 15,
        color: theme.textPrimary
    }
})

const SessionScreenComponent = props => {
    const {
        route,
        ...rest
    } = props
    const { sessionID } = route.params

    const styles = getStyles(props.theme)

    return (
        <ScreenContainer>
            <Text style={styles.titleText}>SessionID: {sessionID}</Text>
        </ScreenContainer>
    )
}

const mapStateToProps = state => ({
    theme: getTheme(state)
})

const mapDispatchToProps = {

}

export const SessionScreen = connect(mapStateToProps, mapDispatchToProps)(SessionScreenComponent)