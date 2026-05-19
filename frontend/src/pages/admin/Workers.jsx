import React from 'react';

export default function Workers({ onNavigate }) {
    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-3">
                {[
                    { label: 'Total Workers', value: '312', tone: 'badge-blue' },
                    { label: 'Active Today', value: '286', tone: 'badge-green' },
                    { label: 'Absentees', value: '26', tone: 'badge-rose' }
                ].map((item) => (
                    <article key={item.label} className="portal-card p-5">
                        <p className="portal-muted">{item.label}</p>
                        <div className="mt-2 flex items-end justify-between gap-3">
                            <h3 className="text-2xl font-semibold text-slate-900">{item.value}</h3>
                            <span className={`badge ${item.tone}`}>{item.label}</span>
                        </div>
                    </article>
                ))}
            </section>

            <section className="portal-card overflow-hidden">
                <div className="border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="portal-section-title">Worker Table</h2>
                        <p className="portal-muted">Manage workforce, attendance, salary, and site assignment.</p>
                    </div>
                    <button onClick={() => onNavigate?.('add-worker')} className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white">Add Worker</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Name</th>
                                <th className="px-6 py-3 font-semibold">Role</th>
                                <th className="px-6 py-3 font-semibold">Site</th>
                                <th className="px-6 py-3 font-semibold">Attendance</th>
                                <th className="px-6 py-3 font-semibold">Salary</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {[
                                ['Kamal Fernando', 'Mason', 'Site A', 'Present', 'Rs. 48,000', 'Active'],
                                ['Suresh Kumar', 'Electrician', 'Site B', 'Present', 'Rs. 54,000', 'Active'],
                                ['Madhavi Silva', 'Helper', 'Site C', 'Absent', 'Rs. 32,000', 'Inactive']
                            ].map((row) => (
                                <tr key={row[0]}>
                                    <td className="px-6 py-4 font-medium text-slate-900">{row[0]}</td>
                                    <td className="px-6 py-4 text-slate-600">{row[1]}</td>
                                    <td className="px-6 py-4 text-slate-600">{row[2]}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${row[3] === 'Present' ? 'badge-green' : 'badge-rose'}`}>{row[3]}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{row[4]}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${row[5] === 'Active' ? 'badge-green' : 'badge-rose'}`}>{row[5]}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}