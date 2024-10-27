import React from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import {connect} from 'react-redux'

import { ScreenContainer } from '../../containers/ScreenContainer'
import { getTheme } from '../../redux/theme'
import { signOutUser } from '../../redux/user'
import { Button } from '../../components/common/Button'

const getStyles = theme => StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'stretch',
        padding: 20,
    },
})

const SettingsScreenComponent = props => {
    const {
        ...rest
    } = props

    const styles = getStyles(props.theme)

    const onPressLogOut = () => props.signOutUser()

    return (
        <ScreenContainer>
            <ScrollView contentContainerStyle={styles.root}>
                <Button
                    title='Log out'
                    onPress={onPressLogOut}
                    priority={0}
                    type='danger'
                />
            </ScrollView>
        </ScreenContainer>
    )
}

const mapStateToProps = state => ({
    theme: getTheme(state)
})

const mapDispatchToProps = {
    signOutUser
}

export const SettingsScreen = connect(mapStateToProps, mapDispatchToProps)(SettingsScreenComponent)