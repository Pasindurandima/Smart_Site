import React from 'react';

export default function Milestones() {
    const items = [
        { name: 'Foundation complete', status: 'Completed' },
        { name: 'Structure complete', status: 'Pending' },
        { name: 'Electrical complete', status: 'Pending' },
        { name: 'Finishing complete', status: 'Pending' }
    ];

    return (
        <div className="space-y-6">
            <section className="portal-card p-6">
                <h2 className="portal-section-title">Milestones</h2>
                <p className="portal-muted">Track project phase completion and delays.</p>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
                {items.map((m) => (
                    <div key={m.name} className="rounded-2xl bg-slate-50 p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-slate-900">{m.name}</p>
                                <p className="portal-muted text-sm">Phase</p>
                            </div>
                            <div>
                                <span className={`badge ${m.status === 'Completed' ? 'badge-green' : m.status === 'Pending' ? 'badge-amber' : 'badge-rose'}`}>{m.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}