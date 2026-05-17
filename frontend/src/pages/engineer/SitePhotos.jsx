import React from 'react';

export default function SitePhotos() {
    const photos = ['Before work', 'After pour', 'Daily update'];

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {photos.map((photo) => (<article key={photo} className="portal-card p-5"><h2 className="portal-section-title">{photo}</h2><p className="portal-muted mt-2">Site photo entry</p></article>))}
        </div>
    );
}