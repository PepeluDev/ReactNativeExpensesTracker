import { View, StyleSheet, Text } from 'react-native'

const ExpensesScreen = () => {
    return (
        <View style={styles.rootContainer}>
            <Text>This is the expenses screen.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default ExpensesScreen
