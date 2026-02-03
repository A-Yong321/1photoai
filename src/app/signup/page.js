"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate signup delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        // Redirect to login or dashboard
        router.push('/dashboard');
    };

    return (
        <div className="auth-container">
            <div className="auth-card glass-panel">
                <div className="text-center mb-6">
                    <h1 className="auth-title">Create Account</h1>
                    <p className="auth-subtitle">Join thousands of creators today</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" placeholder="John Doe" required />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="you@example.com" required />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" required />
                    </div>

                    <button type="submit" className="btn btn-gradient btn-full" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up Free'}
                    </button>
                </form>

                <div className="divider">
                    <span>OR CONTINUE WITH</span>
                </div>

                <div className="social-login">
                    <button type="button" className="btn btn-glass btn-icon">
                        <span className="icon">G</span> Google
                    </button>
                    <button type="button" className="btn btn-glass btn-icon">
                        <span className="icon"></span> Apple
                    </button>
                </div>

                <div className="auth-footer">
                    Already have an account? <Link href="/login">Sign in</Link>
                </div>
            </div>

            <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 50% 0%, #2e1065 0%, #000 50%);
          padding: 20px;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          padding: 40px;
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
        }

        .text-center { text-align: center; }
        .mb-6 { margin-bottom: 24px; }

        .auth-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 8px;
          background: linear-gradient(to right, #fff, #a5b4fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .auth-subtitle {
          color: var(--text-secondary);
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        input {
          width: 100%;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 12px 16px;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        input:focus {
          outline: none;
          border-color: var(--accent-primary);
        }

        .btn-full {
          width: 100%;
          margin-top: 10px;
          padding: 14px;
        }

        .divider {
          display: flex;
          align-items: center;
          margin: 30px 0;
          color: var(--text-tertiary);
          font-size: 0.75rem;
          letter-spacing: 1px;
        }

        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        .divider span {
          padding: 0 16px;
        }

        .social-login {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 30px;
        }

        .btn-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .auth-footer {
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .auth-footer a {
          color: var(--accent-primary);
          text-decoration: none;
          font-weight: 500;
        }

        .auth-footer a:hover {
          text-decoration: underline;
        }
      `}</style>
        </div>
    );
}
