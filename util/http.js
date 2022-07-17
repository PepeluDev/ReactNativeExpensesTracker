import axios from 'axios'

const BASE_URL = 'https://expenses-test-app-default-rtdb.firebaseio.com/'

export function storeExpense(expenseData) {
    axios.post(BASE_URL + 'expenses.json', expenseData)
}
