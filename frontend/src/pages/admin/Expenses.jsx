import React from 'react';

export default function Expenses() {
    const rows = [
        { category: 'Fuel', amount: 'Rs. 120,000', project: 'Greenfield Housing' },
        { category: 'Labour', amount: 'Rs. 860,000', project: 'Central Mall' },
        { category: 'Materials', amount: 'Rs. 3.8M', project: 'Riverfront Apartments' }
    ];

    return (
        <div className="portal-card overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="portal-section-title">Expenses</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="px-6 py-3 font-semibold">Category</th>
                            <th className="px-6 py-3 font-semibold">Amount</th>
                            <th className="px-6 py-3 font-semibold">Project</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {rows.map((row) => (
                            <tr key={row.category}>
                                <td className="px-6 py-4 font-medium text-slate-900">{row.category}</td>
                                <td className="px-6 py-4 text-slate-600">{row.amount}</td>
                                <td className="px-6 py-4 text-slate-600">{row.project}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}