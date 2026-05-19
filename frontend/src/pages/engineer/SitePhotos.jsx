import React, { useEffect, useState } from 'react';
import { listSiteProgress } from '../../api/siteProgressApi';

export default function SitePhotos() {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let mounted = true;
        async function load() {
            setLoading(true);
            setError('');
            try {
                const data = await listSiteProgress();
                if (!mounted) return;
                setPhotos(Array.isArray(data) ? data : []);
            } catch (loadError) {
                if (mounted) {
                    setError(loadError.message || 'Unable to load site photos');
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

    return (
        <div className="space-y-4">
            <section className="portal-card p-4">
                <h2 className="portal-section-title">Site Photos</h2>
                <p className="portal-muted">Visual progress gallery. Tap image for details.</p>
            </section>

            <section className="grid gap-3 grid-cols-2">
                {loading ? <div className="col-span-2 text-sm text-slate-500">Loading photos...</div> : null}
                {error ? <div className="col-span-2 text-sm text-rose-600">{error}</div> : null}
                {photos.map((p) => (
                    <div key={p.id} className="rounded-lg overflow-hidden bg-slate-50">
                        <img src={p.imageData} alt={p.title} className="h-28 w-full object-cover" />
                        <div className="p-2">
                            <div className="text-sm font-medium">{p.title}</div>
                            <div className="text-xs text-slate-500">{p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ''}</div>
                            <div className="text-xs text-slate-500">{p.shortDescription}</div>
                        </div>
                    </div>
                ))}
                {!loading && !error && !photos.length ? <div className="col-span-2 text-sm text-slate-500">No site photos uploaded yet.</div> : null}
            </section>
        </div>
    );
}