import React from 'react';

export default function CreateProject() {
    const fields = ['Project Name', 'Budget', 'Location', 'Deadline', 'Assign Manager'];

    return (
        <div className="portal-card p-6">
            <h2 className="portal-section-title">Create New Project</h2>
            <p className="portal-muted mt-1">Capture project basics and assign a manager before launch.</p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
                {fields.map((field) => (
                    <input key={field} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400" placeholder={field} />
                ))}
                <textarea className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400 md:col-span-2" rows={5} placeholder="Project description"></textarea>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
                <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Create Project</button>
                <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Reset</button>
            </div>
        </div>
    );
}