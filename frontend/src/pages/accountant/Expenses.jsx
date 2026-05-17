import React from 'react';

export default function Expenses() {
    const rows = ['Fuel', 'Labour', 'Equipment rental'];

    return (
        <div className="portal-card overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4"><h2 className="portal-section-title">Expenses</h2></div>
            <div className="divide-y divide-slate-100 bg-white">{rows.map((row) => (<div key={row} className="px-6 py-4 text-sm text-slate-700">{row}</div>))}</div>
        </div>
    );
}