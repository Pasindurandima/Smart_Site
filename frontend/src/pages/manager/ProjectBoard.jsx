import React from 'react';

const columns = [
    { key: 'todo', title: 'TO DO', tasks: ['Site survey', 'Procure cement'] },
    { key: 'inprogress', title: 'IN PROGRESS', tasks: ['Foundation work', 'Electrical trench'] },
    { key: 'done', title: 'DONE', tasks: ['Design approval', 'Client signoff'] }
];

export default function ProjectBoard() {
    return (
        <div className="space-y-6">
            <section className="portal-card p-6">
                <h2 className="portal-section-title">Project Board</h2>
                <p className="portal-muted">Drag & drop tasks between columns to update status.</p>
            </section>

            <section className="grid gap-4 md:grid-cols-3">
                {columns.map((col) => (
                    <div key={col.key} className="rounded-2xl bg-slate-50 p-4">
                        <h3 className="text-sm font-semibold text-slate-700">{col.title}</h3>
                        <div className="mt-4 space-y-3">
                            {col.tasks.map((t) => (
                                <div key={t} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-medium text-slate-900">{t}</p>
                                            <p className="text-xs text-slate-500">Assignee: Not set</p>
                                        </div>
                                        <div className="text-xs text-slate-400">P2</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}