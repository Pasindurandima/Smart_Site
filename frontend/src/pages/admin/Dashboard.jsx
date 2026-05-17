import React from 'react';

export default function Dashboard() {
    const kpis = [
        { label: 'Active Projects', value: '26', tone: 'badge-blue' },
        { label: 'Total Workers', value: '312', tone: 'badge-green' },
        { label: 'Monthly Expenses', value: 'Rs. 8.4M', tone: 'badge-amber' },
        { label: 'Stock Alerts', value: '7 Low', tone: 'badge-rose' },
        { label: 'Profit Summary', value: 'Rs. 2.1M', tone: 'badge-green' }
    ];

    return (
        <div className="space-y-6">
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
                            <h2 className="portal-section-title">Profit Summary Chart</h2>
                            <p className="portal-muted">Income vs expense trend across the current quarter</p>
                        </div>
                        <span className="badge badge-green">Healthy Margin</span>
                    </div>
                    <div className="mt-6 h-64 rounded-3xl bg-gradient-to-br from-slate-950 to-sky-900 p-5 text-white">
                        <div className="grid h-full grid-cols-6 items-end gap-3">
                            {[34, 42, 39, 58, 63, 74].map((value, index) => (
                                <div key={index} className="flex h-full flex-col justify-end gap-2">
                                    <div className="rounded-t-2xl bg-white/90" style={{ height: `${value}%` }}></div>
                                    <span className="text-center text-xs text-slate-300">Q{index + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>

                <article className="portal-card p-6">
                    <h2 className="portal-section-title">Material Stock Alerts</h2>
                    <div className="mt-4 space-y-3">
                        {[
                            'Cement OPC: 4 days remaining',
                            'Rebar 12mm: reorder required',
                            'Paint white matte: low stock on Site B'
                        ].map((alert) => (
                            <div key={alert} className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
                                {alert}
                            </div>
                        ))}
                    </div>
                </article>
            </section>
        </div>
    );
}