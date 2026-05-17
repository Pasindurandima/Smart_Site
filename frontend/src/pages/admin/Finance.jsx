import React from 'react';

export default function Finance() {
    const metrics = [
        { label: 'Income', value: 'Rs. 11.2M' },
        { label: 'Expense', value: 'Rs. 8.4M' },
        { label: 'Budget', value: 'Rs. 15.0M' }
    ];

    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-3">
                {metrics.map((metric) => (
                    <article key={metric.label} className="portal-card p-5">
                        <p className="portal-muted">{metric.label}</p>
                        <h3 className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</h3>
                    </article>
                ))}
            </section>

            <section className="portal-card p-6">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h2 className="portal-section-title">Income vs Expense</h2>
                        <p className="portal-muted">Financial overview for company operations</p>
                    </div>
                    <span className="badge badge-green">Positive Margin</span>
                </div>
                <div className="mt-6 grid h-64 grid-cols-2 gap-6">
                    <div className="rounded-3xl bg-emerald-50 p-5">
                        <p className="portal-muted">Income Chart</p>
                        <div className="mt-4 h-44 rounded-2xl bg-gradient-to-t from-emerald-600 to-emerald-300"></div>
                    </div>
                    <div className="rounded-3xl bg-rose-50 p-5">
                        <p className="portal-muted">Expense Chart</p>
                        <div className="mt-4 h-44 rounded-2xl bg-gradient-to-t from-rose-600 to-rose-300"></div>
                    </div>
                </div>
            </section>
        </div>
    );
}