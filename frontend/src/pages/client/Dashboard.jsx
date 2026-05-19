import React from 'react';
import { useClientWorkspace } from '../../hooks/useClientWorkspace';

const gallery = [
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80'
];

export default function Dashboard({ user, onNavigate }) {
    const {
        client,
        selectedProject,
        projectProgress,
        projectStatusTone,
        loading,
        error,
        formatCurrency
    } = useClientWorkspace(user);

    if (loading) {
        return <div className="portal-card p-6">Loading client dashboard...</div>;
    }

    if (error) {
        return <div className="portal-card p-6 text-rose-600">{error}</div>;
    }

    const metrics = [
        { label: 'Project', value: selectedProject?.name || 'No assigned project', tone: 'badge-blue' },
        { label: 'Status', value: selectedProject?.status || 'No status', tone: projectStatusTone },
        { label: 'Budget', value: formatCurrency(selectedProject?.budget), tone: 'badge-blue' },
        {
            label: 'Timeline',
            value: selectedProject?.startDate && selectedProject?.endDate
                ? `${new Date(selectedProject.startDate).toLocaleDateString()} - ${new Date(selectedProject.endDate).toLocaleDateString()}`
                : 'Date TBD',
            tone: 'badge-slate'
        },
        { label: 'Client', value: client?.company || client?.name || 'Client profile', tone: 'badge-green' }
    ];

    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {metrics.map((metric) => (
                    <article key={metric.label} className="portal-card p-5">
                        <p className="portal-muted">{metric.label}</p>
                        <div className="mt-2 flex items-end justify-between gap-3">
                            <h3 className="text-2xl font-semibold text-slate-900">{metric.value}</h3>
                            <span className={`badge ${metric.tone}`}>{metric.label}</span>
                        </div>
                    </article>
                ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
                <article className="portal-card p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="portal-section-title">Project Overview</h2>
                            <p className="portal-muted">{selectedProject?.address || 'Project address not available'}</p>
                        </div>
                        <span className={`badge ${projectStatusTone}`}>{selectedProject?.status || 'No Status'}</span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">Start Date</p>
                            <p className="mt-1 text-base font-semibold">{selectedProject?.startDate ? new Date(selectedProject.startDate).toLocaleDateString() : 'TBD'}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">End Date</p>
                            <p className="mt-1 text-base font-semibold">{selectedProject?.endDate ? new Date(selectedProject.endDate).toLocaleDateString() : 'TBD'}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">Project Description</p>
                            <p className="mt-1 text-base font-semibold">{selectedProject?.description || 'No description available'}</p>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">Client</p>
                            <p className="mt-1 text-base font-semibold">{client?.company || client?.name || 'Client not found'}</p>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="font-medium text-slate-700">Completion</span>
                            <span className="font-semibold text-slate-900">{projectProgress != null ? `${projectProgress}%` : 'Updating'}</span>
                        </div>
                        <div className="h-3 rounded-full bg-slate-100">
                            <div className="h-3 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500" style={{ width: `${projectProgress || 0}%` }}></div>
                        </div>
                    </div>
                </article>

                <article className="portal-card p-6">
                    <h2 className="portal-section-title">Latest Site Updates</h2>
                    <div className="mt-4 space-y-3">
                        {gallery.map((image, index) => (
                            <div key={index} className="overflow-hidden rounded-2xl border border-slate-200">
                                <img src={image} alt={`${selectedProject?.name || 'Project'} update ${index + 1}`} className="h-36 w-full object-cover" />
                            </div>
                        ))}
                    </div>
                </article>
            </section>

            <section className="portal-card p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="portal-section-title">Progress Analytics</h2>
                    <span className="badge badge-blue">Live Summary</span>
                </div>
                <div className="grid h-64 grid-cols-7 items-end gap-3">
                    {[24, 34, 28, 47, 56, 64, projectProgress || 72].map((value, index) => (
                        <div key={index} className="flex h-full flex-col justify-end gap-2">
                            <div className="rounded-t-2xl bg-gradient-to-t from-sky-600 to-emerald-400" style={{ height: `${value}%` }}></div>
                            <span className="text-center text-xs text-slate-500">W{index + 1}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <button
                        onClick={() => onNavigate?.('workflows')}
                        className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700"
                    >
                        Open Workflows
                    </button>
                </div>
            </section>
        </div>
    );
}