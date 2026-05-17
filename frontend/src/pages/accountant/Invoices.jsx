import React from 'react';

export default function Invoices() {
    const rows = ['INV-1001', 'INV-1002', 'INV-1003'];

    return (
        <div className="portal-card overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4"><h2 className="portal-section-title">Invoices</h2></div>
            <div className="divide-y divide-slate-100 bg-white">{rows.map((row) => (<div key={row} className="px-6 py-4 text-sm text-slate-700">{row}</div>))}</div>
        </div>
    );
}