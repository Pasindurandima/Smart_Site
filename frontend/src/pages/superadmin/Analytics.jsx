import React from 'react';

export default function Analytics() {
    const panels = [
        { label: 'User growth', value: '18.2k', tone: 'badge-blue' },
        { label: 'Company growth', value: '148 tenants', tone: 'badge-green' },
        { label: 'Feature usage', value: 'Projects module #1', tone: 'badge-amber' },
        { label: 'API usage', value: '84k calls', tone: 'badge-blue' }
    ];

    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {panels.map((panel) => (
                    <article key={panel.label} className="portal-card p-5">
                        <p className="portal-muted">{panel.label}</p>
                        <div className="mt-2 flex items-end justify-between gap-3">
                            <h3 className="text-2xl font-semibold text-slate-900">{panel.value}</h3>
                            <span className={`badge ${panel.tone}`}>{panel.label}</span>
                        </div>
                    </article>
                ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
                <article className="portal-card p-6">
                    <h2 className="portal-section-title">Google-Analytics Style Overview</h2>
                    <div className="mt-6 grid h-64 grid-cols-8 items-end gap-2">
                        {[20, 28, 34, 48, 42, 56, 62, 74].map((value, index) => (
                            <div key={index} className="flex h-full flex-col justify-end gap-2">
                                <div className="rounded-t-2xl bg-gradient-to-t from-sky-600 to-violet-500" style={{ height: `${value}%` }}></div>
                                <span className="text-center text-[11px] text-slate-500">D{index + 1}</span>
                            </div>
                        ))}
                    </div>
                </article>

                <article className="portal-card p-6">
                    <h2 className="portal-section-title">Insight Cards</h2>
                    <div className="mt-4 space-y-4">
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-sm font-semibold text-slate-900">Most used module</p>
                            <p className="portal-muted mt-1">Projects</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-sm font-semibold text-slate-900">Highest revenue plan</p>
                            <p className="portal-muted mt-1">Pro Plan</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="text-sm font-semibold text-slate-900">Churn rate</p>
                            <p className="portal-muted mt-1">2.8% this month</p>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
}