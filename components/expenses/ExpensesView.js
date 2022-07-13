import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { GlobalStyles } from '../../constants/styles'
import ExpensesHeader from './ExpensesHeader'
import ExpensesList from './ExpensesList'

const ExpensesView = ({ expenses, fallbackText, timeRange }) => {
    const noExpenses = expenses.length === 0
    let expensesSum = 0.0
    let content = (
        <View style={styles.noExpensesContainer}>
            <Text style={styles.noExpensesText}>{fallbackText}</Text>
        </View>
    )

    if (!noExpenses) {
        expensesSum = expenses.reduce((sum, expense) => sum + expense.amount, 0)
        content = <ExpensesList expenses={expenses} />
    }

    return (
        <View style={[styles.rootContainer]}>
            <ExpensesHeader timeRange={timeRange} totalAmount={expensesSum} />
            {content}
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
    noExpensesContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noExpensesText: {
        color: GlobalStyles.colors.primary400,
        fontWeight: 'bold',
    },
})

export default ExpensesView
