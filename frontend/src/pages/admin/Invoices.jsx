import React from 'react';

export default function Invoices({ onNavigate }) {
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
                        <h2 className="portal-section-title">Invoices</h2>
                        <p className="portal-muted">Track client billing invoices and payment states.</p>
                    </div>
                    <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white" onClick={() => onNavigate?.('projects')}>Billing Flow</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Invoice ID</th>
                                <th className="px-6 py-3 font-semibold">Client</th>
                                <th className="px-6 py-3 font-semibold">Amount</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {[
                                ['INV-2103', 'ABC Construction', 'Rs. 340,000', 'Paid'],
                                ['INV-2107', 'Apex Builders', 'Rs. 120,000', 'Pending'],
                                ['INV-2110', 'Northline Construction', 'Rs. 560,000', 'Paid']
                            ].map((row) => (
                                <tr key={row[0]}>
                                    <td className="px-6 py-4 font-medium text-slate-900">{row[0]}</td>
                                    <td className="px-6 py-4 text-slate-600">{row[1]}</td>
                                    <td className="px-6 py-4 text-slate-600">{row[2]}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${row[3] === 'Paid' ? 'badge-green' : 'badge-rose'}`}>{row[3]}</span>
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