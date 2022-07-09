import { useLayoutEffect } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import IconButton from '../components/ui/IconButton'

const ManageExpense = ({ route, navigation }) => {
    const expenseItemName = route.params?.itemName
    const isAdding = !expenseItemName

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isAdding ? 'Add new Expense' : expenseItemName,
        })
    }, [isAdding, navigation])

    function deleteExpenseHandler() {
        navigation.goBack()
    }

    function editExpenseHandler() {}

    if (!isAdding) {
        return (
            <View style={styles.rootContainer}>
                <View style={styles.textView}>
                    <Text style={styles.textDescription}>
                        This is the ManageExpense screen for:{' '}
                    </Text>
                    <Text
                        style={[styles.textDescription, styles.expenseItemName]}
                    >
                        {expenseItemName}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <IconButton
                        iconName="trash"
                        onPress={deleteExpenseHandler}
                        color="red"
                        size={50}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.rootContainer}>
            <Text>Adding new Expense</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignContent: 'center',
    },
    textView: {
        paddingTop: 10,
        alignItems: 'center',
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
