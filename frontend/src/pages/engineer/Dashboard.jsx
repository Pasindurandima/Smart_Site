import React from 'react';

export default function Dashboard({ onNavigate }) {
    const kpis = [
        { key: 'today', label: "Today's Tasks", value: 8 },
        { key: 'completed', label: 'Completed', value: 3 },
        { key: 'pending', label: 'Pending', value: 5 },
        { key: 'progress', label: 'Site Progress', value: '42%' },
        { key: 'requests', label: 'Material Requests', value: 2 }
    ];

    const alerts = [
        '2 overdue tasks at Site A',
        'Missing attendance for 4 workers',
        '1 material request pending approval'
    ];

    return (
        <div className="space-y-4">
            <section className="portal-card p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="portal-section-title">Field Dashboard</h2>
                        <p className="portal-muted">Quick actions and daily overview</p>
                    </div>
                    <div className="text-xs text-slate-500">Sync: <span className="font-semibold text-emerald-500">Online</span></div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                    {kpis.map((k) => (
                        <div key={k.key} className="rounded-lg bg-white p-3 text-center shadow-sm">
                            <div className="text-sm text-slate-500">{k.label}</div>
                            <div className="mt-2 text-lg font-bold text-slate-900">{k.value}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    <button onClick={() => onNavigate?.('daily-updates')} className="flex-1 rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white">+ Add Daily Update</button>
                    <button onClick={() => onNavigate?.('upload-progress')} className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold">📸 Upload Progress</button>
                    <button onClick={() => onNavigate?.('material-request')} className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold">📦 Request Material</button>
                    <button onClick={() => onNavigate?.('task-list')} className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold">📋 View Tasks</button>
                    <button onClick={() => onNavigate?.('workflows')} className="flex-1 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700">🧭 Workflows</button>
                </div>
            </section>

            <section className="portal-card p-4">
                <h3 className="font-semibold">Alerts</h3>
                <div className="mt-2 space-y-2">
                    {alerts.map((a) => (
                        <div key={a} className="rounded-md bg-amber-50 p-2 text-sm text-amber-800">{a}</div>
                    ))}
                </div>
            </section>
        </div>
    );
}