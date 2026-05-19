import React, { useMemo, useState } from 'react';
import Login from '../auth/Login';

const plans = [
    {
        name: 'Starter',
        price: 'Rs. 4,999 / month',
        description: 'Best for small construction teams starting their SaaS journey.',
        features: ['2 active projects', '10 users', 'Basic reports', 'Client portal', 'Email support']
    },
    {
        name: 'Professional',
        price: 'Rs. 14,999 / month',
        description: 'For growing firms that need finance, inventory, and approvals.',
        features: ['Unlimited projects', 'Inventory + finance', 'Approval workflow', 'Client gallery', 'Priority support'],
        popular: true
    },
    {
        name: 'Enterprise',
        price: 'Custom pricing',
        description: 'For multi-branch SaaS customers that need branding and scale.',
        features: ['Multi-branch support', 'White-label branding', 'Advanced analytics', 'Dedicated onboarding', 'SLA support']
    }
];

const services = [
    {
        title: 'Project Management',
        text: 'Create, track, and manage every construction project in one dashboard.'
    },
    {
        title: 'Site Progress',
        text: 'Upload photos, comments, and progress updates for clients and managers.'
    },
    {
        title: 'Finance & Billing',
        text: 'Track payments, invoices, budgets, and subscription status with clarity.'
    },
    {
        title: 'Inventory & Workers',
        text: 'Monitor workers, material flow, and site resources with role-based access.'
    }
];

const journey = [
    'Customer visits the website and reviews services and pricing.',
    'Customer submits a subscription request and makes payment.',
    'Super admin receives a notification and reviews the request.',
    'Subscription is activated and company admin credentials are created.',
    'Company admin logs in and adds managers, engineers, accountants, and clients.'
];

const initialLeadState = {
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    selectedPlan: 'Professional',
    message: ''
};

