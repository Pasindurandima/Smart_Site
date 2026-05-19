import React from 'react';

export default function Invoices({ onNavigate }) {
    const invoices = [
        { id: 'INV-2103', client: 'ABC Construction', project: 'Greenfield Block A', amount: 'Rs. 340,000', status: 'Paid', action: 'Download' },
        { id: 'INV-2107', client: 'Apex Builders', project: 'Greenfield Block B', amount: 'Rs. 120,000', status: 'Pending', action: 'View' },
        { id: 'INV-2110', client: 'Northline Construction', project: 'Greenfield Block C', amount: 'Rs. 560,000', status: 'Paid', action: 'Download' }
    ];

    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-3">
                {[
                    { label: 'Total Invoices', value: '312', tone: 'badge-blue' },
                    { label: 'Paid', value: '264', tone: 'badge-green' },
                    { label: 'Pending', value: '48', tone: 'badge-amber' }
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
                        <h2 className="portal-section-title">Invoice Table</h2>
                        <p className="portal-muted">Manage client billing invoices and PDF downloads.</p>
                    </div>
                    <button onClick={() => onNavigate?.('generate-invoice')} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Generate Invoice</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Invoice ID</th>
                                <th className="px-6 py-3 font-semibold">Client</th>
                                <th className="px-6 py-3 font-semibold">Project</th>
                                <th className="px-6 py-3 font-semibold">Amount</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                                <th className="px-6 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {invoices.map((invoice) => (
                                <tr key={invoice.id}>
                                    <td className="px-6 py-4 font-medium text-slate-900">{invoice.id}</td>
                                    <td className="px-6 py-4 text-slate-600">{invoice.client}</td>
                                    <td className="px-6 py-4 text-slate-600">{invoice.project}</td>
                                    <td className="px-6 py-4 text-slate-600">{invoice.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${invoice.status === 'Paid' ? 'badge-green' : 'badge-rose'}`}>{invoice.status}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">{invoice.action}</button>
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