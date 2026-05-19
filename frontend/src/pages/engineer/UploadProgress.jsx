import React, { useEffect, useState } from 'react';
import { createSiteProgress, listSiteProgress } from '../../api/siteProgressApi';

function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ''));
        reader.onerror = () => reject(new Error('Failed to read image file'));
        reader.readAsDataURL(file);
    });
}

export default function UploadProgress({ user }) {
    const [uploads, setUploads] = useState([]);
    const [title, setTitle] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [comments, setComments] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            setError('');
            try {
                const data = await listSiteProgress();
                if (!mounted) return;
                setUploads(Array.isArray(data) ? data : []);
            } catch (loadError) {
                if (mounted) {
                    setError(loadError.message || 'Unable to load uploads');
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }
        load();
        return () => {
            mounted = false;
        };
    }, []);

    function handleFiles(e) {
        const file = (e.target.files || [])[0] || null;
        setSelectedFile(file);
    }

    async function submitUpload() {
        if (!selectedFile) {
            setError('Please choose an image');
            return;
        }
        if (!title.trim() || !shortDescription.trim()) {
            setError('Title and short description are required');
            return;
        }

        setSaving(true);
        setError('');
        setMessage('');

        try {
            const imageData = await fileToDataUrl(selectedFile);
            const created = await createSiteProgress({
                projectId: null,
                engineerEmail: user?.email || '',
                title: title.trim(),
                shortDescription: shortDescription.trim(),
                comments: comments.trim(),
                imageData
            });

            setUploads((current) => [created, ...current]);
            setTitle('');
            setShortDescription('');
            setComments('');
            setSelectedFile(null);
            setMessage('Progress uploaded and saved to database.');
        } catch (saveError) {
            setError(saveError.message || 'Unable to upload progress');
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="space-y-4">
            <section className="portal-card p-4">
                <h2 className="portal-section-title">Upload Progress</h2>
                <p className="portal-muted">Upload site image with short description and comments.</p>
                <div className="mt-3">
                    <label className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-slate-200 p-6 text-sm">
                        <input type="file" accept="image/*" onChange={handleFiles} className="hidden" />
                        <div className="text-center">
                            <div className="font-semibold">Click or drop files here</div>
                            <div className="text-xs text-slate-500">Image will be saved in database</div>
                        </div>
                    </label>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <input
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                        placeholder="Short description"
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value)}
                    />
                    <textarea
                        className="rounded-lg border border-slate-200 px-3 py-2 text-sm md:col-span-2"
                        placeholder="Comments"
                        rows={3}
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                </div>

                {error ? <div className="mt-3 text-sm text-rose-600">{error}</div> : null}
                {message ? <div className="mt-3 text-sm text-emerald-600">{message}</div> : null}

                <div className="mt-3">
                    <button
                        onClick={submitUpload}
                        disabled={saving}
                        className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                    >
                        {saving ? 'Uploading...' : 'Save Upload'}
                    </button>
                </div>
            </section>

            <section className="portal-card p-4">
                <h3 className="font-semibold">Upload Timeline</h3>
                {loading ? <div className="mt-3 text-sm text-slate-500">Loading uploads...</div> : null}
                {!loading ? (
                    <div className="mt-3 space-y-2">
                        {uploads.map((u) => (
                            <div key={u.id} className="rounded-lg bg-slate-50 p-3 text-sm">
                                <div className="font-medium">{u.title}</div>
                                <div className="text-xs text-slate-500">{u.shortDescription}</div>
                                <div className="text-xs text-slate-500">{u.createdAt ? new Date(u.createdAt).toLocaleString() : ''}</div>
                            </div>
                        ))}
                        {!uploads.length ? <div className="text-xs text-slate-500">No uploads yet.</div> : null}
                    </div>
                ) : null}
            </section>
        </div>
    );
}