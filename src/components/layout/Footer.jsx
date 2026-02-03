"use client";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <Link href="/" className="logo">
              1photo<span className="text-gradient">AI</span>
            </Link>
            <p className="footer-desc">
              Unleash your creativity with the most advanced AI video and image generation platform.
            </p>
          </div>

          <div className="footer-col">
            <h3>Product</h3>
            <Link href="/tools">All Tools</Link>
            <Link href="/video-effects">Video Effects</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/api-platform">API</Link>
          </div>

          <div className="footer-col">
            <h3>Company</h3>
            <Link href="/about">About Us</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div className="footer-col">
            <h3>Legal</h3>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 1photo AI. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          border-top: 1px solid var(--glass-border);
          padding: 80px 0 30px;
          background: #020010;
          position: relative;
          z-index: 10;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .logo {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          color: white;
          display: block;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 2px;
        }
        
        .footer-desc {
          color: var(--text-secondary);
          line-height: 1.6;
          max-width: 300px;
          font-size: 0.95rem;
        }

        .footer-col h3 {
          font-size: 1rem;
          margin-bottom: 24px;
          color: white;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .footer-col a {
          display: block;
          color: var(--text-secondary);
          margin-bottom: 12px;
          transition: all 0.2s;
          font-size: 0.95rem;
        }

        .footer-col a:hover {
          color: white;
          transform: translateX(4px);
        }

        .footer-bottom {
          padding-top: 30px;
          border-top: 1px solid rgba(255,255,255,0.05);
          text-align: center;
          color: var(--text-tertiary);
          font-size: 0.9rem;
        }
        
        @media (max-width: 768px) {
            .footer-grid {
                grid-template-columns: 1fr;
                gap: 40px;
            }
        }
      `}</style>
    </footer>
  );
}
