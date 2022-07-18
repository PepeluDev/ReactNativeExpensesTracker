import { View, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import Button from './Button'

const ErrorOverlay = ({ message, onConfirm }) => {
    return (
        <View style={styles.rootContainer}>
            <Text style={[styles.text, styles.title]}>An error ocurred!</Text>
            <Text style={[styles.text, styles.message]}>{message}</Text>
            <Button onPress={onConfirm}>OK</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary500,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    message: {
        fontSize: 14,
    },
})

export default ErrorOverlay
