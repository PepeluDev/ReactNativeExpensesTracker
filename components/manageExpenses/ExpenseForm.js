import { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Input from './Input'

const ExpenseForm = ({ style }) => {
    const [inputData, setInputData] = useState({
        amount: '',
        date: '',
        description: '',
    })

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputData((currentInputdata) => {
            return { ...currentInputdata, [inputIdentifier]: enteredValue }
        })
    }

    return (
        <View style={[styles.rootContainer, style]}>
            <Text style={styles.formTitle}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.inputInRow}
                    label="Amount"
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputData.amount,
                    }}
                />
                <Input
                    style={styles.inputInRow}
                    label="Date"
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputData.date,
                    }}
                />
            </View>
            <Input
                label="Description"
                textInputConfig={{
                    multiline: true,
                    // autoCorrect: false, // true by default
                    // autoCapitalize: 'none', // sentences by default
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputData.description,
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
