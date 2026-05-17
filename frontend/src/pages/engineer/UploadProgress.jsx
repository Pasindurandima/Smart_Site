import React from 'react';

export default function UploadProgress() {
    const items = ['Upload images', 'Upload video', 'Attach notes'];

    return (
        <div className="portal-card p-6">
            <h2 className="portal-section-title">Upload Progress</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
                {items.map((item) => (
                    <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">{item}</div>
                ))}
            </div>
        </div>
    );
}