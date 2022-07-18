import { View, StyleSheet } from 'react-native'
import ExpensesView from '../components/expenses/ExpensesView'
import { useLayoutEffect, useContext, useEffect, useState } from 'react'
import IconButton from '../components/ui/IconButton'

import { ExpensesContext } from '../store/context/expenses-context'
import { fetchExpenses } from '../util/http'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import ErrorOverlay from '../components/ui/ErrorOverlay'

function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}

const ExpensesScreen = ({ route, navigation }) => {
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState()

    const expensesCtx = useContext(ExpensesContext)
    const period = route.params?.period

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

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true)
            try {
                const expenses = await fetchExpenses()
                expensesCtx.setExpenses(expenses)
            } catch (error) {
                setError('Could not fetch expenese')
            }
            // The server is really quick, this can be used for debugging the LoadingOverlay:
            // await new Promise((r) => setTimeout(r, 2000))
            setIsFetching(false)
        }
        getExpenses()
    }, [])

    function errorHandler() {
        setError(null)
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

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
