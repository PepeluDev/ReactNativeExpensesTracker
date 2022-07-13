import { View, StyleSheet } from 'react-native'
import ExpensesView from '../components/expenses/ExpensesView'
import { useLayoutEffect, useContext } from 'react'
import IconButton from '../components/ui/IconButton'

import { ExpensesContext } from '../store/context/expenses-context'

function getDateMinusDays(date, days) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}

const ExpensesScreen = ({ route, navigation }) => {
    const expensesCtx = useContext(ExpensesContext)
    const period = route.params?.period

    const expensesData =
        period && period === 'recent'
            ? expensesCtx.expenses.filter((expense) => {
                  const today = new Date()
                  const date7DaysAgo = getDateMinusDays(today, 7)
                  return expense.date >= date7DaysAgo && expense.date <= today
              })
            : expensesCtx.expenses

    const periodTitle = period && period === 'recent' ? 'Last 7 days' : 'All'

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
            <ExpensesView expenses={expensesData} timeRange={periodTitle} />
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
