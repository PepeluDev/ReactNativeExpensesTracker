import { View, StyleSheet } from 'react-native'
import ExpensesView from '../components/expenses/ExpensesView'
import { useLayoutEffect, useContext } from 'react'
import IconButton from '../components/ui/IconButton'

import { ExpensesContext } from '../store/context/expenses-context'

const ExpensesScreen = ({ navigation }) => {
    const expensesCtx = useContext(ExpensesContext)

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
                expenses={expensesCtx.expenses}
                timeRange="Last 7 days"
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