export default function MarketingSite({ onLoginClick, onLoginSuccess }) {
    const [selectedPlan, setSelectedPlan] = useState('Professional');
    const [lead, setLead] = useState(initialLeadState);
    const [submitted, setSubmitted] = useState(false);

    const heroPlan = useMemo(() => plans.find((plan) => plan.name === selectedPlan) || plans[1], [selectedPlan]);

    const updateLead = (field, value) => {
        setLead((prev) => ({ ...prev, [field]: value }));
    };

    const submitLead = (event) => {
        event.preventDefault();
        const payload = {
            ...lead,
            selectedPlan,
            submittedAt: new Date().toISOString()
        };

        const existing = JSON.parse(localStorage.getItem('erpSubscriptionRequests') || '[]');
        existing.unshift(payload);
        localStorage.setItem('erpSubscriptionRequests', JSON.stringify(existing.slice(0, 25)));
        setSubmitted(true);
        setLead(initialLeadState);
    };

    return (
        <div className="marketing-shell">
            <header className="marketing-header">
                <div className="marketing-brand">
                    <div className="marketing-logo">CE</div>
                    <div>
                        <div className="marketing-title">Construction ERP SaaS</div>
                        <div className="marketing-subtitle">Multi-tenant operations for construction teams</div>
                    </div>
                </div>

                <nav className="marketing-nav" aria-label="Primary">
                    <a href="#home">Home</a>
                    <a href="#services">Services</a>
                    <a href="#pricing">Pricing</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact Us</a>
                    <button type="button" className="link-button" onClick={onLoginClick}>Login</button>
                </nav>
            </header>

            <main>
                <section className="marketing-hero" id="home">
                    <div className="marketing-hero-copy">
                        <span className="marketing-pill">Shared DB + company_id isolation</span>
                        <h1>Run your construction business as a real SaaS platform.</h1>
                        <p>
                            Customers discover your service, compare plans, subscribe, and wait for super admin approval.
                            Once active, every company gets isolated data, role-based access, and a complete ERP workflow.
                        </p>
                        <div className="marketing-actions">
                            <a className="primary-action" href="#pricing">View Pricing</a>
                            <button type="button" className="secondary-action" onClick={onLoginClick}>Open Login</button>
                        </div>

                        <div className="marketing-stats">
                            <div>
                                <strong>3</strong>
                                <span>subscription tiers</span>
                            </div>
                            <div>
                                <strong>6</strong>
                                <span>major ERP modules</span>
                            </div>
                            <div>
                                <strong>1</strong>
                                <span>multi-tenant platform</span>
                            </div>
                        </div>
                    </div>

                    <div className="marketing-hero-card">
                        <div className="card-surface">
                            <div className="card-topline">
                                <span className="badge badge-blue">Selected plan</span>
                                <span className="muted">{heroPlan.name}</span>
                            </div>
                            <h2>{heroPlan.price}</h2>
                            <p>{heroPlan.description}</p>
                            <ul className="feature-list">
                                {heroPlan.features.map((feature) => (
                                    <li key={feature}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="section-block" id="services">
                    <div className="section-head">
                        <span className="section-kicker">Services</span>
                        <h2>Everything a construction SaaS customer expects on day one.</h2>
                    </div>
                    <div className="service-grid">
                        {services.map((service) => (
                            <article key={service.title} className="info-card">
                                <h3>{service.title}</h3>
                                <p>{service.text}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="section-block" id="pricing">
                    <div className="section-head">
                        <span className="section-kicker">Pricing</span>
                        <h2>Choose a plan, send a request, and let the super admin activate it.</h2>
                    </div>
                    <div className="pricing-grid">
                        {plans.map((plan) => (
                            <article key={plan.name} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                                {plan.popular && <span className="badge badge-green">Most popular</span>}
                                <h3>{plan.name}</h3>
                                <p className="price-text">{plan.price}</p>
                                <p>{plan.description}</p>
                                <ul className="feature-list compact">
                                    {plan.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                                <button type="button" className="primary-action full-width" onClick={() => setSelectedPlan(plan.name)}>
                                    Choose {plan.name}
                                </button>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="section-block split-layout" id="about">
                    <div className="section-head">
                        <span className="section-kicker">About</span>
                        <h2>Built for real SaaS onboarding and multi-company operations.</h2>
                        <p>
                            Your backend already supports tenant-aware login data with `companyId`. This site explains the
                            business flow so new customers can understand how subscription approval and company activation work.
                        </p>
                    </div>

                    <div className="journey-panel">
                        {journey.map((step, index) => (
                            <div key={step} className="journey-step">
                                <div className="journey-index">{index + 1}</div>
                                <p>{step}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="section-block contact-layout" id="contact">
                    <div className="section-head">
                        <span className="section-kicker">Contact & Subscribe</span>
                        <h2>Send a company request and start the approval flow.</h2>
                        <p>
                            This form stores a lead locally for now. It is ready to be connected to a real backend subscription API.
                        </p>
                    </div>

                    <form className="contact-card" onSubmit={submitLead}>
                        <div className="form-grid">
                            <label>
                                Company Name
                                <input value={lead.companyName} onChange={(e) => updateLead('companyName', e.target.value)} required />
                            </label>
                            <label>
                                Contact Person
                                <input value={lead.contactName} onChange={(e) => updateLead('contactName', e.target.value)} required />
                            </label>
                            <label>
                                Email
                                <input type="email" value={lead.email} onChange={(e) => updateLead('email', e.target.value)} required />
                            </label>
                            <label>
                                Phone
                                <input value={lead.phone} onChange={(e) => updateLead('phone', e.target.value)} required />
                            </label>
                            <label>
                                Plan
                                <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                                    {plans.map((plan) => (
                                        <option key={plan.name} value={plan.name}>{plan.name}</option>
                                    ))}
                                </select>
                            </label>
                            <label className="full-span">
                                Message
                                <textarea
                                    rows="4"
                                    value={lead.message}
                                    onChange={(e) => updateLead('message', e.target.value)}
                                    placeholder="Tell us about your company, desired start date, and required modules."
                                />
                            </label>
                        </div>

                        <div className="contact-actions">
                            <button type="submit" className="primary-action">Submit Request</button>
                            <span className="muted">Selected plan: {selectedPlan}</span>
                        </div>

                        {submitted && (
                            <div className="success-banner">
                                Request saved. Super admin notification and company activation can be connected next.
                            </div>
                        )}
                    </form>
                </section>

                <section className="section-block split-layout" id="login-panel">
                    <div className="section-head">
                        <span className="section-kicker">Login</span>
                        <h2>Company users and super admin can sign in here.</h2>
                        <p>
                            Keep the public website open for visitors, and send registered users into the ERP workspace after login.
                        </p>
                    </div>

                    <div className="contact-card">
                        <Login onLoginSuccess={onLoginSuccess} />
                    </div>
                </section>
            </main>

            <footer className="marketing-footer">
                <span>Construction ERP SaaS</span>
                <span>Multi-company ERP website, pricing, and onboarding flow</span>
            </footer>
        </div>
    );
}