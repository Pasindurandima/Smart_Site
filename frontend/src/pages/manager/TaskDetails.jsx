import React from 'react';

export default function TaskDetails() {
    const details = ['Task description', 'Assigned worker', 'Status update'];

    return (
        <div className="portal-card p-6">
            <h2 className="portal-section-title">Task Details</h2>
            <div className="mt-4 space-y-3">
                {details.map((detail) => (
                    <div key={detail} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{detail}</div>
                ))}
            </div>
        </div>
    );
}