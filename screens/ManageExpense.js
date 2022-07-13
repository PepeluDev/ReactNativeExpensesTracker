import { useLayoutEffect, useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Button from '../components/ui/Button'
import IconButton from '../components/ui/IconButton'

import { ExpensesContext } from '../store/context/expenses-context'

const ManageExpense = ({ route, navigation }) => {
    const expensesCtx = useContext(ExpensesContext)

    const expenseItemName = route.params?.itemName
    const expenseItemId = route.params?.itemId

    const isAdding = !expenseItemName && !expenseItemId

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isAdding ? 'Add new Expense' : expenseItemName,
        })
    }, [isAdding, navigation])

    function deleteExpenseHandler() {
        expensesCtx.removeExpense(expenseItemId)
        navigation.goBack()
    }

    function cancelHandler() {
        navigation.goBack()
    }

    function confirmHandler() {
        navigation.goBack()
    }

    function editExpenseHandler() {}

    if (!isAdding) {
        return (
            <View style={styles.rootContainer}>
                <View style={styles.buttonView}>
                    <Button
                        mode="flat"
                        onPress={cancelHandler}
                        style={styles.button}
                    >
                        Cancel
                    </Button>
                    <Button onPress={confirmHandler} style={styles.button}>
                        {isAdding ? 'Add' : 'Update'}
                    </Button>
                </View>
                <View style={styles.buttonContainer}>
                    <IconButton
                        iconName="trash"
                        onPress={deleteExpenseHandler}
                        color="red"
                        size={50}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.rootContainer}>
            <Text>Adding new Expense</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignContent: 'center',
    },
    buttonView: {
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    textDescription: {
        fontSize: 20,
    },
    expenseItemName: {
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 20,
        marginHorizontal: 20,
        paddingTop: 10,
        borderTopWidth: 2,
        borderTopColor: 'grey',
        alignItems: 'center',

        paddingHorizontal: 60,
    },
})
export default ManageExpense
