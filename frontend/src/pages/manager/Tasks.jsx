import React from 'react';

export default function Tasks({ onNavigate }) {
    const tasks = [
        { id: 'T-101', title: 'Foundation work', project: 'Greenfield A', priority: 'High', status: 'In Progress', deadline: '2026-06-03' },
        { id: 'T-102', title: 'Order steel', project: 'Greenfield B', priority: 'Medium', status: 'To Do', deadline: '2026-05-25' },
        { id: 'T-103', title: 'Electrical trench', project: 'Skyline Plaza', priority: 'High', status: 'Done', deadline: '2026-05-10' }
    ];

    return (
        <div className="space-y-6">
            <section className="portal-card overflow-hidden">
                <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="portal-section-title">Tasks</h2>
                        <p className="portal-muted">Full task list with filters and assignment controls.</p>
                    </div>
                    <div>
                        <button onClick={() => onNavigate?.('project-board')} className="rounded-full bg-sky-600 px-3 py-2 text-xs font-semibold text-white">Open Board</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Task</th>
                                <th className="px-6 py-3 font-semibold">Project</th>
                                <th className="px-6 py-3 font-semibold">Priority</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                                <th className="px-6 py-3 font-semibold">Deadline</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {tasks.map((t) => (
                                <tr key={t.id} className="hover:bg-slate-50">
                                    <td className="px-6 py-4 font-medium text-slate-900">{t.title}</td>
                                    <td className="px-6 py-4 text-slate-600">{t.project}</td>
                                    <td className="px-6 py-4 text-slate-600">{t.priority}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${t.status === 'Done' ? 'badge-green' : t.status === 'In Progress' ? 'badge-blue' : 'badge-amber'}`}>{t.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{t.deadline}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}