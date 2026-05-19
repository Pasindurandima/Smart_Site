import React from 'react';

export default function Reports() {
    const reports = [
        'Monthly finance summary',
        'Project-wise expense report',
        'Annual revenue report'
    ];

    return (
        <div className="space-y-6">
            <section className="rounded-3xl bg-slate-950 px-6 py-6 text-white shadow-soft">
                <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">Reports Center</p>
                <h2 className="mt-1 text-2xl font-semibold">Financial Reports & Exports</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-300">Generate PDF and Excel finance reports with filters, charts, and table previews.</p>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
                {reports.map((item) => (
                    <article key={item} className="portal-card p-5">
                        <h3 className="font-semibold text-slate-900">{item}</h3>
                        <p className="portal-muted mt-1">Preview and export options available.</p>
                    </article>
                ))}
            </section>

            <section className="portal-card p-6">
                <div className="flex flex-wrap items-center gap-3">
                    <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Generate PDF</button>
                    <button className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Download Excel</button>
                    <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Monthly Filter</button>
                    <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Project Filter</button>
                </div>
            </section>
        </div>
    );
}