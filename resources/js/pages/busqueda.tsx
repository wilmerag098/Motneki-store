import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ShoppingCart } from 'lucide-react';

export default function Busqueda() {
    // Simulated query (in a real app, this comes from props/URL)
    const query = new URLSearchParams(window.location.search).get('q') || 'naruto';
    
    // Simulated results
    const results = [
        {
            id: 1,
            brand: 'PICKSTAR STUDIO',
            category: 'NARUTO',
            title: 'Naruto Might Guy',
            price: 'S/. 80.00',
            status: 'PRE-ORDEN',
            badge: 'pre-order',
            image: 'https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        },
        {
            id: 2,
            brand: 'PIERROT STUDIO',
            category: 'NARUTO',
            title: 'Naruto Shippuden - Kunai de...',
            price: 'S/. 20.00',
            status: 'EN STOCK',
            badge: 'in-stock',
            image: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
        }
    ];

    return (
        <PublicLayout>
            <Head title={`Resultados para "${query}"`} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                
                {/* Header */}
                <div className="mb-10">
                    <h3 className="text-[10px] md:text-xs font-bold text-[#8A4A21] dark:text-[#ff5500] tracking-widest uppercase mb-2">Resultados de Búsqueda</h3>
                    <h1 className="text-3xl md:text-5xl font-bold text-[#1C1612] dark:text-[#ffffff] tracking-tight mb-2">
                        Resultados para "{query}"
                    </h1>
                    <p className="text-[#888888] dark:text-[#9ca3af] text-sm md:text-base">
                        Se encontraron {results.length} productos coincidentes.
                    </p>
                </div>

                {/* Results Grid */}
                {results.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                        {results.map((product) => (
                            <div key={product.id} className="group border border-[#EADED5] dark:border-[#3a3939] rounded-2xl overflow-hidden hover:border-[#ff5500] dark:hover:border-[#ff5500] transition-colors bg-[#FAF5F0] dark:bg-[#1c1b1b] flex flex-col">
                                
                                <div className="relative aspect-[4/5] bg-[#F2E5DC] dark:bg-[#131313] p-0 flex items-center justify-center overflow-hidden">
                                    <img src={product.image} alt={product.title} className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-500" />
                                    
                                    {/* Status Badge on Image */}
                                    <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-sm text-[10px] font-bold text-white uppercase tracking-wider ${product.badge === 'pre-order' ? 'bg-[#ff5500]' : 'bg-[#C25910]'}`}>
                                        {product.badge}
                                    </div>
                                    
                                    <button className="absolute top-3 right-3 bg-[#ff5500] text-white p-2 rounded-full shadow-md hover:bg-[#e04a00] transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                                        <ShoppingCart className="w-4 h-4" />
                                    </button>
                                </div>
                                
                                <div className="p-4 md:p-5 flex flex-col flex-grow bg-white dark:bg-[#1c1b1b]">
                                    <p className="text-[10px] font-bold text-[#888888] dark:text-[#9ca3af] uppercase tracking-wider mb-1.5 line-clamp-1">
                                        {product.brand} • {product.category}
                                    </p>
                                    <h3 className="text-sm md:text-base font-bold text-[#1C1612] dark:text-[#ffffff] leading-tight mb-4 line-clamp-2">
                                        {product.title}
                                    </h3>
                                    <div className="mt-auto flex justify-between items-end">
                                        <p className="text-lg md:text-xl font-black text-[#8A4A21] dark:text-[#ff5500]">{product.price}</p>
                                        <div className="bg-[#F2E5DC] dark:bg-[#3a3939] text-[#8A4A21] dark:text-[#ff5500] text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                                            {product.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-[#F2E5DC] dark:bg-[#1c1b1b] rounded-2xl p-12 text-center">
                        <h2 className="text-2xl font-bold text-[#1C1612] dark:text-[#ffffff] mb-2">No disponible</h2>
                        <p className="text-[#888888] dark:text-[#9ca3af]">No se encontraron productos que coincidan con tu búsqueda.</p>
                    </div>
                )}

            </div>
        </PublicLayout>
    );
}
