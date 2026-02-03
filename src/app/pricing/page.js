"use client";

import Link from 'next/link';

export default function PricingPage() {
    return (
        <main className="pricing-page container">
            <div className="page-header">
                <h1>Simple, Transparent Pricing</h1>
                <p>Start for free, upgrade for viral power.</p>
            </div>

            <div className="pricing-grid">
                {/* Free Plan */}
                <div className="price-card glass-panel">
                    <div className="plan-name">Starter</div>
                    <div className="price">$0<span>/mo</span></div>
                    <p className="plan-desc">For casual creators exploring AI.</p>
                    <Link href="/signup" className="btn btn-glass btn-full">Get Started</Link>
                    <ul className="features">
                        <li>5 credits daily</li>
                        <li>Standard generation speed</li>
                        <li>Watermarked results</li>
                        <li>Public gallery</li>
                    </ul>
                </div>

                {/* Pro Plan */}
                <div className="price-card glass-panel popular">
                    <div className="badge">MOST POPULAR</div>
                    <div className="plan-name">Pro Creator</div>
                    <div className="price">$19<span>/mo</span></div>
                    <p className="plan-desc">For serious content creators.</p>
                    <Link href="/signup" className="btn btn-gradient btn-full">Start 7-Day Free Trial</Link>
                    <ul className="features">
                        <li>1000 credits monthly</li>
                        <li>Fast generation mode</li>
                        <li>No watermarks</li>
                        <li>Commercial license</li>
                        <li>Priority support</li>
                    </ul>
                </div>

                {/* Studio Plan */}
                <div className="price-card glass-panel">
                    <div className="plan-name">Studio</div>
                    <div className="price">$49<span>/mo</span></div>
                    <p className="plan-desc">For agencies and power users.</p>
                    <Link href="/signup" className="btn btn-glass btn-full">Contact Sales</Link>
                    <ul className="features">
                        <li>Unlimited generations</li>
                        <li>Concurrent processing</li>
                        <li>API Access</li>
                        <li>Custom models</li>
                    </ul>
                </div>
            </div>

            <style jsx>{`
        .pricing-page {
          padding-top: calc(var(--header-height) + 60px);
          padding-bottom: 100px;
        }

        .page-header {
          text-align: center;
          margin-bottom: 80px;
        }

        h1 { font-size: 3rem; margin-bottom: 16px; }
        .page-header p { color: var(--text-secondary); font-size: 1.25rem; }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1100px;
          margin: 0 auto;
          align-items: center;
        }

        .price-card {
          padding: 40px;
          text-align: center;
          position: relative;
        }

        .price-card.popular {
          border-color: var(--accent-primary);
          background: rgba(139, 92, 246, 0.05);
          transform: scale(1.05);
          z-index: 1;
        }

        .badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent-gradient);
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .plan-name {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .price {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1;
          margin-bottom: 8px;
          font-family: 'Outfit', sans-serif;
        }

        .price span {
          font-size: 1rem;
          color: var(--text-secondary);
          font-weight: 400;
        }

        .plan-desc {
          color: var(--text-secondary);
          margin-bottom: 30px;
        }

        .btn-full { width: 100%; margin-bottom: 40px; }

        .features {
          text-align: left;
          list-style: none;
        }

        .features li {
          margin-bottom: 12px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
        }

        .features li::before {
          content: "✓";
          color: var(--accent-primary);
          margin-right: 10px;
          font-weight: bold;
        }
      `}</style>
        </main>
    );
}
