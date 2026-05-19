import React from 'react';

export default function AssignedSite() {
    const site = {
        name: 'Greenfield Phase A',
        location: 'Colombo, Sri Lanka',
        manager: 'Priyan Silva',
        start: '2026-03-01',
        end: '2027-02-28',
        phase: 'Foundation',
        progress: 42
    };

    return (
        <div className="space-y-4">
            <section className="portal-card p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="portal-section-title">{site.name}</h2>
                        <p className="portal-muted">{site.location} • PM: {site.manager}</p>
                    </div>
                    <div className="text-sm text-slate-600">{site.phase}</div>
                </div>

                <div className="mt-3">
                    <div className="h-3 w-full rounded-full bg-slate-100">
                        <div className="h-3 rounded-full bg-emerald-500" style={{ width: `${site.progress}%` }} />
                    </div>
                    <div className="mt-2 text-sm text-slate-600">{site.progress}% complete • {site.start} → {site.end}</div>
                </div>
            </section>

            <section className="portal-card p-4">
                <h3 className="font-semibold">Map & Location</h3>
                <div className="mt-3 h-48 w-full rounded-lg bg-slate-100" aria-hidden>
                    {/* Map placeholder — embed when available */}
                    <div className="flex h-full items-center justify-center text-sm text-slate-500">Map preview</div>
                </div>
            </section>
        </div>
    );
}