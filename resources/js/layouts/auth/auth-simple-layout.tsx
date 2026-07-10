import { Link } from '@inertiajs/react';
import { HelpCircle } from 'lucide-react';
import { welcome } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-[#111111] text-white flex flex-col font-sans selection:bg-[#ff5500] selection:text-white">
            {/* Header */}
            <header className="h-20 border-b border-[#333333] flex items-center justify-between px-6 lg:px-10">
                <Link href="/" className="font-['Outfit'] font-black text-3xl tracking-wider text-[#ff5500] hover:text-[#ff7733] transition-colors">
                    MOTNEKI
                </Link>
                <button className="text-[#ff5500] hover:text-[#ff7733] transition-colors">
                    <HelpCircle className="w-6 h-6" />
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-6 relative overflow-hidden pt-12 pb-20">
                {/* Subtle dark gradient background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ff5500]/5 via-[#111111] to-[#111111] pointer-events-none"></div>
                
                <div className="w-full max-w-[440px] relative z-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
