import { View, StyleSheet, Text } from 'react-native'
import Input from './Input'

const ExpenseForm = (style) => {
    function amountChangedHandler() {}
    function dateChangedHandler() {}
    function descriptionChangedHandler() {}

    return (
        <View style={[styles.rootContainer, style]}>
            <Text style={styles.formTitle}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.inputInRow}
                    label="Amount"
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: amountChangedHandler,
                    }}
                />
                <Input
                    style={styles.inputInRow}
                    label="Date"
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: dateChangedHandler,
                    }}
                />
            </View>
            <Input
                label="Description"
                textInputConfig={{
                    multiline: true,
                    // autoCorrect: false, // true by default
                    // autoCapitalize: 'none', // sentences by default
                    onChangeText: descriptionChangedHandler,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    formTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    rootContainer: {
        marginTop: 40,
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputInRow: {
        flex: 1,
    },
})

export default ExpenseForm
