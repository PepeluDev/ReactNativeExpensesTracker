import { View, StyleSheet, Text } from 'react-native'

const ManageExpense = () => {
    return (
        <View style={styles.rootContainer}>
            <Text>This is the ManageExpense screen.</Text>
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
export default ManageExpense
