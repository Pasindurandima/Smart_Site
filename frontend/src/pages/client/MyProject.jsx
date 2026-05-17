import React from 'react';

export default function MyProject() {
    const team = [
        { role: 'Project Manager', name: 'Arun Menon' },
        { role: 'Lead Engineer', name: 'Sana Perera' },
        { role: 'Site Supervisor', name: 'Imran Khan' },
        { role: 'Workers', name: '48 Assigned' }
    ];

    return (
        <div className="space-y-6">
            <section className="portal-card overflow-hidden">
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-900 px-6 py-8 text-white">
                    <p className="text-xs uppercase tracking-[0.25em] text-sky-300">Project Header</p>
                    <h2 className="mt-2 text-3xl font-semibold">Greenfield Housing Phase 2</h2>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="badge badge-green">72% Complete</span>
                        <span className="badge badge-blue">Active</span>
                        <span className="badge badge-amber">2 Open Risks</span>
                    </div>
                </div>

                <div className="grid gap-4 px-6 py-6 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Description</p>
                        <p className="mt-1 font-medium">Mixed-use residential construction with 4 blocks and parking deck.</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Contractor</p>
                        <p className="mt-1 font-medium">SmartSite Build Pvt Ltd</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Timeline</p>
                        <p className="mt-1 font-medium">12 Jan 2026 - 30 Nov 2026</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Location</p>
                        <p className="mt-1 font-medium">Colombo 05, Sri Lanka</p>
                    </div>
                </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-2">
                <article className="portal-card p-6">
                    <h3 className="portal-section-title">Team Section</h3>
                    <div className="mt-4 space-y-3">
                        {team.map((member) => (
                            <div key={member.role} className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{member.role}</p>
                                    <p className="font-semibold text-slate-900">{member.name}</p>
                                </div>
                                <span className="badge badge-blue">Assigned</span>
                            </div>
                        ))}
                    </div>
                </article>

                <article className="portal-card p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="portal-section-title">Completion Progress</h3>
                        <span className="text-sm font-semibold text-emerald-600">+4% this month</span>
                    </div>
                    <div className="mt-5 h-4 rounded-full bg-slate-100">
                        <div className="h-4 w-[72%] rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 transition-all"></div>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">Phase</p>
                            <p className="mt-1 font-semibold">Structure</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">Budget Used</p>
                            <p className="mt-1 font-semibold">63%</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">Milestones</p>
                            <p className="mt-1 font-semibold">14/19</p>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
}