import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ChevronLeft, ChevronRight, ShieldCheck, Truck, Banknote, ArrowRight, X, CheckCircle, Ban } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

interface Categoria {
    id_categoria: number;
    nombre: string;
}

interface Producto {
    id_producto: number;
    id_categoria: number;
    nombre: string;
    descripcion: string;
    precio: string;
    stock: number;
    disponibilidad: string;
    tipo_producto: string;
    fecha_disponibilidad?: string;
    activo: number;
    en_oferta: number;
    precio_oferta: string | null;
    imagen_url: string;
    fabricante: string | null;
    categoria: Categoria;
    created_at?: string;
}

interface PaginatedProductos {
    data: Producto[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
}

interface Props {
    heroProduct: Producto | null;
    topPreventas: Producto[];
    productos: PaginatedProductos;
}

const getImageUrl = (url?: string | null) => {
    if (!url) return '/images/placeholder.jpg';
    return url.startsWith('http') || url.startsWith('/') ? url : `/storage/${url}`;
};

export default function Preventas({ heroProduct, topPreventas, productos }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isGuaranteeOpen, setIsGuaranteeOpen] = useState(false);

    const nextSlide = () => {
        if (topPreventas.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % topPreventas.length);
        }
    };

    const prevSlide = () => {
        if (topPreventas.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + topPreventas.length) % topPreventas.length);
        }
    };

    return (
        <PublicLayout>
            <Head title="Preventas Exclusivas - MotnekiStore" />

            <div className="bg-[#FAF5F0] dark:bg-[#111111] min-h-screen relative overflow-hidden pb-20 w-full font-sans">
                {/* Background Ambient Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#ff5500]/10 to-transparent blur-[100px] pointer-events-none" />
                <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] bg-gradient-to-tr from-[#934B22]/10 to-transparent blur-[120px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    {/* HERO BANNER */}
                    {heroProduct && (
                        <div className="relative overflow-hidden bg-zinc-900 rounded-[2.5rem] mt-8 p-10 md:p-16 lg:p-24 shadow-2xl group">
                            {/* Background Cover */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-30 transition-transform duration-1000 group-hover:scale-105"
                                style={{ backgroundImage: `url(${getImageUrl(heroProduct.imagen_url)})` }}
                            ></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

                            <div className="relative z-10 max-w-2xl">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="inline-block bg-gradient-to-r from-[#ff5500] to-[#ff7733] text-white text-[10px] md:text-xs font-black tracking-widest uppercase px-4 py-1.5 rounded-full shadow-lg shadow-[#ff5500]/30 border border-[#ff5500]/50">
                                        LANZAMIENTO ESTELAR
                                    </span>
                                    {heroProduct.fabricante && (
                                        <span className="inline-block bg-white/10 backdrop-blur-md text-white text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/20">
                                            {heroProduct.fabricante}
                                        </span>
                                    )}
                                </div>

                                <h1 className="font-['Outfit'] text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-4 drop-shadow-lg">
                                    {heroProduct.nombre}
                                </h1>
                                <p className="text-gray-300 text-sm md:text-base max-w-lg mb-8 leading-relaxed font-medium line-clamp-3">
                                    {heroProduct.descripcion || "Reserva hoy la pieza central de tu colección. Edición limitada de preventa."}
                                </p>
                                <div className="flex items-center gap-6 mb-8">
                                    <span className="text-3xl font-black text-[#ff5500]">
                                        S/. {parseFloat(heroProduct.en_oferta ? heroProduct.precio_oferta! : heroProduct.precio).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href={`/producto/${heroProduct.id_producto}`} className="bg-gradient-to-r from-[#ff5500] to-[#ff7733] hover:from-[#e04a00] hover:to-[#ff5500] text-white px-8 py-3.5 rounded-full font-black text-sm shadow-[0_10px_25px_rgba(255,85,0,0.3)] hover:shadow-[0_15px_30px_rgba(255,85,0,0.4)] transition-all hover:-translate-y-1 uppercase tracking-widest flex items-center justify-center gap-2">
                                        Reservar Ahora <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PREVENTAS MÁS POPULARES (Top 3) */}
                    {topPreventas.length > 0 && (
                        <div className="mt-24 mb-16">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4 border-b border-[#EADED5] dark:border-[#3a3939] pb-6 relative">
                                <div className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r from-[#ff5500] to-transparent rounded-full translate-y-[2px]" />
                                <div>
                                    <span className="text-[#ff5500] text-[10px] font-black tracking-widest uppercase mb-2 block">DESTACADOS DE LA SEMANA</span>
                                    <h2 className="font-['Outfit'] text-3xl md:text-4xl font-black text-[#1C1612] dark:text-white tracking-tight">Top Preventas</h2>
                                </div>
                                {topPreventas.length > 3 && (
                                    <div className="flex gap-2">
                                        <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/40 dark:border-[#3a3939] flex items-center justify-center text-[#1C1612] dark:text-white bg-white/60 dark:bg-[#181818]/60 backdrop-blur-md hover:border-[#ff5500] hover:text-[#ff5500] transition-all hover:scale-105 shadow-sm">
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button onClick={nextSlide} className="w-12 h-12 rounded-full border border-white/40 dark:border-[#3a3939] flex items-center justify-center text-[#1C1612] dark:text-white bg-white/60 dark:bg-[#181818]/60 backdrop-blur-md hover:border-[#ff5500] hover:text-[#ff5500] transition-all hover:scale-105 shadow-sm">
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {topPreventas.slice(currentIndex, currentIndex + 3).map((prod, index) => (
                                    <Link key={prod.id_producto} href={`/producto/${prod.id_producto}`} className="bg-white/60 dark:bg-[#181818]/60 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-white/40 dark:border-[#3a3939] group flex flex-col">
                                        <div className="relative aspect-square overflow-hidden bg-white/80 dark:bg-[#111111]/80 p-4">
                                            <div className="absolute top-4 left-4 z-10 flex gap-2">
                                                <span className="bg-gradient-to-r from-[#934B22] to-[#ff5500] text-white text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full shadow-lg">PREVENTA</span>
                                                <span className="bg-[#1C1612] dark:bg-white text-white dark:text-[#1C1612] text-[10px] font-black tracking-widest px-3 py-1.5 rounded-full shadow-lg">TOP {index + 1}</span>
                                            </div>
                                            <img src={getImageUrl(prod.imagen_url)} alt={prod.nombre} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-xl" onError={(e) => e.currentTarget.style.display = 'none'} />
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            {prod.fabricante && <p className="text-[10px] font-black text-[#888888] uppercase tracking-widest mb-2">{prod.fabricante}</p>}
                                            <h3 className="text-lg font-bold text-[#1C1612] dark:text-white mb-4 group-hover:text-[#ff5500] transition-colors line-clamp-2 leading-tight flex-1">{prod.nombre}</h3>
                                            <div className="flex justify-between items-end mb-4">
                                                <span className="text-2xl font-black text-[#ff5500]">
                                                    S/. {parseFloat(prod.en_oferta ? prod.precio_oferta! : prod.precio).toFixed(2)}
                                                </span>
                                            </div>
                                            {/* Simulated Progress Bar for pre-orders */}
                                            <div>
                                                <div className="flex justify-between text-[10px] font-black text-[#1C1612] dark:text-white mb-2 tracking-widest uppercase">
                                                    <span>Reservas</span>
                                                    <span>{Math.floor(Math.random() * 60) + 40}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-[#EADED5] dark:bg-[#3a3939] rounded-full overflow-hidden shadow-inner">
                                                    <div className="h-full bg-gradient-to-r from-[#ff5500] to-[#ff7733] rounded-full" style={{ width: `${Math.floor(Math.random() * 60) + 40}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* BLOQUES BENTO (Beneficios) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                        {/* Tarjeta Ancha */}
                        <div className="col-span-1 md:col-span-2 bg-white/60 dark:bg-[#181818]/60 backdrop-blur-xl rounded-[2.5rem] p-10 flex flex-col justify-between border border-white/40 dark:border-[#3a3939] shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#ff5500]/10 to-transparent rounded-full translate-x-1/3 -translate-y-1/3 blur-2xl group-hover:bg-[#ff5500]/20 transition-colors" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-gradient-to-br from-[#FFF6F0] to-[#FFE8D6] dark:from-[#2a1a11] dark:to-[#131313] rounded-full flex items-center justify-center text-[#ff5500] mb-6 shadow-inner">
                                    <ShieldCheck className="w-7 h-7" strokeWidth={2} />
                                </div>
                                <h3 className="font-['Outfit'] text-2xl md:text-3xl lg:text-4xl font-black text-[#1C1612] dark:text-white mb-4 max-w-md leading-tight">
                                    Garantía de Autenticidad Motneki
                                </h3>
                                <p className="text-[#6E7B8A] dark:text-[#a0a0a0] text-sm md:text-base max-w-lg leading-relaxed font-medium">
                                    Cada preventa está respaldada por una certificación única que asegura que tu pieza es 100% original de fabricante. Sin intermediarios dudosos.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsGuaranteeOpen(true)}
                                className="mt-8 relative z-10 flex items-center gap-2 text-[#ff5500] text-xs font-black tracking-widest uppercase hover:gap-4 transition-all w-max bg-white dark:bg-[#111111] px-5 py-2.5 rounded-full shadow-sm border border-[#EADED5] dark:border-[#3a3939]"
                            >
                                LEER MÁS <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Dos Tarjetas Pequeñas Apiladas */}
                        <div className="col-span-1 flex flex-col gap-6">
                            <div className="bg-gradient-to-br from-[#ff5500] to-[#cc4400] rounded-[2.5rem] p-8 flex-1 text-white flex flex-col justify-center shadow-lg shadow-[#ff5500]/20 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
                                <div className="relative z-10">
                                    <Truck className="w-8 h-8 mb-4 text-white drop-shadow-md" strokeWidth={2} />
                                    <h3 className="text-xl font-black mb-2 tracking-tight">Envío Preferencial</h3>
                                    <p className="text-white/90 text-sm leading-relaxed font-medium">
                                        Los usuarios que reservan reciben sus productos 48h antes del lanzamiento oficial en tienda.
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white/60 dark:bg-[#181818]/60 backdrop-blur-xl rounded-[2.5rem] p-8 flex-1 border border-white/40 dark:border-[#3a3939] flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow">
                                <Banknote className="w-8 h-8 mb-4 text-[#ff5500]" strokeWidth={2} />
                                <h3 className="text-xl font-black text-[#1C1612] dark:text-white mb-2 tracking-tight">Cuotas Sin Intereses</h3>
                                <p className="text-[#6E7B8A] dark:text-[#a0a0a0] text-sm leading-relaxed font-medium">
                                    Reserva con solo el 20% y paga el resto en hasta 6 cuotas fijas de forma cómoda.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* TODAS LAS PREVENTAS (Grid) */}
                    <div className="mb-16">
                        <div className="border-b border-[#EADED5] dark:border-[#3a3939] pb-6 mb-10 relative">
                            <div className="absolute bottom-0 left-0 w-32 h-1 bg-gradient-to-r from-[#1C1612] dark:from-white to-transparent rounded-full translate-y-[2px]" />
                            <h2 className="font-['Outfit'] text-3xl md:text-4xl font-black text-[#1C1612] dark:text-white tracking-tight">Catálogo de Preventas</h2>
                        </div>

                        {productos.data.length === 0 ? (
                            <div className="text-center py-20 bg-white/40 dark:bg-[#181818]/40 backdrop-blur-xl rounded-[2rem] border border-white/40 dark:border-[#3a3939]">
                                <h3 className="text-xl font-bold text-[#1C1612] dark:text-white mb-2">No hay más preventas disponibles</h3>
                                <p className="text-[#888888]">Vuelve pronto para ver nuevos lanzamientos.</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
                                    {productos.data.map((producto) => (
                                        <ProductCard
                                            key={producto.id_producto}
                                            id={producto.id_producto}
                                            title={producto.nombre}
                                            brand={producto.fabricante || "MOTNEKI"}
                                            franchise={producto.categoria?.nombre || "Coleccionables"}
                                            price={parseFloat(producto.precio)}
                                            image={producto.imagen_url ? (producto.imagen_url.startsWith('http') || producto.imagen_url.startsWith('/') ? producto.imagen_url : `/storage/${producto.imagen_url}`) : "/images/placeholder.jpg"}
                                            status="PREVENTA"
                                            badge={producto.en_oferta ? '¡OFERTA!' : 'NUEVO'}
                                            releaseDate={producto.fecha_disponibilidad}
                                        />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {productos.last_page > 1 && (
                                    <div className="mt-16 flex justify-center items-center gap-2">
                                        {productos.links.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.url || '#'}
                                                className={`px-4 py-2 rounded-full font-bold text-sm transition-all shadow-sm border ${link.active
                                                        ? 'bg-[#1C1612] dark:bg-white text-white dark:text-[#1C1612] border-transparent scale-110'
                                                        : 'bg-white/60 dark:bg-[#181818]/60 backdrop-blur-md border-white/40 dark:border-[#3a3939] text-[#1C1612] dark:text-white hover:border-[#ff5500] hover:text-[#ff5500]'
                                                    } ${!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                </div>
            </div>

            {/* Modal de Garantía de Autenticidad */}
            {isGuaranteeOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white dark:bg-[#111111] w-full max-w-[420px] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="p-5 border-b border-[#EADED5] dark:border-[#3a3939] flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[#ff5500]">
                                <ShieldCheck className="w-5 h-5" strokeWidth={2.5} />
                                <h3 className="font-bold text-base font-['Outfit']">Garantía de Autenticidad MOTNEKISTORE</h3>
                            </div>
                            <button onClick={() => setIsGuaranteeOpen(false)} className="text-[#6E7B8A] hover:text-[#ff5500] transition-colors p-1.5 rounded-full hover:bg-[#FFF6F0] dark:hover:bg-[#1c1b1b]">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <p className="text-center text-[#1C1612] dark:text-white font-medium mb-6 text-sm">
                                Tu compra está protegida desde el origen.
                            </p>

                            <ul className="space-y-4 mb-6">
                                <li className="flex gap-3 items-start">
                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                                    <span className="text-[#6E7B8A] dark:text-[#a0a0a0] text-xs font-medium">Certificado digital único asociado a tu producto</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                                    <span className="text-[#6E7B8A] dark:text-[#a0a0a0] text-xs font-medium">Código verificable para validar autenticidad</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                                    <span className="text-[#6E7B8A] dark:text-[#a0a0a0] text-xs font-medium">Registro de origen y trazabilidad del fabricante</span>
                                </li>
                                <li className="flex gap-3 items-start">
                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                                    <span className="text-[#6E7B8A] dark:text-[#a0a0a0] text-xs font-medium">Protección contra réplicas o productos no oficiales</span>
                                </li>
                            </ul>

                            <div className="bg-[#f3f7fa] dark:bg-[#181d24] p-4 rounded-xl flex items-start gap-4 mb-6">
                                <div className="bg-white dark:bg-[#111] p-1.5 rounded-full mt-0.5 shadow-sm">
                                    <Ban className="w-4 h-4 text-[#ff5500]" strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h4 className="text-[#1C1612] dark:text-white font-bold text-xs mb-1">Sin intermediarios dudosos</h4>
                                    <p className="text-[#6E7B8A] dark:text-[#a0a0a0] text-xs leading-relaxed">Sourcing directo desde el fabricante oficial.</p>
                                </div>
                            </div>

                            <h4 className="text-[#1C1612] dark:text-white font-medium text-xs mb-4">Pasos de Verificación</h4>
                            <div className="flex justify-between items-center mb-6 px-6">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#FFF6F0] dark:bg-[#2a1a11] text-[#ff5500] font-black flex items-center justify-center text-sm">1</div>
                                    <span className="text-[10px] font-bold text-[#1C1612] dark:text-white uppercase tracking-wider">Recibe</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#FFF6F0] dark:bg-[#2a1a11] text-[#ff5500] font-black flex items-center justify-center text-sm">2</div>
                                    <span className="text-[10px] font-bold text-[#1C1612] dark:text-white uppercase tracking-wider">Ingresa</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#FFF6F0] dark:bg-[#2a1a11] text-[#ff5500] font-black flex items-center justify-center text-sm">3</div>
                                    <span className="text-[10px] font-bold text-[#1C1612] dark:text-white uppercase tracking-wider">Valida</span>
                                </div>
                            </div>

                            <div className="border border-[#ffe6d9] dark:border-[#422212] bg-[#fffbfa] dark:bg-[#1a1411] p-4 rounded-xl shadow-sm">
                                <h4 className="text-[#cc4400] dark:text-[#ff7733] font-medium text-sm mb-1">Compromiso Motneki</h4>
                                <p className="text-[#1C1612] dark:text-[#d0d0d0] text-xs leading-relaxed font-medium">Si el producto no es auténtico, garantizamos el reembolso total de tu inversión.</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-5">
                            <button
                                onClick={() => setIsGuaranteeOpen(false)}
                                className="w-full bg-[#ff5500] hover:bg-[#e64d00] text-white font-bold py-3 rounded-xl transition-colors text-sm shadow-md shadow-[#ff5500]/20"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </PublicLayout>
    );
}
