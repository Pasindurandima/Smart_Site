import React from 'react';

export default function Reports() {
    const reports = ['Weekly report', 'Monthly report', 'Delay report', 'Performance report'];

    return (
        <div className="space-y-6">
            <section className="rounded-3xl bg-slate-950 px-6 py-6 text-white shadow-soft">
                <p className="text-xs uppercase tracking-[0.25em] text-sky-300">Manager Analytics</p>
                <h2 className="mt-1 text-2xl font-semibold">Reports & Export</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-300">Generate project reports and export to PDF or Excel.</p>
            </section>

            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {reports.map((r) => (
                    <div key={r} className="portal-card p-5">
                        <h3 className="font-semibold text-slate-900">{r}</h3>
                        <p className="portal-muted mt-1 text-sm">Filter and export data for stakeholders.</p>
                        <div className="mt-4 flex gap-2">
                            <button className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white">Generate</button>
                            <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">Export</button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}