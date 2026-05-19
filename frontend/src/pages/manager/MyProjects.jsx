import React from 'react';

export default function MyProjects({ onNavigate }) {
    const projects = [
        { name: 'Greenfield Block A', client: 'ABC Construction', progress: 72, status: 'Ongoing' },
        { name: 'Greenfield Block B', client: 'Apex Builders', progress: 61, status: 'Delayed' },
        { name: 'Skyline Plaza', client: 'Northline', progress: 100, status: 'Completed' }
    ];

    return (
        <div className="space-y-6">
            <section className="flex items-center justify-between gap-3 rounded-3xl bg-white px-6 py-5 shadow-soft border border-slate-200">
                <div>
                    <h2 className="portal-section-title">My Projects</h2>
                    <p className="portal-muted">Projects assigned to you for execution and coordination.</p>
                </div>
                <div className="flex gap-2">
                    <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">All</button>
                    <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">Active</button>
                    <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">Delayed</button>
                </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((p) => (
                    <div key={p.name} className="portal-card p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-slate-900">{p.name}</h3>
                                <p className="portal-muted">{p.client}</p>
                            </div>
                            <div className="text-sm text-slate-600">{p.status}</div>
                        </div>

                        <div className="mt-4">
                            <div className="h-3 w-full rounded-full bg-slate-100">
                                <div className="h-3 rounded-full bg-sky-600" style={{ width: `${p.progress}%` }}></div>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
                                <span>{p.progress}%</span>
                                <div className="flex gap-2">
                                    <button onClick={() => onNavigate?.('project-board')} className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">Board</button>
                                    <button onClick={() => onNavigate?.('tasks')} className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">Tasks</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}