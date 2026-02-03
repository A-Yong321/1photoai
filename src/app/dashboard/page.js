"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { apiClient } from '@/lib/api-client';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('creations');
  const [stats, setStats] = useState({
    tier: 'Pro Creator', // Fallback
    balance: '¥0.00',
    creditsUsed: 0,
    creditsTotal: 1000
  });

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await apiClient.getBalance();
        if (res.success && res.data && res.data.length > 0) {
          const data = res.data[0];
          setStats({
            tier: data.tier_name || 'Standard',
            balance: data.balance_display,
            creditsUsed: data.rate_limit.per_day - data.rate_limit.remaining_today,
            creditsTotal: data.rate_limit.per_day
          });
        }
      } catch (e) {
        console.error('Failed to fetch balance', e);
      }
    };
    fetchBalance();
  }, []);

  // Mock data for creations (API doesn't support fetching image history with URLs yet)
  const creations = [
    { id: 1, type: 'video', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop', title: 'Cyberpunk City', date: '2 mins ago' },
    { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1620641788421-7a1c310342bd?w=500&auto=format&fit=crop', title: 'Neon Portrait', date: '1 hour ago' },
    { id: 3, type: 'video', url: 'https://images.unsplash.com/photo-1633511090164-b43840ea1607?w=500&auto=format&fit=crop', title: 'Abstract Flow', date: '1 day ago' },
    { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop', title: 'Future Tech', date: '2 days ago' },
  ];

  return (
    <div className="dashboard-container container">
      <div className="dashboard-header">
        <div className="user-info">
          <div className="avatar">JD</div>
          <div>
            <h1>Hello, John</h1>
            <p className="status">Pro Creator • <Link href="/pricing" className="upgrade-link">Manage Plan</Link></p>
          </div>
        </div>
        <Link href="/tool/text-to-video" className="btn btn-gradient">
          + New Creation
        </Link>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === 'creations' ? 'active' : ''}`}
          onClick={() => setActiveTab('creations')}
        >
          My Creations
        </button>
        <button
          className={`tab-btn ${activeTab === 'subscription' ? 'active' : ''}`}
          onClick={() => setActiveTab('subscription')}
        >
          Subscription
        </button>
        <button
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'creations' && (
          <div className="creations-grid">
            {creations.map((item) => (
              <div key={item.id} className="creation-card glass-panel">
                <div className="media-wrapper">
                  <img src={item.url} alt={item.title} />
                  <div className="badge">{item.type}</div>
                </div>
                <div className="card-info">
                  <h3>{item.title}</h3>
                  <span>{item.date}</span>
                </div>
              </div>
            ))}

            {/* Empty State / Add New */}
            <Link href="/tools" className="creation-card glass-panel dashed-border">
              <div className="add-new-content">
                <span className="plus">+</span>
                <p>Create New</p>
              </div>
            </Link>
          </div>
        )}

        {activeTab === 'subscription' && (
          <div className="settings-panel glass-panel">
            <h2>Current Plan: {stats.tier}</h2>
            <p>Balance: {stats.balance} (Resets daily)</p>
            <div className="usage-stats">
              <div className="stat-item">
                <span className="label">Credits Used</span>
                <div className="progress-bar">
                  <div
                    className="fill"
                    style={{ width: `${(stats.creditsUsed / stats.creditsTotal) * 100}%` }}
                  ></div>
                </div>
                <span className="value">{stats.creditsUsed} / {stats.creditsTotal}</span>
              </div>
            </div>
            <button className="btn btn-glass">Manage Billing</button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-panel glass-panel">
            <h2>Profile Settings</h2>
            <form className="settings-form">
              <div className="form-group">
                <label>Display Name</label>
                <input type="text" defaultValue="John Doe" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" defaultValue="you@example.com" disabled />
              </div>
              <button className="btn btn-primary">Save Changes</button>
            </form>
          </div>
        )}
      </div>

      <style jsx>{`
        .dashboard-container {
          padding-top: calc(var(--header-height) + 40px);
          padding-bottom: 30px;
          min-height: 100vh;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #a855f7);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          border: 2px solid rgba(255,255,255,0.2);
        }

        h1 { margin-bottom: 4px; font-size: 2rem; }
        .status { color: var(--text-secondary); font-size: 0.9rem; }
        .upgrade-link { color: var(--accent-primary); margin-left: 8px; }

        .dashboard-tabs {
          display: flex;
          gap: 24px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 32px;
        }

        .tab-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          padding: 12px 4px;
          font-size: 1rem;
          cursor: pointer;
          position: relative;
        }

        .tab-btn.active {
          color: white;
          font-weight: 600;
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent-primary);
        }

        .creations-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 24px;
        }

        .creation-card {
          padding: 12px;
          transition: transform 0.2s;
          cursor: pointer;
        }
        
        .creation-card:hover { transform: translateY(-5px); }

        .media-wrapper {
          position: relative;
          aspect-ratio: 1;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .media-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .badge {
          position: absolute;
          top: 8px;
          right: 8px;
          background: rgba(0,0,0,0.6);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          text-transform: uppercase;
        }

        .card-info h3 { font-size: 1rem; margin-bottom: 4px; }
        .card-info span { color: var(--text-tertiary); font-size: 0.8rem; }

        .dashed-border {
          border: 2px dashed rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }

        .add-new-content {
          text-align: center;
          color: var(--text-secondary);
        }

        .plus { font-size: 3rem; display: block; margin-bottom: 8px; }

        .settings-panel {
          max-width: 600px;
          padding: 30px;
        }

        .settings-panel h2 { margin-bottom: 20px; }
        .usage-stats { margin: 24px 0; }
        
        .progress-bar {
          height: 8px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          margin: 8px 0;
          overflow: hidden;
        }

        .fill {
          height: 100%;
          background: var(--accent-gradient);
        }

        .form-group { margin-bottom: 20px; }
        
        input {
          width: 100%;
          padding: 12px;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          color: white;
        }
      `}</style>
    </div>
  );
}
