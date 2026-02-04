"use client";

import Link from 'next/link';

export default function AboutPage() {
    return (
        <main className="about-page container">
            <div className="content-wrapper">
                <h1 className="title">About <span className="text-gradient">1photo AI</span></h1>

                <section className="about-section">
                    <h2>Our Mission</h2>
                    <p>
                        At 1photo AI, we believe that everyone should have the power to create professional-quality
                        visual content without needing expensive equipment or years of technical training.
                        Our mission is to democratize creative expression through accessible, powerful AI tools.
                    </p>
                </section>

                <section className="about-section">
                    <h2>What We Do</h2>
                    <p>
                        We provide an all-in-one platform for AI-powered video and image generation.
                        From turning static photos into viral videos to creating custom avatars and unique artistic effects,
                        1photo AI brings your imagination to life in seconds.
                    </p>
                </section>

                <section className="about-section">
                    <h2>Our Technology</h2>
                    <p>
                        Optimized by state-of-the-art models like Kling, HaiLuo, and Dreamina, we ensure
                        the highest quality output. We focus on "Viral Effects" — specialized templates designed
                        specifically for social media engagement, making us the go-to tool for creators.
                    </p>
                </section>

                <div className="cta-box">
                    <h3>Ready to start creating?</h3>
                    <Link href="/" className="cta-btn">Try for Free</Link>
                </div>
            </div>

            <style jsx>{`
        .about-page {
          padding-top: calc(var(--header-height) + 80px);
          padding-bottom: 100px;
          min-height: 100vh;
        }

        .content-wrapper {
          max-width: 800px;
          margin: 0 auto;
        }

        .title {
          font-size: 3.5rem;
          margin-bottom: 60px;
          text-align: center;
        }

        .about-section {
          margin-bottom: 60px;
          padding: 40px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
        }

        h2 {
          font-size: 1.8rem;
          margin-bottom: 20px;
          color: #fff;
        }

        p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }

        .cta-box {
            text-align: center;
            margin-top: 80px;
            padding: 60px;
            background: linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 100%);
            border-radius: 24px;
            border: 1px solid rgba(255,255,255,0.1);
        }

        .cta-box h3 {
            font-size: 2rem;
            margin-bottom: 30px;
        }

        .cta-btn {
            display: inline-block;
            background: var(--primary-gradient);
            color: white;
            padding: 16px 48px;
            border-radius: 100px;
            font-weight: 700;
            font-size: 1.1rem;
            transition: all 0.3s;
        }
        
        .cta-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
      `}</style>
        </main>
    );
}
