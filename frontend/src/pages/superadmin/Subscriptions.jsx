import React from 'react';

export default function Subscriptions() {
    const plans = [
        { name: 'Starter', price: 'Rs. 4,999/mo', features: ['2 projects', '10 users', 'Basic reports'], active: 24, popular: false },
        { name: 'Pro', price: 'Rs. 14,999/mo', features: ['Unlimited projects', 'Inventory', 'Client portal'], active: 78, popular: true },
        { name: 'Enterprise', price: 'Rs. 49,999+/mo', features: ['Multi-branch', 'White label', 'Advanced analytics'], active: 30, popular: false }
    ];

    const rows = [
        { company: 'Apex Builders', plan: 'Pro', start: '02 May 2026', next: '02 Jun 2026', status: 'Active' },
        { company: 'Northline Construction', plan: 'Enterprise', start: '11 Apr 2026', next: '11 Jun 2026', status: 'Active' },
        { company: 'UrbanGrid Developers', plan: 'Starter', start: '19 Mar 2026', next: '19 Jun 2026', status: 'Trial' }
    ];

    return (
        <div className="space-y-6">
            <section className="grid gap-4 xl:grid-cols-3">
                {plans.map((plan) => (
                    <article key={plan.name} className={`portal-card p-6 ${plan.popular ? 'ring-2 ring-sky-400' : ''}`}>
                        {plan.popular && <span className="badge badge-blue mb-3">Popular</span>}
                        <h2 className="text-2xl font-semibold text-slate-900">{plan.name}</h2>
                        <p className="mt-1 portal-muted">{plan.price}</p>
                        <div className="mt-4 space-y-2 text-sm text-slate-700">
                            {plan.features.map((feature) => (
                                <div key={feature} className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-5 flex items-center justify-between">
                            <span className="text-sm text-slate-500">Active companies</span>
                            <span className="text-xl font-semibold text-slate-900">{plan.active}</span>
                        </div>
                    </article>
                ))}
            </section>

            <section className="portal-card overflow-hidden">
                <div className="border-b border-slate-200 px-6 py-4">
                    <h2 className="portal-section-title">Subscription Table</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Company</th>
                                <th className="px-6 py-3 font-semibold">Plan</th>
                                <th className="px-6 py-3 font-semibold">Start Date</th>
                                <th className="px-6 py-3 font-semibold">Next Billing</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {rows.map((row) => (
                                <tr key={row.company}>
                                    <td className="px-6 py-4 font-medium text-slate-900">{row.company}</td>
                                    <td className="px-6 py-4 text-slate-600">{row.plan}</td>
                                    <td className="px-6 py-4 text-slate-600">{row.start}</td>
                                    <td className="px-6 py-4 text-slate-600">{row.next}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${row.status === 'Active' ? 'badge-green' : 'badge-amber'}`}>{row.status}</span>
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