"use client";

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <style jsx>{`
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(3, 0, 20, 0.8);
          backdrop-filter: blur(8px);
          z-index: 9999;
        }
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          border-top-color: var(--accent-primary);
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
