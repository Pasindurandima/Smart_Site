import React from 'react';

export default function Budget() {
    const items = ['Project A', 'Project B', 'Project C'];

    return (
        <div className="portal-card p-6">
            <h2 className="portal-section-title">Budget Control</h2>
            <div className="mt-4 space-y-3">
                {items.map((item) => (<div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{item}</div>))}
            </div>
        </div>
    );
}