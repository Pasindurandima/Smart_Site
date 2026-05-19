import React from 'react';

export default function Inventory({ onNavigate }) {
    return (
        <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-3">
                {[
                    { label: 'Materials', value: '92', tone: 'badge-blue' },
                    { label: 'Low Stock', value: '8', tone: 'badge-amber' },
                    { label: 'Reorder Alerts', value: '5', tone: 'badge-rose' }
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
                        <h2 className="portal-section-title">Stock Table</h2>
                        <p className="portal-muted">Track materials, suppliers, and reorder warnings.</p>
                    </div>
                    <button onClick={() => onNavigate?.('add-material')} className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white">Add Material</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-6 py-3 font-semibold">Material</th>
                                <th className="px-6 py-3 font-semibold">Quantity</th>
                                <th className="px-6 py-3 font-semibold">Supplier</th>
                                <th className="px-6 py-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {[
                                ['Cement OPC', '120 bags', 'Lanka Cement', 'Low Stock'],
                                ['Steel Rebar 12mm', '340 rods', 'Metro Steel', 'Healthy'],
                                ['Sand', '28 m³', 'River Quarry', 'Reorder Soon']
                            ].map((row) => (
                                <tr key={row[0]}>
                                    <td className="px-6 py-4 font-medium text-slate-900">{row[0]}</td>
                                    <td className="px-6 py-4 text-slate-600">{row[1]}</td>
                                    <td className="px-6 py-4 text-slate-600">{row[2]}</td>
                                    <td className="px-6 py-4">
                                        <span className={`badge ${row[3] === 'Healthy' ? 'badge-green' : row[3] === 'Low Stock' ? 'badge-amber' : 'badge-rose'}`}>{row[3]}</span>
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