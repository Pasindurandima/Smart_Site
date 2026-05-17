import React from 'react';

export default function Workers() {
    const workers = [
        { name: 'Mahesh Silva', role: 'Foreman', attendance: '96%', salary: 'Paid' },
        { name: 'Ravi Fernando', role: 'Mason', attendance: '91%', salary: 'Pending' },
        { name: 'Nimal Perera', role: 'Electrician', attendance: '88%', salary: 'Paid' }
    ];

    return (
        <section className="portal-card overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="portal-section-title">Workers</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="px-6 py-3 font-semibold">Name</th>
                            <th className="px-6 py-3 font-semibold">Role</th>
                            <th className="px-6 py-3 font-semibold">Attendance</th>
                            <th className="px-6 py-3 font-semibold">Salary Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {workers.map((worker) => (
                            <tr key={worker.name}>
                                <td className="px-6 py-4 font-medium text-slate-900">{worker.name}</td>
                                <td className="px-6 py-4 text-slate-600">{worker.role}</td>
                                <td className="px-6 py-4 text-slate-600">{worker.attendance}</td>
                                <td className="px-6 py-4">
                                    <span className={`badge ${worker.salary === 'Paid' ? 'badge-green' : 'badge-amber'}`}>{worker.salary}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}