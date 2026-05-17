import React from 'react'

export default function AccountantLayout({ children, title = 'Accountant' }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold">{title} — Finance</h1>
            <div className="text-sm text-slate-500">Company • Notifications • Profile</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-600">Role: Accountant</div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
        <aside className="col-span-3">
          <nav className="space-y-2 sticky top-6">
            <a className="block px-3 py-2 rounded hover:bg-white" href="#/accountant">Dashboard</a>
            <a className="block px-3 py-2 rounded hover:bg-white" href="#/accountant/expenses">Expenses</a>
            <a className="block px-3 py-2 rounded hover:bg-white" href="#/accountant/invoices">Invoices</a>
            <a className="block px-3 py-2 rounded hover:bg-white" href="#/accountant/payments">Payments</a>
            <a className="block px-3 py-2 rounded hover:bg-white" href="#/accountant/profit-loss">Profit & Loss</a>
            <a className="block px-3 py-2 rounded hover:bg-white" href="#/accountant/budget">Budget</a>
            <a className="block px-3 py-2 rounded hover:bg-white" href="#/accountant/reports">Reports</a>
          </nav>
        </aside>
        <main className="col-span-9">
          {children}
        </main>
      </div>
    </div>
  )
}
import React from 'react';
import BaseLayout from './BaseLayout';
import AccountantSidebar from '../components/sidebar/AccountantSidebar.jsx';

export default function AccountantLayout({ title, user, onLogout, active, onSelect, children }) {
    return (
        <BaseLayout
            title={title}
            user={user}
            onLogout={onLogout}
            SidebarComponent={AccountantSidebar}
            active={active}
            onSelect={onSelect}
        >
            {children}
        </BaseLayout>
    );
}