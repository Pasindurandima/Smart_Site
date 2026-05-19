import React from 'react';

export default function ProfitLoss() {
    const insights = [
        { label: 'Most profitable project', value: 'Greenfield Block A' },
        { label: 'Highest expense category', value: 'Material' },
        { label: 'Monthly net profit', value: 'Rs. 5.7M' }
    ];

    return (
        <div className="space-y-6">
            <section className="grid gap-4 xl:grid-cols-[1.35fr_1fr]">
                <article className="portal-card p-6">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h2 className="portal-section-title">Profit vs Loss Graph</h2>
                            <p className="portal-muted">Google Analytics style finance intelligence</p>
                        </div>
                        <span className="badge badge-green">Profit Margin +31%</span>
                    </div>
                    <div className="mt-6 rounded-3xl bg-slate-50 p-4">
                        <div className="h-64 rounded-2xl bg-gradient-to-br from-slate-900 via-emerald-700 to-sky-700 p-5 text-white">
                            <div className="flex h-full items-end gap-3">
                                {[22, 38, 30, 52, 44, 63, 76].map((value, index) => (
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
                    <h2 className="portal-section-title">Insights Cards</h2>
                    <div className="mt-4 space-y-4">
                        {insights.map((insight) => (
                            <div key={insight.label} className="rounded-2xl bg-slate-50 p-4">
                                <p className="text-sm font-semibold text-slate-900">{insight.label}</p>
                                <p className="portal-muted mt-1">{insight.value}</p>
                            </div>
                        ))}
                    </div>
                </article>
            </section>
        </div>
    );
}