import React from 'react';

export default function Budget() {
    const budgets = [
        { project: 'Greenfield Block A', budget: 'Rs. 10M', spent: 'Rs. 6.8M', remaining: 'Rs. 3.2M', status: 'On Track', pct: 68 },
        { project: 'Greenfield Block B', budget: 'Rs. 8M', spent: 'Rs. 7.4M', remaining: 'Rs. 600K', status: 'Warning', pct: 93 },
        { project: 'Greenfield Block C', budget: 'Rs. 12M', spent: 'Rs. 9.1M', remaining: 'Rs. 2.9M', status: 'On Track', pct: 76 }
    ];

    return (
        <div className="space-y-6">
            <section className="portal-card overflow-hidden">
                <div className="border-b border-slate-200 px-6 py-4">
                    <h2 className="portal-section-title">Budget Table</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Project</th>
                                <th className="px-6 py-3 font-semibold">Budget</th>
                                <th className="px-6 py-3 font-semibold">Spent</th>
                                <th className="px-6 py-3 font-semibold">Remaining</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {budgets.map((row) => (
                                <tr key={row.project}>
                                    <td className="px-6 py-4 font-medium text-slate-900">{row.project}</td>
                                    <td className="px-6 py-4 text-slate-600">{row.budget}</td>
                                    <td className="px-6 py-4 text-slate-600">{row.spent}</td>
                                    <td className="px-6 py-4 text-slate-600">{row.remaining}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${row.status === 'Warning' ? 'badge-rose' : 'badge-green'}`}>{row.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-3">
                {budgets.map((row) => (
                    <article key={`${row.project}-bar`} className="portal-card p-5">
                        <div className="flex items-center justify-between gap-3">
                            <h3 className="font-semibold text-slate-900">{row.project}</h3>
                            <span className="text-sm font-semibold text-slate-600">{row.pct}% used</span>
                        </div>
                        <div className="mt-4 h-3 rounded-full bg-slate-100">
                            <div className={`h-3 rounded-full ${row.pct > 90 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${row.pct}%` }}></div>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
}