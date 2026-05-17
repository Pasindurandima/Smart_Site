import React from 'react';

export default function DailyUpdates() {
    const fields = ['Work done summary', 'Issues faced', 'Materials used'];

    return (
        <div className="portal-card p-6">
            <h2 className="portal-section-title">Daily Progress Update</h2>
            <div className="mt-4 grid gap-4">
                {fields.map((field) => (
                    <textarea key={field} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" rows={3} placeholder={field}></textarea>
                ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Submit Update</button>
            </div>
        </div>
    );
}