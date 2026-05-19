import React from 'react';

export default function Schedule() {
    const items = [
        { date: '2026-05-20', title: 'Site A - Foundation pour' },
        { date: '2026-05-22', title: 'Electrical layout meeting' },
        { date: '2026-05-25', title: 'Material delivery - Rebar' }
    ];

    return (
        <div className="space-y-6">
            <section className="portal-card p-6">
                <h2 className="portal-section-title">Schedule</h2>
                <p className="portal-muted">Calendar view of daily tasks, milestones, and deadlines.</p>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
                {items.map((it) => (
                    <div key={it.date + it.title} className="rounded-2xl bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">{it.date}</p>
                        <p className="mt-1 font-semibold text-slate-900">{it.title}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}