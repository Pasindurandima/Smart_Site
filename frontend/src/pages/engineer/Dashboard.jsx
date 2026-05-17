import React from 'react';

export default function Dashboard() {
    const cards = [
        { label: 'Assigned Site', value: 'Site C', tone: 'badge-blue' },
        { label: "Today's Tasks", value: '6', tone: 'badge-green' },
        { label: 'Progress Upload', value: 'Quick Access', tone: 'badge-amber' }
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
                <h2 className="portal-section-title">Quick Actions</h2>
                <div className="mt-4 flex flex-wrap gap-3">
                    <button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white">Upload Progress</button>
                    <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Request Material</button>
                </div>
            </article>
        </div>
    );
}