"use client";

import ToolCard from '@/components/ui/ToolCard';

export default function ToolsPage() {
  const allTools = [
    {
      title: "Text to Video",
      description: "Transform simple text prompts into cinematic AI videos in seconds.",
      icon: "🎬",
      href: "/tool/text-to-video",
      isNew: true
    },
    {
      title: "Image to Video",
      description: "Bring static photos to life with realistic movement and dynamics.",
      icon: "📸",
      href: "/tool/image-to-video",
      isNew: false
    },
    {
      title: "AI Kissing Generator",
      description: "Create viral hugging and kissing videos from two separate photos.",
      icon: "💏",
      href: "/video-effects/ai-kissing",
      isNew: true
    },
    {
      title: "Deep Fake Face Swap",
      description: "Swap faces in videos and images with professional precision.",
      icon: "🎭",
      href: "/tool/face-swap",
      isNew: false
    },
    {
      title: "Video Enhancer",
      description: "Upscale and improve the quality of your existing videos using AI.",
      icon: "✨",
      href: "/tool/video-enhancer",
      isNew: true
    },
    {
      title: "Background Remover",
      description: "Instantly remove backgrounds from images and videos with high accuracy.",
      icon: "✂️",
      href: "/tool/bg-remover",
      isNew: false
    },
    {
      title: "AI Music Generator",
      description: "Create original royalty-free music and songs from text prompts.",
      icon: "🎵",
      href: "/tool/text-to-music",
      isNew: true
    }
  ];

  return (
    <main className="page-container">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="page-title">All AI Tools</h1>
          <p className="page-subtitle">Explore our complete collection of AI-powered creative tools</p>
        </div>

        <div className="tools-grid">
          {allTools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .page-container {
          padding: 120px 0 80px;
          min-height: 100vh;
          background: radial-gradient(circle at 50% 0%, #1e1b4b 0%, #050505 50%);
        }

        .text-center {
          text-align: center;
        }

        .mb-5 {
          margin-bottom: 60px;
        }

        .page-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 16px;
          background: linear-gradient(to right, #fff, #a5b4fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .page-subtitle {
          font-size: 1.2rem;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 30px;
        }
      `}</style>
    </main>
  );
}
