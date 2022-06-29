import { useLayoutEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'

const ManageExpense = ({ route, navigation }) => {
    const expenseItemName = route.params?.itemName
    const isAdding = !expenseItemName

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isAdding ? 'Add new Expense' : expenseItemName,
        })
    }, [isAdding, navigation])

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
