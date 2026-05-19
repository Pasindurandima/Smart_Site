import React from 'react';

export default function TaskDetails({ onNavigate }) {
    const task = {
        id: 'T-101',
        title: 'Foundation work',
        desc: 'Excavation, footings, and initial concrete pour for Level 1',
        assignees: ['Kamal Fernando'],
        deadline: '2026-06-03',
        status: 'In Progress'
    };

    return (
        <div className="space-y-6">
            <section className="portal-card p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="portal-section-title">{task.title}</h2>
                        <p className="portal-muted">Task ID: {task.id}</p>
                    </div>
                    <div className="text-sm text-slate-600">Deadline: {task.deadline}</div>
                </div>

                <div className="mt-4">
                    <p className="text-sm text-slate-700">{task.desc}</p>
                    <div className="mt-4 flex items-center gap-3">
                        <div>
                            <p className="portal-muted">Assignees</p>
                            <p className="font-semibold">{task.assignees.join(', ')}</p>
                        </div>

                        <div>
                            <p className="portal-muted">Status</p>
                            <span className="badge badge-blue">{task.status}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex gap-3">
                    <button onClick={() => onNavigate?.('tasks')} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Back to Tasks</button>
                    <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Mark Complete</button>
                </div>
            </section>
        </div>
    );
}