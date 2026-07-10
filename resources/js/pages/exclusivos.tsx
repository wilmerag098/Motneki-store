import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ShieldCheck, Truck, Sparkles, ArrowRight, ShoppingCart } from 'lucide-react';

export default function Exclusivos() {
    return (
        <PublicLayout>
            <Head title="Exclusivos - MotnekiStore" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full font-sans">

                {/* HERO SPLIT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-32 mt-10">
                    {/* Left Column */}
                    <div className="max-w-xl">
                        <span className="inline-block bg-[#3a3939] text-[#A24814] text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-8 shadow-sm">
                            DIRECTO DE JAPÓN
                        </span>
                        <h1 className="font-['Outfit'] text-5xl lg:text-[4.5rem] leading-[1.05] font-extrabold text-[#1C1612] dark:text-[#ffffff] mb-6 tracking-tight">
                            La Figura más Exclusiva de <span className="text-[#D65D0E]">Tokio</span> en Perú.
                        </h1>
                        <p className="text-[#6E7B8A] text-lg mb-10 leading-relaxed font-medium">
                            Piezas de archivo, ediciones limitadas de Akihabara y objetos de subasta certificados. Elevamos el coleccionismo a una experiencia de arte puro.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-[#ff5500] hover:bg-[#cc4400] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-[#ff5500]/20 transition-all hover:scale-105 uppercase tracking-wide">
                                EXPLORAR ARCHIVO
                            </button>
                            <button className="bg-transparent border border-[#ffffff] hover:bg-[#ffffff] hover:text-white text-[#1C1612] dark:text-[#ffffff] px-8 py-3.5 rounded-full font-bold text-sm transition-all uppercase tracking-wide">
                                CÓMO IMPORTAMOS
                            </button>
                        </div>
                    </div>

                    {/* Right Column (Image) */}
                    <div className="relative h-[600px] lg:h-[750px] rounded-[3rem] overflow-hidden shadow-2xl">
                        <img src="/images/GokuIntinto01.webp" alt="Vegito Exclusive" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000" />
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
                        <div className="lg:col-span-8 bg-zinc-900 rounded-[2.5rem] overflow-hidden relative group h-[500px] lg:h-[650px] shadow-lg">
                            <img src="https://images.unsplash.com/photo-1594916813470-3d854db221ab?q=80&w=1600&auto=format&fit=crop" alt="Evangelion Type-01" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                            <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12">
                                <span className="inline-block bg-[#A24814] text-white text-[10px] font-bold px-3 py-1.5 rounded-sm mb-6 tracking-widest uppercase shadow-sm">
                                    ITEM DE SUBASTA
                                </span>
                                <h3 className="font-['Outfit'] text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">Evangelion Type-01</h3>
                                <p className="text-gray-300 text-sm max-w-md mb-8 leading-relaxed">
                                    Una de las 50 unidades producidas para el 25 aniversario. Acabado en cromo pulido a mano y certificado por Studio Khara.
                                </p>
                                <div className="flex gap-4">
                                    <button className="bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] hover:bg-gray-100 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-lg hover:scale-105">
                                        SOLICITAR ACCESO
                                    </button>
                                    <button className="bg-transparent border border-white/50 text-white hover:bg-[#FFF6F0] dark:bg-[#1c1b1b]/10 backdrop-blur-sm px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all">
                                        VER DETALLES
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Cards */}
                        <div className="lg:col-span-4 flex flex-col gap-6">
                            {/* Top Right Card */}
                            <div className="bg-zinc-800 rounded-[2.5rem] overflow-hidden relative group h-[300px] lg:h-1/2 shadow-lg">
                                <img src="https://images.unsplash.com/photo-1589146141380-60b616ed3cf3?q=80&w=800&auto=format&fit=crop" alt="Katana" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 w-full p-8">
                                    <h3 className="font-['Outfit'] text-2xl font-bold text-white mb-2 tracking-tight">Master Craft Katana</h3>
                                    <p className="text-gray-400 text-xs mb-4">Réplica de acero Tamahagane, edición Kyoto.</p>
                                    <span className="text-white text-3xl font-black">S/. 2,450.00</span>
                                </div>
                            </div>

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
                        {/* Producto 1 */}
                        <div className="group cursor-pointer">
                            <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden mb-5 bg-[#F8F9FA] border border-neutral-100 shadow-sm group-hover:shadow-md transition-all">
                                <span className="absolute top-4 left-4 z-10 bg-[#ffffff] text-white text-[9px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                                    EXCLUSIVE
                                </span>
                                <img src="/images/kaido.png" alt="Kaido" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] leading-snug group-hover:text-[#ff5500] transition-colors line-clamp-2 mb-1">
                                        Kaido King of the Beasts 32 cm Bandai
                                    </h3>
                                    <p className="text-[#8A94A6] text-[10px] font-bold uppercase tracking-wider mb-2">One Piece</p>
                                    <span className="text-[#A24814] font-black text-xl">S/. 620</span>
                                </div>
                                <button className="w-10 h-10 rounded-full border border-[#EADED5] dark:border-[#3a3939] flex items-center justify-center text-[#1C1612] dark:text-[#ffffff] bg-[#FFF6F0] dark:bg-[#1c1b1b] hover:bg-[#ff5500] hover:border-[#ff5500] hover:text-white transition-all shrink-0 mt-1 shadow-sm">
                                    <ShoppingCart className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Producto 2 */}
                        <div className="group cursor-pointer">
                            <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden mb-5 bg-[#F8F9FA] border border-neutral-100 shadow-sm group-hover:shadow-md transition-all">
                                <span className="absolute top-4 left-4 z-10 bg-[#ffffff] text-white text-[9px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                                    EXCLUSIVE
                                </span>
                                <img src="/images/enel.png" alt="Enel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] leading-snug group-hover:text-[#ff5500] transition-colors line-clamp-2 mb-1">
                                        Figura Enel The Only God of Skypie One Piece
                                    </h3>
                                    <p className="text-[#8A94A6] text-[10px] font-bold uppercase tracking-wider mb-2">One Piece</p>
                                    <span className="text-[#A24814] font-black text-xl">S/. 459</span>
                                </div>
                                <button className="w-10 h-10 rounded-full border border-[#EADED5] dark:border-[#3a3939] flex items-center justify-center text-[#1C1612] dark:text-[#ffffff] bg-[#FFF6F0] dark:bg-[#1c1b1b] hover:bg-[#ff5500] hover:border-[#ff5500] hover:text-white transition-all shrink-0 mt-1 shadow-sm">
                                    <ShoppingCart className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Producto 3 */}
                        <div className="group cursor-pointer">
                            <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden mb-5 bg-[#F8F9FA] border border-neutral-100 shadow-sm group-hover:shadow-md transition-all">
                                <span className="absolute top-4 left-4 z-10 bg-[#ffffff] text-white text-[9px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                                    EXCLUSIVE
                                </span>
                                <img src="/images/gaiking.png" alt="Gaiking" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] leading-snug group-hover:text-[#ff5500] transition-colors line-clamp-2 mb-1">
                                        Soul of Chogokin: GX-100 Gaiking
                                    </h3>
                                    <p className="text-[#8A94A6] text-[10px] font-bold uppercase tracking-wider mb-2">Edición especial dorada</p>
                                    <span className="text-[#A24814] font-black text-xl">S/. 3382</span>
                                </div>
                                <button className="w-10 h-10 rounded-full border border-[#EADED5] dark:border-[#3a3939] flex items-center justify-center text-[#1C1612] dark:text-[#ffffff] bg-[#FFF6F0] dark:bg-[#1c1b1b] hover:bg-[#ff5500] hover:border-[#ff5500] hover:text-white transition-all shrink-0 mt-1 shadow-sm">
                                    <ShoppingCart className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Producto 4 */}
                        <div className="group cursor-pointer">
                            <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden mb-5 bg-[#F8F9FA] border border-neutral-100 shadow-sm group-hover:shadow-md transition-all">
                                <span className="absolute top-4 left-4 z-10 bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] text-[9px] font-bold px-2.5 py-1 rounded-sm uppercase tracking-wider border border-[#EADED5] dark:border-[#3a3939] shadow-sm">
                                    POPULAR
                                </span>
                                <img src="/images/bearbrick.png" alt="Bearbrick" className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                            <div className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] leading-snug group-hover:text-[#ff5500] transition-colors line-clamp-2 mb-1">
                                        Bearbrick x Yohji Yamamoto 400%
                                    </h3>
                                    <p className="text-[#8A94A6] text-[10px] font-bold uppercase tracking-wider mb-2">Colaboración exclusiva</p>
                                    <span className="text-[#A24814] font-black text-xl">S/. 1710</span>
                                </div>
                                <button className="w-10 h-10 rounded-full border border-[#EADED5] dark:border-[#3a3939] flex items-center justify-center text-[#1C1612] dark:text-[#ffffff] bg-[#FFF6F0] dark:bg-[#1c1b1b] hover:bg-[#ff5500] hover:border-[#ff5500] hover:text-white transition-all shrink-0 mt-1 shadow-sm">
                                    <ShoppingCart className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
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
