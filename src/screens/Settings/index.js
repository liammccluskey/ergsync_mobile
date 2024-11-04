import React from 'react'
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native'
import {connect} from 'react-redux'

import { ScreenContainer } from '../../containers/ScreenContainer'
import {
    getTheme,
    getThemeColor,
    getTintColor,

    Themes,
    Tints
} from '../../redux/theme'
import {
    patchUserThemeColor,
    patchUserTintColor,
} from '../../redux/user'
import { signOutUser } from '../../redux/user'
import { Button } from '../../components/common/Button'

const getStyles = theme => StyleSheet.create({
    root: {
        flex: 1,
        alignItems: 'stretch'
    },
    sectionContainer: {
        padding: 15,
        alignItems: 'stretch',
        backgroundColor: theme.bgcLight,
        marginTop: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    sectionTitle: {
        fontSize: 20,
        color: theme.textPrimary,
        marginBottom: 15
    },
    subsectionTitle: {
        fontSize: 15,
        color: theme.textPrimary,
        marginbottom: 5,
        textTransform: 'underline',
        marginBottom: 5
    },
    colorOption: {
        fontSize: 15,
        color: theme.textSecondary,
        padding: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    selectedColorOption: {
        fontSize: 15,
        color: theme.tint,
        padding: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: theme.tint,
        paddingTop: 5,
        paddingBottom: 5
    }
})

const SettingsScreenComponent = props => {
    const {
        ...rest
    } = props

    const styles = getStyles(props.theme)

    const onPressLogOut = () => props.signOutUser()

    const onPressTheme = themeKey => props.patchUserThemeColor(themeKey)

    const onPressTint = tintKey => props.patchUserTintColor(tintKey)

    return (
        <ScreenContainer>
            <ScrollView contentContainerStyle={styles.root}>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Appearance</Text>
                    <Text style={styles.subsectionTitle}>Theme</Text>
                    <View style={styles.rowContainer}>
                        {Object.keys(Themes).map( themeKey => (
                            <TouchableOpacity onPress={() => onPressTheme(themeKey)} key={themeKey}>
                                <Text 
                                    style={
                                        themeKey == props.themeColor ?
                                            styles.selectedColorOption
                                            : styles.colorOption}
                                >{Themes[themeKey].name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.subsectionTitle}>Tint color</Text>
                    <View style={styles.rowContainer}>
                        {Object.keys(Tints).map( tintKey => (
                            <TouchableOpacity onPress={() => onPressTint(tintKey)}  key={tintKey}>
                                <Text 
                                    style={
                                        tintKey == props.tintColor ?
                                            styles.selectedColorOption
                                            : styles.colorOption}
                                >{Tints[tintKey].name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <Button
                    title='Log out'
                    onPress={onPressLogOut}
                    priority={0}
                    type='danger'
                    style={{margin: 20}}
                />
            </ScrollView>
        </ScreenContainer>
    )
}

const mapStateToProps = state => ({
    theme: getTheme(state),
    themeColor: getThemeColor(state),
    tintColor: getTintColor(state),
})

const mapDispatchToProps = {
    signOutUser,
    patchUserThemeColor,
    patchUserTintColor,
}

export const SettingsScreen = connect(mapStateToProps, mapDispatchToProps)(SettingsScreenComponent)