import React from 'react';

export default function Expenses({ onNavigate }) {
    const expenses = [
        { date: '12 May 2026', category: 'Fuel', description: 'Site generator fuel refill', amount: 'Rs. 48,000', project: 'Greenfield Block A', status: 'Approved' },
        { date: '13 May 2026', category: 'Material', description: 'Cement purchase', amount: 'Rs. 320,000', project: 'Greenfield Block B', status: 'Pending' },
        { date: '15 May 2026', category: 'Labor', description: 'Overtime payout', amount: 'Rs. 76,500', project: 'Greenfield Block C', status: 'Approved' }
    ];

    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-3">
                {[
                    { label: 'This Month Expenses', value: 'Rs. 4.2M', tone: 'badge-rose' },
                    { label: 'Approved', value: 'Rs. 3.6M', tone: 'badge-green' },
                    { label: 'Pending', value: 'Rs. 620K', tone: 'badge-amber' }
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
                        <h2 className="portal-section-title">Expense Table</h2>
                        <p className="portal-muted">Track company expenses with project mapping and approval status.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">Project Filter</button>
                        <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">Date Range</button>
                        <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">Category</button>
                        <button onClick={() => onNavigate?.('add-expense')} className="rounded-full bg-emerald-600 px-3 py-2 text-xs font-semibold text-white">Add Expense</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Date</th>
                                <th className="px-6 py-3 font-semibold">Category</th>
                                <th className="px-6 py-3 font-semibold">Description</th>
                                <th className="px-6 py-3 font-semibold">Amount</th>
                                <th className="px-6 py-3 font-semibold">Project</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {expenses.map((expense) => (
                                <tr key={`${expense.date}-${expense.description}`}>
                                    <td className="px-6 py-4 text-slate-600">{expense.date}</td>
                                    <td className="px-6 py-4 text-slate-600">{expense.category}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900">{expense.description}</td>
                                    <td className="px-6 py-4 text-slate-600">{expense.amount}</td>
                                    <td className="px-6 py-4 text-slate-600">{expense.project}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${expense.status === 'Approved' ? 'badge-green' : 'badge-amber'}`}>{expense.status}</span>
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