import React from 'react';

export default function Invoices() {
    const invoices = [
        { id: 'INV-1001', project: 'Greenfield Housing', status: 'Paid' },
        { id: 'INV-1002', project: 'Central Mall', status: 'Pending' },
        { id: 'INV-1003', project: 'Riverfront Apartments', status: 'Paid' }
    ];

    return (
        <div className="portal-card overflow-hidden">
            <div className="border-b border-slate-200 px-6 py-4">
                <h2 className="portal-section-title">Invoices</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="px-6 py-3 font-semibold">Invoice ID</th>
                            <th className="px-6 py-3 font-semibold">Project</th>
                            <th className="px-6 py-3 font-semibold">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                        {invoices.map((invoice) => (
                            <tr key={invoice.id}>
                                <td className="px-6 py-4 font-medium text-slate-900">{invoice.id}</td>
                                <td className="px-6 py-4 text-slate-600">{invoice.project}</td>
                                <td className="px-6 py-4"><span className={`badge ${invoice.status === 'Paid' ? 'badge-green' : 'badge-rose'}`}>{invoice.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}