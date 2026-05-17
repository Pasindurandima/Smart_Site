import React from 'react'
import AccountantLayout from '../layouts/AccountantLayout'
import Dashboard from '../pages/accountant/Dashboard'
import Expenses from '../pages/accountant/Expenses'
import AddExpense from '../pages/accountant/AddExpense'
import Invoices from '../pages/accountant/Invoices'
import GenerateInvoice from '../pages/accountant/GenerateInvoice'
import Payments from '../pages/accountant/Payments'
import ProfitLoss from '../pages/accountant/ProfitLoss'
import Budget from '../pages/accountant/Budget'
import Reports from '../pages/accountant/Reports'

export default function AccountantRoutes() {
  // This is a simple hash-nav friendly routing fallback. Integrate with React Router if you prefer.
  const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : '/'
  let route = hash || '/'
  if (route === '/') route = '/accountant'

  let Page = Dashboard
  if (route.startsWith('/accountant/expenses')) Page = Expenses
  if (route.startsWith('/accountant/add-expense')) Page = AddExpense
  if (route.startsWith('/accountant/invoices')) Page = Invoices
  if (route.startsWith('/accountant/generate-invoice')) Page = GenerateInvoice
  if (route.startsWith('/accountant/payments')) Page = Payments
  if (route.startsWith('/accountant/profit-loss')) Page = ProfitLoss
  if (route.startsWith('/accountant/budget')) Page = Budget
  if (route.startsWith('/accountant/reports')) Page = Reports

  return (
    <AccountantLayout>
      <Page />
    </AccountantLayout>
  )
}
import React, { useMemo, useState } from 'react';
import AccountantLayout from '../layouts/AccountantLayout';
import Dashboard from '../pages/accountant/Dashboard';
import Expenses from '../pages/accountant/Expenses';
import Invoices from '../pages/accountant/Invoices';
import Payments from '../pages/accountant/Payments';
import ProfitLoss from '../pages/accountant/ProfitLoss';
import Budget from '../pages/accountant/Budget';
import Reports from '../pages/accountant/Reports';

const pageMap = {
    dashboard: Dashboard,
    expenses: Expenses,
    invoices: Invoices,
    payments: Payments,
    'profit-loss': ProfitLoss,
    budget: Budget,
    reports: Reports
};

export default function AccountantRoutes({ user, onLogout }) {
    const [active, setActive] = useState('dashboard');
    const ActivePage = useMemo(() => pageMap[active] || Dashboard, [active]);

    return (
        <AccountantLayout title="Accountant Workspace" user={user} onLogout={onLogout} active={active} onSelect={setActive}>
            <ActivePage />
        </AccountantLayout>
    );
}