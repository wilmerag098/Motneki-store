import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Heart } from 'lucide-react';

export default function Favoritos() {
    return (
        <PublicLayout>
            <Head title="Favoritos" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1C1612] dark:text-[#ffffff] tracking-tight mb-2">
                        Mi Lista de Favoritos
                    </h1>
                    <p className="text-[#888888] dark:text-[#9ca3af] text-sm md:text-base">
                        Tus figuras favoritas guardadas en un solo lugar.
                    </p>
                </div>

                {/* Empty State Container */}
                <div className="bg-[#F2E5DC] dark:bg-[#1c1b1b] rounded-2xl md:rounded-3xl p-12 md:p-24 flex flex-col items-center justify-center text-center transition-colors">
                    
                    <div className="bg-[#FAF5F0] dark:bg-[#3a3939] p-5 rounded-full mb-6 transition-colors shadow-sm">
                        <Heart className="w-12 h-12 md:w-16 md:h-16 text-[#8A4A21] dark:text-[#9ca3af]" strokeWidth={1.5} />
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-[#1C1612] dark:text-[#ffffff] mb-3 transition-colors">
                        No tienes favoritos aún
                    </h2>
                    
                    <p className="text-[#888888] dark:text-[#9ca3af] text-sm md:text-base mb-8 max-w-md transition-colors">
                        Agrega tus figuras favoritas para encontrarlas fácilmente más tarde
                    </p>

                    <Link 
                        href="/catalogo"
                        className="bg-[#ff5500] hover:bg-[#e04a00] text-white px-8 py-3.5 rounded-full font-bold text-xs tracking-widest uppercase transition-colors shadow-md hover:shadow-lg"
                    >
                        Explorar Catálogo
                    </Link>

                </div>
            </div>
        </PublicLayout>
    );
}
