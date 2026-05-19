import React from 'react';

export default function Dashboard({ onNavigate }) {
    const kpis = [
        { label: 'Active Projects', value: '6', tone: 'badge-blue' },
        { label: 'Total Tasks', value: '184', tone: 'badge-amber' },
        { label: 'Completed Tasks', value: '112', tone: 'badge-green' },
        { label: 'Delayed Tasks', value: '9', tone: 'badge-rose' },
        { label: 'Overall Progress', value: '68%', tone: 'badge-blue' }
    ];

    const taskDist = { todo: 48, inprogress: 24, done: 112 };
    const alerts = ['3 Overdue tasks', 'Milestone delayed: Structure phase', 'Shortage: 12mm Rebar at Site B'];

    return (
        <div className="space-y-6">
            <section className="rounded-3xl bg-slate-950 px-6 py-5 text-white shadow-soft">
                <p className="text-xs uppercase tracking-[0.25em] text-sky-300">Manager Control Center</p>
                <h2 className="mt-1 text-2xl font-semibold">Project Control Dashboard</h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-300">Overview of your assigned projects, tasks, and risks.</p>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                {kpis.map((k) => (
                    <article key={k.label} className="portal-card p-5">
                        <p className="portal-muted">{k.label}</p>
                        <div className="mt-2 flex items-end justify-between gap-3">
                            <h3 className="text-2xl font-semibold text-slate-900">{k.value}</h3>
                            <span className={`badge ${k.tone}`}>{k.label}</span>
                        </div>
                    </article>
                ))}
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
                <article className="portal-card p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="portal-section-title">Task Distribution</h3>
                            <p className="portal-muted">To Do / In Progress / Done</p>
                        </div>
                        <div className="text-sm text-slate-600">Total: {taskDist.todo + taskDist.inprogress + taskDist.done}</div>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">To Do</p>
                            <h4 className="mt-2 text-xl font-semibold">{taskDist.todo}</h4>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">In Progress</p>
                            <h4 className="mt-2 text-xl font-semibold">{taskDist.inprogress}</h4>
                        </div>
                        <div className="rounded-2xl bg-slate-50 p-4">
                            <p className="portal-muted">Done</p>
                            <h4 className="mt-2 text-xl font-semibold">{taskDist.done}</h4>
                        </div>
                    </div>
                </article>

                <article className="portal-card p-6">
                    <h3 className="portal-section-title">Alerts</h3>
                    <div className="mt-4 space-y-3">
                        {alerts.map((a, i) => (
                            <div key={i} className="rounded-2xl border border-rose-100 bg-rose-50 p-3 text-sm text-rose-900">{a}</div>
                        ))}
                    </div>

                    <div className="mt-6 flex gap-3">
                        <button onClick={() => onNavigate?.('project-board')} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Open Board</button>
                        <button onClick={() => onNavigate?.('tasks')} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">View Tasks</button>
                        <button onClick={() => onNavigate?.('workflows')} className="rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700">Open Workflows</button>
                    </div>
                </article>
            </section>
        </div>
    );
}