import React from 'react';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useStore } from '@/store/useStore';

interface ProductCardProps {
    id: number;
    title: string;
    brand: string;
    franchise: string;
    price: number;
    image: string;
    status: string;
    badge?: string;
    viewMode?: 'grid' | 'list';
    releaseDate?: string;
}

export default function ProductCard({
    id, title, brand, franchise, price, image, status, badge, viewMode = 'grid', releaseDate
}: ProductCardProps) {
    const { toggleWishlist, isInWishlist, openQuickView, addToCart } = useStore();
    const isWished = isInWishlist(id);

    const isList = viewMode === 'list';

    return (
        <div className={`bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl overflow-hidden border border-[#EADED5] dark:border-[#3a3939]/60 hover:shadow-xl transition-all duration-300 group relative ${isList ? 'flex flex-col sm:flex-row h-auto items-stretch' : 'flex flex-col h-full'}`}>
            <div className={`relative bg-[#F7F2EE] dark:bg-[#131313] overflow-hidden p-4 flex items-center justify-center ${isList ? 'w-full sm:w-[280px] aspect-square sm:aspect-auto shrink-0' : 'aspect-[4/5]'}`}>
                
                {badge && (
                    <span className="absolute top-4 left-4 z-10 bg-[#ff5500] text-white text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm">
                        {badge}
                    </span>
                )}
                
                {/* Actions Overlay */}
                <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
                    <button 
                        onClick={() => toggleWishlist(id)}
                        className={`p-2 rounded-full transition-colors shadow-sm ${
                            isWished 
                            ? 'bg-red-500 text-white' 
                            : 'bg-[#FFF6F0] dark:bg-[#1c1b1b]/80 hover:bg-white text-[#1C1612] dark:text-[#ffffff] hover:text-red-500'
                        }`}
                        title="Favoritos"
                    >
                        <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button 
                        onClick={() => openQuickView({ id, title, brand, franchise, price: `S/. ${price.toFixed(2)}`, image, status })}
                        className="p-2 bg-[#FFF6F0] dark:bg-[#1c1b1b]/80 hover:bg-white text-[#1C1612] dark:text-[#ffffff] hover:text-[#ff5500] rounded-full transition-colors shadow-sm opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 duration-300"
                        title="Vista Rápida"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                </div>

                <Link href={`/producto/${id}`} className="block w-full h-full">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                </Link>

                {/* Quick Add To Cart overlay bottom */}
                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <button 
                        onClick={() => addToCart({ id, title, brand, price, quantity: 1, image, status: status === 'PREVENTA' ? 'PREVENTA' : undefined })}
                        className="w-full bg-[#ff5500]/90 hover:bg-[#ff5500] text-white backdrop-blur-md py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg"
                    >
                        <ShoppingCart className="w-4 h-4" /> Añadir Rápido
                    </button>
                </div>
            </div>
            
            <div className={`p-5 flex flex-col flex-grow justify-between ${isList ? 'sm:p-8 sm:w-full' : ''}`}>
                <div>
                    <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
                        {brand}
                    </span>
                    <Link href={`/producto/${id}`}>
                        <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] mt-1.5 leading-snug line-clamp-2 hover:text-[#ff5500] transition-colors cursor-pointer">
                            {title}
                        </h3>
                    </Link>
                    <span className="inline-block text-[11px] font-bold text-[#ff5500]/80 mt-2">
                        {franchise}
                    </span>
                    {releaseDate && (
                        <div className="mt-2 flex items-center gap-1 text-[10px] text-[#888888] font-medium bg-[#ff5500]/10 px-2 py-1 rounded-md w-fit">
                            <svg className="w-3 h-3 text-[#ff5500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Disponible: {new Date(releaseDate).toLocaleDateString()}
                        </div>
                    )}
                </div>
                <div className={`mt-4 pt-3 border-t border-[#EADED5] dark:border-[#3a3939]/50 flex items-center justify-between ${isList ? 'mt-8' : ''}`}>
                    <span className="text-lg font-extrabold text-[#ff5500]">
                        S/. {price.toFixed(2)}
                    </span>
                    <span className="text-[9px] font-bold tracking-widest text-[#6E7B8A] uppercase">
                        {status}
                    </span>
                </div>
            </div>
        </div>
    );
}
