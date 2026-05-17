import React from 'react';

export default function Revenue() {
    const cards = [
        { label: 'Monthly Revenue', value: 'Rs. 4.82M', tone: 'badge-green' },
        { label: 'Annual Revenue', value: 'Rs. 58.1M', tone: 'badge-blue' },
        { label: 'Pending Payments', value: 'Rs. 1.24M', tone: 'badge-amber' },
        { label: 'Growth %', value: '+18.4%', tone: 'badge-green' }
    ];

    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <article key={card.label} className="portal-card p-5">
                        <p className="portal-muted">{card.label}</p>
                        <div className="mt-2 flex items-end justify-between gap-3">
                            <h3 className="text-2xl font-semibold text-slate-900">{card.value}</h3>
                            <span className={`badge ${card.tone}`}>{card.value}</span>
                        </div>
                    </article>
                ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
                <article className="portal-card p-6">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h2 className="portal-section-title">Revenue Trend Line</h2>
                            <p className="portal-muted">Platform income from subscriptions and upgrades</p>
                        </div>
                        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Export CSV</button>
                    </div>
                    <div className="mt-6 rounded-3xl bg-slate-50 p-4">
                        <div className="h-64 rounded-2xl bg-gradient-to-br from-slate-900 via-sky-900 to-cyan-700 p-6 text-white">
                            <div className="flex h-full items-end gap-3">
                                {[28, 35, 31, 49, 58, 63, 76].map((value, index) => (
                                    <div key={index} className="flex flex-1 flex-col items-center justify-end gap-2">
                                        <div className="w-full rounded-t-2xl bg-white/85" style={{ height: `${value}%` }}></div>
                                        <span className="text-xs text-slate-300">M{index + 1}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </article>

                <article className="portal-card p-6">
                    <h2 className="portal-section-title">Revenue Breakdown</h2>
                    <div className="mt-5 space-y-4">
                        {[
                            { label: 'Pro Plan', pct: 58 },
                            { label: 'Enterprise Plan', pct: 30 },
                            { label: 'Starter Plan', pct: 12 }
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="font-medium text-slate-700">{item.label}</span>
                                    <span className="text-slate-500">{item.pct}%</span>
                                </div>
                                <div className="h-3 rounded-full bg-slate-100">
                                    <div className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-sky-500" style={{ width: `${item.pct}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-emerald-800">
                        <p className="text-sm font-semibold">Green indicator</p>
                        <p className="mt-1 text-sm">Revenue is trending above the last quarter average.</p>
                    </div>
                </article>
            </section>
        </div>
    );
}