import { View, StyleSheet } from 'react-native'
import ExpensesView from '../components/expenses/ExpensesView'
import { useLayoutEffect, useContext, useEffect } from 'react'
import IconButton from '../components/ui/IconButton'

import { ExpensesContext } from '../store/context/expenses-context'
import { fetchExpenses } from '../util/http'

function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}

const ExpensesScreen = ({ route, navigation }) => {
    const expensesCtx = useContext(ExpensesContext)
    const period = route.params?.period

    useEffect(() => {
        async function getExpenses() {
            const expenses = await fetchExpenses()
            expensesCtx.setExpenses(expenses)
        }
        getExpenses()
    }, [])

    const expensesData =
        period && period === 'recent'
            ? expensesCtx.expenses.filter((expense) => {
                  const today = new Date()
                  const date7DaysAgo = getDateMinusDays(today, 7)
                  return expense.date >= date7DaysAgo && expense.date <= today
              })
            : expensesCtx.expenses

    const periodTitle = period && period === 'recent' ? 'Last 7 days' : 'All'
    const fallbackText =
        period && period === 'recent'
            ? "You haven't added any expense for the last 7 days"
            : 'No expenses found!'

    function openAddExpenseScreen() {
        navigation.navigate('ManageExpense')
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <IconButton
                    iconName="add-circle-outline"
                    onPress={openAddExpenseScreen}
                    color={tintColor}
                    style={styles.headerRightButton}
                />
            ),
        })
    }, [navigation])

    return (
        <View style={styles.rootContainer}>
            <ExpensesView
                expenses={expensesData}
                fallbackText={fallbackText}
                timeRange={periodTitle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    headerRightButton: { marginRight: 10 },
})

export default ExpensesScreen
