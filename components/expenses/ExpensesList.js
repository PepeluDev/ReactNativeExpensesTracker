import { FlatList, View, StyleSheet, Text } from 'react-native'
import ExpenseItem from './ExpenseItem'

function renderExpenseItem(itemData) {
    const item = itemData.item
    return <ExpenseItem {...item} />
}

const ExpensesList = ({ expenses }) => {
    return (
        <View style={styles.rootContainer}>
            <FlatList
                style={styles.expensesList}
                data={expenses}
                keyExtractor={(item) => item.id}
                renderItem={renderExpenseItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {},
    expensesList: { paddingHorizontal: 10 },
})

export default ExpensesList
