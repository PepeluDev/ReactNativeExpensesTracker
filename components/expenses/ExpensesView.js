import React from 'react'
import { View, StyleSheet, BackHandler } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import ExpensesHeader from './ExpensesHeader'
import ExpensesList from './ExpensesList'

const ExpensesView = ({ expenses, timeRange }) => {
    const expensesSum = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    )
    return (
        <View style={styles.rootContainer}>
            <ExpensesHeader timeRange={timeRange} totalAmount={expensesSum} />
            <ExpensesList expenses={expenses} />
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 45,
        backgroundColor: GlobalStyles.colors.primary100,
    },
})

export default ExpensesView
