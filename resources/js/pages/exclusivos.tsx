import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ShieldCheck, Truck, Sparkles, ArrowRight, ShoppingCart } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

interface Producto {
    id_producto: number;
    nombre: string;
    descripcion: string;
    precio: string;
    stock: number;
    imagen_url?: string | null;
    fabricante?: string | null;
    activo: boolean;
    en_oferta: boolean;
    tipo_producto: 'stock' | 'preventa' | 'exclusivo';
    fecha_inicio_preventa?: string | null;
    fecha_fin_preventa?: string | null;
    fecha_disponibilidad?: string | null;
    tipo_pago_preventa?: 'completo' | 'parcial';
    categoria?: {
        id_categoria: number;
        nombre: string;
    };
}

interface PaginatedProductos {
    data: Producto[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
}

interface Props {
    heroProduct: Producto | null;
    topExclusivos: Producto[];
    productos: PaginatedProductos;
}

const getImageUrl = (url?: string | null) => {
    if (!url) return '/images/placeholder.jpg';
    return url.startsWith('http') || url.startsWith('/') ? url : `/storage/${url}`;
};

export default function Exclusivos({ heroProduct, topExclusivos, productos }: Props) {
    return (
        <PublicLayout>
            <Head title="Exclusivos - MotnekiStore" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full font-sans">

                {/* HERO SPLIT */}
                {heroProduct ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32 mt-10">
                        {/* Left Column */}
                        <div className="max-w-xl">
                            <span className="inline-block bg-[#3a3939] text-[#A24814] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-8 shadow-sm">
                                DIRECTO DE JAPÓN
                            </span>
                            <h1 className="font-['Outfit'] text-5xl lg:text-[4.5rem] leading-[1.05] font-extrabold text-[#1C1612] dark:text-[#ffffff] mb-6 tracking-tight">
                                {heroProduct.nombre}
                            </h1>
                            <p className="text-[#6E7B8A] text-lg mb-10 leading-relaxed font-medium">
                                {heroProduct.descripcion || 'Piezas de archivo, ediciones limitadas de Akihabara y objetos de subasta certificados. Elevamos el coleccionismo a una experiencia de arte puro.'}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href={`/checkout?type=preventa`} className="bg-[#ff5500] hover:bg-[#cc4400] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-[#ff5500]/20 transition-all hover:scale-105 uppercase tracking-wide text-center">
                                    COMPRAR AHORA
                                </Link>
                                <button className="bg-transparent border border-[#EADED5] dark:border-[#3a3939] hover:bg-[#ffffff] hover:text-[#1c1612] text-[#1C1612] dark:text-[#ffffff] px-8 py-3.5 rounded-full font-bold text-sm transition-all uppercase tracking-wide">
                                    CÓMO IMPORTAMOS
                                </button>
                            </div>
                        </div>

                        {/* Right Column (Image) */}
                        <div className="relative h-[600px] lg:h-[750px] rounded-[3rem] overflow-hidden shadow-2xl">
                            <img src={getImageUrl(heroProduct.imagen_url)} alt={heroProduct.nombre} className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000" />
                            {/* Floating Card */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] sm:w-[380px] lg:left-1/2 lg:-translate-x-1/2 lg:w-[380px] bg-[#FFF6F0] dark:bg-[#1c1b1b]/95 backdrop-blur-xl border border-[#EADED5] dark:border-[#3a3939] p-6 rounded-2xl shadow-xl z-10">
                                <div className="flex items-center gap-2 mb-3">
                                    <ShieldCheck className="w-5 h-5 text-[#C25910]" />
                                    <span className="text-[#C25910] font-bold text-[10px] tracking-widest uppercase">AUTENTICIDAD NIVEL S</span>
                                </div>
                                <p className="text-[#6E7B8A] text-xs italic leading-relaxed">
                                    "Cada pieza es seleccionada personalmente en subastas privadas de Chiyoda, garantizando exclusividad absoluta."
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-[#1C1612] dark:text-white">Aún no hay artículos exclusivos disponibles.</h2>
                    </div>
                )}

                {/* RAREZAS DEL MES */}
                <div className="mb-32">
                    <div className="text-center mb-12">
                        <h2 className="font-['Outfit'] text-4xl lg:text-5xl font-extrabold text-[#1C1612] dark:text-[#ffffff] mb-4 tracking-tight">Rarezas del Mes</h2>
                        <p className="text-[#6E7B8A] text-sm max-w-lg mx-auto leading-relaxed">
                            Selección mensual de piezas que rara vez cruzan el Pacífico. Unidades 01/01 disponibles mediante invitación o lista de espera.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Left Huge Card */}
                        {topExclusivos.length > 0 && (
                            <div className="lg:col-span-8 bg-zinc-900 rounded-[2.5rem] overflow-hidden relative group h-[500px] lg:h-[650px] shadow-lg">
                                <img src={getImageUrl(topExclusivos[0].imagen_url)} alt={topExclusivos[0].nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12">
                                    <span className="inline-block bg-[#A24814] text-white text-[10px] font-bold px-3 py-1.5 rounded-sm mb-6 tracking-widest uppercase shadow-sm">
                                        ITEM DE SUBASTA
                                    </span>
                                    <h3 className="font-['Outfit'] text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">{topExclusivos[0].nombre}</h3>
                                    <p className="text-gray-300 text-sm max-w-md mb-8 leading-relaxed">
                                        {topExclusivos[0].descripcion || 'Una de las unidades limitadas disponibles para coleccionistas certificados. Acabado de primera calidad.'}
                                    </p>
                                    <div className="flex gap-4">
                                        <Link href={`/checkout?type=preventa`} className="bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] hover:bg-gray-100 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:scale-105 inline-block">
                                            SOLICITAR ACCESO
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Right Cards */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            {/* Top Right Card */}
                            {topExclusivos.length > 1 && (
                                <div className="bg-zinc-800 rounded-[2.5rem] overflow-hidden relative group h-[300px] lg:h-1/2 shadow-lg">
                                    <img src={getImageUrl(topExclusivos[1].imagen_url)} alt={topExclusivos[1].nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 w-full p-8">
                                        <h3 className="font-['Outfit'] text-2xl font-bold text-white mb-2 tracking-tight">{topExclusivos[1].nombre}</h3>
                                        <p className="text-gray-400 text-xs mb-4 line-clamp-1">{topExclusivos[1].descripcion || 'Edición limitada'}</p>
                                        <span className="text-white text-3xl font-black">S/. {parseFloat(topExclusivos[1].precio).toFixed(2)}</span>
                                    </div>
                                </div>
                            )}

                            {/* Bottom Right Card (Concierge) */}
                            <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-[2.5rem] p-10 lg:h-1/2 flex flex-col justify-between border border-[#EADED5] dark:border-[#3a3939] shadow-sm">
                                <div>
                                    <div className="w-12 h-12 mb-6 text-[#C25910]">
                                        <Sparkles className="w-8 h-8" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-['Outfit'] text-2xl font-bold text-[#1C1612] dark:text-[#ffffff] mb-3">Servicio Concierge Japan</h3>
                                    <p className="text-[#6E7B8A] text-sm leading-relaxed">
                                        ¿Buscas una pieza específica? Nuestros agentes en Tokio la encuentran por ti en subastas cerradas.
                                    </p>
                                </div>
                                <button className="flex items-center gap-2 text-[#C25910] text-[10px] font-black tracking-widest uppercase hover:gap-3 transition-all w-max mt-6">
                                    CONTACTAR AGENTE <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FIGURAS DISPONIBLES */}
                <div className="mb-32">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-4">
                        <div>
                            <h2 className="font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[#1C1612] dark:text-[#ffffff] mb-2 tracking-tight">Figuras Disponibles</h2>
                            <p className="text-[#6E7B8A] text-sm">Artículos en stock con envío inmediato desde Lima.</p>
                        </div>
                        <div className="flex gap-2">
                            <button className="bg-[#A24814] text-white px-5 py-2 rounded-full text-xs font-bold transition-all shadow-md">Todos</button>
                            <button className="bg-transparent border border-[#EADED5] dark:border-[#3a3939] text-[#1C1612] dark:text-[#ffffff] hover:border-[#A24814] hover:text-[#A24814] px-5 py-2 rounded-full text-xs font-bold transition-all">Collares</button>
                            <button className="bg-transparent border border-[#EADED5] dark:border-[#3a3939] text-[#1C1612] dark:text-[#ffffff] hover:border-[#A24814] hover:text-[#A24814] px-5 py-2 rounded-full text-xs font-bold transition-all">Figuras</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-12">
                        {productos.data.length > 0 ? (
                            productos.data.map((producto) => (
                                <ProductCard 
                                    key={producto.id_producto}
                                    id={producto.id_producto}
                                    title={producto.nombre}
                                    brand={producto.fabricante || "MOTNEKI"}
                                    franchise={producto.categoria?.nombre || "Coleccionables"}
                                    price={parseFloat(producto.precio)}
                                    image={getImageUrl(producto.imagen_url)}
                                    status="EXCLUSIVO"
                                    badge={producto.en_oferta ? '¡OFERTA!' : undefined}
                                />
                            ))
                        ) : (
                            <div className="col-span-1 sm:col-span-2 lg:col-span-4 text-center py-10">
                                <p className="text-[#6E7B8A] dark:text-gray-400">No hay productos exclusivos adicionales disponibles por el momento.</p>
                            </div>
                        )}
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
                </div>

                {/* BLOQUE OSCURO GARANTÍA Y CONTACTO */}
                <div className="bg-[#241F1A] rounded-[2.5rem] p-10 lg:p-16 mb-20 shadow-2xl relative overflow-hidden">
                    {/* Subtle noise/texture overlay simulation */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                        {/* Left Side */}
                        <div>
                            <h2 className="font-['Outfit'] text-4xl lg:text-[3.2rem] font-bold text-white mb-6 leading-[1.1] tracking-tight">
                                Garantía de<br />Autenticidad<br />Motneki
                            </h2>
                            <p className="text-white/70 text-sm max-w-md mb-10 leading-relaxed font-medium">
                                Nuestro equipo en Tokio inspecciona cada milímetro de las piezas de subasta. Cada envío incluye un certificado de autenticidad con sello holográfico y procedencia verificada.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-6 h-6 text-[#ff5500]" />
                                    <span className="text-white font-bold text-sm tracking-wide">Protección 100%</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Truck className="w-6 h-6 text-[#ff5500]" />
                                    <span className="text-white font-bold text-sm tracking-wide">Envío Asegurado</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Side Form */}
                        <div className="bg-[#332D28] rounded-[2rem] border border-white/10 p-8 lg:p-10 shadow-2xl">
                            <h3 className="font-['Outfit'] text-2xl font-bold text-white mb-8 tracking-tight">¿Buscas algo específico?</h3>
                            <div className="flex flex-col gap-5">
                                <input
                                    type="text"
                                    placeholder="Nombre de la pieza o franquicia"
                                    className="w-full bg-[#413B35] border border-transparent text-white placeholder-gray-400 rounded-full px-6 py-4 focus:outline-none focus:border-[#ff5500] transition-colors text-sm"
                                />
                                <input
                                    type="email"
                                    placeholder="Tu correo electrónico"
                                    className="w-full bg-[#413B35] border border-transparent text-white placeholder-gray-400 rounded-full px-6 py-4 focus:outline-none focus:border-[#ff5500] transition-colors text-sm"
                                />
                                <button className="w-full bg-[#ff5500] hover:bg-[#cc4400] text-white rounded-full px-6 py-4 font-bold text-xs tracking-widest uppercase transition-colors shadow-lg mt-2">
                                    SOLICITAR INFORMACIÓN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </PublicLayout>
    );
}
