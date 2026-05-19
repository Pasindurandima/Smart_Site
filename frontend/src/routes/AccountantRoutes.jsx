import React, { useMemo, useState } from 'react';
import AccountantLayout from '../layouts/AccountantLayout';
import Dashboard from '../pages/accountant/Dashboard';
import WorkflowCenter from '../pages/workflows/WorkflowCenter';
import Expenses from '../pages/accountant/Expenses';
import AddExpense from '../pages/accountant/AddExpense';
import Invoices from '../pages/accountant/Invoices';
import GenerateInvoice from '../pages/accountant/GenerateInvoice';
import Payments from '../pages/accountant/Payments';
import ProfitLoss from '../pages/accountant/ProfitLoss';
import Budget from '../pages/accountant/Budget';
import Reports from '../pages/accountant/Reports';

const pageMap = {
    dashboard: Dashboard,
    workflows: WorkflowCenter,
    expenses: Expenses,
    'add-expense': AddExpense,
    invoices: Invoices,
    'generate-invoice': GenerateInvoice,
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
            <ActivePage user={user} onNavigate={setActive} />
        </AccountantLayout>
    );
}