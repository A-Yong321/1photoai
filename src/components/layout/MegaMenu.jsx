"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const MegaMenu = ({ activeItem, menuData }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!activeItem || !mounted) return null;

    const currentCategory = menuData.find((cat) => cat.key === activeItem);

    if (!currentCategory) return null;

    return createPortal(
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="fixed top-[80px] left-0 w-full z-[999] bg-[#151518]/95 backdrop-blur-md border-t border-white/5 shadow-2xl"
                onMouseEnter={() => { }}
            >
                <div className="max-w-[1400px] mx-auto p-8">
                    {/* Main Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                        {currentCategory.items.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="group block"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="text-xl text-[#ff3b5c] mt-1 group-hover:scale-110 transition-transform duration-300">
                                        {/* Using text icons for now, but configured for where SVG icons would be */}
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-white group-hover:text-[#ff3b5c] transition-colors text-[15px]">
                                                {item.title}
                                            </h3>
                                            {item.badge && (
                                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#ff3b5c] text-white uppercase tracking-wider">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-400 group-hover:text-gray-300 leading-relaxed font-light">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Footer Section (Supported Models) */}
                    {currentCategory.footer && (
                        <div className="pt-6 border-t border-white/10">
                            <div className="flex items-center gap-4 text-xs">
                                <span className="text-white font-semibold whitespace-nowrap">{currentCategory.footer.title}</span>
                                <div className="flex flex-wrap gap-2">
                                    {currentCategory.footer.models.map((model, idx) => (
                                        <span key={idx} className="text-gray-400 flex items-center gap-1">
                                            {model.name}
                                            {model.badge && (
                                                <span className={`px-1 rounded-[2px] text-[9px] text-white font-bold ${model.color === 'green' ? 'bg-[#4ade80] text-black' : 'bg-[#ff3b5c]'
                                                    }`}>
                                                    {model.badge}
                                                </span>
                                            )}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
};

export default MegaMenu;
