import axios from 'axios'

const BASE_URL = 'https://expenses-test-app-default-rtdb.firebaseio.com/'

export async function storeExpense(expenseData) {
    const response = await axios.post(BASE_URL + 'expenses.json', expenseData)
    const id = response.data.name
    return id
}

export async function fetchExpenses() {
    const storedExpenses = await axios.get(BASE_URL + 'expenses.json')

    return Object.keys(storedExpenses.data)
        .map((key, index) => {
            return {
                id: key,
                amount: storedExpenses.data[key].amount,
                date: new Date(storedExpenses.data[key].date),
                description: storedExpenses.data[key].description,
            }
        })
        .sort((exA, exB) => {
            return exB.date - exA.date
        })
}
