import { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Input from './Input'
import Button from '../ui/Button'

function validateExpenseData(expenseData) {
    const isAmountValid =
        !isNaN(expenseData.amount.value) && expenseData.amount.value > 0
    const isDateValid = expenseData.date.value.toString() !== 'Invalid Date'
    const isDescriptionValid = expenseData.description.value.trim().length > 0

    return [isAmountValid, isDateValid, isDescriptionValid]
}

const ExpenseForm = ({
    style,
    onCancel,
    onSubmit,
    submitButtonLabel,
    defaultData,
}) => {
    const [inputData, setInputData] = useState({
        amount: {
            value: defaultData?.amount ? defaultData.amount.toString() : '',
            isValid: true,
        },
        date: {
            value: defaultData?.date
                ? defaultData.date.toISOString().slice(0, 10)
                : '',
            isValid: true,
        },
        description: {
            value: defaultData?.description ? defaultData.description : '',
            isValid: true,
        },
    })

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputData((currentInputdata) => {
            const newValue = {
                ...currentInputdata[inputIdentifier],
                value: enteredValue,
            }
            return {
                ...currentInputdata,
                [inputIdentifier]: newValue,
            }
        })
    }

    function submitHandler() {
        const expenseData = {
            amount: {
                value: parseFloat(inputData.amount.value.replace(',', '.')),
            },
            date: { value: new Date(inputData.date.value) },
            description: { value: inputData.description.value },
        }

        const [isAmountValid, isDateValid, isDescriptionValid] =
            validateExpenseData(expenseData)

        if (!isAmountValid || !isDateValid || !isDescriptionValid) {
            setInputData((currentInputdata) => {
                // Must do it the mutable way, changing the reference
                const currentInputdataCopy = { ...currentInputdata }
                currentInputdataCopy.amount.isValid = isAmountValid
                currentInputdataCopy.date.isValid = isDateValid
                currentInputdataCopy.description.isValid = isDescriptionValid
                return currentInputdataCopy
            })
            return
        }

        onSubmit({
            amount: expenseData.amount.value,
            date: expenseData.date.value,
            description: expenseData.description.value,
        })
    }

    const isInputValid =
        inputData.amount.isValid &&
        inputData.date.isValid &&
        inputData.description.isValid

    return (
        <View style={[styles.rootContainer, style]}>
            <Text style={styles.formTitle}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.inputInRow}
                    label="Amount"
                    isInvalid={!inputData.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangedHandler.bind(this, 'amount'),
                        value: inputData.amount.value,
                    }}
                />
                <Input
                    style={styles.inputInRow}
                    label="Date"
                    isInvalid={!inputData.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangedHandler.bind(this, 'date'),
                        value: inputData.date.value,
                    }}
                />
            </View>
            <Input
                label="Description"
                isInvalid={!inputData.description.isValid}
                textInputConfig={{
                    multiline: true,
                    // autoCorrect: false, // true by default
                    // autoCapitalize: 'none', // sentences by default
                    onChangeText: inputChangedHandler.bind(this, 'description'),
                    value: inputData.description.value,
                }}
            />
            {!isInputValid && (
                <Text style={styles.invalidInputText}>
                    Invalid input Please check your input values
                </Text>
            )}
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
    invalidInputText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'red',
    },
})

export default ExpenseForm
