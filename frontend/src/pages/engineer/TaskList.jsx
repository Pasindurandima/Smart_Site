import React from 'react';

export default function TaskList({ onNavigate }) {
    const tasks = [
        { id: 'T-201', title: 'Pour footing', priority: 'High', status: 'To Do', deadline: '2026-05-20' },
        { id: 'T-202', title: 'Set formwork', priority: 'Medium', status: 'In Progress', deadline: '2026-05-22' }
    ];

    return (
        <div className="space-y-4">
            <section className="portal-card p-3">
                <div className="flex items-center justify-between">
                    <h2 className="portal-section-title">Tasks</h2>
                    <div className="text-sm text-slate-500">Filters</div>
                </div>

                <div className="mt-3 space-y-2">
                    {tasks.map((t) => (
                        <div key={t.id} className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm">
                            <div>
                                <div className="font-medium text-slate-900">{t.title}</div>
                                <div className="text-xs text-slate-500">{t.priority} • Due {t.deadline}</div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <div className={`badge ${t.status === 'Done' ? 'badge-green' : t.status === 'In Progress' ? 'badge-blue' : 'badge-amber'}`}>{t.status}</div>
                                <button onClick={() => onNavigate?.('task-details')} className="text-xs text-slate-600">Open</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}