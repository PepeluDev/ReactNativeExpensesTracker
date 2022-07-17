import axios from 'axios'

const BASE_URL = 'https://expenses-test-app-default-rtdb.firebaseio.com/'

export function storeExpense(expenseData) {
    axios.post(BASE_URL + 'expenses.json', expenseData)
}

export async function fetchExpenses() {
    const storedExpenses = await axios.get(BASE_URL + 'expenses.json')

    return Object.keys(storedExpenses.data).map((key, index) => {
        return {
            id: key,
            amount: storedExpenses.data[key].amount,
            date: new Date(storedExpenses.data[key].date),
            description: storedExpenses.data[key].description,
        }
    })
}
