import React, { useEffect, useState } from 'react';

const API = '/api/clients';

function emptyForm() {
    return { name: '', company: '', email: '', phone: '', address: '', notes: '' };
}

export default function Clients() {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formOpen, setFormOpen] = useState(false);
    const [form, setForm] = useState(emptyForm());
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { load(); }, []);

    async function load() {
        setLoading(true);
        try {
            const res = await fetch(API);
            const data = await res.json();
            setClients(data || []);
            setError(null);
        } catch (err) {
            setError('Failed to load clients');
        } finally { setLoading(false); }
    }

    async function submit(e) {
        e && e.preventDefault();
        try {
            const method = editingId ? 'PUT' : 'POST';
            const url = editingId ? `${API}/${editingId}` : API;
            const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
            if (!res.ok) throw new Error('Save failed');
            await load();
            setForm(emptyForm());
            setEditingId(null);
            setFormOpen(false);
        } catch (err) {
            setError('Failed to save client');
        }
    }

    async function edit(c) {
        setEditingId(c.id);
        setForm({ name: c.name || '', company: c.company || '', email: c.email || '', phone: c.phone || '', address: c.address || '', notes: c.notes || '' });
        setFormOpen(true);
    }

    async function remove(id) {
        if (!confirm('Delete client?')) return;
        try {
            const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Delete failed');
            await load();
        } catch (err) {
            setError('Failed to delete client');
        }
    }

    return (
        <div className="space-y-6">
            <section className="portal-card overflow-hidden">
                <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="portal-section-title">Clients</h2>
                        <p className="portal-muted">Manage clients and assign them to active projects.</p>
                    </div>
                    <div>
                        <button onClick={() => { setForm(emptyForm()); setEditingId(null); setFormOpen(true); }} className="rounded-full bg-sky-600 px-3 py-2 text-xs font-semibold text-white">+ New Client</button>
                    </div>
                </div>

                <div className="px-6 py-4">
                    {error && <div className="text-sm text-rose-500">{error}</div>}
                    {loading ? (
                        <div className="text-sm text-slate-500">Loading...</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-sm">
                                <thead className="bg-slate-50 text-slate-600">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">Client</th>
                                        <th className="px-6 py-3 font-semibold">Company</th>
                                        <th className="px-6 py-3 font-semibold">Contact</th>
                                        <th className="px-6 py-3 font-semibold">Email</th>
                                        <th className="px-6 py-3 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {clients.map((c) => (
                                        <tr key={c.id}>
                                            <td className="px-6 py-4 font-medium text-slate-900">{c.name}</td>
                                            <td className="px-6 py-4 text-slate-600">{c.company}</td>
                                            <td className="px-6 py-4 text-slate-600">{c.phone}</td>
                                            <td className="px-6 py-4 text-slate-600">{c.email}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => edit(c)} className="text-xs text-slate-600">Edit</button>
                                                    <button onClick={() => remove(c.id)} className="text-xs text-rose-600">Delete</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>

            {formOpen && (
                <section className="portal-card p-4">
                    <h3 className="portal-section-title">{editingId ? 'Edit Client' : 'New Client'}</h3>
                    <form onSubmit={submit} className="mt-3 space-y-2">
                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required placeholder="Client name" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                        <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                        <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
                        <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Address" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" rows={2} />
                        <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Notes" className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" rows={2} />
                        <div className="flex gap-2">
                            <button type="submit" className="rounded-full bg-sky-600 px-3 py-2 text-xs font-semibold text-white">Save</button>
                            <button type="button" onClick={() => { setFormOpen(false); setEditingId(null); }} className="rounded-full border border-slate-200 px-3 py-2 text-xs">Cancel</button>
                        </div>
                    </form>
                </section>
            )}
        </div>
    );
}