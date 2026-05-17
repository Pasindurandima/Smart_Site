import React from 'react';

const photos = [
    { title: 'Before - Site Prep', site: 'Site A', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80' },
    { title: 'After - Foundation', site: 'Site A', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80' },
    { title: 'Daily Update - Block B', site: 'Site B', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80' },
    { title: 'Before - Parking Deck', site: 'Site C', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80' },
    { title: 'After - Concrete Pour', site: 'Site C', image: 'https://images.unsplash.com/photo-1508450859948-4e6f5e9d7f36?auto=format&fit=crop&w=900&q=80' },
    { title: 'Daily Update - Electrical', site: 'Site B', image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=900&q=80' }
];

export default function ProgressGallery() {
    return (
        <div className="space-y-6">
            <section className="portal-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h2 className="portal-section-title">Progress Gallery</h2>
                        <p className="portal-muted">Visual proof of progress with before/after and daily site photos.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {['All', 'Site A', 'Site B', 'Date Filter'].map((filter, index) => (
                            <button key={filter} className={`badge ${index === 0 ? 'badge-blue' : 'badge-green'}`}>
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="columns-1 gap-4 space-y-4 md:columns-2 xl:columns-3 xl:space-y-4">
                {photos.map((photo, index) => (
                    <article key={index} className="break-inside-avoid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                        <img src={photo.image} alt={photo.title} className="h-64 w-full object-cover" />
                        <div className="p-4">
                            <div className="flex items-center justify-between gap-3">
                                <h3 className="font-semibold text-slate-900">{photo.title}</h3>
                                <span className="badge badge-blue">{photo.site}</span>
                            </div>
                            <p className="portal-muted mt-2">Hover-ready masonry style card for progress verification.</p>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
}