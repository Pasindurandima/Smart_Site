import React from 'react';

export default function Inventory() {
    const items = [
        { name: 'Cement OPC', category: 'Binder', stock: 'Low' },
        { name: 'Rebar 12mm', category: 'Steel', stock: 'Critical' },
        { name: 'Fine Sand', category: 'Aggregate', stock: 'Healthy' }
    ];

    return (
        <section className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
                {['Low Stock Alerts', 'Material Categories', 'Site Transfers'].map((item) => (
                    <div key={item} className="portal-card p-5">
                        <p className="portal-muted">{item}</p>
                        <p className="mt-1 text-xl font-semibold text-slate-900">Overview</p>
                    </div>
                ))}
            </div>

            <div className="portal-card overflow-hidden">
                <div className="border-b border-slate-200 px-6 py-4">
                    <h2 className="portal-section-title">Inventory</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Material</th>
                                <th className="px-6 py-3 font-semibold">Category</th>
                                <th className="px-6 py-3 font-semibold">Stock Level</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {items.map((item) => (
                                <tr key={item.name}>
                                    <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                                    <td className="px-6 py-4 text-slate-600">{item.category}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${item.stock === 'Healthy' ? 'badge-green' : item.stock === 'Low' ? 'badge-amber' : 'badge-rose'}`}>{item.stock}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}