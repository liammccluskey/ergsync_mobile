import React from 'react'
import {connect} from 'react-redux'
import {TextInput as RNTextInput, StyleSheet} from 'react-native'

import { getTheme } from '../../../redux/theme'

const getStyles = (theme, customStyle) => StyleSheet.create({
    root: {
        ...customStyle,
        padding: 10,
        borderRadius: 10,
        fontSize: 15,
        backgroundColor: theme.bgcInput
    },
})

export const TextInputComponent = props => {
    const {
        ...rest
    } = props
    
    const styles = getStyles(props.theme, rest.style)

    return (
        <RNTextInput {...rest} style={styles.root} />
    )
}

const mapStateToProps = state => ({
    theme: getTheme(state)
})

const mapDispatchToProps = {

}

export const TextInput = connect(mapStateToProps, mapDispatchToProps)(TextInputComponent)