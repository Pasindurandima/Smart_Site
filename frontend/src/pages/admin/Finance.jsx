import React from 'react';

export default function Finance({ onNavigate }) {
    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-3">
                {[
                    { label: 'Income', value: 'Rs. 18.4M', tone: 'badge-green' },
                    { label: 'Expenses', value: 'Rs. 8.4M', tone: 'badge-rose' },
                    { label: 'Budget Remaining', value: 'Rs. 5.1M', tone: 'badge-blue' }
                ].map((item) => (
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
                            <h2 className="portal-section-title">Income vs Expense Chart</h2>
                            <p className="portal-muted">Company financial health overview</p>
                        </div>
                        <button onClick={() => onNavigate?.('expenses')} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">View Expenses</button>
                        <button onClick={() => onNavigate?.('reports')} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Reports</button>
                    </div>
                    <div className="mt-6 grid h-64 grid-cols-6 items-end gap-3">
                        {[36, 44, 52, 48, 60, 68].map((value, index) => (
                            <div key={index} className="flex h-full flex-col justify-end gap-2">
                                <div className="rounded-t-2xl bg-gradient-to-t from-emerald-500 to-sky-400" style={{ height: `${value}%` }}></div>
                                <span className="text-center text-xs text-slate-500">M{index + 1}</span>
                            </div>
                        ))}
                    </div>
                </article>

                <article className="portal-card p-6">
                    <h2 className="portal-section-title">Budget Overview</h2>
                    <div className="mt-5 space-y-4">
                        {[
                            { label: 'Project A', pct: 68 },
                            { label: 'Project B', pct: 83 },
                            { label: 'Project C', pct: 44 }
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="font-medium text-slate-700">{item.label}</span>
                                    <span className="text-slate-500">{item.pct}% used</span>
                                </div>
                                <div className="h-3 rounded-full bg-slate-100">
                                    <div className={`h-3 rounded-full ${item.pct > 80 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${item.pct}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </article>
            </section>
        </div>
    );
}