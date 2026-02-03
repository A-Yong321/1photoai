"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function ApiPlatformPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Could add toast here
  };

  const CodeBlock = ({ code, language = 'bash' }) => (
    <div className="code-block">
      <div className="code-header">
        <span className="lang">{language}</span>
        <button onClick={() => copyToClipboard(code)} className="copy-btn">Copy</button>
      </div>
      <pre><code>{code}</code></pre>
      <style jsx>{`
        .code-block {
          background: #111;
          border-radius: 8px;
          border: 1px solid var(--glass-border);
          overflow: hidden;
          margin: 16px 0;
        }
        .code-header {
          display: flex;
          justify-content: space-between;
          padding: 8px 16px;
          background: rgba(255,255,255,0.05);
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
        .copy-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
        }
        .copy-btn:hover { color: white; }
        pre {
          padding: 16px;
          overflow-x: auto;
          color: #eee;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          margin: 0;
        }
      `}</style>
    </div>
  );

  return (
    <div className="api-page">
      {/* Hero Section */}
      <section className="api-hero">
        <div className="container">
          <div className="hero-content">
            <span className="badge">Developer Platform</span>
            <h1>Build with 1photo AI</h1>
            <p>Integrate state-of-the-art AI generation capabilities directly into your applications.</p>
            <div className="hero-actions">
              <button className="btn btn-gradient">Get API Key</button>
              <button className="btn btn-glass">Read Docs</button>
            </div>
          </div>
        </div>
      </section>

      <div className="container content-layout">
        <aside className="sidebar glass-panel">
          <nav>
            <h3>Getting Started</h3>
            <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Overview</button>
            <button className={activeTab === 'auth' ? 'active' : ''} onClick={() => setActiveTab('auth')}>Authentication</button>

            <h3>API Reference</h3>
            <button className={activeTab === 'image' ? 'active' : ''} onClick={() => setActiveTab('image')}>Image Generation</button>
            <button className={activeTab === 'video' ? 'active' : ''} onClick={() => setActiveTab('video')}>Video Generation</button>
            <button className={activeTab === 'music' ? 'active' : ''} onClick={() => setActiveTab('music')}>Music Generation</button>
            <button className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>Task Query</button>
            <button className={activeTab === 'upload' ? 'active' : ''} onClick={() => setActiveTab('upload')}>File Upload</button>
            <button className={activeTab === 'account' ? 'active' : ''} onClick={() => setActiveTab('account')}>Account API</button>

            <h3>Resources</h3>
            <button className={activeTab === 'pricing' ? 'active' : ''} onClick={() => setActiveTab('pricing')}>Pricing & Limits</button>
          </nav>
        </aside>

        <main className="doc-content glass-panel">
          {activeTab === 'overview' && (
            <div className="tab-pane fade-in">
              <h2>API Overview</h2>
              <p>The 1photo AI Middleware Platform provides unified access to the world's best AI models including Grok, Sora, Kling, and more.</p>

              <div className="info-box">
                <strong>Base URL:</strong> <code>https://openapi.ai-studio.me</code>
              </div>

              <h3>Quick Start</h3>
              <p>Test your connection with a simple request:</p>
              <CodeBlock code={`curl -X POST \\
  -H "Authorization: Bearer sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "a beautiful sunset"}' \\
  https://openapi.ai-studio.me/api/grok/images`} />
            </div>
          )}

          {activeTab === 'auth' && (
            <div className="tab-pane fade-in">
              <h2>Authentication</h2>
              <p>All API requests must include your API Key in the <code>Authorization</code> header.</p>

              <CodeBlock code={`Authorization: Bearer {your_api_key}`} language="http" />

              <div className="alert-box">
                ⚠️ <strong>Security Note:</strong> Never expose your API key in client-side code. Always route requests through your backend.
              </div>
            </div>
          )}

          {activeTab === 'image' && (
            <div className="tab-pane fade-in">
              <h2>Image Generation API</h2>
              <p>Generate high-quality images using multiple models.</p>

              <h3>Supported Platforms</h3>
              <ul className="platform-list">
                <li>Grok (<code>/api/grok/images</code>)</li>
                <li>Dreamina (<code>/api/dreamina/images</code>)</li>
                <li>Kling (<code>/api/kling/images</code>)</li>
              </ul>

              <h3>Request Example</h3>
              <CodeBlock code={`{
  "prompt": "a cyberpunk city street, neon lights",
  "size": "1024x1024",
  "count": 1
}`} language="json" />
            </div>
          )}

          {activeTab === 'video' && (
            <div className="tab-pane fade-in">
              <h2>Video Generation API</h2>
              <p>Create cinematic videos from text or images.</p>

              <h3>Text-to-Video Example</h3>
              <CodeBlock code={`{
  "action": "text2video",
  "prompt": "a cat playing piano",
  "model": "kling-v1",
  "duration": 5
}`} language="json" />

              <h3>Image-to-Video Example</h3>
              <CodeBlock code={`{
  "action": "image2video",
  "image_url": "https://example.com/cat.jpg",
  "prompt": "make the cat blink"
}`} language="json" />
            </div>
          )}

          {activeTab === 'music' && (
            <div className="tab-pane fade-in">
              <h2>Music Generation API</h2>
              <p>Generate original music and songs from text prompts.</p>
              <h3>Supported Platforms</h3>
              <ul className="platform-list">
                <li>Suno (<code>/api/suno/music</code>)</li>
              </ul>
              <h3>Request Example</h3>
              <CodeBlock code={`{
  "prompt": "a happy pop song about summer vacation",
  "lyrics": "Summer days are here again...",
  "style": "pop, upbeat"
}`} language="json" />
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="tab-pane fade-in">
              <h2>Task Query API</h2>
              <p>Check the status and retrieve results for any generation task.</p>
              <h3>Request Example</h3>
              <CodeBlock code={`{
  "task_id": "550e8400-e29b-41d4-a716-446655440000"
}`} language="json" />
              <h3>Response Example</h3>
              <CodeBlock code={`{
  "task_id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "succeeded",
  "images": [
    { "url": "https://cdn.example.com/image.png" }
  ]
}`} language="json" />
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="tab-pane fade-in">
              <h2>File Upload API</h2>
              <p>Upload images or videos for use in generation tasks (e.g., Image-to-Video).</p>
              <h3>Endpoint</h3>
              <p><code>POST /api/upload/file</code> (multipart/form-data)</p>
              <h3>cURL Example</h3>
              <CodeBlock code={`curl -X POST \\
  -H "Authorization: Bearer sk-..." \\
  -F "file=@/path/to/image.jpg" \\
  https://openapi.ai-studio.me/api/upload/file`} />
            </div>
          )}

          {activeTab === 'account' && (
            <div className="tab-pane fade-in">
              <h2>Account Management API</h2>
              <p>Monitor your balance and usage programmatically.</p>
              <h3>Check Balance</h3>
              <p><code>POST /api/account/balance</code></p>
              <CodeBlock code={`{
  "success": true,
  "data": [{
    "balance_display": "¥1000.00",
    "rate_limit": {
      "remaining_today": 950
    }
  }]
}`} language="json" />
              <h3>Consumption History</h3>
              <p><code>POST /api/account/consumption</code></p>
              <CodeBlock code={`{
  "start_date": "2026-01-01",
  "end_date": "2026-01-31"
}`} language="json" />
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="tab-pane fade-in">
              <h2>Pricing & Test Accounts</h2>
              <p>We provide test accounts for development purposes.</p>

              <table className="api-table">
                <thead>
                  <tr>
                    <th>Tenant</th>
                    <th>API Key</th>
                    <th>Balance</th>
                    <th>Daily Limit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>demo6</td>
                    <td><code>sk-VVcGEpwwm4Thtra...</code></td>
                    <td>¥1000.00</td>
                    <td>1000 reqs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        .api-page {
          min-height: 100vh;
          background: #050505;
          padding-top: var(--header-height);
        }

        .api-hero {
          padding: 80px 0;
          background: radial-gradient(circle at 50% 0%, #1e1b4b 0%, transparent 60%);
          text-align: center;
        }

        .hero-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .badge {
          display: inline-block;
          padding: 6px 16px;
          background: rgba(99, 102, 241, 0.2);
          color: #818cf8;
          border-radius: 100px;
          font-size: 0.9rem;
          margin-bottom: 24px;
        }

        h1 {
          font-size: 3.5rem;
          margin-bottom: 16px;
        }

        .hero-content p {
          color: var(--text-secondary);
          font-size: 1.25rem;
          margin-bottom: 40px;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        .content-layout {
          display: grid;
          grid-template-columns: 250px 1fr;
          gap: 40px;
          padding-bottom: 80px;
        }

        .sidebar {
          position: sticky;
          top: 100px;
          height: fit-content;
          padding: 24px;
        }

        .sidebar h3 {
          font-size: 0.8rem;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 12px;
          margin-top: 24px;
        }
        .sidebar h3:first-child { margin-top: 0; }

        .sidebar button {
          display: block;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          color: var(--text-secondary);
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .sidebar button:hover {
          color: white;
          background: rgba(255,255,255,0.05);
        }

        .sidebar button.active {
          color: white;
          background: rgba(99, 102, 241, 0.1);
          color: #818cf8;
          font-weight: 500;
        }

        .doc-content {
          padding: 40px;
          min-height: 500px;
        }

        .tab-pane h2 {
          font-size: 2rem;
          margin-bottom: 24px;
        }

        .tab-pane h3 {
          font-size: 1.5rem;
          margin: 32px 0 16px;
        }

        .tab-pane p {
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .info-box, .alert-box {
          padding: 16px;
          border-radius: 8px;
          margin: 16px 0;
        }

        .info-box {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
        }

        .alert-box {
          background: rgba(234, 179, 8, 0.1);
          border: 1px solid rgba(234, 179, 8, 0.2);
          color: #fde047;
        }

        .platform-list li {
          margin-bottom: 8px;
          color: var(--text-secondary);
        }
        
        code {
          background: rgba(0,0,0,0.3);
          padding: 2px 6px;
          border-radius: 4px;
          color: #a5b4fc;
          font-family: 'Fira Code', monospace;
        }

        .api-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        .api-table th {
          text-align: left;
          padding: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          color: var(--text-tertiary);
          font-weight: 500;
        }

        .api-table td {
          padding: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .content-layout { grid-template-columns: 1fr; }
          .sidebar { position: static; margin-bottom: 24px; }
        }
      `}</style>
    </div>
  );
}
