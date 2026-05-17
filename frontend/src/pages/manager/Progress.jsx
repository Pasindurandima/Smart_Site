import React from 'react';

export default function Progress() {
    const metrics = [42, 58, 66, 74, 81, 89];

    return (
        <div className="portal-card p-6">
            <h2 className="portal-section-title">Progress Reports</h2>
            <div className="mt-6 grid h-64 grid-cols-6 items-end gap-3">
                {metrics.map((value, index) => (
                    <div key={index} className="flex h-full flex-col justify-end gap-2">
                        <div className="rounded-t-2xl bg-gradient-to-t from-sky-600 to-emerald-400" style={{ height: `${value}%` }}></div>
                        <span className="text-center text-xs text-slate-500">W{index + 1}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}