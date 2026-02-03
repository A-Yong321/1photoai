"use client";

import { useParams } from 'next/navigation';
import ToolPage from '@/app/tool/[slug]/page';

export default function EffectDetailPage() {
    const params = useParams();

    // Reuse the logic from ToolPage but we could customize the UI here if needed
    // For now, we wrap it to maintain consistency and allow future divergence
    return (
        <>
            <ToolPage />
            <div className="container" style={{ marginTop: '-40px', marginBottom: '80px' }}>
                <h3 style={{ marginBottom: '24px' }}>Related Effects</h3>
                {/* We would render related effects here */}
                <p style={{ color: 'var(--text-secondary)' }}>More viral effects coming soon...</p>
            </div>
        </>
    );
}
