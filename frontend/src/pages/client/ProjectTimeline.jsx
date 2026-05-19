import React from 'react';
import { useClientWorkspace } from '../../hooks/useClientWorkspace';

const statusStyles = {
    completed: 'badge-green',
    active: 'badge-blue',
    pending: 'badge-amber',
    delayed: 'badge-rose'
};

export default function ProjectTimeline({ user }) {
    const { selectedProject, timelineStages, loading, error } = useClientWorkspace(user);

    if (loading) {
        return <div className="portal-card p-6">Loading timeline...</div>;
    }

    if (error) {
        return <div className="portal-card p-6 text-rose-600">{error}</div>;
    }

    if (!selectedProject) {
        return <div className="portal-card p-6">No project assigned to this client yet.</div>;
    }

    return (
        <div className="portal-card p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                    <h2 className="portal-section-title">Construction Timeline</h2>
                    <p className="portal-muted">Track each construction phase and milestone for {selectedProject.name}.</p>
                </div>
                <span className="badge badge-blue">Project ID #{selectedProject.id}</span>
            </div>

            <div className="space-y-5">
                {timelineStages.map((stage, index) => (
                    <div key={stage.title} className="relative pl-8">
                        <div className="absolute left-2 top-1 h-full w-px bg-slate-200"></div>
                        <div className="absolute left-0 top-2 h-4 w-4 rounded-full border-4 border-white bg-sky-500 shadow"></div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-base font-semibold text-slate-900">
                                        {index + 1}. {stage.title}
                                    </h3>
                                    <p className="portal-muted mt-1">{stage.dates}</p>
                                </div>
                                <span className={`badge ${statusStyles[stage.status]}`}>{stage.status}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}