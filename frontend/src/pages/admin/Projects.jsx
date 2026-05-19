import React, { useEffect, useState } from 'react';

const API = '/api/projects';

export default function Projects({ onNavigate, setSelectedProjectId }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => { load(); }, []);

    async function load() {
        setLoading(true);
        try {
            const res = await fetch(API);
            const data = await res.json();
            setProjects(data || []);
            setError(null);
        } catch (err) {
            setError('Failed to load projects');
        } finally { setLoading(false); }
    }

    async function remove(id) {
        if (!confirm('Delete project?')) return;
        try {
            const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            await load();
        } catch (err) {
            setError('Failed to delete project');
        }
    }

    return (
        <div className="space-y-6">
            <section className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-white px-6 py-5 shadow-soft border border-slate-200">
                <div>
                    <h2 className="portal-section-title">Projects</h2>
                    <p className="portal-muted">Manage active, completed, and delayed construction projects.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">Active</button>
                    <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">Completed</button>
                    <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">Delayed</button>
                    <button onClick={() => onNavigate?.('create-project')} className="rounded-full bg-sky-600 px-4 py-2 text-xs font-semibold text-white">Create Project</button>
                </div>
            </section>

            <section className="portal-card overflow-hidden">
                <div className="px-6 py-4">
                    {error && <div className="text-sm text-rose-500">{error}</div>}
                    {loading ? (
                        <div className="text-sm text-slate-500">Loading...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-600">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">Project</th>
                                        <th className="px-6 py-3 font-semibold">Client</th>
                                        <th className="px-6 py-3 font-semibold">Status</th>
                                        <th className="px-6 py-3 font-semibold">Budget</th>
                                        <th className="px-6 py-3 font-semibold">Created</th>
                                        <th className="px-6 py-3 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {projects.map((row) => (
                                        <tr key={row.id}>
                                            <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                                            <td className="px-6 py-4 text-slate-600">{row.clientId}</td>
                                            <td className="px-6 py-4">
                                                <span className={`badge ${row.status === 'Completed' ? 'badge-green' : row.status === 'Delayed' ? 'badge-rose' : 'badge-blue'}`}>{row.status || 'Active'}</span>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600">{row.budget || '-'}</td>
                                            <td className="px-6 py-4 text-slate-600">{row.createdAt ? new Date(row.createdAt).toLocaleDateString() : ''}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-2">
                                                    <button onClick={() => { setSelectedProjectId(row.id); onNavigate?.('project-details'); }} className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white">Details</button>
                                                    <button onClick={() => { setSelectedProjectId(row.id); onNavigate?.('create-project'); }} className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">Edit</button>
                                                    <button onClick={() => remove(row.id)} className="rounded-full border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-600">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}