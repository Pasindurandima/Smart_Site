import React from 'react';

const approvals = [
    { stage: 'Foundation', description: 'Client sign-off for foundation completion.', status: 'Ready for approval' },
    { stage: 'Structure', description: 'Inspect slab and column completion report.', status: 'Pending client review' },
    { stage: 'Finishing', description: 'Approve material and color selections.', status: 'Scheduled' }
];

export default function Approvals() {
    return (
        <div className="space-y-6">
            {approvals.map((item) => (
                <article key={item.stage} className="portal-card p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h2 className="portal-section-title">{item.stage}</h2>
                            <p className="portal-muted mt-1">{item.description}</p>
                        </div>
                        <span className="badge badge-blue">{item.status}</span>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                        <button className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">Approve</button>
                        <button className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700">Reject</button>
                        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">Add Comment</button>
                    </div>
                </article>
            ))}
        </div>
    );
}