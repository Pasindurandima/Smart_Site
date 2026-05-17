import React from 'react';

export default function Dashboard() {
    const cards = [
        { label: 'Assigned Projects', value: '8', tone: 'badge-blue' },
        { label: 'Task Completion', value: '84%', tone: 'badge-green' },
        { label: 'Delay Alerts', value: '2', tone: 'badge-amber' }
    ];

    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-3">
                {cards.map((card) => (
                    <article key={card.label} className="portal-card p-5">
                        <p className="portal-muted">{card.label}</p>
                        <div className="mt-2 flex items-end justify-between gap-3">
                            <h3 className="text-2xl font-semibold text-slate-900">{card.value}</h3>
                            <span className={`badge ${card.tone}`}>{card.label}</span>
                        </div>
                    </article>
                ))}
            </section>
            <article className="portal-card p-6">
                <h2 className="portal-section-title">Delay Alerts</h2>
                <div className="mt-4 space-y-3">
                    <div className="rounded-2xl bg-amber-50 p-4 text-amber-800">Material delivery for Phase 2 delayed by 2 days.</div>
                    <div className="rounded-2xl bg-sky-50 p-4 text-sky-800">Task board review scheduled for today 4:00 PM.</div>
                </div>
            </article>
        </div>
    );
}