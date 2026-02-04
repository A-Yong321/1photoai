"use client";

import Link from 'next/link';
import { useState } from 'react';
import EffectCard from '@/components/ui/EffectCard';

export default function PhotoEffectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const effects = [
    { title: "AI VTuber", count: "1.5M", image: "/images/cms/AI-Fake-Date_日本女友_2.png", href: "/photo-effects/ai-vtuber", category: "Avatar", isHot: true },
    { title: "AI Selfie", count: "920k", image: "/images/cms/AI-Selfie-with-Celebrities_名人合拍_2.png", href: "/photo-effects/ai-selfie", category: "Social", isHot: true },
    { title: "Pregnant AI", count: "300k", image: "/images/cms/Pregnant-AI_怀孕_2.png", href: "/photo-effects/pregnant-ai", category: "Funny", isHot: true },
    { title: "Ghibli Style", count: "2.1M", image: "/images/cms/AI-Fake-Date_中国女友_2.png", href: "/photo-effects/ghibli", category: "Art", isHot: true },
  ];

  const categories = ["All", "Avatar", "Social", "Funny", "Art"];

  const filteredEffects = activeCategory === "All"
    ? effects
    : effects.filter(effect => effect.category === activeCategory);

  return (
    <main className="effects-page container">
      <div className="page-header">
        <h1>Photo Effects Library</h1>
        <p>Transform your photos with trending AI styles and filters.</p>
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
          position: relative;
          z-index: 1;
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
          position: relative;
          z-index: 10;
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
