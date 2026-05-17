import React from 'react';

const stages = [
    { title: 'Foundation', status: 'completed', dates: '12 Jan 2026 - 21 Feb 2026' },
    { title: 'Structure', status: 'active', dates: '22 Feb 2026 - 18 Jun 2026' },
    { title: 'Plumbing', status: 'pending', dates: '19 Jun 2026 - 20 Jul 2026' },
    { title: 'Electrical', status: 'pending', dates: '21 Jul 2026 - 25 Aug 2026' },
    { title: 'Finishing', status: 'pending', dates: '26 Aug 2026 - 30 Nov 2026' }
];

const statusStyles = {
    completed: 'badge-green',
    active: 'badge-blue',
    pending: 'badge-amber',
    delayed: 'badge-rose'
};

export default function ProjectTimeline() {
    return (
        <div className="portal-card p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h2 className="portal-section-title">Construction Timeline</h2>
                    <p className="portal-muted">Track each construction phase and milestone in a vertical SaaS timeline.</p>
                </div>
                <span className="badge badge-blue">Project ID #GF-2026-02</span>
            </div>

            <div className="space-y-5">
                {stages.map((stage, index) => (
                    <div key={stage.title} className="relative pl-8">
                        <div className="absolute left-2 top-1 h-full w-px bg-slate-200"></div>
                        <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-4 border-white bg-sky-500 shadow"></div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-base font-semibold text-slate-900">
                                        {index + 1}. {stage.title}
                                    </h3>
                                    <p className="portal-muted mt-1">{stage.dates}</p>
                                </div>
                                <span className={`badge ${statusStyles[stage.status]}`}>{stage.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}