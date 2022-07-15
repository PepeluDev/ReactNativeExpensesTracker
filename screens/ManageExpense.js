import { useLayoutEffect, useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ExpenseForm from '../components/manageExpenses/ExpenseForm'
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

    return (
        <View style={styles.rootContainer}>
            <View style={styles.expenseFormView}>
                <ExpenseForm
                    onCancel={cancelHandler}
                    submitButtonLabel={isAdding ? 'Add' : 'Update'}
                />
            </View>
            {!isAdding && (
                <View style={styles.buttonContainer}>
                    <IconButton
                        iconName="trash"
                        onPress={deleteExpenseHandler}
                        color="red"
                        size={50}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignContent: 'center',
    },
    expenseFormView: {
        paddingHorizontal: 16,
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
