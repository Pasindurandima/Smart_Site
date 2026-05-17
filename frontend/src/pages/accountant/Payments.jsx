import React from 'react';

export default function Payments() {
    const rows = ['TXN-4432', 'TXN-4491', 'TXN-4508'];

    return (
        <div className="portal-card overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4"><h2 className="portal-section-title">Payments</h2></div>
            <div className="divide-y divide-slate-100 bg-white">{rows.map((row) => (<div key={row} className="px-6 py-4 text-sm text-slate-700">{row}</div>))}</div>
        </div>
    );
}