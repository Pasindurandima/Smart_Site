import React from 'react';
import { createWorkflowEvent } from '../../api/workflowApi';
import { createOperationalRecord } from '../../api/operationsApi';

export default function GenerateInvoice({ user, onNavigate }) {
    const previewItems = [
        { item: 'Foundation Work', qty: 1, amount: 'Rs. 120,000' },
        { item: 'Steel Materials', qty: 12, amount: 'Rs. 180,000' },
        { item: 'Labor Charges', qty: 1, amount: 'Rs. 92,000' }
    ];

    return (
        <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
            <section className="portal-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="portal-section-title">Invoice Builder</h2>
                        <p className="portal-muted">Create a professional invoice and send it to the client.</p>
                    </div>
                    <span className="badge badge-blue">PDF Ready</span>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <select className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-400">
                        <option>Client Selection</option>
                        <option>ABC Construction</option>
                        <option>Apex Builders</option>
                    </select>
                    <select className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-400">
                        <option>Project Selection</option>
                        <option>Greenfield Block A</option>
                        <option>Greenfield Block B</option>
                    </select>
                    <input className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-400 md:col-span-2" placeholder="Invoice title" />
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Item</th>
                                <th className="px-4 py-3 font-semibold">Qty</th>
                                <th className="px-4 py-3 font-semibold">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {previewItems.map((row) => (
                                <tr key={row.item}>
                                    <td className="px-4 py-3 text-slate-900">{row.item}</td>
                                    <td className="px-4 py-3 text-slate-600">{row.qty}</td>
                                    <td className="px-4 py-3 text-slate-600">{row.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                    <button onClick={() => createOperationalRecord({ recordType: 'INVOICE', projectId: null, title: 'Project invoice', amount: 392000, quantity: 1, status: 'GENERATED', notes: 'Foundation work, steel materials, and labor charges.', actorRole: user?.role || 'ACCOUNTANT' }).then(() => createWorkflowEvent({ projectId: null, workType: 'INVOICING', title: 'Invoice generated', description: 'An invoice PDF was generated for a client.', actorRole: user?.role || 'ACCOUNTANT', status: 'COMPLETED' }))} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Generate PDF</button>
                    <button onClick={() => createOperationalRecord({ recordType: 'INVOICE', projectId: null, title: 'Invoice sent', amount: 392000, quantity: 1, status: 'SENT', notes: 'Invoice sent to client by email.', actorRole: user?.role || 'ACCOUNTANT' }).then(() => createWorkflowEvent({ projectId: null, workType: 'NOTIFICATION', title: 'Invoice email sent', description: 'An invoice notification was sent to the client.', actorRole: user?.role || 'ACCOUNTANT', status: 'COMPLETED' }))} className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Send Email</button>
                    <button onClick={() => onNavigate?.('invoices')} className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Back to Invoices</button>
                </div>
            </section>

            <aside className="portal-card p-6">
                <h2 className="portal-section-title">Live Preview</h2>
                <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="border-b border-slate-200 pb-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-sky-600">Invoice Preview</p>
                        <h3 className="mt-1 text-xl font-semibold text-slate-900">SmartSite Build Pvt Ltd</h3>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-slate-700">
                        <p>Client: ABC Construction</p>
                        <p>Project: Greenfield Block A</p>
                        <p>Tax: 8%</p>
                        <p>Discount: 0%</p>
                    </div>
                    <div className="mt-5 rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Total Amount</p>
                        <p className="mt-1 text-3xl font-semibold text-slate-900">Rs. 392,000</p>
                    </div>
                </div>
            </aside>
        </div>
    );
}