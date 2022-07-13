import { createContext, useState } from 'react'

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount }) => {},
    removeExpense: (id) => {},
    updateExpense: (id, { description, amount }) => {},
})

const ExpensesContextProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([
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
        {
            id: 7,
            itemName: 'screen',
            date: new Date('2021-12-01'),
            amount: 250,
        },
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
    ])

    function addExpense({ description, amount }) {
        const date = new Date()
        const id = date.toString() + Math.random.toString()
        const newExpense = {
            id: id,
            description: description,
            amount: amount,
            date: date,
        }
        setExpenses((currentExpenses) => [...currentExpenses, newExpense])
    }

    function updateExpense(id, { description, amount }) {
        const updatableExpenseIndex = expenses.findIndex(
            (expense) => expense.id === id
        )
        const updatableExpense = expenses[updatableExpenseIndex]
        const updatedExpense = {
            ...updatableExpense,
            description: description,
            amount: amount,
            date: new date(),
        }
        setExpenses((currentExpenses) => {
            currentExpenses.splice(updatableExpenseIndex, 1, updatableExpense)
            return currentExpenses
        })
    }

    function removeExpense(expenseId) {
        setExpenses((currentExpenses) =>
            currentExpenses.filter((expense) => expense.id !== expenseId)
        )
    }

    const value = {
        expenses: expenses,
        addExpense: addExpense,
        removeExpense: removeExpense,
        updateExpense: updateExpense,
    }

    return (
        <ExpensesContext.Provider value={value}>
            {children}
        </ExpensesContext.Provider>
    )
}

export default ExpensesContextProvider
