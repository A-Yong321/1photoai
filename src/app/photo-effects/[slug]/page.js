"use client";

import { useParams } from 'next/navigation';
import ToolPage from '@/app/tool/[slug]/page';

export default function PhotoEffectDetailPage() {
    const params = useParams();

    // Reuse the logic from ToolPage but render as a specific effect page wrapper
    return (
        <>
            <ToolPage />
            <div className="container" style={{ marginTop: '-40px', marginBottom: '80px' }}>
                <h3 style={{ marginBottom: '24px' }}>Related Photo Styles</h3>
                <p style={{ color: 'var(--text-secondary)' }}>More viral photo filters coming soon...</p>
            </div>
        </>
    );
}
