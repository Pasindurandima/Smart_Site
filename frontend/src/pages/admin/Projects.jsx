import React from 'react';

export default function Projects() {
    const projects = [
        { name: 'Greenfield Housing Phase 2', status: 'Active', progress: 72, owner: 'Apex Builders' },
        { name: 'Central Mall Renovation', status: 'Delayed', progress: 48, owner: 'Northline Construction' },
        { name: 'Riverfront Apartments', status: 'Completed', progress: 100, owner: 'UrbanGrid Developers' }
    ];

    return (
        <div className="space-y-6">
            <section className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-slate-950 px-6 py-5 text-white shadow-soft">
                <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-sky-300">Projects Module</p>
                    <h2 className="mt-1 text-2xl font-semibold">Construction Projects</h2>
                </div>
                <button className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white">Create Project</button>
            </section>

            <section className="grid gap-4 xl:grid-cols-3">
                {projects.map((project) => (
                    <article key={project.name} className="portal-card p-5">
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
                                <p className="portal-muted">{project.owner}</p>
                            </div>
                            <span className={`badge ${project.status === 'Delayed' ? 'badge-amber' : project.status === 'Completed' ? 'badge-green' : 'badge-blue'}`}>{project.status}</span>
                        </div>
                        <div className="mt-4">
                            <div className="mb-2 flex items-center justify-between text-sm">
                                <span className="text-slate-600">Progress</span>
                                <span className="font-semibold">{project.progress}%</span>
                            </div>
                            <div className="h-3 rounded-full bg-slate-100">
                                <div className="h-3 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500" style={{ width: `${project.progress}%` }}></div>
                            </div>
                        </div>
                        <div className="mt-5 flex gap-2">
                            <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">Details</button>
                            <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">Delete</button>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
}