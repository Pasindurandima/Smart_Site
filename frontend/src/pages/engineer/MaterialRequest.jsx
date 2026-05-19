import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MaterialRequest({ user }) {
    const [requests, setRequests] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [form, setForm] = useState({ projectId: '', materialName: '', materialId: '', quantity: 0, priority: 'MEDIUM' });

    useEffect(() => {
        fetchProjects();
        fetchRequests();
    }, []);

    const getAuthHeaders = () => {
        const erpUser = localStorage.getItem('erpUser');
        if (!erpUser) return {};
        try {
            const userData = JSON.parse(erpUser);
            return {
                'Authorization': `Bearer ${userData.token}`,
                'X-Company-Id': userData.companyId
            };
        } catch {
            return {};
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/projects', {
                headers: getAuthHeaders()
            });
            if (response.data && response.data.length > 0) {
                setProjects(response.data);
                // Auto-fill first project as default
                setForm(prev => ({ ...prev, projectId: response.data[0].id }));
            }
        } catch (err) {
            console.error('Failed to fetch projects:', err);
        }
    };

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/material-requests', {
                headers: getAuthHeaders()
            });
            setRequests(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load requests');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!form.materialName || form.quantity <= 0) {
            setError('Please fill in all required fields');
            return;
        }

        try {
            setLoading(true);
            const payload = {
                projectId: form.projectId ? parseInt(form.projectId) : null,
                engineerId: user?.id || null,
                materialId: form.materialId ? parseInt(form.materialId) : null,
                materialName: form.materialName,
                quantity: form.quantity,
                priority: form.priority
            };
            
            const response = await axios.post('http://localhost:8080/api/material-requests', payload, {
                headers: getAuthHeaders()
            });

            setRequests((s) => [response.data, ...s]);
            setForm({ projectId: projects.length > 0 ? projects[0].id : '', materialName: '', materialId: '', quantity: 0, priority: 'MEDIUM' });
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit request');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString();
    };

    return (
        <div className="space-y-4">
            <section className="portal-card p-4">
                <h2 className="portal-section-title">Request Material</h2>
                {error && <div className="mb-3 rounded-md bg-red-50 p-2 text-sm text-red-700">{error}</div>}
                <form onSubmit={submit} className="mt-3 space-y-2">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Project</label>
                        <select
                            value={form.projectId}
                            onChange={(e) => setForm({ ...form, projectId: e.target.value })}
                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                        >
                            <option value="">Select Project</option>
                            {projects.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.projectName || p.name || `Project ${p.id}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Material Name *</label>
                        <input
                            value={form.materialName}
                            onChange={(e) => setForm({ ...form, materialName: e.target.value })}
                            placeholder="e.g., Cement, Steel, Concrete"
                            required
                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Quantity *</label>
                        <input
                            value={form.quantity}
                            onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                            placeholder="Quantity"
                            type="number"
                            min="1"
                            required
                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                        <select
                            value={form.priority}
                            onChange={(e) => setForm({ ...form, priority: e.target.value })}
                            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>

                    <div className="flex gap-2 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 rounded-lg bg-sky-600 px-3 py-2 text-white font-medium disabled:opacity-50 hover:bg-sky-700"
                        >
                            {loading ? 'Submitting...' : 'Submit Request'}
                        </button>
                    </div>
                </form>
            </section>

            <section className="portal-card p-4">
                <h3 className="font-semibold mb-3">Your Requests</h3>
                {loading && requests.length === 0 && <div className="text-sm text-slate-500">Loading...</div>}
                <div className="mt-3 space-y-2">
                    {requests.length === 0 ? (
                        <div className="text-sm text-slate-500">No requests yet</div>
                    ) : (
                        requests.map((r) => (
                            <div key={r.id} className="rounded-lg bg-slate-50 p-3 border border-slate-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-medium">{r.materialName} • {r.quantity} units</div>
                                        <div className="text-xs text-slate-500">
                                            MR-{r.id} • {formatDate(r.createdAt)} • Priority: {r.priority}
                                        </div>
                                    </div>
                                    <div className={`rounded px-2 py-1 text-xs font-medium ${
                                        r.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                        r.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                        {r.status}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>
        </div>
    );
}