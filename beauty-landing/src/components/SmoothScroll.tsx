"use client";

import { ReactLenis } from "lenis/react";
import type { LenisRef } from "lenis/react";
import { cancelFrame, frame } from "framer-motion";
import { useEffect, useRef } from "react";

interface SmoothScrollProps {
    children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<LenisRef>(null);

    useEffect(() => {
        function update(data: { timestamp: number }) {
            const time = data.timestamp;
            lenisRef.current?.lenis?.raf(time);
        }

        frame.update(update, true);

        return () => cancelFrame(update);
    }, []);

    return (
        <ReactLenis
            root
            options={{
                autoRaf: false,
                lerp: 0.1,
                duration: 1.2,
                smoothWheel: true,
            }}
            ref={lenisRef}
        >
            {children}
        </ReactLenis>
    );
}
