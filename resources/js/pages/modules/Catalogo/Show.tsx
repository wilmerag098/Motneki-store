import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { 
    ChevronRight, 
    Heart, 
    ShoppingCart, 
    ShieldCheck, 
    Truck,
    Minus,
    Plus,
    ChevronDown,
    Star
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import ProductCard from '@/components/ProductCard';

interface Producto {
    id_producto: number;
    nombre: string;
    descripcion: string;
    precio: string;
    disponibilidad: string;
    tipo_producto?: string;
    fecha_disponibilidad?: string;
    en_oferta?: boolean;
    imagen_url?: string;
    categoria: { nombre: string };
}

interface Props {
    producto: Producto;
    relacionados: Producto[];
}

export default function Show({ producto, relacionados }: Props) {
    const { addToCart, toggleWishlist, isInWishlist } = useStore();
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'descripcion' | 'especificaciones'>('descripcion');
    const [isSpecsOpen, setIsSpecsOpen] = useState(true);

    const isWished = isInWishlist(producto.id_producto);
    const priceNum = parseFloat(producto.precio);
    
    // Use real image if available, fallback otherwise
    const mainImage = producto.imagen_url ? (producto.imagen_url.startsWith('http') || producto.imagen_url.startsWith('/') ? producto.imagen_url : `/storage/${producto.imagen_url}`) : "/images/ichigo_kurosaki_figure.png";

    const handleAddToCart = () => {
        addToCart({
            id: producto.id_producto,
            title: producto.nombre,
            price: priceNum,
            quantity: quantity,
            image: mainImage,
            brand: "MOTNEKI", // Mock brand
            status: producto.tipo_producto === 'preventa' ? 'PREVENTA' : undefined
        });
    };

    return (
        <PublicLayout>
            <Head title={`${producto.nombre} - MotnekiStore`} />

            <div className="bg-[#FAF5F0] dark:bg-[#111111] min-h-screen relative overflow-hidden">
                {/* Background Ambient Glows */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#ff5500]/5 to-transparent pointer-events-none" />
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#ff5500]/10 blur-[120px] pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-24 relative z-10">
                    
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#888888] dark:text-[#9ca3af] mb-10">
                        <Link href="/" className="hover:text-[#ff5500] transition-colors">Inicio</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/catalogo" className="hover:text-[#ff5500] transition-colors">Catálogo</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-[#1C1612] dark:text-[#ffffff] line-clamp-1">{producto.nombre}</span>
                    </div>

                    {/* Product Top Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
                        
                        {/* Image Gallery (Left side - takes more space on desktop) */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* Main Image Container */}
                            <div className="bg-white/60 dark:bg-[#181818]/60 backdrop-blur-2xl rounded-[2.5rem] aspect-square flex items-center justify-center p-12 border border-white/20 dark:border-white/5 relative group overflow-hidden shadow-2xl shadow-[#1C1612]/5 dark:shadow-black/40">
                                {/* Simulated Zoom (Scale on hover) */}
                                <img 
                                    src={mainImage} 
                                    alt={producto.nombre} 
                                    className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)] transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-125 origin-center cursor-zoom-in"
                                />
                                {producto.tipo_producto === 'preventa' && (
                                    <span className="absolute top-8 left-8 z-10 bg-gradient-to-r from-[#8A4A21] to-[#C25910] text-white text-[10px] font-black tracking-widest uppercase px-5 py-2 rounded-xl shadow-lg backdrop-blur-md border border-white/10">
                                        PREVENTA
                                    </span>
                                )}
                            </div>
                            
                            {/* Thumbnails */}
                            <div className="grid grid-cols-4 gap-4 sm:gap-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <button key={i} className={`aspect-square bg-white/60 dark:bg-[#181818]/60 backdrop-blur-md rounded-2xl border-2 ${i === 1 ? 'border-[#ff5500] shadow-[0_0_15px_rgba(255,85,0,0.15)]' : 'border-transparent hover:border-[#ff5500]/50 hover:shadow-lg'} transition-all duration-300 overflow-hidden p-3`}>
                                        <img src={mainImage} alt={`Vista ${i}`} className="w-full h-full object-contain drop-shadow-md hover:scale-110 transition-transform duration-500" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info (Right side) */}
                        <div className="lg:col-span-5 flex flex-col justify-center">
                            
                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="px-4 py-1.5 bg-[#1C1612] text-white dark:bg-white dark:text-black text-[10px] font-black tracking-widest uppercase rounded-full shadow-sm">
                                    MOTNEKI EXCLUSIVE
                                </span>
                                <span className="text-[11px] font-black text-[#ff5500] uppercase tracking-wider bg-[#ff5500]/10 px-4 py-1.5 rounded-full">
                                    {producto.categoria?.nombre || "Franquicia"}
                                </span>
                            </div>

                            {producto.tipo_producto === 'preventa' && producto.fecha_disponibilidad && (
                                <div className="mb-4 inline-flex items-center gap-2 bg-[#ff5500]/10 border border-[#ff5500]/20 px-4 py-2 rounded-xl">
                                    <svg className="w-5 h-5 text-[#ff5500]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <div>
                                        <p className="text-xs font-black text-[#ff5500] uppercase tracking-widest">Disponible a partir de:</p>
                                        <p className="text-sm font-medium text-[#1C1612] dark:text-white">{new Date(producto.fecha_disponibilidad).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            )}

                            <h1 className="font-['Outfit'] text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#1C1612] to-[#4a4036] dark:from-white dark:to-[#a0a0a0] leading-[1.1] tracking-tight mb-6">
                                {producto.nombre}
                            </h1>

                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex text-[#ff5500]">
                                    {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-current drop-shadow-sm" />)}
                                </div>
                                <span className="text-sm font-bold text-[#888888] hover:text-[#ff5500] transition-colors cursor-pointer flex items-center gap-2">
                                    12 Reseñas <ChevronRight className="w-4 h-4" />
                                </span>
                            </div>

                            <div className="flex items-end gap-4 mb-8">
                                <div className="text-5xl sm:text-6xl font-black text-[#ff5500] tracking-tighter drop-shadow-sm">
                                    <span className="text-3xl sm:text-4xl">S/.</span> {priceNum.toFixed(2)}
                                </div>
                            </div>

                            <p className="text-[#6E7B8A] dark:text-[#a0a0a0] text-base sm:text-lg leading-relaxed mb-10 font-medium">
                                {producto.descripcion || "Figura coleccionable de edición limitada con detalles increíbles y acabados premium. Perfecta adición para la colección de cualquier entusiasta."}
                            </p>

                            {/* Actions */}
                            <div className="flex flex-col gap-4 mb-12">
                                <div className="flex gap-4">
                                    {/* Quantity */}
                                    <div className="flex items-center justify-between w-36 bg-white/80 dark:bg-[#181818]/80 backdrop-blur-md border border-[#EADED5] dark:border-[#3a3939] rounded-[1.25rem] px-5 py-4 shadow-sm">
                                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-[#888888] hover:text-[#ff5500] hover:scale-110 transition-all">
                                            <Minus className="w-5 h-5" />
                                        </button>
                                        <span className="font-black text-lg text-[#1C1612] dark:text-white">{quantity}</span>
                                        <button onClick={() => setQuantity(quantity + 1)} className="text-[#888888] hover:text-[#ff5500] hover:scale-110 transition-all">
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                    
                                    {/* Add to Cart */}
                                    <button 
                                        onClick={handleAddToCart}
                                        className="flex-1 bg-gradient-to-r from-[#ff5500] to-[#ff7733] hover:from-[#e04a00] hover:to-[#ff5500] text-white flex items-center justify-center gap-3 rounded-[1.25rem] shadow-[0_10px_25px_rgba(255,85,0,0.3)] hover:shadow-[0_15px_30px_rgba(255,85,0,0.4)] hover:-translate-y-1 transition-all duration-300 font-black text-sm tracking-widest uppercase overflow-hidden relative group"
                                    >
                                        <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out skew-x-12" />
                                        <ShoppingCart className="w-5 h-5 relative z-10" /> 
                                        <span className="relative z-10">Añadir al Carrito</span>
                                    </button>
                                </div>
                                
                                {/* Comprar via Whatsapp */}
                                <a 
                                    href={`https://wa.me/51999999999?text=Hola,%20estoy%20interesado%20en%20el%20producto:%20${encodeURIComponent(producto.nombre)}`} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="w-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20bd5a] hover:to-[#0f776a] text-white flex items-center justify-center gap-3 rounded-[1.25rem] py-4.5 shadow-[0_10px_25px_rgba(37,211,102,0.25)] hover:shadow-[0_15px_30px_rgba(37,211,102,0.4)] hover:-translate-y-1 transition-all duration-300 font-black text-sm tracking-widest uppercase"
                                >
                                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                    COMPRAR VÍA WHATSAPP
                                </a>
                                
                                <button 
                                    onClick={() => toggleWishlist(producto.id_producto)}
                                    className={`w-full py-4 rounded-[1.25rem] border-2 flex items-center justify-center gap-3 transition-all font-black text-sm uppercase tracking-widest ${
                                        isWished 
                                        ? 'border-red-500 bg-red-500/10 text-red-500 hover:bg-red-500/20' 
                                        : 'border-[#EADED5] dark:border-[#3a3939] bg-white/50 dark:bg-[#181818]/50 backdrop-blur-md text-[#6E7B8A] dark:text-[#a0a0a0] hover:border-[#1C1612] dark:hover:border-white hover:text-[#1C1612] dark:hover:text-white hover:bg-white dark:hover:bg-[#222]'
                                    }`}
                                >
                                    <Heart className={`w-5 h-5 ${isWished ? 'fill-current scale-110' : 'group-hover:scale-110'} transition-transform`} /> 
                                    {isWished ? 'EN LISTA DE DESEOS' : 'AÑADIR A LA LISTA DE DESEOS'}
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 bg-white/60 dark:bg-[#181818]/60 backdrop-blur-md p-5 rounded-[1.5rem] border border-white/40 dark:border-[#3a3939] shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-gradient-to-br from-[#FFF6F0] to-[#FFE8D6] dark:from-[#2a1a11] dark:to-[#131313] p-3 rounded-xl text-[#ff5500] shadow-inner">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-wider text-[#1C1612] dark:text-white mb-1">Producto Original</h4>
                                        <p className="text-[11px] text-[#888888] font-medium">100% Auténtico Garantizado</p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 bg-white/60 dark:bg-[#181818]/60 backdrop-blur-md p-5 rounded-[1.5rem] border border-white/40 dark:border-[#3a3939] shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-gradient-to-br from-[#FFF6F0] to-[#FFE8D6] dark:from-[#2a1a11] dark:to-[#131313] p-3 rounded-xl text-[#ff5500] shadow-inner">
                                        <Truck className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs font-black uppercase tracking-wider text-[#1C1612] dark:text-white mb-1">Envío Protegido</h4>
                                        <p className="text-[11px] text-[#888888] font-medium">Embalaje premium seguro</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Accordion Specs */}
                            <div className="mt-12 border border-white/40 dark:border-[#3a3939] rounded-[2rem] bg-white/40 dark:bg-[#181818]/40 backdrop-blur-xl overflow-hidden shadow-lg shadow-black/5">
                                <button 
                                    onClick={() => setIsSpecsOpen(!isSpecsOpen)}
                                    className="w-full flex items-center justify-between p-6 sm:p-8 hover:bg-white/40 dark:hover:bg-white/5 transition-colors group"
                                >
                                    <span className="font-black text-[#1C1612] dark:text-white uppercase tracking-widest text-sm">Especificaciones Técnicas</span>
                                    <div className={`p-2 rounded-full bg-white dark:bg-[#222] shadow-sm transition-transform duration-500 ${isSpecsOpen ? 'rotate-180' : 'group-hover:translate-y-1'}`}>
                                        <ChevronDown className="w-5 h-5 text-[#ff5500]" />
                                    </div>
                                </button>
                                
                                <div className={`grid transition-all duration-500 ease-in-out ${isSpecsOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden">
                                        <div className="p-6 sm:p-8 pt-0">
                                            <div className="space-y-4 pt-6 border-t border-[#EADED5] dark:border-[#3a3939]">
                                                <div className="flex justify-between items-center pb-4 border-b border-dashed border-[#EADED5] dark:border-[#3a3939] group/item">
                                                    <span className="text-sm font-semibold text-[#888888] group-hover/item:text-[#ff5500] transition-colors">Marca</span>
                                                    <span className="text-sm font-black text-[#1C1612] dark:text-white">Good Smile Company</span>
                                                </div>
                                                <div className="flex justify-between items-center pb-4 border-b border-dashed border-[#EADED5] dark:border-[#3a3939] group/item">
                                                    <span className="text-sm font-semibold text-[#888888] group-hover/item:text-[#ff5500] transition-colors">Escala</span>
                                                    <span className="text-sm font-black text-[#1C1612] dark:text-white">1/7</span>
                                                </div>
                                                <div className="flex justify-between items-center pb-4 border-b border-dashed border-[#EADED5] dark:border-[#3a3939] group/item">
                                                    <span className="text-sm font-semibold text-[#888888] group-hover/item:text-[#ff5500] transition-colors">Material</span>
                                                    <span className="text-sm font-black text-[#1C1612] dark:text-white">PVC, ABS, Resina</span>
                                                </div>
                                                <div className="flex justify-between items-center group/item">
                                                    <span className="text-sm font-semibold text-[#888888] group-hover/item:text-[#ff5500] transition-colors">Altura Aprox.</span>
                                                    <span className="text-sm font-black text-[#1C1612] dark:text-white">28 cm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Related Products Section */}
                    {relacionados.length > 0 && (
                        <div className="mt-40">
                            <div className="flex items-end justify-between mb-12 border-b border-[#EADED5] dark:border-[#3a3939] pb-8 relative">
                                <div className="absolute bottom-0 left-0 w-32 h-1 bg-[#ff5500] rounded-full translate-y-[2px]" />
                                <div>
                                    <h3 className="text-xs font-black text-[#ff5500] tracking-widest uppercase mb-3 flex items-center gap-2">
                                        <Star className="w-3 h-3 fill-current" />
                                        Completa tu colección
                                    </h3>
                                    <h2 className="text-4xl md:text-5xl font-['Outfit'] font-black text-[#1C1612] dark:text-white tracking-tight">
                                        Productos Relacionados
                                    </h2>
                                </div>
                                <div className="hidden sm:flex gap-3">
                                    <button className="w-14 h-14 rounded-full border-2 border-[#EADED5] dark:border-[#3a3939] flex items-center justify-center hover:border-[#ff5500] hover:text-[#ff5500] hover:bg-white dark:hover:bg-[#1c1b1b] transition-all shadow-sm">
                                        <ChevronRight className="w-6 h-6 rotate-180" />
                                    </button>
                                    <button className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff5500] to-[#ff7733] text-white flex items-center justify-center hover:from-[#e04a00] hover:to-[#ff5500] transition-all shadow-lg shadow-[#ff5500]/30 hover:scale-105">
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                                {relacionados.map(rel => (
                                    <ProductCard 
                                        key={rel.id_producto}
                                        id={rel.id_producto}
                                        title={rel.nombre}
                                        brand="MOTNEKI"
                                        franchise={rel.categoria?.nombre || "Coleccionables"}
                                        price={parseFloat(rel.precio)}
                                        image={rel.imagen_url ? (rel.imagen_url.startsWith('http') || rel.imagen_url.startsWith('/') ? rel.imagen_url : `/storage/${rel.imagen_url}`) : "/images/ichigo_kurosaki_figure.png"}
                                        status={rel.tipo_producto === 'stock' ? 'EN STOCK' : rel.tipo_producto === 'preventa' ? 'PREVENTA' : 'EXCLUSIVO'}
                                        badge={rel.en_oferta ? '¡OFERTA!' : (rel.tipo_producto === 'preventa' ? 'NUEVO' : undefined)}
                                        releaseDate={rel.fecha_disponibilidad}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
