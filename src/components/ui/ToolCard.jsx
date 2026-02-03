"use client";

import Link from 'next/link';

export default function ToolCard({ title, description, icon, href, isNew }) {
  return (
    <Link href={href} className="tool-card glass-panel">
      <div className="card-header">
        <div className="icon-wrapper">{icon}</div>
        {isNew && <span className="badge">NEW</span>}
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{description}</p>

      <div className="arrow">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
      </div>

      <style jsx>{`
        .tool-card {
          padding: 28px;
          display: flex;
          flex-direction: column;
          height: 100%;
          position: relative;
          background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          /* Optimized transitions */
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
          will-change: transform;
        }

        /* Removed complex radial gradient on pseudo-element for performance */
        
        .tool-card:hover {
          transform: translateY(-5px);
          border-color: rgba(139, 92, 246, 0.3);
          box-shadow: 0 10px 40px -10px rgba(139, 92, 246, 0.15);
        }
        
        .tool-card:hover::before {
          opacity: 1;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .icon-wrapper {
          font-size: 2rem;
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }
        
        .tool-card:hover .icon-wrapper {
          background: var(--accent-gradient);
          border-color: transparent;
          transform: scale(1.05);
          box-shadow: 0 0 15px rgba(236, 72, 153, 0.3);
        }

        .badge {
          background: var(--accent-gradient);
          color: white;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          padding: 6px 10px;
          border-radius: 100px;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.4);
        }

        .card-title {
          font-size: 1.35rem;
          margin-bottom: 10px;
          font-weight: 700;
          background: linear-gradient(to right, #fff, #a1a1aa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          transition: all 0.3s;
        }
        
        .tool-card:hover .card-title {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .card-desc {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 30px;
          flex-grow: 1;
        }

        .arrow {
          margin-top: auto;
          align-self: flex-end;
          color: white;
          background: rgba(255,255,255,0.1);
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .tool-card:hover .arrow {
          background: var(--accent-primary);
          transform: translateX(5px) scale(1.1);
          box-shadow: 0 0 15px rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </Link>
  );
}
