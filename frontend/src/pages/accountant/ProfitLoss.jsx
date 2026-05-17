import React from 'react';

export default function ProfitLoss() {
    const cards = ['Gross Profit', 'Operating Profit', 'Net Margin'];

    return (
        <div className="grid gap-4 md:grid-cols-3">
            {cards.map((card) => (<article key={card} className="portal-card p-5"><h2 className="portal-section-title">{card}</h2><p className="portal-muted mt-2">Financial analytics metric</p></article>))}
        </div>
    );
}