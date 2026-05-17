import React from 'react';

export default function MaterialRequest() {
    const fields = ['Material', 'Quantity', 'Priority', 'Reason'];

    return (
        <div className="portal-card p-6">
            <h2 className="portal-section-title">Material Request</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
                {fields.map((field) => (<input key={field} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" placeholder={field} />))}
            </div>
        </div>
    );
}