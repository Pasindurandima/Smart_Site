import React from 'react';

export default function Users() {
    const users = [
        { name: 'Nimal Perera', email: 'nimal@apex.lk', role: 'Admin', company: 'Apex Builders', status: 'Active' },
        { name: 'Sana De Silva', email: 'sana@northline.lk', role: 'Engineer', company: 'Northline Construction', status: 'Active' },
        { name: 'Imran Khan', email: 'imran@urbangrid.lk', role: 'Client', company: 'UrbanGrid Developers', status: 'Inactive' }
    ];

    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-3">
                {['All Roles', 'All Companies', 'Active Only'].map((filter) => (
                    <div key={filter} className="portal-card p-4">
                        <p className="portal-muted">Filter</p>
                        <p className="mt-1 font-semibold text-slate-900">{filter}</p>
                    </div>
                ))}
            </section>

            <section className="portal-card overflow-hidden">
                <div className="border-b border-slate-200 px-6 py-4">
                    <h2 className="portal-section-title">Users</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Name</th>
                                <th className="px-6 py-3 font-semibold">Email</th>
                                <th className="px-6 py-3 font-semibold">Role</th>
                                <th className="px-6 py-3 font-semibold">Company</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                                <th className="px-6 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {users.map((user) => (
                                <tr key={user.email}>
                                    <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                                    <td className="px-6 py-4 text-slate-600">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${user.role === 'Admin' ? 'badge-blue' : user.role === 'Engineer' ? 'badge-amber' : 'badge-green'}`}>{user.role}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{user.company}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${user.status === 'Active' ? 'badge-green' : 'badge-rose'}`}>{user.status}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-2">
                                            <button className="rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white">Role</button>
                                            <button className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700">Reset Password</button>
                                        </div>
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