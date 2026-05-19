import React from 'react';
import { useClientWorkspace } from '../../hooks/useClientWorkspace';

export default function MyProject({ user }) {
    const {
        client,
        selectedProject,
        projectProgress,
        loading,
        error,
        formatCurrency
    } = useClientWorkspace(user);

    const team = [
        { role: 'Project Manager', name: selectedProject?.managerId ? `Manager #${selectedProject.managerId}` : 'Unassigned' },
        { role: 'Client', name: client?.company || client?.name || 'Client' },
        { role: 'Site Supervisor', name: 'TBD' },
        { role: 'Workers', name: 'Assigned on request' }
    ];

    if (loading) {
        return <div className="portal-card p-6">Loading project details...</div>;
    }

    if (error) {
        return <div className="portal-card p-6 text-rose-600">{error}</div>;
    }

    return (
        <div className="space-y-6">
            <section className="portal-card overflow-hidden">
                <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-sky-900 px-6 py-8 text-white">
                    <p className="text-xs uppercase tracking-[0.25em] text-sky-300">Project Header</p>
                    <h2 className="mt-2 text-3xl font-semibold">{selectedProject?.name || 'No active project'}</h2>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className="badge badge-green">{projectProgress != null ? `${projectProgress}% Complete` : 'Progress unavailable'}</span>
                        <span className={`badge ${selectedProject?.status?.toLowerCase().includes('delay') ? 'badge-rose' : 'badge-blue'}`}>{selectedProject?.status || 'Status unknown'}</span>
                        <span className="badge badge-amber">{selectedProject?.id ? `ID ${selectedProject.id}` : 'Project ID'}</span>
                    </div>
                </div>

                <div className="grid gap-4 px-6 py-6 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Description</p>
                        <p className="mt-1 font-medium">{selectedProject?.description || 'No description available'}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Client</p>
                        <p className="mt-1 font-medium">{client?.company || client?.name || 'Unknown client'}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Timeline</p>
                        <p className="mt-1 font-medium">{selectedProject?.startDate && selectedProject?.endDate ? `${new Date(selectedProject.startDate).toLocaleDateString()} - ${new Date(selectedProject.endDate).toLocaleDateString()}` : 'Dates not set'}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Location</p>
                        <p className="mt-1 font-medium">{selectedProject?.address || 'Location not available'}</p>
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
                        <span className="text-sm font-semibold text-emerald-600">{projectProgress != null ? `${projectProgress}% this month` : 'Metrics pending'}</span>
                    </div>
                    <div className="mt-5 h-4 rounded-full bg-slate-100">
                        <div className="h-4 rounded-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 transition-all" style={{ width: `${projectProgress || 0}%` }}></div>
                    </div>
                    <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">Phase</p>
                            <p className="mt-1 font-semibold">{selectedProject?.status || 'TBD'}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">Budget</p>
                            <p className="mt-1 font-semibold">{formatCurrency(selectedProject?.budget)}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">Client</p>
                            <p className="mt-1 font-semibold">{client?.company || client?.name || 'N/A'}</p>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
}