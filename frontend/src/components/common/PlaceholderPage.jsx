import React from 'react';

export default function PlaceholderPage({ title, subtitle }) {
    return (
        <div className=\"panel\">
            <h3>{title}</h3>
            <p>{subtitle || 'This module is scaffolded and ready for implementation.'}</p>
        </div>
    );
}