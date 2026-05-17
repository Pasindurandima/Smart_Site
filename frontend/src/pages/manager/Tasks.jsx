import React from 'react';

export default function Tasks() {
    const tasks = ['Approve rebar order', 'Review progress photos', 'Update milestone plan'];

    return (
        <div className="portal-card overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="portal-section-title">Tasks</h2>
            </div>
            <div className="divide-y divide-slate-100 bg-white">
                {tasks.map((task) => (
                    <div key={task} className="px-6 py-4 text-sm text-slate-700">{task}</div>
                ))}
            </div>
        </div>
    );
}