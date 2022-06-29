import { View, StyleSheet, Text } from 'react-native'

const ManageExpense = ({ route }) => {
    const expenseItemName = route.params.itemName

    return (
        <View style={styles.rootContainer}>
            <Text>This is the ManageExpense screen for: </Text>
            <Text style={styles.expenseItemName}>{expenseItemName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    expenseItemName: {
        fontWeight: 'bold',
    },
})
export default ManageExpense
