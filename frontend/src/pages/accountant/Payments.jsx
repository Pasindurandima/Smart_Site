import React from 'react';

export default function Payments() {
    const payments = [
        { id: 'TXN-4432', client: 'ABC Construction', amount: 'Rs. 340,000', method: 'Online', status: 'Success', date: '12 May 2026' },
        { id: 'TXN-4491', client: 'Apex Builders', amount: 'Rs. 120,000', method: 'Bank Transfer', status: 'Pending', date: '14 May 2026' },
        { id: 'TXN-4508', client: 'Northline Construction', amount: 'Rs. 560,000', method: 'Cash', status: 'Success', date: '16 May 2026' }
    ];

    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-3">
                {[
                    { label: 'Total Received', value: 'Rs. 9.8M', tone: 'badge-green' },
                    { label: 'Pending', value: 'Rs. 1.2M', tone: 'badge-amber' },
                    { label: 'Failed', value: '3', tone: 'badge-rose' }
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
                        <h2 className="portal-section-title">Payment Table</h2>
                        <p className="portal-muted">Banking-style payment tracking with success and failure states.</p>
                    </div>
                    <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Export Report</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Transaction ID</th>
                                <th className="px-6 py-3 font-semibold">Client</th>
                                <th className="px-6 py-3 font-semibold">Amount</th>
                                <th className="px-6 py-3 font-semibold">Method</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                                <th className="px-6 py-3 font-semibold">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td className="px-6 py-4 font-medium text-slate-900">{payment.id}</td>
                                    <td className="px-6 py-4 text-slate-600">{payment.client}</td>
                                    <td className="px-6 py-4 text-slate-600">{payment.amount}</td>
                                    <td className="px-6 py-4 text-slate-600">{payment.method}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${payment.status === 'Success' ? 'badge-green' : 'badge-rose'}`}>{payment.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{payment.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}