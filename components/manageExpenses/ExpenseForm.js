import { useState } from 'react'
import { View, StyleSheet, Text, Alert } from 'react-native'
import Input from './Input'
import Button from '../ui/Button'

function isExpenseDataValid(expenseData) {
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date'
    const descriptionIsValid = expenseData.description.trim().length > 0

    return amountIsValid && dateIsValid && descriptionIsValid
}

const ExpenseForm = ({
    style,
    onCancel,
    onSubmit,
    submitButtonLabel,
    defaultData,
}) => {
    const [inputData, setInputData] = useState({
        amount: defaultData?.amount ? defaultData.amount.toString() : '',
        date: defaultData?.date
            ? defaultData.date.toISOString().slice(0, 10)
            : '',
        description: defaultData?.description ? defaultData.description : '',
    })

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputData((currentInputdata) => {
            return { ...currentInputdata, [inputIdentifier]: enteredValue }
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: parseFloat(inputData.amount.replace(',', '.')),
            date: new Date(inputData.date),
            description: inputData.description,
        }

        if (!isExpenseDataValid(expenseData)) {
            Alert.alert('Invalid input', 'Please check your input values')
            return
        }

        onSubmit(expenseData)
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
            <View style={styles.buttonView}>
                <Button mode="flat" onPress={onCancel} style={styles.button}>
                    Cancel
                </Button>
                <Button onPress={submitHandler} style={styles.button}>
                    {submitButtonLabel}
                </Button>
            </View>
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
    buttonView: {
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
})

export default ExpenseForm
