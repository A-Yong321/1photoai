import TopBanner from '@/components/layout/TopBanner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MouseGradient from '@/components/ui/MouseGradient';
import './globals.css';

export const metadata = {
    title: '1photo AI - Transform Photos into AI Videos',
    description: 'Generate high-quality AI videos, effects, and virtual avatars from a single photo.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <TopBanner />
                <Navbar />
                <MouseGradient />
                <div className="main-wrapper">

                    {children}
                    <Footer />
                </div>
            </body>
        </html>
    );
}
