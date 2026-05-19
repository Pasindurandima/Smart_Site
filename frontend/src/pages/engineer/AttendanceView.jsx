import React from 'react';

export default function AttendanceView() {
    const workers = [
        { name: 'Nimal', checkIn: '07:45', checkOut: '16:30', status: 'Present' },
        { name: 'Saman', checkIn: '-', checkOut: '-', status: 'Absent' }
    ];

    return (
        <div className="space-y-4">
            <section className="portal-card p-4">
                <h2 className="portal-section-title">Attendance</h2>
                <p className="portal-muted">Today: Present / Absent / Late</p>
            </section>

            <section className="portal-card p-3">
                <div className="space-y-2">
                    {workers.map((w) => (
                        <div key={w.name} className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm">
                            <div>
                                <div className="font-medium">{w.name}</div>
                                <div className="text-xs text-slate-500">Check-in: {w.checkIn}</div>
                            </div>
                            <div className="text-sm text-slate-700">{w.status}</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}