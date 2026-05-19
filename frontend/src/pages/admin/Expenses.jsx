import React from 'react';

export default function Expenses({ onNavigate }) {
    const expenses = [
        { date: '12 May 2026', category: 'Fuel', amount: 'Rs. 48,000', project: 'Greenfield A' },
        { date: '13 May 2026', category: 'Material', amount: 'Rs. 320,000', project: 'Greenfield B' },
        { date: '15 May 2026', category: 'Labor', amount: 'Rs. 76,500', project: 'Skyline Plaza' }
    ];

    return (
        <div className="space-y-6">
            <section className="portal-card overflow-hidden">
                <div className="border-b border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="portal-section-title">Expenses</h2>
                        <p className="portal-muted">Company expense tracking by project and category.</p>
                    </div>
                    <button className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white" onClick={() => onNavigate?.('finance')}>Add Expense</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Date</th>
                                <th className="px-6 py-3 font-semibold">Category</th>
                                <th className="px-6 py-3 font-semibold">Amount</th>
                                <th className="px-6 py-3 font-semibold">Project</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {expenses.map((item) => (
                                <tr key={`${item.date}-${item.category}`}>
                                    <td className="px-6 py-4 text-slate-600">{item.date}</td>
                                    <td className="px-6 py-4 text-slate-600">{item.category}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900">{item.amount}</td>
                                    <td className="px-6 py-4 text-slate-600">{item.project}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}