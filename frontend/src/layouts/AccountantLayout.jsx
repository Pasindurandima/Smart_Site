import React from 'react';

const menuItems = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'workflows', label: 'Workflows' },
  { key: 'expenses', label: 'Expenses' },
  { key: 'add-expense', label: 'Add Expense' },
  { key: 'invoices', label: 'Invoices' },
  { key: 'generate-invoice', label: 'Generate Invoice' },
  { key: 'payments', label: 'Payments' },
  { key: 'profit-loss', label: 'Profit & Loss' },
  { key: 'budget', label: 'Budget' },
  { key: 'reports', label: 'Reports' }
];

export default function AccountantLayout({ title, user, onLogout, active, onSelect, children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-4 lg:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">SmartSite ERP</p>
            <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
          </div>

          <div className="hidden flex-1 max-w-2xl md:block">
            <input
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none transition focus:border-emerald-400 focus:bg-white"
              placeholder="Search invoices, expenses, projects..."
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600">Notifications</button>
            <div className="rounded-2xl border border-slate-200 px-3 py-2 text-right">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-slate-500">Role: Accountant</p>
            </div>
            <button
              onClick={onLogout}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1600px] gap-0 lg:gap-6">
        <aside className="sticky top-[88px] hidden h-[calc(100vh-100px)] w-72 shrink-0 lg:block">
          <div className="portal-card h-full p-4">
            <div className="mb-4 rounded-2xl bg-slate-900 px-4 py-4 text-white">
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-300">Finance Module</p>
              <p className="mt-1 text-lg font-semibold">Accountant Portal</p>
              <p className="mt-1 text-sm text-slate-300">Track expenses, invoices, payments, and profit analytics.</p>
            </div>

            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => onSelect(item.key)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${
                    active === item.key
                      ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs uppercase tracking-wider text-slate-400">Open</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 px-4 py-6 lg:px-0">
          <div className="mb-5 flex flex-wrap items-center gap-3 lg:hidden">
            <select
              value={active}
              onChange={(e) => onSelect(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none"
            >
              {menuItems.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {children}
        </main>
      </div>
    </div>
  );
}
