import React from 'react';

const invoices = [
    { id: 'INV-2103', date: '12 May 2026', amount: 'Rs. 340,000', status: 'Paid' },
    { id: 'INV-2107', date: '22 May 2026', amount: 'Rs. 120,000', status: 'Pending' },
    { id: 'INV-2110', date: '29 May 2026', amount: 'Rs. 560,000', status: 'Paid' }
];

export default function Invoices() {
    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-3">
                {[
                    { label: 'Total Billed', value: 'Rs. 1.04M', tone: 'badge-blue' },
                    { label: 'Paid Total', value: 'Rs. 920K', tone: 'badge-green' },
                    { label: 'Pending Total', value: 'Rs. 120K', tone: 'badge-amber' }
                ].map((item) => (
                    <article key={item.label} className="portal-card p-5">
                        <p className="portal-muted">{item.label}</p>
                        <div className="mt-2 flex items-center justify-between gap-3">
                            <h3 className="text-2xl font-semibold text-slate-900">{item.value}</h3>
                            <span className={`badge ${item.tone}`}>{item.label}</span>
                        </div>
                    </article>
                ))}
            </section>

            <section className="portal-card overflow-hidden">
                <div className="border-b border-slate-200 px-6 py-4">
                    <h2 className="portal-section-title">Billing History</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Invoice ID</th>
                                <th className="px-6 py-3 font-semibold">Date</th>
                                <th className="px-6 py-3 font-semibold">Amount</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                                <th className="px-6 py-3 font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {invoices.map((invoice) => (
                                <tr key={invoice.id}>
                                    <td className="px-6 py-4 font-medium text-slate-900">{invoice.id}</td>
                                    <td className="px-6 py-4 text-slate-600">{invoice.date}</td>
                                    <td className="px-6 py-4 text-slate-600">{invoice.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${invoice.status === 'Paid' ? 'badge-green' : 'badge-rose'}`}>{invoice.status}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white">Download PDF</button>
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