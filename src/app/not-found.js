"use client";

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="not-found-container">
            <div className="content">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you are looking for has been moved, deleted, or possibly never existed.</p>
                <Link href="/" className="btn btn-gradient">
                    Return Home
                </Link>
            </div>

            <style jsx>{`
        .not-found-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000;
          position: relative;
          overflow: hidden;
        }

        .not-found-container::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0) 70%);
          pointer-events: none;
        }

        .content {
          text-align: center;
          z-index: 1;
          padding: 20px;
        }

        h1 {
          font-size: 8rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #fff 0%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        h2 {
          font-size: 2rem;
          margin-bottom: 16px;
          color: white;
        }

        p {
          color: var(--text-secondary);
          margin-bottom: 40px;
          max-width: 400px;
          margin-left: auto;
          margin-right: auto;
        }

        .btn {
          display: inline-block;
          padding: 12px 32px;
          border-radius: 100px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s;
        }

        .btn:hover {
          transform: scale(1.05);
        }

        .btn-gradient {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
        }
      `}</style>
        </div>
    );
}
