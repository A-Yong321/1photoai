"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const MobileMenu = ({ isOpen, onClose, menuData }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);

    const toggleCategory = (key) => {
        setExpandedCategory(expandedCategory === key ? null : key);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-[280px] bg-[#0a0a0a] border-l border-white/10 z-50 overflow-y-auto lg:hidden"
                    >
                        <div className="p-6 space-y-8">
                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                                    菜单
                                </span>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="border-b border-white/5 pb-2">
                                    <Link
                                        href="/video-ai"
                                        onClick={onClose}
                                        className="block py-2 text-white font-medium hover:text-purple-400 transition-colors"
                                    >
                                        Video AI
                                    </Link>
                                </div>
                                <div className="border-b border-white/5 pb-2">
                                    <Link
                                        href="/image-ai"
                                        onClick={onClose}
                                        className="block py-2 text-white font-medium hover:text-purple-400 transition-colors"
                                    >
                                        Image AI
                                    </Link>
                                </div>

                                <div className="pt-4 border-t border-white/10">
                                    <Link href="/video-effects" className="block py-2 text-white hover:text-purple-400">Video Effects</Link>
                                    <Link href="/pricing" className="block py-2 text-white hover:text-purple-400">价格方案</Link>
                                    <Link href="/api-platform" className="block py-2 text-white hover:text-purple-400">API</Link>
                                </div>
                            </div>

                            <div className="pt-6 space-y-3">
                                <Link href="/login" className="block w-full text-center py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white transition-all">
                                    登录
                                </Link>
                                <Link href="/signup" className="block w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-medium transition-all shadow-lg hover:shadow-purple-500/25">
                                    免费试用
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
