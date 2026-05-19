import React from 'react';

export default function Dashboard({ onNavigate }) {
    const kpis = [
        { label: 'Active Projects', value: '24', tone: 'badge-blue' },
        { label: 'Completed Projects', value: '86', tone: 'badge-green' },
        { label: 'Total Workers', value: '312', tone: 'badge-amber' },
        { label: 'Monthly Expenses', value: 'Rs. 8.4M', tone: 'badge-rose' },
        { label: 'Net Profit', value: 'Rs. 2.9M', tone: 'badge-green' }
    ];

    const alerts = [
        'Low stock: Rebar 12mm at Site C',
        'Delayed: Greenfield Block B by 4 days',
        'Pending invoices: 9 client payments'
    ];

    return (
        <div className="space-y-6">
            <section className="rounded-3xl bg-slate-950 px-6 py-5 text-white shadow-soft">
                <p className="text-xs uppercase tracking-[0.25em] text-sky-300">Company Overview</p>
                <h2 className="mt-1 text-2xl font-semibold">Construction Operations Control Center</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-300">Track company-wide projects, workforce, inventory, finance, and business health in one dashboard.</p>
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
                            <h2 className="portal-section-title">Progress Overview</h2>
                            <p className="portal-muted">Project completion trend across active sites</p>
                        </div>
                        <span className="badge badge-green">Healthy</span>
                    </div>
                    <div className="mt-6 grid h-64 grid-cols-6 items-end gap-3">
                        {[32, 40, 47, 54, 63, 72].map((value, index) => (
                            <div key={index} className="flex h-full flex-col justify-end gap-2">
                                <div className="rounded-t-2xl bg-gradient-to-t from-sky-600 to-emerald-400" style={{ height: `${value}%` }}></div>
                                <span className="text-center text-xs text-slate-500">P{index + 1}</span>
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
                    <div className="mt-6 flex flex-wrap gap-3">
                        <button onClick={() => onNavigate?.('projects')} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">View Projects</button>
                        <button onClick={() => onNavigate?.('inventory')} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Check Inventory</button>
                        <button onClick={() => onNavigate?.('workflows')} className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">Open Workflows</button>
                    </div>
                </article>
            </section>
        </div>
    );
}