import React, { useEffect, useState } from 'react';

const API_FALLBACK_BASE = 'http://localhost:8080';

function isHtmlResponse(text) {
    if (!text) return false;
    const value = text.trim().toLowerCase();
    return value.startsWith('<!doctype html') || value.startsWith('<html');
}

async function requestJson(path, options) {
    const primary = await fetch(path, options);
    const primaryText = await primary.text();

    if (primary.ok && !isHtmlResponse(primaryText)) {
        return primaryText ? JSON.parse(primaryText) : null;
    }

    const fallback = await fetch(`${API_FALLBACK_BASE}${path}`, options);
    const fallbackText = await fallback.text();

    if (!fallback.ok) {
        throw new Error(`API request failed (${fallback.status})`);
    }

    if (isHtmlResponse(fallbackText)) {
        throw new Error('Invalid response format from API');
    }

    return fallbackText ? JSON.parse(fallbackText) : null;
}

export default function Profile({ user }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [profile, setProfile] = useState({
        id: null,
        name: '',
        email: '',
        phone: '',
        role: ''
    });
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: ''
    });

    useEffect(() => {
        let mounted = true;

        async function loadProfile() {
            setLoading(true);
            setError('');

            if (!user?.email) {
                setError('User email not available');
                setLoading(false);
                return;
            }

            try {
                const q = encodeURIComponent(user.email.trim());
                const data = await requestJson(`/api/users/profile?email=${q}`);

                if (!mounted) return;

                const normalized = {
                    id: data?.id ?? null,
                    name: data?.name ?? '',
                    email: data?.email ?? user.email ?? '',
                    phone: data?.phone ?? '',
                    role: data?.role ?? user.role ?? ''
                };

                setProfile(normalized);
                setForm({
                    name: normalized.name,
                    phone: normalized.phone,
                    email: normalized.email
                });
            } catch (loadError) {
                if (mounted) {
                    setError(loadError.message || 'Unable to load profile');
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        loadProfile();

        return () => {
            mounted = false;
        };
    }, [user?.email, user?.role]);

    async function saveProfile() {
        setMessage('');
        setError('');

        try {
            const q = encodeURIComponent((profile.email || user?.email || '').trim());
            const updated = await requestJson(`/api/users/profile?email=${q}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: form.name,
                    phone: form.phone,
                    email: form.email
                })
            });

            if (updated) {
                const normalized = {
                    id: updated.id ?? profile.id,
                    name: updated.name ?? form.name,
                    email: updated.email ?? form.email,
                    phone: updated.phone ?? form.phone,
                    role: updated.role ?? profile.role
                };
                setProfile(normalized);
                setForm({ name: normalized.name, phone: normalized.phone, email: normalized.email });

                const local = localStorage.getItem('erpUser');
                if (local) {
                    try {
                        const parsed = JSON.parse(local);
                        localStorage.setItem('erpUser', JSON.stringify({
                            ...parsed,
                            name: normalized.name,
                            email: normalized.email,
                            phone: normalized.phone
                        }));
                    } catch (ignoreError) {
                    }
                }
            }

            setMessage('Profile updated successfully.');
        } catch (saveError) {
            setError(saveError.message || 'Unable to update profile');
        }
    }

    if (loading) {
        return <div className="portal-card p-6">Loading profile details from users table...</div>;
    }

    return (
        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
            <section className="portal-card p-6 text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 text-3xl font-semibold text-white">
                    {(profile.name || user?.name || 'C').trim().charAt(0).toUpperCase()}
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">{profile.name || 'Client Name'}</h2>
                <p className="portal-muted">{(profile.role || user?.role || 'CLIENT').replace(/_/g, ' ')}</p>
                <div className="mt-6 space-y-3 text-left">
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Email</p>
                        <p className="font-medium">{profile.email || '-'}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">Phone</p>
                        <p className="font-medium">{profile.phone || '-'}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <p className="portal-muted">User ID</p>
                        <p className="font-medium">{profile.id || '-'}</p>
                    </div>
                </div>
            </section>

            <section className="space-y-6">
                <article className="portal-card p-6">
                    <h2 className="portal-section-title">Update Profile</h2>
                    {error ? <div className="mt-3 text-sm text-rose-600">{error}</div> : null}
                    {message ? <div className="mt-3 text-sm text-emerald-600">{message}</div> : null}
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <input
                            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
                            placeholder="Full name"
                            value={form.name}
                            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                        />
                        <input
                            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400"
                            placeholder="Phone number"
                            value={form.phone}
                            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                        />
                        <input
                            className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-sky-400 md:col-span-2"
                            placeholder="Email address"
                            value={form.email}
                            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                        />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                        <button onClick={saveProfile} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Save Changes</button>
                        <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Change Password</button>
                    </div>
                </article>

                <article className="portal-card p-6">
                    <h2 className="portal-section-title">Notification Settings</h2>
                    <div className="mt-4 space-y-3 text-sm text-slate-700">
                        {['Project updates', 'Invoice reminders', 'Milestone approvals'].map((item) => (
                            <label key={item} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                                <span>{item}</span>
                                <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500" />
                            </label>
                        ))}
                    </div>
                </article>
            </section>
        </div>
    );
}