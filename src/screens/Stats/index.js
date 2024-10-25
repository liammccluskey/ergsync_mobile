import React from 'react'
import { View, StyleSheet } from 'react-native'
import {connect} from 'react-redux'

import { ScreenContainer } from '../../containers/ScreenContainer'
import { getTheme } from '../../redux/theme'

const getStyles = theme => StyleSheet.create({
    root: {},
})

const StatsScreenComponent = props => {
    const {
        ...rest
    } = props

    const styles = getStyles(props.theme)

    return (
        <ScreenContainer>

        </ScreenContainer>
    )
}

const mapStateToProps = state => ({
    theme: getTheme(state)
})

const mapDispatchToProps = {

}

export const StatsScreen = connect(mapStateToProps, mapDispatchToProps)(StatsScreenComponent)