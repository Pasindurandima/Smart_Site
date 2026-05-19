import React, { useEffect, useState } from 'react';
import { useClientWorkspace } from '../../hooks/useClientWorkspace';
import { listSiteProgress } from '../../api/siteProgressApi';

export default function ProgressGallery({ user }) {
    const { selectedProject, loading, error } = useClientWorkspace(user);
    const [photos, setPhotos] = useState([]);
    const [galleryLoading, setGalleryLoading] = useState(true);
    const [galleryError, setGalleryError] = useState('');

    useEffect(() => {
        let mounted = true;
        async function loadGallery() {
            setGalleryLoading(true);
            setGalleryError('');
            try {
                const data = await listSiteProgress();
                if (!mounted) return;
                setPhotos(Array.isArray(data) ? data : []);
            } catch (loadError) {
                if (mounted) {
                    setGalleryError(loadError.message || 'Unable to load progress gallery');
                }
            } finally {
                if (mounted) {
                    setGalleryLoading(false);
                }
            }
        }
        loadGallery();
        return () => {
            mounted = false;
        };
    }, []);

    if (loading) {
        return <div className="portal-card p-6">Loading gallery...</div>;
    }

    const workspaceError = error;

    return (
        <div className="space-y-6">
            <section className="portal-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="portal-section-title">Progress Gallery</h2>
                        <p className="portal-muted">Visual proof uploaded by site engineers. {selectedProject?.name ? `Project: ${selectedProject.name}` : ''}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['All', selectedProject?.address || 'Project', 'Date Filter'].map((filter, index) => (
                            <button key={filter} className={`badge ${index === 0 ? 'badge-blue' : 'badge-green'}`}>
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {workspaceError ? <section className="portal-card p-4 text-amber-700">{workspaceError}</section> : null}
            {galleryError ? <section className="portal-card p-4 text-rose-600">{galleryError}</section> : null}

            <section className="columns-1 gap-4 space-y-4 md:columns-2 xl:columns-3 xl:space-y-4">
                {galleryLoading ? <div className="portal-card p-4 text-sm text-slate-500">Loading progress images...</div> : null}
                {photos.map((photo) => (
                    <article key={photo.id} className="break-inside-avoid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <img src={photo.imageData} alt={photo.title} className="h-64 w-full object-cover" />
                        <div className="p-4">
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="font-semibold text-slate-900">{photo.title}</h3>
                                <span className="badge badge-blue">{photo.createdAt ? new Date(photo.createdAt).toLocaleDateString() : 'Update'}</span>
                            </div>
                            <p className="portal-muted mt-2">{photo.shortDescription}</p>
                            {photo.comments ? <p className="mt-2 text-sm text-slate-600">{photo.comments}</p> : null}
                        </div>
                    </article>
                ))}
                {!galleryLoading && !galleryError && !photos.length ? <div className="portal-card p-4 text-sm text-slate-500">No progress uploads available yet.</div> : null}
            </section>
        </div>
    );
}