"use client";

import Link from 'next/link';
import { useState } from 'react';
import EffectCard from '@/components/ui/EffectCard';

export default function VideoEffectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const effects = [
    { title: "Romantic Kiss", count: "1.2M", image: "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)", href: "/video-effects/ai-kissing", category: "Viral" },
    { title: "Warm Hug", count: "890k", image: "linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)", href: "/video-effects/hug", category: "Viral" },
    { title: "Twerk Dance", count: "2.5M", image: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)", href: "/video-effects/twerk", category: "Dance" },
    { title: "Muscle Flex", count: "500k", image: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)", href: "/video-effects/muscle", category: "Funny" },
    { title: "Earth Zoom", count: "340k", image: "linear-gradient(to top, #30cfd0 0%, #330867 100%)", href: "/video-effects/earth-zoom", category: "Cinematic" },
    { title: "Salsa Dance", count: "120k", image: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)", href: "/video-effects/salsa", category: "Dance" },
    { title: "Cyberpunk Glitch", count: "450k", image: "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)", href: "/video-effects/glitch", category: "Cinematic" },
    { title: "Old Film", count: "210k", image: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)", href: "/video-effects/old-film", category: "Cinematic" },
  ];

  const categories = ["All", "Viral", "Dance", "Funny", "Cinematic"];

  const filteredEffects = activeCategory === "All"
    ? effects
    : effects.filter(effect => effect.category === activeCategory);

  return (
    <main className="effects-page container">
      <div className="page-header">
        <h1>Video Effects Library</h1>
        <p>Explore thousands of viral templates and create your own trend.</p>
      </div>

      <div className="filter-bar">
        {categories.map((cat, i) => (
          <button
            key={i}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="effects-grid">
        {filteredEffects.map((effect, index) => (
          <EffectCard key={index} {...effect} />
        ))}
      </div>

      <style jsx>{`
        .effects-page {
          padding-top: calc(var(--header-height) + 60px);
          padding-bottom: 80px;
        }

        .page-header {
          text-align: center;
          margin-bottom: 60px;
        }

        h1 {
          font-size: 3rem;
          margin-bottom: 16px;
        }

        .page-header p {
          color: var(--text-secondary);
          font-size: 1.2rem;
        }

        .filter-bar {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 8px 24px;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.95rem;
        }

        .filter-btn:hover {
            background: rgba(255,255,255,0.1);
            color: white;
        }

        .filter-btn.active {
          background: var(--text-primary);
          color: black;
          font-weight: 600;
          border-color: var(--text-primary);
        }

        .effects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 30px;
        }
      `}</style>
    </main>
  );
}
