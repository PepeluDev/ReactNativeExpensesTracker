import { View, StyleSheet, Text } from 'react-native'
import ExpensesView from '../components/expenses/ExpensesView'
import { useLayoutEffect } from 'react'
import IconButton from '../components/ui/IconButton'
import { GlobalStyles } from '../constants/styles'

const expenses = [
    { id: 0, itemName: 'mouse', date: new Date(), amount: 25 },
    { id: 1, itemName: 'keyboard', date: new Date(), amount: 35 },
    { id: 2, itemName: 'screen', date: new Date(), amount: 250 },
    { id: 3, itemName: 'speakers', date: new Date(), amount: 150.89 },
    { id: 4, itemName: 'computer', date: new Date(), amount: 1050.5 },
    { id: 5, itemName: 'mouse', date: new Date('2021-12-01'), amount: 25 },
    {
        id: 6,
        itemName: 'keyboard',
        date: new Date('2021-12-01'),
        amount: 35.67,
    },
    { id: 7, itemName: 'screen', date: new Date('2021-12-01'), amount: 250 },
    {
        id: 8,
        itemName: 'speakers',
        date: new Date('2021-12-01'),
        amount: 150.89,
    },
    {
        id: 9,
        itemName: 'computer',
        date: new Date('2021-12-01'),
        amount: 1050.5,
    },
]

const ExpensesScreen = ({ navigation }) => {
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
            <ExpensesView expenses={expenses} timeRange="Last 7 days" />
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
