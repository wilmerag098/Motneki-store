import React, { useEffect, useRef } from 'react';
import { Search, X, Clock } from 'lucide-react';
import { Link, router } from '@inertiajs/react';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const value = inputRef.current?.value;
        if (value) {
            onClose();
            router.visit(`/busqueda?q=${encodeURIComponent(value)}`);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh]">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white dark:bg-[#1c1b1b] w-full max-w-5xl rounded-3xl shadow-2xl mx-4 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                
                <div className="p-6 md:p-8 max-h-[80vh] overflow-y-auto">
                    {/* Search Input Area */}
                    <div className="flex items-center gap-4 mb-8">
                        <form onSubmit={handleSearch} className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#ff5500]" />
                            <input 
                                ref={inputRef}
                                type="text" 
                                placeholder="Buscar figuras, marcas, franquicias..." 
                                defaultValue="naruto"
                                className="w-full bg-white dark:bg-[#131313] border border-[#EADED5] dark:border-[#3a3939] rounded-full pl-12 pr-6 py-3.5 text-base text-[#1C1612] dark:text-[#ffffff] focus:ring-[#ff5500] focus:border-[#ff5500] shadow-sm"
                            />
                        </form>
                        <button 
                            onClick={onClose}
                            className="p-3.5 rounded-full border border-[#EADED5] dark:border-[#3a3939] text-[#888888] dark:text-[#9ca3af] hover:bg-[#F2E5DC] dark:hover:bg-[#3a3939] hover:text-[#1C1612] dark:hover:text-[#ffffff] transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        
                        {/* Left Column */}
                        <div className="md:col-span-4 space-y-8">
                            
                            {/* Búsquedas Recientes */}
                            <div className="bg-[#FAF5F0] dark:bg-[#131313] rounded-2xl p-6 border border-[#EADED5] dark:border-[#3a3939]">
                                <h3 className="text-xs font-bold text-[#888888] dark:text-[#9ca3af] tracking-wider uppercase mb-4">Búsquedas Recientes</h3>
                                <div className="flex flex-wrap gap-2">
                                    <button className="flex items-center gap-2 bg-white dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] px-3 py-1.5 rounded-full text-sm text-[#1C1612] dark:text-[#ffffff] hover:border-[#ff5500] dark:hover:border-[#ff5500] transition-colors">
                                        <Clock className="w-3.5 h-3.5 text-[#888888] dark:text-[#9ca3af]" />
                                        Asuka Langley
                                    </button>
                                    <button className="flex items-center gap-2 bg-white dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] px-3 py-1.5 rounded-full text-sm text-[#1C1612] dark:text-[#ffffff] hover:border-[#ff5500] dark:hover:border-[#ff5500] transition-colors">
                                        <Clock className="w-3.5 h-3.5 text-[#888888] dark:text-[#9ca3af]" />
                                        Chainsaw Man
                                    </button>
                                    <button className="flex items-center gap-2 bg-white dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] px-3 py-1.5 rounded-full text-sm text-[#1C1612] dark:text-[#ffffff] hover:border-[#ff5500] dark:hover:border-[#ff5500] transition-colors">
                                        <Clock className="w-3.5 h-3.5 text-[#888888] dark:text-[#9ca3af]" />
                                        Nendoroid Denji
                                    </button>
                                </div>
                            </div>

                            {/* Categorías Populares */}
                            <div className="bg-[#FAF5F0] dark:bg-[#131313] rounded-2xl p-6 border border-[#EADED5] dark:border-[#3a3939]">
                                <h3 className="text-xs font-bold text-[#888888] dark:text-[#9ca3af] tracking-wider uppercase mb-4">Categorías Populares</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <Link href="/catalogo?cat=figuras" className="relative h-28 rounded-xl overflow-hidden group">
                                        <img src="https://images.unsplash.com/photo-1608197171836-8e50b717bbf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Figuras" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                                            <span className="text-white font-bold text-sm">Figuras</span>
                                        </div>
                                    </Link>
                                    <Link href="/catalogo?cat=collares" className="relative h-28 rounded-xl overflow-hidden group">
                                        <img src="https://images.unsplash.com/photo-1599643478524-fb66f4568e71?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Collares" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                                            <span className="text-white font-bold text-sm">Collares</span>
                                        </div>
                                    </Link>
                                    <Link href="/catalogo?cat=llaveros" className="relative h-28 rounded-xl overflow-hidden group">
                                        <img src="https://images.unsplash.com/photo-1618331835717-801e976710b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Llaveros" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                                            <span className="text-white font-bold text-sm">Llaveros</span>
                                        </div>
                                    </Link>
                                    <Link href="/catalogo?cat=peluches" className="relative h-28 rounded-xl overflow-hidden group">
                                        <img src="https://images.unsplash.com/photo-1560932684-5e552e289469?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Peluches" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                                            <span className="text-white font-bold text-sm">Peluches</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            
                        </div>

                        {/* Right Column: Sugerencias */}
                        <div className="md:col-span-8">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <h3 className="text-xs font-bold text-[#888888] dark:text-[#9ca3af] tracking-wider uppercase mb-1">Sugerencias Destacadas</h3>
                                    <h2 className="text-2xl font-bold text-[#1C1612] dark:text-[#ffffff]">Resultados que podrías amar</h2>
                                </div>
                                <Link onClick={onClose} href="/busqueda?q=naruto" className="text-sm font-bold text-[#8A4A21] dark:text-[#ff5500] hover:underline">
                                    Ver todos los resultados
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {/* Suggestion 1 */}
                                <Link onClick={onClose} href="/producto/1" className="block bg-white dark:bg-[#131313] border border-[#EADED5] dark:border-[#3a3939] rounded-2xl p-4 hover:border-[#ff5500] dark:hover:border-[#ff5500] transition-colors group">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-24 h-24 bg-[#F2E5DC] dark:bg-[#1c1b1b] rounded-xl overflow-hidden shrink-0">
                                            <img src="https://images.unsplash.com/photo-1613310023042-ad79320c00ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Ichigo Kurosaki" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="inline-block bg-[#F2E5DC] dark:bg-[#3a3939] text-[#8A4A21] dark:text-[#ff5500] text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider mb-2">POPULAR</span>
                                            <h4 className="text-base font-bold text-[#1C1612] dark:text-[#ffffff] leading-tight mb-1 group-hover:text-[#ff5500] transition-colors">Figura Estatua de Resina Anime Forma Hueca Bleach Ichigo Kurosaki</h4>
                                            <p className="text-xs text-[#888888] dark:text-[#9ca3af]">Good Smile Company • Bleach</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black text-[#1C1612] dark:text-[#ffffff] mb-1">S/. 189.99</p>
                                            <p className="text-[10px] font-bold text-[#8A4A21] dark:text-[#ff5500] uppercase tracking-wider">EN STOCK</p>
                                        </div>
                                    </div>
                                </Link>

                                {/* Suggestion 2 */}
                                <Link onClick={onClose} href="/producto/2" className="block bg-white dark:bg-[#131313] border border-[#EADED5] dark:border-[#3a3939] rounded-2xl p-4 hover:border-[#ff5500] dark:hover:border-[#ff5500] transition-colors group">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-24 h-24 bg-[#F2E5DC] dark:bg-[#1c1b1b] rounded-xl overflow-hidden shrink-0">
                                            <img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Goku Ultra Instinct" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="inline-block bg-[#F2E5DC] dark:bg-[#3a3939] text-[#8A4A21] dark:text-[#ff5500] text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider mb-2">NEW</span>
                                            <h4 className="text-base font-bold text-[#1C1612] dark:text-[#ffffff] leading-tight mb-1 group-hover:text-[#ff5500] transition-colors">Goku Ultra Instinct</h4>
                                            <p className="text-xs text-[#888888] dark:text-[#9ca3af]">Bandai Spirits • Dragon Ball Super</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black text-[#1C1612] dark:text-[#ffffff] mb-1">S/. 245.00</p>
                                            <p className="text-[10px] font-bold text-[#8A4A21] dark:text-[#ff5500] uppercase tracking-wider">EN STOCK</p>
                                        </div>
                                    </div>
                                </Link>

                                {/* Suggestion 3 */}
                                <Link onClick={onClose} href="/producto/3" className="block bg-white dark:bg-[#131313] border border-[#EADED5] dark:border-[#3a3939] rounded-2xl p-4 hover:border-[#ff5500] dark:hover:border-[#ff5500] transition-colors group">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-24 h-24 bg-[#F2E5DC] dark:bg-[#1c1b1b] rounded-xl overflow-hidden shrink-0">
                                            <img src="https://images.unsplash.com/photo-1618331835717-801e976710b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Gon Freecss" className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="inline-block bg-[#F2E5DC] dark:bg-[#3a3939] text-[#8A4A21] dark:text-[#ff5500] text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider mb-2">LIMITED</span>
                                            <h4 className="text-base font-bold text-[#1C1612] dark:text-[#ffffff] leading-tight mb-1 group-hover:text-[#ff5500] transition-colors">RD studio 1:4/1:6 Gon Freecss</h4>
                                            <p className="text-xs text-[#888888] dark:text-[#9ca3af]">Bandai Hobby • Hunter x Hunter</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black text-[#1C1612] dark:text-[#ffffff] mb-1">S/. 95.50</p>
                                            <p className="text-[10px] font-bold text-[#8A4A21] dark:text-[#ff5500] uppercase tracking-wider">PRE-ORDEN</p>
                                        </div>
                                    </div>
                                </Link>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
