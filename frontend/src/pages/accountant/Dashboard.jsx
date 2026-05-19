import React from 'react';

export default function Dashboard({ onNavigate }) {
    const kpis = [
        { label: 'Total Income', value: 'Rs. 18.4M', tone: 'badge-green' },
        { label: 'Total Expenses', value: 'Rs. 12.7M', tone: 'badge-rose' },
        { label: 'Net Profit', value: 'Rs. 5.7M', tone: 'badge-green' },
        { label: 'Pending Payments', value: 'Rs. 1.8M', tone: 'badge-amber' },
        { label: 'Overdue Invoices', value: '14', tone: 'badge-rose' }
    ];

    const alerts = [
        'Overdue payment on INV-2107',
        'Budget exceeded for Project Greenfield Block C',
        '3 pending invoices awaiting client review'
    ];

    return (
        <div className="space-y-6">
            <section className="rounded-3xl bg-slate-950 px-6 py-5 text-white shadow-soft">
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">Finance Overview</p>
                <h2 className="mt-1 text-2xl font-semibold">Company Accounting Control Center</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-300">Monitor income, expenses, cash flow, and financial risk across all projects in one ERP panel.</p>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {kpis.map((item) => (
                    <article key={item.label} className="portal-card p-5">
                        <p className="portal-muted">{item.label}</p>
                        <div className="mt-2 flex items-end justify-between gap-3">
                            <h3 className="text-2xl font-semibold text-slate-900">{item.value}</h3>
                            <span className={`badge ${item.tone}`}>{item.label}</span>
                        </div>
                    </article>
                ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
                <article className="portal-card p-6">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h2 className="portal-section-title">Monthly Profit vs Expense</h2>
                            <p className="portal-muted">Financial trend summary</p>
                        </div>
                        <span className="badge badge-green">Healthy Margin</span>
                    </div>
                    <div className="mt-6 grid h-64 grid-cols-6 items-end gap-3">
                        {[34, 40, 46, 52, 58, 62].map((value, index) => (
                            <div key={index} className="flex h-full flex-col justify-end gap-2">
                                <div className="rounded-t-2xl bg-gradient-to-t from-emerald-500 to-sky-400" style={{ height: `${value}%` }} />
                                <span className="text-center text-xs text-slate-500">M{index + 1}</span>
                            </div>
                        ))}
                    </div>
                </article>

                <article className="portal-card p-6">
                    <h2 className="portal-section-title">Alerts Panel</h2>
                    <div className="mt-4 space-y-3">
                        {alerts.map((item, index) => (
                            <div key={index} className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                                {item}
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-emerald-800">
                        <p className="text-sm font-semibold">Live cash flow</p>
                        <p className="mt-1 text-sm">Positive operating cash flow for 3 consecutive months.</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <button onClick={() => onNavigate?.('expenses')} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">View Expenses</button>
                        <button onClick={() => onNavigate?.('invoices')} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Go to Invoices</button>
                        <button onClick={() => onNavigate?.('workflows')} className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">Open Workflows</button>
                    </div>
                </article>
            </section>
        </div>
    );
}