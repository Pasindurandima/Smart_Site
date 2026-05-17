import React from 'react';

const payments = [
    { id: 'TXN-4432', date: '12 May 2026', method: 'Online', status: 'Paid' },
    { id: 'TXN-4491', date: '22 May 2026', method: 'Bank Transfer', status: 'Pending' },
    { id: 'TXN-4508', date: '29 May 2026', method: 'Cash', status: 'Paid' }
];

export default function Payments() {
    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-3">
                {[
                    { label: 'Paid Amount', value: 'Rs. 920K', tone: 'badge-green' },
                    { label: 'Pending Amount', value: 'Rs. 120K', tone: 'badge-rose' },
                    { label: 'Next Due', value: '2 Jun 2026', tone: 'badge-blue' }
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
                    <h2 className="portal-section-title">Payment History</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Transaction ID</th>
                                <th className="px-6 py-3 font-semibold">Date</th>
                                <th className="px-6 py-3 font-semibold">Method</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td className="px-6 py-4 font-medium text-slate-900">{payment.id}</td>
                                    <td className="px-6 py-4 text-slate-600">{payment.date}</td>
                                    <td className="px-6 py-4 text-slate-600">{payment.method}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${payment.status === 'Paid' ? 'badge-green' : 'badge-amber'}`}>{payment.status}</span>
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