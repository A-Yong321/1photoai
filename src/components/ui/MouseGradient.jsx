"use client";

import { useEffect, useRef } from "react";

export default function MouseGradient() {
    const blobRef = useRef(null);

    useEffect(() => {
        const handlePointerMove = (e) => {
            const { clientX, clientY } = e;
            if (blobRef.current) {
                blobRef.current.animate(
                    {
                        left: `${clientX}px`,
                        top: `${clientY}px`,
                    },
                    { duration: 500, fill: "forwards" }
                );
            }
        };

        window.addEventListener("pointermove", handlePointerMove);
        return () => window.removeEventListener("pointermove", handlePointerMove);
    }, []);

    return (
        <div
            ref={blobRef}
            className="fixed pointer-events-none z-0 mix-blend-screen opacity-15"
            style={{
                width: "300px",
                height: "300px",
                background: "radial-gradient(circle, rgba(236,72,153,0.4) 0%, rgba(168,85,247,0.2) 50%, transparent 80%)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                left: "50%",
                top: "50%",
                position: "fixed", // Ensure it doesn't take up space
                zIndex: 0,
            }}
        />
    );
}
