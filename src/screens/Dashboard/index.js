import React from 'react'
import { 
    View, 
    Text,
    StyleSheet,
 } from 'react-native'
import {connect} from 'react-redux'

import { ScreenContainer } from '../../containers/ScreenContainer'
import { getTheme } from '../../redux/theme'

const getStyles = theme => StyleSheet.create({
    root: {},
})

const DashboardScreenComponent = props => {
    const {
        ...rest
    } = props

    const styles = getStyles(props.theme)

    return (
        <ScreenContainer>
            <View style={styles.root}>
                <Text>Dashboard</Text>
            </View>
        </ScreenContainer>
    )
}

const mapStateToProps = state => ({
    theme: getTheme(state)
})

const mapDispatchToProps = {

}

export const DashboardScreen = connect(mapStateToProps, mapDispatchToProps)(DashboardScreenComponent)