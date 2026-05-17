import React from 'react';

export default function Dashboard() {
    const kpis = [
        { label: 'Total Companies', value: '148', tone: 'badge-blue' },
        { label: 'Active Users', value: '2,418', tone: 'badge-green' },
        { label: 'Monthly Revenue', value: 'Rs. 4.82M', tone: 'badge-amber' },
        { label: 'Active Subscriptions', value: '132', tone: 'badge-green' },
        { label: 'System Uptime', value: '99.98%', tone: 'badge-blue' }
    ];

    const activity = [
        'Northline Construction upgraded to Pro plan',
        'Apex Builders registered a new company workspace',
        'Payment captured for Enterprise subscription',
        '12 users activated across 3 companies'
    ];

    return (
        <div className="space-y-6">
            <section className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-slate-950 px-6 py-5 text-white shadow-soft">
                <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-sky-300">Platform Overview</p>
                    <h2 className="mt-1 text-2xl font-semibold">SaaS Owner Control Center</h2>
                    <p className="mt-2 max-w-2xl text-sm text-slate-300">Monitor revenue growth, tenant activity, subscription health, and platform uptime in one live panel.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">Dark Mode</button>
                    <button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white">Export Report</button>
                </div>
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
                            <h2 className="portal-section-title">Revenue Growth Chart</h2>
                            <p className="portal-muted">Month-over-month SaaS revenue trend</p>
                        </div>
                        <span className="badge badge-green">+18.4%</span>
                    </div>
                    <div className="mt-6 grid h-64 grid-cols-6 items-end gap-3">
                        {[36, 48, 42, 58, 66, 78].map((value, index) => (
                            <div key={index} className="flex h-full flex-col justify-end gap-2">
                                <div className="rounded-t-2xl bg-gradient-to-t from-sky-600 via-cyan-500 to-emerald-400" style={{ height: `${value}%` }} />
                                <span className="text-center text-xs text-slate-500">M{index + 1}</span>
                            </div>
                        ))}
                    </div>
                </article>

                <article className="portal-card p-6">
                    <h2 className="portal-section-title">Live Activity Panel</h2>
                    <div className="mt-4 space-y-3">
                        {activity.map((item, index) => (
                            <div key={index} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500"></div>
                                <p className="text-sm text-slate-700">{item}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 rounded-2xl bg-gradient-to-r from-slate-900 to-sky-900 p-5 text-white">
                        <p className="text-xs uppercase tracking-[0.2em] text-sky-300">System Health</p>
                        <p className="mt-2 text-3xl font-semibold">99.98% Uptime</p>
                        <p className="mt-1 text-sm text-slate-300">No critical incidents in the last 30 days.</p>
                    </div>
                </article>
            </section>
        </div>
    );
}