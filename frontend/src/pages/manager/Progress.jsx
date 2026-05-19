import React from 'react';

export default function Progress() {
    const overall = 68;
    const updates = [
        { date: '2026-05-10', note: 'Completed first floor slab' },
        { date: '2026-05-12', note: 'Electrics started on Site B' }
    ];

    return (
        <div className="space-y-6">
            <section className="portal-card p-6">
                <h2 className="portal-section-title">Overall Progress</h2>
                <p className="portal-muted">Company-level project completion and daily updates.</p>
                <div className="mt-4">
                    <div className="h-4 w-full rounded-full bg-slate-100">
                        <div className="h-4 rounded-full bg-emerald-500" style={{ width: `${overall}%` }}></div>
                    </div>
                    <div className="mt-2 text-sm text-slate-600">{overall}% complete</div>
                </div>
            </section>

            <section className="portal-card p-6">
                <h3 className="portal-section-title">Recent Updates</h3>
                <div className="mt-4 space-y-3">
                    {updates.map((u) => (
                        <div key={u.date} className="rounded-2xl bg-slate-50 p-3">
                            <div className="text-sm text-slate-500">{u.date}</div>
                            <div className="font-medium text-slate-900">{u.note}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}