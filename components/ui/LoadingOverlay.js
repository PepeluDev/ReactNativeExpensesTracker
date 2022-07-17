import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { GlobalStyles } from '../../constants/styles'

const LoadingOverlay = () => {
    return (
        <View style={styles.rootContainer}>
            <ActivityIndicator size="large" color="white" />
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
})

export default LoadingOverlay
