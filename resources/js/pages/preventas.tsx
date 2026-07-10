import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ChevronLeft, ChevronRight, ShieldCheck, Truck, Banknote, ArrowRight } from 'lucide-react';

export default function Preventas() {
    return (
        <PublicLayout>
            <Head title="Preventas - MotnekiStore" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full font-sans">

                {/* HERO BANNER */}
                <div className="relative overflow-hidden bg-zinc-900 rounded-[2.5rem] mt-8 p-10 md:p-16 lg:p-24 shadow-2xl">
                    {/* Background Simulation */}
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40"
                        style={{ backgroundImage: "url('/images/Preventa01.webp')" }}
                    ></div>

                    <div className="relative z-10 max-w-2xl">
                        <span className="inline-block bg-[#ff5500] text-white text-[10px] md:text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full mb-6 shadow-sm">
                            LANZAMIENTO ESTELAR
                        </span>
                        <h1 className="font-['Outfit'] text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6">
                            Masterpiece:<br />Mahito – Jujutsu Kaisen
                        </h1>
                        <p className="text-gray-300 text-sm md:text-base max-w-lg mb-10 leading-relaxed font-medium">
                            Reserva hoy la pieza central de tu colección. Edición limitada de 100 unidades para todo el Perú.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-[#ff5500] hover:bg-[#cc4400] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg shadow-[#ff5500]/20 transition-all hover:scale-105 uppercase tracking-wide">
                                Reservar Ahora
                            </button>
                            <button className="bg-[#FFF6F0] dark:bg-[#1c1b1b]/10 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b]/20 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 rounded-full font-bold text-sm transition-all uppercase tracking-wide">
                                Detalles
                            </button>
                        </div>
                    </div>
                </div>

                {/* PREVENTAS MÁS POPULARES (Carrusel) */}
                <div className="mt-20 mb-16">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 gap-4">
                        <div>
                            <span className="text-[#ff5500] text-[10px] font-bold tracking-widest uppercase mb-2 block">DESTACADOS DE LA SEMANA</span>
                            <h2 className="font-['Outfit'] text-2xl md:text-3xl font-extrabold text-[#1C1612] dark:text-[#ffffff]">Preventas Más Populares</h2>
                        </div>
                        <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full border border-[#EADED5] dark:border-[#3a3939] flex items-center justify-center text-[#1C1612] dark:text-[#ffffff] bg-[#FFF6F0] dark:bg-[#1c1b1b] hover:border-[#ff5500] hover:text-[#ff5500] transition-colors shadow-sm">
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full border border-[#EADED5] dark:border-[#3a3939] flex items-center justify-center text-[#1C1612] dark:text-[#ffffff] bg-[#FFF6F0] dark:bg-[#1c1b1b] hover:border-[#ff5500] hover:text-[#ff5500] transition-colors shadow-sm">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Tarjeta 1 */}
                        <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-[#EADED5] dark:border-[#3a3939]/60 group">
                            <div className="relative aspect-square overflow-hidden bg-[#1D1B1A]">
                                <div className="absolute top-4 left-4 z-10 flex gap-2">
                                    <span className="bg-[#934B22] text-white text-[10px] font-bold px-2 py-1 rounded-sm">PREVENTA</span>
                                    <span className="bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded-sm">TOP 1</span>
                                </div>
                                <img src="/images/marco_fenix.png" alt="Marco el Fénix" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-[#1C1612] dark:text-[#ffffff] mb-4 hover:text-[#ff5500] transition-colors cursor-pointer">Marco el Fénix STL</h3>
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-[#A24814] text-2xl font-black">S/. 849.00</span>
                                    <span className="text-[10px] font-bold text-[#8A94A6] tracking-wider">ETA: OCT 2026</span>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] font-bold text-[#1C1612] dark:text-[#ffffff] mb-2 tracking-wider">
                                        <span>RESERVAS</span>
                                        <span>85%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-[#3a3939] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#A24814] w-[85%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tarjeta 2 */}
                        <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-[#EADED5] dark:border-[#3a3939]/60 group">
                            <div className="relative aspect-square overflow-hidden bg-[#1D1B1A]">
                                <div className="absolute top-4 left-4 z-10 flex gap-2">
                                    <span className="bg-[#934B22] text-white text-[10px] font-bold px-2 py-1 rounded-sm">PREVENTA</span>
                                </div>
                                <img src="/images/diablo_slime.png" alt="Diablo C Ichiban" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-[#1C1612] dark:text-[#ffffff] mb-4 hover:text-[#ff5500] transition-colors cursor-pointer">Diablo C Ichiban Kuji Tensei Shitara Slime.</h3>
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-[#A24814] text-2xl font-black">S/. 620.00</span>
                                    <span className="text-[10px] font-bold text-[#8A94A6] tracking-wider">ETA: DIC 2026</span>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] font-bold text-[#1C1612] dark:text-[#ffffff] mb-2 tracking-wider">
                                        <span>RESERVAS</span>
                                        <span>42%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-[#3a3939] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#A24814] w-[42%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tarjeta 3 */}
                        <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-[#EADED5] dark:border-[#3a3939]/60 group">
                            <div className="relative aspect-square overflow-hidden bg-[#1D1B1A]">
                                <div className="absolute top-4 left-4 z-10 flex gap-2">
                                    <span className="bg-[#934B22] text-white text-[10px] font-bold px-2 py-1 rounded-sm">PREVENTA</span>
                                </div>
                                <img src="/images/guts_beserker.png" alt="Beserker Guts" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-bold text-[#1C1612] dark:text-[#ffffff] mb-4 hover:text-[#ff5500] transition-colors cursor-pointer">Beserker: Guts</h3>
                                <div className="flex justify-between items-end mb-4">
                                    <span className="text-[#A24814] text-2xl font-black">S/. 1,299.00</span>
                                    <span className="text-[10px] font-bold text-[#8A94A6] tracking-wider">ETA: NOV 2026</span>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] font-bold text-[#1C1612] dark:text-[#ffffff] mb-2 tracking-wider">
                                        <span>RESERVAS</span>
                                        <span>92%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-[#3a3939] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#A24814] w-[92%] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BLOQUES BENTO (Beneficios) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {/* Tarjeta Ancha */}
                    <div className="col-span-1 md:col-span-2 bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-[2rem] p-10 flex flex-col justify-between border border-[#EADED5] dark:border-[#3a3939]/50">
                        <div>
                            <div className="w-12 h-12 flex items-center justify-center text-[#C25910] mb-6">
                                <ShieldCheck className="w-8 h-8" strokeWidth={1.5} />
                            </div>
                            <h3 className="font-['Outfit'] text-2xl md:text-3xl font-extrabold text-[#1C1612] dark:text-[#ffffff] mb-4 max-w-sm leading-tight">
                                Garantía de Autenticidad Motneki
                            </h3>
                            <p className="text-[#6E7B8A] text-sm max-w-md leading-relaxed">
                                Cada preventa está respaldada por una certificación única que asegura que tu pieza es 100% original de fabricante. Sin intermediarios dudosos.
                            </p>
                        </div>
                        <button className="mt-10 flex items-center gap-2 text-[#C25910] text-xs font-black tracking-widest uppercase hover:gap-3 transition-all w-max">
                            LEER MÁS <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Dos Tarjetas Pequeñas Apiladas */}
                    <div className="col-span-1 flex flex-col gap-6">
                        <div className="bg-[#ff5500] rounded-[2rem] p-8 flex-1 text-white flex flex-col justify-center shadow-lg shadow-[#ff5500]/10">
                            <Truck className="w-8 h-8 mb-6 text-white/90" strokeWidth={1.5} />
                            <h3 className="text-lg font-bold mb-3">Envío Preferencial</h3>
                            <p className="text-white/80 text-xs leading-relaxed">
                                Los usuarios que reservan reciben sus productos 48h antes del lanzamiento oficial en tienda.
                            </p>
                        </div>
                        <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-[2rem] p-8 flex-1 border border-[#EADED5] dark:border-[#3a3939] flex flex-col justify-center">
                            <Banknote className="w-8 h-8 mb-6 text-[#888888] dark:text-[#9ca3af]" strokeWidth={1.5} />
                            <h3 className="text-lg font-bold text-[#1C1612] dark:text-[#ffffff] mb-3">Cuotas Sin Intereses</h3>
                            <p className="text-[#6E7B8A] text-xs leading-relaxed">
                                Reserva con solo el 20% y paga el resto en hasta 6 cuotas fijas.
                            </p>
                        </div>
                    </div>
                </div>

                {/* TODAS LAS PREVENTAS (Grid 4 columnas) */}
                <div className="mb-16">
                    <div className="border-t border-[#EADED5] dark:border-[#3a3939] pt-10 mb-8">
                        <h2 className="font-['Outfit'] text-2xl md:text-3xl font-extrabold text-[#1C1612] dark:text-[#ffffff] mb-1">Todas las Preventas</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-10">
                        {/* Producto Simple 1 */}
                        <div className="bg-transparent group cursor-pointer">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-[#3a3939]/50 border border-[#EADED5] dark:border-[#3a3939]/50">
                                <span className="absolute top-3 left-3 z-10 bg-[#E8DDD1] text-[#6E4226] text-[10px] font-bold px-2.5 py-1 rounded-sm tracking-wider shadow-sm">
                                    PREVENTA
                                </span>
                                <img src="/images/saber_lily.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] mb-2 leading-snug group-hover:text-[#ff5500] transition-colors">Saber Lily: Victory</h3>
                                <div className="flex justify-between items-center border-b-2 border-[#A24814] pb-2">
                                    <span className="text-[#1C1612] dark:text-[#ffffff] font-black text-lg">S/. 580.00</span>
                                    <span className="text-[#8A94A6] text-[10px] font-bold tracking-widest">ENE 2026</span>
                                </div>
                            </div>
                        </div>

                        {/* Producto Simple 2 */}
                        <div className="bg-transparent group cursor-pointer">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-[#3a3939]/50 border border-[#EADED5] dark:border-[#3a3939]/50">
                                <span className="absolute top-3 left-3 z-10 bg-[#E8DDD1] text-[#6E4226] text-[10px] font-bold px-2.5 py-1 rounded-sm tracking-wider shadow-sm">
                                    PREVENTA
                                </span>
                                <img src="/images/hunter_silent.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] mb-2 leading-snug group-hover:text-[#ff5500] transition-colors">Hunter X: Silent Night</h3>
                                <div className="flex justify-between items-center border-b-2 border-[#A24814] pb-2">
                                    <span className="text-[#1C1612] dark:text-[#ffffff] font-black text-lg">S/. 420.00</span>
                                    <span className="text-[#8A94A6] text-[10px] font-bold tracking-widest">DIC 2026</span>
                                </div>
                            </div>
                        </div>

                        {/* Producto Simple 3 */}
                        <div className="bg-transparent group cursor-pointer">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-[#3a3939]/50 border border-[#EADED5] dark:border-[#3a3939]/50">
                                <span className="absolute top-3 left-3 z-10 bg-[#E8DDD1] text-[#6E4226] text-[10px] font-bold px-2.5 py-1 rounded-sm tracking-wider shadow-sm">
                                    PREVENTA
                                </span>
                                <img src="/images/nerissa.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] mb-2 leading-snug group-hover:text-[#ff5500] transition-colors">Nerissa - Hololive</h3>
                                <div className="flex justify-between items-center border-b-2 border-[#A24814] pb-2">
                                    <span className="text-[#1C1612] dark:text-[#ffffff] font-black text-lg">S/. 710.00</span>
                                    <span className="text-[#8A94A6] text-[10px] font-bold tracking-widest">FEB 2026</span>
                                </div>
                            </div>
                        </div>

                        {/* Producto Simple 4 */}
                        <div className="bg-transparent group cursor-pointer">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-[#3a3939]/50 border border-[#EADED5] dark:border-[#3a3939]/50">
                                <span className="absolute top-3 left-3 z-10 bg-[#E8DDD1] text-[#6E4226] text-[10px] font-bold px-2.5 py-1 rounded-sm tracking-wider shadow-sm">
                                    PREVENTA
                                </span>
                                <img src="/images/cyberpunk_edge.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] mb-2 leading-snug group-hover:text-[#ff5500] transition-colors">Cyberpunk Edge</h3>
                                <div className="flex justify-between items-center border-b-2 border-[#A24814] pb-2">
                                    <span className="text-[#1C1612] dark:text-[#ffffff] font-black text-lg">S/. 940.00</span>
                                    <span className="text-[#8A94A6] text-[10px] font-bold tracking-widest">MAR 2026</span>
                                </div>
                            </div>
                        </div>

                        {/* Producto Simple 5 */}
                        <div className="bg-transparent group cursor-pointer">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-[#3a3939]/50 border border-[#EADED5] dark:border-[#3a3939]/50">
                                <span className="absolute top-3 left-3 z-10 bg-[#E8DDD1] text-[#6E4226] text-[10px] font-bold px-2.5 py-1 rounded-sm tracking-wider shadow-sm">
                                    PREVENTA
                                </span>
                                <img src="/images/kaido.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] mb-2 leading-snug group-hover:text-[#ff5500] transition-colors">Kaido One Piece PVC Figure 7.5</h3>
                                <div className="flex justify-between items-center border-b-2 border-[#A24814] pb-2">
                                    <span className="text-[#1C1612] dark:text-[#ffffff] font-black text-lg">S/. 390.00</span>
                                    <span className="text-[#8A94A6] text-[10px] font-bold tracking-widest">DIC 2026</span>
                                </div>
                            </div>
                        </div>

                        {/* Producto Simple 6 */}
                        <div className="bg-transparent group cursor-pointer">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-[#3a3939]/50 border border-[#EADED5] dark:border-[#3a3939]/50">
                                <span className="absolute top-3 left-3 z-10 bg-[#E8DDD1] text-[#6E4226] text-[10px] font-bold px-2.5 py-1 rounded-sm tracking-wider shadow-sm">
                                    PREVENTA
                                </span>
                                <img src="/images/pudding.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] mb-2 leading-snug group-hover:text-[#ff5500] transition-colors">Figuarts ZERO Charlotte Pudding</h3>
                                <div className="flex justify-between items-center border-b-2 border-[#A24814] pb-2">
                                    <span className="text-[#1C1612] dark:text-[#ffffff] font-black text-lg">S/. 1,500.00</span>
                                    <span className="text-[#8A94A6] text-[10px] font-bold tracking-widest">ABR 2026</span>
                                </div>
                            </div>
                        </div>

                        {/* Producto Simple 7 */}
                        <div className="bg-transparent group cursor-pointer">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-[#3a3939]/50 border border-[#EADED5] dark:border-[#3a3939]/50">
                                <span className="absolute top-3 left-3 z-10 bg-[#E8DDD1] text-[#6E4226] text-[10px] font-bold px-2.5 py-1 rounded-sm tracking-wider shadow-sm">
                                    PREVENTA
                                </span>
                                <img src="/images/zoro_premium.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] mb-2 leading-snug group-hover:text-[#ff5500] transition-colors">One Piece Roronoa Zoro Premium</h3>
                                <div className="flex justify-between items-center border-b-2 border-[#A24814] pb-2">
                                    <span className="text-[#1C1612] dark:text-[#ffffff] font-black text-lg">S/. 670.00</span>
                                    <span className="text-[#8A94A6] text-[10px] font-bold tracking-widest">OCT 2026</span>
                                </div>
                            </div>
                        </div>

                        {/* Producto Simple 8 */}
                        <div className="bg-transparent group cursor-pointer">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-[#3a3939]/50 border border-[#EADED5] dark:border-[#3a3939]/50">
                                <span className="absolute top-3 left-3 z-10 bg-[#E8DDD1] text-[#6E4226] text-[10px] font-bold px-2.5 py-1 rounded-sm tracking-wider shadow-sm">
                                    PREVENTA
                                </span>
                                <img src="/images/hu_tao.png" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90" onError={(e) => e.currentTarget.style.display = 'none'} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] mb-2 leading-snug group-hover:text-[#ff5500] transition-colors">Factory Supply Hu Tao Genshin</h3>
                                <div className="flex justify-between items-center border-b-2 border-[#A24814] pb-2">
                                    <span className="text-[#1C1612] dark:text-[#ffffff] font-black text-lg">S/. 525.00</span>
                                    <span className="text-[#8A94A6] text-[10px] font-bold tracking-widest">NOV 2026</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Botón Cargar Más */}
                    <div className="mt-16 flex justify-center">
                        <button className="bg-transparent border border-[#ffffff] text-[#1C1612] dark:text-[#ffffff] px-10 py-3.5 rounded-full font-bold text-[11px] tracking-widest uppercase hover:bg-[#ffffff] hover:text-white transition-colors shadow-sm">
                            CARGAR MÁS PRODUCTOS
                        </button>
                    </div>
                </div>

            </div>
        </PublicLayout>
    );
}
