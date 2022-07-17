import { View, StyleSheet, Text, TextInput } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

const Input = ({ label, textInputConfig, style, isInvalid }) => {
    const inputStyles = [styles.textInput]

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }

    if (isInvalid) {
        inputStyles.push(styles.invalidTextInput)
    }

    return (
        <View style={[styles.rootContainer, style]}>
            <Text
                style={[styles.labelText, isInvalid && styles.invalidLabelText]}
            >
                {label}
            </Text>
            <TextInput {...textInputConfig} style={inputStyles} />
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    labelText: {
        marginRight: 4,
        fontSize: 12,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary400,
    },
    textInput: {
        backgroundColor: GlobalStyles.colors.primary400,
        color: 'white',
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top', // required for same behavior in both platforms
    },
    invalidLabelText: {
        color: 'red',
    },
    invalidTextInput: {
        backgroundColor: 'pink',
    },
})

export default Input
