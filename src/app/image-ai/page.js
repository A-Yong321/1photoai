"use client";
// Image AI Page
import Link from 'next/link';
import { menuData } from '@/lib/menuData';

export default function ImageAIPage() {
    const categoryData = menuData.find(cat => cat.key === 'image-ai');
    const tools = categoryData ? categoryData.items : [];

    return (
        <main className="tools-page container">
            <div className="page-header">
                <h1>Image AI Tools</h1>
                <p>Transform your imagination into reality with our Image AI tools.</p>
            </div>

            <div className="tools-grid">
                {tools.map((tool, idx) => (
                    <Link key={idx} href={tool.href} className="tool-card glass-panel">
                        <div className="tool-icon">{tool.icon}</div>
                        <h3>{tool.title}</h3>
                        <p>{tool.desc}</p>
                    </Link>
                ))}
            </div>

            <style jsx>{`
        .tools-page {
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
             background: linear-gradient(to right, #fff, #a5a5a5);
             -webkit-background-clip: text;
             -webkit-text-fill-color: transparent;
        }
        p { color: var(--text-secondary); font-size: 1.2rem; }
        .tools-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 24px;
        }
        .tool-card {
            padding: 30px;
            border-radius: 24px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            text-decoration: none;
            color: white;
            display: flex;
            flex-direction: column;
            gap: 16px;
            border: 1px solid rgba(255,255,255,0.05);
            background: rgba(255,255,255,0.02);
            position: relative;
            overflow: hidden;
        }
        .tool-card:hover {
            transform: translateY(-5px);
            background: rgba(255,255,255,0.05);
            border-color: rgba(255,255,255,0.1);
            box-shadow: 0 20px 40px -10px rgba(0,0,0,0.3);
        }
        .tool-icon { font-size: 2.5rem; margin-bottom: 8px; }
        h3 { font-size: 1.4rem; font-weight: 600; letter-spacing: -0.01em;}
        .tool-card p { font-size: 1rem; line-height: 1.6; color: var(--text-secondary); }
    `}</style>
        </main>
    );
}
