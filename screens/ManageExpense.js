import { useLayoutEffect, useContext, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import ExpenseForm from '../components/manageExpenses/ExpenseForm'
import IconButton from '../components/ui/IconButton'

import { ExpensesContext } from '../store/context/expenses-context'
import { deleteExpense, storeExpense, updateExpense } from '../util/http'
import LoadingOverlay from '../components/ui/LoadingOverlay'

const ManageExpense = ({ route, navigation }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const expensesCtx = useContext(ExpensesContext)

    const expenseItemName = route.params?.description
    const expenseItemId = route.params?.itemId

    const isAdding = !expenseItemName && !expenseItemId

    const selectedExpense = !isAdding
        ? expensesCtx.expenses.find((expense) => expense.id === expenseItemId)
        : {}

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isAdding ? 'Add new Expense' : expenseItemName,
        })
    }, [isAdding, navigation])

    async function deleteExpenseHandler() {
        setIsSubmitting(true)
        await deleteExpense(expenseItemId)
        // setIsSubmitting(false) no need because we close the screen
        expensesCtx.removeExpense(expenseItemId)
        navigation.goBack()
    }

    function cancelHandler() {
        navigation.goBack()
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true)
        const id = await storeExpense(expenseData)
        expensesCtx.addExpense({ id: id, ...expenseData })
        navigation.goBack()
    }

    async function editExpenseHandler(expenseData) {
        setIsSubmitting(true)
        await updateExpense(expenseItemId, expenseData)
        expensesCtx.updateExpense(expenseItemId, expenseData)
        navigation.goBack()
    }

    if (isSubmitting) {
        return <LoadingOverlay />
    }

    return (
        <View style={styles.rootContainer}>
            <View style={styles.expenseFormView}>
                <ExpenseForm
                    defaultData={selectedExpense}
                    onCancel={cancelHandler}
                    onSubmit={isAdding ? confirmHandler : editExpenseHandler}
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
