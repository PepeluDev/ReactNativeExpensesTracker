import { createContext, useReducer } from 'react'

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, date, amount }) => {},
    setExpenses: (expenses) => {},
    removeExpense: (id) => {},
    updateExpense: (id, { description, date, amount }) => {},
})

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [{ ...action.payload.data }, ...state]
        case 'SET':
            return action.payload.data
        case 'REMOVE':
            return state.filter((expense) => expense.id !== action.payload.id)
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            )
            const updatableExpense = state[updatableExpenseIndex]
            const updatedExpense = {
                ...updatableExpense,
                ...action.payload.data,
            }
            // Do everything the inmutable way
            const updatedExpenses = [...state]
            updatedExpenses[updatableExpenseIndex] = updatedExpense
            return updatedExpenses
        default:
            return state
    }
}

const ExpensesContextProvider = ({ children }) => {
    const [expensesState, dispatch] = useReducer(expensesReducer, [])

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: { data: expenseData } })
    }

    function setExpenses(expenses) {
        dispatch({ type: 'SET', payload: { data: expenses } })
    }

    function removeExpense(expenseId) {
        dispatch({ type: 'REMOVE', payload: { id: expenseId } })
    }

    function updateExpense(expenseId, expenseData) {
        dispatch({
            type: 'UPDATE',
            payload: { id: expenseId, data: expenseData },
        })
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        setExpenses: setExpenses,
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
