import React from 'react';

export default function AddMaterial() {
    const fields = ['Material Name', 'Quantity', 'Supplier', 'Cost'];

    return (
        <div className="portal-card p-6">
            <h2 className="portal-section-title">Add Material</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
                {fields.map((field) => (
                    <input key={field} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" placeholder={field} />
                ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Save Material</button>
                <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Reset</button>
            </div>
        </div>
    );
}