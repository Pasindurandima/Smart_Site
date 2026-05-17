const API_BASE = '/api' // adjust proxy or base as needed

async function getJSON(path) {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function fetchDashboard() {
  return getJSON('/finance/dashboard')
}

export async function fetchSummary() {
  return getJSON('/finance/summary')
}

export async function fetchExpenses(query = '') {
  return getJSON(`/expenses${query}`)
}

export async function createExpense(payload) {
  const res = await fetch(`${API_BASE}/expense/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function deleteExpense(id) {
  const res = await fetch(`${API_BASE}/expense/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function fetchInvoices() {
  return getJSON('/invoices')
}

export async function fetchInvoice(id) {
  return getJSON(`/invoice/${id}`)
}

export async function generateInvoice(payload) {
  const res = await fetch(`${API_BASE}/invoice/generate`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function fetchPayments() {
  return getJSON('/payments')
}

export async function updatePayment(payload) {
  const res = await fetch(`${API_BASE}/payment/update`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function fetchProfitLoss() {
  return getJSON('/finance/profit-loss')
}

export async function fetchBudget() {
  return getJSON('/budget')
}

export async function updateBudget(payload) {
  const res = await fetch(`${API_BASE}/budget/update`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function fetchReports(query='') {
  return getJSON(`/reports/finance${query}`)
}

export default {
  fetchDashboard, fetchSummary, fetchExpenses, createExpense, deleteExpense,
  fetchInvoices, fetchInvoice, generateInvoice, fetchPayments, updatePayment,
  fetchProfitLoss, fetchBudget, updateBudget, fetchReports
}
