import React from 'react';

export default function TaskDetails({ onNavigate }) {
    const task = {
        id: 'T-201',
        title: 'Pour footing',
        desc: 'Coordinate concrete pour and leveling',
        workers: ['Nimal', 'Saman'],
        materials: ['Cement 50 bags', 'Sand 10m3'],
        deadline: '2026-05-20',
        status: 'To Do'
    };

    return (
        <div className="space-y-4">
            <section className="portal-card p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="portal-section-title">{task.title}</h2>
                        <p className="portal-muted">Task ID: {task.id}</p>
                    </div>
                    <div className="text-sm text-slate-600">Deadline: {task.deadline}</div>
                </div>

                <div className="mt-3 space-y-3">
                    <p className="text-sm text-slate-700">{task.desc}</p>
                    <div>
                        <p className="portal-muted text-sm">Assigned Workers</p>
                        <div className="mt-1 text-sm font-medium">{task.workers.join(', ')}</div>
                    </div>
                    <div>
                        <p className="portal-muted text-sm">Materials Required</p>
                        <div className="mt-1 text-sm">{task.materials.join(', ')}</div>
                    </div>
                </div>

                <div className="mt-4 flex gap-2">
                    <button className="flex-1 rounded-lg bg-emerald-600 px-3 py-2 text-white">Start Task</button>
                    <button className="flex-1 rounded-lg border border-slate-200 px-3 py-2" onClick={() => onNavigate?.('task-list')}>Back</button>
                </div>
            </section>
        </div>
    );
}