"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import FeatureSection from '@/components/ui/FeatureSection';
import EffectCard from '@/components/ui/EffectCard';

import { useState } from 'react';

// 主页组件：这是应用 Landing Page 的入口，包含 Hero 区域、特性介绍和效果展示画廊
export default function Home() {
  const [activeTab, setActiveTab] = useState('video');

  // Mock data for effects grid (matches the Viral AI Videos section in screenshot)
  // Mock data for effects grid (matches the Viral AI Videos section in screenshot)
  const viralEffects = [
    { title: "AI Kissing Video Generator", count: "3M", image: "/images/cms/AI-Kissing_正常接吻_2.png", href: "/video-effects/ai-kissing", category: "Viral", isHot: true },
    { title: "AI Muscle Generator", count: "149.4K", image: "/images/cms/Muscle_肌肉展示_2.png", href: "/video-effects/muscle", category: "Viral", isHot: true },
    { title: "AI Bikini", count: "127.1K", image: "/images/cms/AI-Dance-Generator_肚皮舞_2.png", href: "/video-effects/bikini", category: "Dance", isHot: true },
    { title: "AI Jiggle Video Effect", count: "73.9K", image: "/images/cms/Jiggle_抖动身体_2.png", href: "/video-effects/jiggle", category: "Funny", isHot: false },
    { title: "AI Hug Video", count: "51.6K", image: "/images/cms/Hug_拥抱_2.png", href: "/video-effects/hug", category: "Emotional", isHot: true },
    { title: "AI Fake Date", count: "42.0K", image: "/images/cms/AI-Fake-Date_女友约会_2.png", href: "/video-effects/fake-date", category: "Viral", isHot: false },
  ];

  const photoEffects = [
    { title: "AI Pregnant Filter", count: "250K", image: "/images/cms/Pregnant-AI_怀孕_2.png", href: "/photo-effects/pregnant", category: "AI Style", isHot: true },
    { title: "AI Selfie with Celebrities", count: "120K", image: "/images/cms/AI-Selfie-with-Celebrities_名人合拍_2.png", href: "/photo-effects/selfie", category: "Fun", isHot: true },
    { title: "Ghibli Art Style", count: "89.2K", image: "linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%)", href: "/photo-effects/ghibli", category: "Art", isHot: true }, // Placeholder
    { title: "Cyberpunk Portrait", count: "45.6K", image: "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)", href: "/photo-effects/cyberpunk", category: "Art", isHot: false },
  ];

  const currentEffects = activeTab === 'video' ? viralEffects : photoEffects;

  return (
    <main className="main-container">


      {/* 1. Immersive Video Hero Section */}
      <section className="hero-section">
        {/* Background Video Placeholder */}
        <div className="hero-video-bg">
          <div className="video-overlay"></div>
          {/* Animated Cinematic Background */}
          <div className="cinematic-bg"></div>
        </div>

        <div className="hero-content container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text-center"
          >
            <h1 className="hero-title">
              Turn your imagination into <br />
              <span className="gradient-text">Reality with AI</span>
            </h1>
            <p className="hero-subtitle">
              The ultimate AI video & image creation platform.
              Generate high-quality videos from text or images in seconds.
            </p>

            {/* Immersive Input Box (Pollo style) */}
            <div className="hero-input-container">
              <input
                type="text"
                placeholder="Describe your creation... (e.g. A cyberpunk city in rain)"
                className="hero-input"
              />
              <button className="generate-btn">
                Generate
              </button>
            </div>

            <div className="hero-badges">
              <span>✨ Powered by Sora</span>
              <span>🚀 Pollo 2.0 Available</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Feature Sections (Alternating Layout) */}
      <div className="features-wrapper">
        <FeatureSection
          title="Text to Video AI"
          description="Pollo AI text to video generator brings your prompts to life with best-in-class visuals and perfectly synchronized audio."
          imageSrc="/images/text-to-video.png"
          orientation="left"
          buttonLink="/tool/text-to-video"
          prompt="A futuristic spaceship taking off from Mars surface"
          checkpoints={["Cinematic quality generation", "Perfect audio synchronization", "Support for various aspect ratios"]}
        />

        <FeatureSection
          title="Image to Video AI"
          description="Transform your static images into dynamic videos. Bring portraits to life or animate scenery with simple text commands."
          imageSrc="/images/image-to-video.png"
          orientation="right"
          buttonLink="/tool/image-to-video"
          prompt="Make her smile and wind blowing through hair"
          checkpoints={["Motion control parameters", "Preserve main subject details", "Style consistency"]}
        />

        <FeatureSection
          title="AI Video Editor"
          description="Edit your videos with the power of AI. Remove objects, change backgrounds, or style transfer your footage in seconds."
          imageSrc="/images/video-editor.png"
          orientation="left"
          buttonLink="/tool/video-editor"
          // No prompt for editor, it's UI
          checkpoints={["One-click object removal", "Smart background replacement", "Artistic style transfer"]}
        />

        <FeatureSection
          title="AI Face Swap"
          description="Seamlessly swap faces in videos and photos. Create hilarious content or professional marketing materials with ease."
          imageSrc="/images/face-swap.png"
          orientation="right"
          buttonLink="/tool/face-swap"
          prompt="Swap face with Jack in Titanic scene"
          checkpoints={["High-fidelity preservation", "Support for multiple faces", "Video & Image support"]}
        />
      </div>

      {/* 3. Viral Effects Gallery */}
      <section className="effects-gallery container">
        <div className="section-header-center">
          <h2>Viral AI Videos and Photo Effects</h2>
          <p className="section-sub">
            Want to add a sweet kiss for your loved one or bulk up with AI muscles? Want to turn your photos into Ghibli-style art
            or snap a selfie with celebrities? No problem! With over 150 video and photo effects, bring your vision to life!
          </p>
          <div className="effect-tabs">
            <button
              className={`tab-btn ${activeTab === 'video' ? 'active' : ''}`}
              onClick={() => setActiveTab('video')}
            >
              Video Effects
            </button>
            <button
              className={`tab-btn ${activeTab === 'photo' ? 'active' : ''}`}
              onClick={() => setActiveTab('photo')}
            >
              Photo Effects
            </button>
          </div>
        </div>

        <div className="effects-grid-new">
          {currentEffects.map((effect, idx) => (
            <EffectCard key={idx} {...effect} />
          ))}
        </div>
      </section>

      {/* 4. Footer Placeholder */}
      <div className="spacer" style={{ height: '100px' }}></div>

      <style jsx>{`
        .main-container {
            background-color: var(--bg-primary);
            min-height: 100vh;
            color: white;
            overflow-x: hidden;
        }

        /* Hero Styles */
        .hero-section {
            min-height: 100vh;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            overflow: hidden;
            padding-top: calc(var(--header-height) + 120px);
            margin-top: calc(var(--header-height) * -1);
        }

        .hero-video-bg {
            position: absolute;
            inset: 0;
            z-index: 0;
            overflow: hidden;
        }

        /* Cinematic Background with Animation */
        .cinematic-bg {
            width: 100%;
            height: 100%;
            background-image: url('/images/hero-bg-new.png'); /* Updated image */
            background-size: cover;
            background-position: center;
            /* Animation to simulate video movement */
            animation: slowPanNew 40s ease-in-out infinite alternate; /* Updated animation */
            transform-origin: center center;
        }

        @keyframes slowPanNew { /* New animation keyframes */
            0% { transform: scale(1) translate(0, 0); }
            100% { transform: scale(1.2) translate(-30px, 10px); }
        }

        /* Dark Overlay to make text pop ("Faint" effect) */
        .video-overlay {
            position: absolute;
            inset: 0;
            background: rgba(3, 0, 20, 0.65); /* Darker overlay for readability */
            z-index: 1;
            backdrop-filter: blur(2px); /* Slight blur to focus on text */
        }

        .hero-content {
            position: relative;
            z-index: 10;
            width: 100%;
        }

        .hero-text-center {
            text-align: center;
            max-width: 900px;
            margin: 0 auto;
        }

        .hero-title {
            font-size: 5rem;
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 24px;
            letter-spacing: -0.02em;
            text-shadow: 0 4px 20px rgba(0,0,0,0.5); /* Shadow for legibility */
        }

        .gradient-text {
            background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f43f5e 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
            font-size: 1.25rem;
            color: #e2e8f0; /* Lighter color for contrast */
            margin-bottom: 48px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
            text-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        /* Pollo-style Input Container */
        .hero-input-container {
            background: rgba(20, 20, 30, 0.7); /* Darker glass */
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 16px; /* Less rounded, more like a panel */
            padding: 8px; /* Inner padding for the button */
            display: flex;
            align-items: center;
            max-width: 700px;
            margin: 0 auto 32px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
            transition: all 0.3s;
        }
        
        .hero-input-container:hover, .hero-input-container:focus-within {
            background: rgba(20, 20, 30, 0.85);
            border-color: rgba(168, 85, 247, 0.4);
            transform: translateY(-2px);
        }

        .hero-input {
            flex: 1;
            background: transparent;
            border: none;
            color: white;
            font-size: 1.1rem;
            outline: none;
            padding: 12px 24px;
        }
        
        .hero-input::placeholder {
            color: rgba(255,255,255,0.4);
        }

        .generate-btn {
            background: var(--accent-gradient);
            color: white;
            border: none;
            padding: 12px 32px;
            border-radius: 12px; /* Matching corner radius */
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(236, 72, 153, 0.3);
        }

        .generate-btn:hover {
            opacity: 0.95;
            box-shadow: 0 0 25px rgba(236, 72, 153, 0.6);
            transform: translateY(-1px);
        }

        .hero-badges {
            display: flex;
            justify-content: center;
            gap: 20px;
            font-size: 0.9rem;
            color: rgba(255,255,255,0.7);
        }

        /* Effects Gallery Section */
        .effects-gallery {
            padding: 100px 24px;
        }

        .section-header-center {
            text-align: center;
            max-width: 800px;
            margin: 0 auto 60px;
        }

        .section-header-center h2 {
            font-size: 3.5rem;
            font-weight: 700;
            margin-bottom: 24px;
        }

        .section-sub {
            color: var(--text-secondary);
            font-size: 1.1rem;
            margin-bottom: 40px;
            line-height: 1.6;
        }

        .effect-tabs {
            display: inline-flex;
            background: #2a2a35;
            padding: 4px;
            border-radius: 100px;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.1);
        }

        .tab-btn {
            background: transparent;
            color: #94a3b8;
            border: none;
            padding: 8px 24px;
            border-radius: 100px;
            font-size: 0.95rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s;
        }

        .tab-btn.active {
            background: white;
            color: black;
            font-weight: 600;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }

        .effects-grid-new {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 30px;
        }

        @media (max-width: 768px) {
          h1 { font-size: 3rem; }
          .hero-stats { flex-direction: column; gap: 20px; background: transparent; border: none; box-shadow: none; }
          .separator { display: none; }
          .hero-actions { flex-direction: column; width: 100%; }
          .btn-lg { width: 100%; }
          .section-header { flex-direction: column; align-items: flex-start; gap: 20px; }
          .title-lg { font-size: 2.5rem; }
        }
      `}</style>
    </main>
  );
}
