"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function FeatureSection({
    title,
    description,
    buttonText = "Try for Free",
    buttonLink = "/tools",
    videoSrc,
    imageSrc,
    prompt, // New prop for dynamic prompt overlay
    orientation = "left",
    checkpoints = []
}) {
    return (
        <section className="feature-section">
            <div className={`feature-container ${orientation}`}>
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: orientation === 'left' ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-content"
                >
                    <h2 className="feature-title">{title}</h2>
                    <p className="feature-description">{description}</p>

                    {checkpoints.length > 0 && (
                        <ul className="checkpoints">
                            {checkpoints.map((point, index) => (
                                <li key={index}>
                                    <span className="check-icon">✓</span> {point}
                                </li>
                            ))}
                        </ul>
                    )}

                    <Link href={buttonLink} className="action-btn-wrapper">
                        <button className="feature-btn">
                            {buttonText}
                        </button>
                    </Link>
                </motion.div>

                {/* Visual Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="visual-content"
                >
                    <div className="media-frame">
                        <div className="glow-effect"></div>

                        <div className="cinematic-wrapper">
                            {videoSrc ? (
                                <video
                                    src={videoSrc}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="feature-media"
                                />
                            ) : (
                                <img
                                    src={imageSrc}
                                    alt={title}
                                    className="feature-media"
                                />
                            )}
                        </div>

                        {/* Video Progress Bar Simulation */}
                        <div className="video-ui-overlay">
                            <div className="video-progress-bar">
                                <div className="video-progress-fill"></div>
                            </div>
                        </div>

                        {/* Only show overlay if prompt is provided */}
                        {prompt && (
                            <div className="prompt-overlay">
                                <div className="prompt-label">{prompt}</div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            <style jsx>{`
                .feature-section {
                    padding: 100px 0;
                    position: relative;
                    overflow: visible;
                }

                .feature-container {
                    display: flex;
                    align-items: center;
                    gap: 80px;
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 40px;
                }

                .feature-container.right {
                    flex-direction: row-reverse;
                }

                .text-content {
                    flex: 0.8; 
                    min-width: 300px;
                }
                
                .visual-content {
                    flex: 1.2;
                }

                /* Mobile responsive */
                @media (max-width: 968px) {
                    .feature-container, .feature-container.right {
                        flex-direction: column;
                        gap: 40px;
                        text-align: center;
                    }
                    .text-content, .visual-content {
                        flex: 1;
                        width: 100%;
                    }
                    .text-content {
                        align-items: center;
                        display: flex;
                        flex-direction: column;
                    }
                }

                .feature-title {
                    font-size: 3.5rem;
                    font-weight: 800;
                    margin-bottom: 20px;
                    color: white;
                    letter-spacing: -0.02em;
                    line-height: 1.1;
                }

                .feature-description {
                    font-size: 1.15rem;
                    line-height: 1.6;
                    color: #94a3b8; /* Slate-400 equivalent */
                    margin-bottom: 32px;
                    max-width: 90%;
                }

                @media (max-width: 968px) {
                    .feature-description {
                        margin-left: auto;
                        margin-right: auto;
                    }
                }

                .checkpoints {
                    list-style: none;
                    padding: 0;
                    margin-bottom: 40px;
                    text-align: left;
                }

                .checkpoints li {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 12px;
                    color: #e2e8f0;
                    font-size: 1.05rem;
                    font-weight: 500;
                }

                .check-icon {
                    color: #10b981; /* Emerald-500 */
                    font-weight: 800;
                    background: rgba(16, 185, 129, 0.1);
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 50%;
                    font-size: 0.8rem;
                }

                /* Premium Button Style (Pollo Replica) */
                .action-btn-wrapper {
                    text-decoration: none;
                    display: inline-block;
                }

                .feature-btn {
                    position: relative;
                    padding: 14px 36px;
                    font-size: 1.05rem;
                    font-weight: 600;
                    color: white;
                    background: black; /* Solid black core */
                    border-radius: 100px;
                    border: 2px solid transparent; /* Prepare for gradient border */
                    background-clip: padding-box;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    display: inline-flex;
                    align-items: center;
                    z-index: 1;
                }

                /* Gradient Border Trick */
                .feature-btn::before {
                    content: '';
                    position: absolute;
                    inset: -2px; /* Slight spread for border width */
                    z-index: -1;
                    border-radius: 100px;
                    background: linear-gradient(90deg, #7c3aed, #ec4899, #f43f5e);
                }

                .feature-btn:hover {
                    box-shadow: 0 0 25px rgba(236, 72, 153, 0.5); /* Pinkish glow */
                    transform: scale(1.02);
                }

                .media-frame {
                    position: relative;
                    border-radius: 20px;
                    overflow: hidden;
                    /* Minimal border for clean look */
                    border: 1px solid rgba(255,255,255,0.08); 
                    background: #000;
                    aspect-ratio: 16/9;
                    box-shadow: 0 25px 60px -20px rgba(0,0,0,0.6);
                    width: 100%;
                }

                /* Container for the specific cinematic animation */
                .cinematic-wrapper {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    position: relative;
                }

                .feature-media {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    /* Animation simulating video movement */
                    animation: videoPan 20s ease-in-out infinite alternate;
                    transform-origin: center;
                }

                @keyframes videoPan {
                    0% { transform: scale(1.1) translate(0, 0); }
                    25% { transform: scale(1.15) translate(-2%, 1%); }
                    50% { transform: scale(1.2) translate(1%, -2%); }
                    75% { transform: scale(1.15) translate(2%, 2%); }
                    100% { transform: scale(1.1) translate(0, 0); }
                }
                
                .media-frame:hover .feature-media {
                    /* On hover, maybe slightly speed up or shift focus? For now, keep it consistent */
                    /* animation-play-state: paused; */
                }

                /* Clean, dark prompt overlay */
                .prompt-overlay {
                    position: absolute;
                    bottom: 24px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(10, 10, 10, 0.85); /* Darker, more solid */
                    backdrop-filter: blur(12px);
                    padding: 8px 16px; /* Smaller padding */
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.1);
                    width: max-content;
                    max-width: 80%;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .prompt-label {
                    color: #fff;
                    font-size: 0.9rem;
                    background: linear-gradient(90deg, #e0c3fc 0%, #8ec5fc 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: 500;
                }

                /* Simulated Video UI */
                .video-ui-overlay {
                    position: absolute;
                    inset: 0;
                    z-index: 5;
                    pointer-events: none; /* Let clicks pass through */
                }

                .play-icon-overlay {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 60px;
                    height: 60px;
                    background: rgba(0, 0, 0, 0.4);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(4px);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0; /* Hidden by default, nicer */
                    transition: all 0.3s;
                }
                
                /* Show play button on hover only? Or keep it hidden to be 'autoplay' style? 
                   Pollo usually autoplays. Let's add a progress bar at bottom instead */
                
                .video-progress-bar {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: rgba(255,255,255,0.1);
                }
                
                .video-progress-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #7c3aed, #ec4899);
                    width: 0%;
                    animation: progressFill 10s linear infinite;
                }

                @keyframes progressFill {
                    0% { width: 0%; opacity: 1; }
                    90% { width: 90%; opacity: 1; }
                    100% { width: 100%; opacity: 0; }
                }

            `}</style>
        </section>
    );
}
