"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { menuData } from '@/lib/menuData';

import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // Simple auth check simulation
      const isAuth = pathname?.includes('/dashboard') || localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(isAuth);
    };
    checkAuth();
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link href="/" className="logo">
          1photo<span className="text-gradient">AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex nav-links">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/tools" className="nav-link">All Tools</Link>

          <Link href="/video-ai" className="nav-link">Video AI</Link>
          <Link href="/image-ai" className="nav-link">Image AI</Link>

          <Link href="/video-effects" className="nav-link">Video Effects</Link>
          <Link href="/photo-effects" className="nav-link">Photo Effects</Link>
          <Link href="/pricing" className="nav-link">Pricing</Link>
          <Link href="/api-platform" className="nav-link">API</Link>
        </div>

        {/* Action Buttons & Mobile Toggle */}
        <div className="nav-actions">
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link href="/dashboard" className="user-profile glass-panel">
                  <div className="avatar-sm">JD</div>
                  <span>Dashboard</span>
                </Link>
                <button onClick={handleLogout} className="btn btn-glass btn-sm">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-glass btn-sm">
                  Login
                </Link>
                <Link href="/signup" className="btn btn-gradient btn-sm">
                  Start for Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>



      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        menuData={menuData}
      />

      <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          height: var(--header-height);
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-bottom: 1px solid rgba(255,255,255,0.05); /* Keep subtle border or remove if strict Pollo style */
          background: rgba(3, 0, 20, 0.2); /* Much more transparent initially */
          backdrop-filter: blur(10px); /* Reduced blur initially */
        }

        .navbar.scrolled {
           background: rgba(3, 0, 20, 0.95);
           backdrop-filter: blur(20px);
           box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          max-width: 1400px; /* Match MegaMenu width */
          margin: 0 auto;
          padding: 0 24px;
          position: relative; /* Context for absolute positioning if needed */
        }

        .logo {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          color: white;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 2px;
          margin-right: 80px; /* Increased from 40px */
        }

        .nav-links {
          display: flex;
          gap: 32px;
          background: transparent;
          padding: 0;
          border: none;
          backdrop-filter: none;
          margin-right: auto;
          align-items: center; /* Fix for "one up one down" */
          height: 100%; /* Ensure full height */
        }

        .nav-link {
          font-size: 0.95rem;
          color: var(--text-secondary);
          transition: all 0.3s;
          font-weight: 500;
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          height: 100%; /* Full height for hover areas */
          display: flex; /* Flex to center text vertically */
          align-items: center;
          padding: 0 4px; /* Horizontal padding only */
        }

        .nav-link:hover, .nav-link.active {
          color: white;
        }

        .nav-actions {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .btn-sm {
          padding: 8px 20px;
          font-size: 0.9rem;
        }

        .user-profile {
            display: flex;
            align-items: center;
            gap: 10px;
            color: white;
            text-decoration: none;
            padding: 4px 12px 4px 4px;
            border-radius: 100px;
            transition: all 0.3s;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .user-profile:hover {
            border-color: rgba(255,255,255,0.3);
            background: rgba(255,255,255,0.05);
        }

        .avatar-sm {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: var(--accent-gradient);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.75rem;
            font-weight: 700;
            color: white;
        }
      `}</style>
    </nav>
  );
}
