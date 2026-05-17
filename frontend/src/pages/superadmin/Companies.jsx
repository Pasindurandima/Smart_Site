import React from 'react';

export default function Companies() {
    const companies = [
        { company: 'Apex Builders', owner: 'Rohan Perera', plan: 'Pro', users: 18, status: 'Active' },
        { company: 'Northline Construction', owner: 'Sana De Silva', plan: 'Enterprise', users: 42, status: 'Active' },
        { company: 'UrbanGrid Developers', owner: 'Imran Khan', plan: 'Starter', users: 7, status: 'Suspended' }
    ];

    return (
        <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <section className="portal-card overflow-hidden">
                <div className="border-b border-slate-200 px-6 py-4">
                    <h2 className="portal-section-title">Companies</h2>
                    <p className="portal-muted">Manage all tenant organizations on the platform.</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Company</th>
                                <th className="px-6 py-3 font-semibold">Owner</th>
                                <th className="px-6 py-3 font-semibold">Plan</th>
                                <th className="px-6 py-3 font-semibold">Users</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                                <th className="px-6 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {companies.map((row) => (
                                <tr key={row.company}>
                                    <td className="px-6 py-4 font-medium text-slate-900">{row.company}</td>
                                    <td className="px-6 py-4 text-slate-600">{row.owner}</td>
                                    <td className="px-6 py-4 text-slate-600">{row.plan}</td>
                                    <td className="px-6 py-4 text-slate-600">{row.users}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${row.status === 'Active' ? 'badge-green' : 'badge-rose'}`}>{row.status}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            <button className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white">Details</button>
                                            <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">Upgrade</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <aside className="portal-card p-6">
                <h2 className="portal-section-title">Tenant Detail Panel</h2>
                <div className="mt-4 space-y-4">
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Company Info</p>
                        <p className="mt-1 font-medium">Apex Builders, Colombo</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Subscription Plan</p>
                        <p className="mt-1 font-medium">Pro - Rs. 14,999/month</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Active Projects</p>
                        <p className="mt-1 font-medium">6 running projects</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">User Count</p>
                        <p className="mt-1 font-medium">18 users assigned</p>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                    <button className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Activate</button>
                    <button className="rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white">Suspend</button>
                    <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Delete Tenant</button>
                </div>
            </aside>
        </div>
    );
}