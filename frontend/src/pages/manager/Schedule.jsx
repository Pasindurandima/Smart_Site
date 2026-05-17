import React from 'react';

export default function Schedule() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

    return (
        <div className="portal-card p-6">
            <h2 className="portal-section-title">Project Calendar</h2>
            <div className="mt-4 grid grid-cols-5 gap-3">
                {days.map((day) => (
                    <div key={day} className="rounded-2xl bg-slate-50 p-4 text-center text-sm font-medium text-slate-700">{day}</div>
                ))}
            </div>
        </div>
    );
}