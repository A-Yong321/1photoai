"use client";

import Link from 'next/link';

export default function EffectCard({ title, count, image, href, isHot }) {
  const bgStyle = image?.includes('gradient') ? image : `url('${image}')`;

  return (
    <Link href={href} className="effect-card">
      <div className="image-wrapper">
        <div className="placeholder-image" style={{ backgroundImage: bgStyle }}></div>

        {/* Overlays */}
        <div className="card-overlays">
          {isHot && <span className="badge-hot">Hot</span>}
          <span className="badge-count">
            <span className="fire">🔥</span> {count}
          </span>
        </div>

        {/* Title Bar */}
        <div className="title-bar">
          <h4 className="effect-title">{title}</h4>
        </div>
      </div>

      <style jsx>{`
        .effect-card {
          display: block;
          width: 100%;
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .effect-card:hover {
            transform: translateY(-5px);
        }

        .image-wrapper {
          width: 100%;
          border-radius: 12px; /* Matching screenshot radius */
          aspect-ratio: 16/12; /* Adjusted aspect ratio based on screenshot (landscape-ish) */
          overflow: hidden;
          position: relative;
          background-color: #2a2a2a;
        }
        
        /* Adjust aspect ratio for portrait images if needed, but screenshot shows landscape cards mostly */
        
        .placeholder-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          transition: transform 0.5s ease;
        }

        .effect-card:hover .placeholder-image {
            transform: scale(1.05); /* Subtle zoom */
        }

        .card-overlays {
            position: absolute;
            top: 10px;
            left: 10px;
            right: 10px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            z-index: 2;
            pointer-events: none;
        }

        .badge-hot {
            background-color: #ff4757; /* Pink/Red for Hot */
            color: white;
            font-size: 0.75rem;
            font-weight: 700;
            padding: 4px 8px;
            border-radius: 4px;
            text-transform: uppercase;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .badge-count {
            background-color: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            color: white;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 4px 8px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 4px;
            margin-left: auto; /* Push to right if hot badge is missing/present */
        }

        .fire {
            font-size: 0.8rem;
        }

        .title-bar {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(30, 30, 40, 0.95); /* Main dark color */
            padding: 12px 16px;
            z-index: 2;
            border-top: 1px solid rgba(255,255,255,0.05);
        }

        .effect-title {
            color: #e2e8f0;
            font-size: 0.95rem;
            font-weight: 500;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        /* Hover effect for title? */
        .effect-card:hover .effect-title {
            color: white;
        }

      `}</style>
    </Link>
  );
}
