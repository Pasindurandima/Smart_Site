import React, { useEffect, useState } from 'react';

const API = '/api/projects';

export default function ProjectDetails({ onNavigate, selectedProjectId }) {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (selectedProjectId) load(selectedProjectId);
    }, [selectedProjectId]);

    async function load(id) {
        setLoading(true);
        try {
            const res = await fetch(`${API}/${id}`);
            if (!res.ok) throw new Error('Failed');
            const data = await res.json();
            setProject(data);
        } catch (err) {
            setError('Unable to load project');
        } finally { setLoading(false); }
    }

    if (!selectedProjectId) return (
        <div className="panel">No project selected. <button onClick={() => onNavigate?.('projects')} className="ml-2 underline">Back</button></div>
    );

    if (loading) return <div className="text-sm text-slate-500">Loading...</div>;
    if (error) return <div className="text-sm text-rose-500">{error}</div>;
    if (!project) return null;

    return (
        <div className="space-y-6">
            <section className="rounded-3xl bg-gradient-to-r from-slate-950 to-sky-950 px-6 py-8 text-white shadow-soft">
                <p className="text-xs uppercase tracking-[0.25em] text-sky-300">Project Lifecycle</p>
                <h2 className="mt-2 text-3xl font-semibold">{project.name}</h2>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="badge badge-green">{project.status || 'Active'}</span>
                    <span className="badge badge-blue">{project.progress || '0% Complete'}</span>
                </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-3">
                <article className="portal-card p-6 xl:col-span-2">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h2 className="portal-section-title">Progress Overview</h2>
                            <p className="portal-muted">Timeline milestones and completion bar</p>
                        </div>
                        <button onClick={() => onNavigate?.('create-project')} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Edit Project</button>
                    </div>
                    <div className="mt-5 h-4 rounded-full bg-slate-100">
                        <div className="h-4 w-[72%] rounded-full bg-gradient-to-r from-sky-500 to-emerald-500"></div>
                    </div>
                    <div className="mt-5 grid gap-3 md:grid-cols-3">
                        {['Foundation', 'Structure', 'Finishing'].map((milestone, index) => (
                            <div key={milestone} className="rounded-2xl bg-slate-50 p-4">
                                <p className="portal-muted">Milestone {index + 1}</p>
                                <p className="mt-1 font-semibold text-slate-900">{milestone}</p>
                            </div>
                        ))}
                    </div>
                </article>

                <article className="portal-card p-6">
                    <h2 className="portal-section-title">Project Info</h2>
                    <div className="mt-4 space-y-3 text-sm">
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">Client ID</p>
                            <p className="mt-1 font-semibold text-slate-900">{project.clientId}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">Budget</p>
                            <p className="mt-1 font-semibold text-slate-900">{project.budget || '-'}</p>
                        </div>
                    </div>
                    <button onClick={() => onNavigate?.('projects')} className="mt-5 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Back to Projects</button>
                </article>
            </section>

            <section className="portal-card p-6">
                <h2 className="portal-section-title">Description</h2>
                <div className="mt-4 text-sm text-slate-700">{project.description}</div>
            </section>
        </div>
    );
}