import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function MaterialRequests({ user }) {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
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

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/material-requests/pending', {
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

    const approve = async (id) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/material-requests/${id}/approve`,
                {},
                { headers: getAuthHeaders() }
            );
            setRequests(requests.map(r => r.id === id ? response.data : r));
            setError('');
        } catch (err) {
            setError('Failed to approve request');
            console.error(err);
        }
    };

    const reject = async (id) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/material-requests/${id}/reject`,
                {},
                { headers: getAuthHeaders() }
            );
            setRequests(requests.map(r => r.id === id ? response.data : r));
            setError('');
        } catch (err) {
            setError('Failed to reject request');
            console.error(err);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString();
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Material Requests</h1>
                <button
                    onClick={fetchRequests}
                    disabled={loading}
                    className="rounded-lg bg-sky-600 px-4 py-2 text-white disabled:opacity-50"
                >
                    {loading ? 'Refreshing...' : 'Refresh'}
                </button>
            </div>

            {error && <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

            <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50">
                            <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Material</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Quantity</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Priority</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Engineer ID</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading && requests.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="px-4 py-4 text-center text-sm text-slate-500">
                                    Loading...
                                </td>
                            </tr>
                        ) : requests.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="px-4 py-4 text-center text-sm text-slate-500">
                                    No pending requests
                                </td>
                            </tr>
                        ) : (
                            requests.map((req) => (
                                <tr key={req.id} className="border-b border-slate-100 hover:bg-slate-50">
                                    <td className="px-4 py-3 text-sm font-medium">MR-{req.id}</td>
                                    <td className="px-4 py-3 text-sm">{req.materialName || `Material ${req.materialId}`}</td>
                                    <td className="px-4 py-3 text-sm">{req.quantity}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className={`rounded px-2 py-1 text-xs font-medium ${
                                            req.priority === 'HIGH' ? 'bg-red-100 text-red-700' :
                                            req.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-green-100 text-green-700'
                                        }`}>
                                            {req.priority}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm">{req.engineerId}</td>
                                    <td className="px-4 py-3 text-sm">{formatDate(req.createdAt)}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <span className={`rounded px-2 py-1 text-xs font-medium ${
                                            req.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                            req.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm">
                                        {req.status === 'PENDING' ? (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => approve(req.id)}
                                                    className="rounded bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => reject(req.id)}
                                                    className="rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-500">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
