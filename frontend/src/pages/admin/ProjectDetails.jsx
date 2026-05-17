import React from 'react';

export default function ProjectDetails() {
    const tasks = ['Foundation casting', 'Material delivery', 'Structural inspection', 'Electrical wiring'];

    return (
        <div className="space-y-6">
            <section className="portal-card overflow-hidden">
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-900 px-6 py-8 text-white">
                    <p className="text-xs uppercase tracking-[0.25em] text-sky-300">Project Deep View</p>
                    <h2 className="mt-2 text-3xl font-semibold">Greenfield Housing Phase 2</h2>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="badge badge-green">72% Complete</span>
                        <span className="badge badge-blue">Active</span>
                    </div>
                </div>
                <div className="grid gap-4 px-6 py-6 md:grid-cols-2 xl:grid-cols-4">
                    {['Project Info', 'Timeline', 'Assigned Staff', 'Budget'].map((item) => (
                        <div key={item} className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">{item}</p>
                            <p className="mt-1 font-medium text-slate-900">Detailed module block</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
                <article className="portal-card p-6">
                    <h3 className="portal-section-title">Tasks List</h3>
                    <div className="mt-4 space-y-3">
                        {tasks.map((task) => (
                            <div key={task} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                <span>{task}</span>
                                <span className="badge badge-blue">Open</span>
                            </div>
                        ))}
                    </div>
                </article>

                <article className="portal-card p-6">
                    <h3 className="portal-section-title">Lifecycle Actions</h3>
                    <p className="portal-muted mt-2">Update status, assign team, and manage project phase transitions.</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Update Status</button>
                        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Assign Staff</button>
                    </div>
                </article>
            </section>
        </div>
    );
}