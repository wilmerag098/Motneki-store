import React from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ArrowRight, Calendar, MapPin, ChevronRight, Star, Quote } from 'lucide-react';

export default function Comunidad() {
    return (
        <PublicLayout>
            <Head title="Comunidad - MotnekiStore" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full font-sans">

                {/* HERO CENTRAL */}
                <div className="text-center py-20 lg:py-28 max-w-4xl mx-auto px-4">
                    <span className="inline-block bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#C25910] text-[10px] font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8 border border-[#EADED5] dark:border-[#3a3939]">
                        MOTNEKI COMMUNITY PERÚ
                    </span>
                    <h1 className="font-['Outfit'] text-5xl lg:text-7xl font-extrabold text-[#1C1612] dark:text-[#ffffff] mb-8 leading-[1.1] tracking-tight">
                        Coleccionismo Elevado a una Experiencia Compartida
                    </h1>
                    <p className="text-[#6E7B8A] text-lg lg:text-xl mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
                        Únete a la legión de coleccionistas más exclusiva de Perú. Comparte tu pasión, asiste a eventos únicos y debate sobre los próximos lanzamientos.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-[#ff5500] hover:bg-[#cc4400] text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl shadow-[#ff5500]/20 transition-all hover:scale-105 uppercase tracking-wide">
                            UNIRSE AL CLUB
                        </button>
                        <button className="bg-transparent border border-[#EADED5] dark:border-[#3a3939] hover:border-[#ffffff] hover:bg-[#ffffff] hover:text-white text-[#1C1612] dark:text-[#ffffff] px-8 py-4 rounded-full font-bold text-sm transition-all uppercase tracking-wide bg-[#FFF6F0] dark:bg-[#1c1b1b] shadow-sm">
                            VER EVENTOS
                        </button>
                    </div>
                </div>

                {/* SHOWCASE DE COLECCIONISTAS */}
                <div className="mb-32">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-4">
                        <div>
                            <h2 className="font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[#1C1612] dark:text-[#ffffff] mb-2 tracking-tight">Showcase de Coleccionistas</h2>
                            <p className="text-[#6E7B8A] text-sm">Inspiración real de los espacios de nuestra comunidad en Perú.</p>
                        </div>
                        <button className="flex items-center gap-2 text-[#C25910] text-xs font-black tracking-widest uppercase hover:gap-3 transition-all w-max">
                            VER GALERÍA COMPLETA <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Main Large Image */}
                        <div className="relative rounded-[2rem] overflow-hidden group h-[400px] lg:h-[650px] shadow-lg">
                            <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1200&auto=format&fit=crop" alt="Showcase" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8">
                                <p className="text-white font-bold text-lg mb-1">@SandroCollects</p>
                                <p className="text-white/80 text-sm">Edición Limitada "Zenith" - Sala Principal</p>
                            </div>
                        </div>

                        {/* Right Grid */}
                        <div className="grid grid-rows-2 gap-6 h-[600px] lg:h-[650px]">
                            {/* Top row with 2 images */}
                            <div className="grid grid-cols-2 gap-6 h-full">
                                <div className="rounded-[2rem] overflow-hidden shadow-lg group">
                                    <img src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=800&auto=format&fit=crop" alt="Setup" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                <div className="rounded-[2rem] overflow-hidden shadow-lg group">
                                    <img src="https://images.unsplash.com/photo-1616423640778-28d1b53229bd?q=80&w=800&auto=format&fit=crop" alt="Shelf" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                            </div>
                            {/* Bottom Row 1 image */}
                            <div className="rounded-[2rem] overflow-hidden shadow-lg group h-full relative">
                                <img src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop" alt="Unboxing" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#A24814]/40 to-transparent mix-blend-overlay"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CALENDARIO & WIDGETS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-32">
                    {/* Left (Calendario) */}
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <Calendar className="w-8 h-8 text-[#C25910]" strokeWidth={1.5} />
                            <h2 className="font-['Outfit'] text-3xl font-extrabold text-[#1C1612] dark:text-[#ffffff]">Calendario Local Perú</h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            {/* Event 1 */}
                            <div className="flex items-center justify-between p-4 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl transition-colors cursor-pointer group bg-[#FAF5F0] dark:bg-[#131313]/50 border border-transparent hover:border-[#EADED5] dark:border-[#3a3939] hover:shadow-sm">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-xl bg-[#ff5500] flex flex-col items-center justify-center text-white shadow-md shadow-[#ff5500]/20 shrink-0">
                                        <span className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1">OCT</span>
                                        <span className="text-xl font-black leading-none">12</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#1C1612] dark:text-[#ffffff] mb-1 group-hover:text-[#ff5500] transition-colors leading-snug">Private Unveiling: The Katana Series</h3>
                                        <div className="flex items-center gap-1.5 text-[#8A94A6] text-xs font-medium">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>San Isidro, Lima - Hotel Westin</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-[#3a3939] group-hover:text-[#ff5500] transition-colors" />
                            </div>

                            <div className="h-px w-full bg-[#3a3939]/50 my-1"></div>

                            {/* Event 2 */}
                            <div className="flex items-center justify-between p-4 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl transition-colors cursor-pointer group border border-transparent hover:border-[#EADED5] dark:border-[#3a3939] hover:shadow-sm">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-xl bg-[#FFF6F0] dark:bg-[#1c1b1b] flex flex-col items-center justify-center text-[#1C1612] dark:text-[#ffffff] border border-[#EADED5] dark:border-[#3a3939] shrink-0">
                                        <span className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1">NOV</span>
                                        <span className="text-xl font-black leading-none">05</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#1C1612] dark:text-[#ffffff] mb-1 group-hover:text-[#ff5500] transition-colors leading-snug">Workshop: Preservación de Resina</h3>
                                        <div className="flex items-center gap-1.5 text-[#8A94A6] text-xs font-medium">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>Online Exclusive - Zoom Premium</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-[#3a3939] group-hover:text-[#ff5500] transition-colors" />
                            </div>

                            <div className="h-px w-full bg-[#3a3939]/50 my-1"></div>

                            {/* Event 3 */}
                            <div className="flex items-center justify-between p-4 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl transition-colors cursor-pointer group border border-transparent hover:border-[#EADED5] dark:border-[#3a3939] hover:shadow-sm">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 rounded-xl bg-[#FFF6F0] dark:bg-[#1c1b1b] flex flex-col items-center justify-center text-[#1C1612] dark:text-[#ffffff] border border-[#EADED5] dark:border-[#3a3939] shrink-0">
                                        <span className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1">DIC</span>
                                        <span className="text-xl font-black leading-none">20</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-[#1C1612] dark:text-[#ffffff] mb-1 group-hover:text-[#ff5500] transition-colors leading-snug">Gala de Coleccionistas: Fin de Año</h3>
                                        <div className="flex items-center gap-1.5 text-[#8A94A6] text-xs font-medium">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>Barranco, Lima - MAC Lima</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-[#3a3939] group-hover:text-[#ff5500] transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Right (Widgets) */}
                    <div className="flex flex-col gap-6 pt-2">
                        {/* Forum Widget */}
                        <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-[2.5rem] p-10 border border-[#EADED5] dark:border-[#3a3939] shadow-sm">
                            <h3 className="font-['Outfit'] text-2xl font-bold text-[#1C1612] dark:text-[#ffffff] mb-8">Discusiones Activas</h3>

                            <div className="flex flex-col gap-6">
                                <div className="cursor-pointer group">
                                    <h4 className="text-[15px] font-bold text-[#A24814] group-hover:text-[#ff5500] transition-colors mb-2 leading-snug">¿Qué opinan del nuevo material de las bases?</h4>
                                    <p className="text-[11px] font-medium text-[#8A94A6]">42 comentarios • Último hace 5 min</p>
                                </div>
                                <div className="h-px w-full bg-[#3a3939]"></div>
                                <div className="cursor-pointer group">
                                    <h4 className="text-[15px] font-bold text-[#1C1612] dark:text-[#ffffff] group-hover:text-[#ff5500] transition-colors mb-2 leading-snug">Especulación: Lanzamiento "Bloodmoon" 2026</h4>
                                    <p className="text-[11px] font-medium text-[#8A94A6]">128 comentarios • Último hace 2 horas</p>
                                </div>
                                <div className="h-px w-full bg-[#3a3939]"></div>
                                <div className="cursor-pointer group">
                                    <h4 className="text-[15px] font-bold text-[#1C1612] dark:text-[#ffffff] group-hover:text-[#ff5500] transition-colors mb-2 leading-snug">Guía para importación de piezas exclusivas</h4>
                                    <p className="text-[11px] font-medium text-[#8A94A6]">15 comentarios • Último hace 1 día</p>
                                </div>
                            </div>

                            <button className="w-full mt-10 bg-[#FFF6F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] hover:border-[#ffffff] hover:bg-[#ffffff] hover:text-white text-[#1C1612] dark:text-[#ffffff] px-6 py-4 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all shadow-sm">
                                ENTRAR AL FORO
                            </button>
                        </div>

                        {/* Trivia Widget */}
                        <div className="bg-[#ff5500] rounded-[2.5rem] p-10 text-center shadow-lg shadow-[#ff5500]/20 flex flex-col justify-center border border-[#ff5500]">
                            <span className="text-[#842E00] text-[10px] font-black uppercase tracking-widest mb-4 block">TRIVIA DEL MES</span>
                            <p className="text-white font-bold text-[17px] mb-8 leading-snug max-w-sm mx-auto">¿Cuál fue la primera pieza de Motneki en llegar a Perú?</p>
                            <button className="text-white text-[10px] font-bold uppercase tracking-widest hover:text-[#1c1b1b] underline underline-offset-[6px] decoration-white/40 hover:decoration-white transition-all w-max mx-auto">
                                PARTICIPAR Y GANAR PUNTOS
                            </button>
                        </div>
                    </div>
                </div>

                {/* VOCES DE LA COMUNIDAD */}
                <div className="mb-32">
                    <h2 className="font-['Outfit'] text-4xl lg:text-5xl font-extrabold text-center text-[#1C1612] dark:text-[#ffffff] mb-16 tracking-tight">Voces de la Comunidad</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Testimonio 1 */}
                        <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-[2rem] p-10 shadow-sm border border-[#EADED5] dark:border-[#3a3939]/80 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-1 text-[#FFC107]">
                                        <Star className="w-[18px] h-[18px] fill-current" />
                                        <Star className="w-[18px] h-[18px] fill-current" />
                                        <Star className="w-[18px] h-[18px] fill-current" />
                                        <Star className="w-[18px] h-[18px] fill-current" />
                                        <Star className="w-[18px] h-[18px] fill-current" />
                                    </div>
                                    <Quote className="w-10 h-10 text-[#1c1b1b] fill-current" />
                                </div>
                                <p className="text-[#6E7B8A] text-[15px] italic leading-relaxed mb-10 font-medium">
                                    "La atención al detalle en MotnekiStore Perú es incomparable. No solo compras una figura, te unes a un círculo de personas que aprecian el arte real."
                                </p>
                            </div>
                            <div className="flex items-center gap-4 pt-4 border-t border-[#131313]">
                                <div className="w-12 h-12 rounded-full bg-[#3a3939] shrink-0"></div>
                                <div>
                                    <h4 className="font-bold text-[#1C1612] dark:text-[#ffffff] text-sm">Mauricio V.</h4>
                                    <p className="text-[10px] text-[#A24814] font-bold tracking-widest uppercase mt-0.5">COLECCIONISTA NIVEL ONYX</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonio 2 */}
                        <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-[2rem] p-10 shadow-sm border border-[#EADED5] dark:border-[#3a3939]/80 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-1 text-[#FFC107]">
                                        <Star className="w-[18px] h-[18px] fill-current" />
                                        <Star className="w-[18px] h-[18px] fill-current" />
                                        <Star className="w-[18px] h-[18px] fill-current" />
                                        <Star className="w-[18px] h-[18px] fill-current" />
                                        <Star className="w-[18px] h-[18px] fill-current" />
                                    </div>
                                    <Quote className="w-10 h-10 text-[#1c1b1b] fill-current" />
                                </div>
                                <p className="text-[#6E7B8A] text-[15px] italic leading-relaxed mb-10 font-medium">
                                    "El evento privado en Lima fue espectacular. Poder hablar con otros coleccionistas y ver las piezas en vivo cambió mi forma de coleccionar."
                                </p>
                            </div>
                            <div className="flex items-center gap-4 pt-4 border-t border-[#131313]">
                                <div className="w-12 h-12 rounded-full bg-[#3a3939] shrink-0"></div>
                                <div>
                                    <h4 className="font-bold text-[#1C1612] dark:text-[#ffffff] text-sm">Elena R.</h4>
                                    <p className="text-[10px] text-[#A24814] font-bold tracking-widest uppercase mt-0.5">FUNDADORA LIMA ART TOYS</p>
                                </div>
                            </div>
                        </div>

                        {/* Testimonio 3 */}
                        <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-[2rem] p-10 shadow-sm border border-[#EADED5] dark:border-[#3a3939]/80 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex gap-1 text-[#FFC107]">
                                        <Star className="w-[18px] h-[18px] fill-current" />
                                        <Star className="w-[18px] h-[18px] fill-current" />
                                        <Star className="w-[18px] h-[18px] fill-current" />
                                        <Star className="w-[18px] h-[18px] fill-current" />
                                        <Star className="w-[18px] h-[18px] fill-current" />
                                    </div>
                                    <Quote className="w-10 h-10 text-[#1c1b1b] fill-current" />
                                </div>
                                <p className="text-[#6E7B8A] text-[15px] italic leading-relaxed mb-10 font-medium">
                                    "El soporte en Perú es de primer nivel. Tuve una duda con mi preventa y la resolvieron en minutos con un trato muy humano y profesional."
                                </p>
                            </div>
                            <div className="flex items-center gap-4 pt-4 border-t border-[#131313]">
                                <div className="w-12 h-12 rounded-full bg-[#3a3939] shrink-0"></div>
                                <div>
                                    <h4 className="font-bold text-[#1C1612] dark:text-[#ffffff] text-sm">Carlos D.</h4>
                                    <p className="text-[10px] text-[#A24814] font-bold tracking-widest uppercase mt-0.5">COLECCIONISTA DESDE 2026</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* NEWSLETTER (Fuera del contenedor principal para fondo full) */}
            <div className="bg-[#F2ECE9] dark:bg-gradient-to-b dark:from-[#131313] dark:to-[#1c1b1b] py-20 lg:py-28 text-center border-t border-[#EADED5] dark:border-[#3a3939]/50 mt-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="font-['Outfit'] text-4xl lg:text-5xl font-extrabold text-[#1C1612] dark:text-[#ffffff] mb-6 leading-tight tracking-tight">
                            No te pierdas ningún drop<br />en Perú
                        </h2>
                        <p className="text-[#6E7B8A] dark:text-[#9ca3af] text-[15px] mb-10 leading-relaxed font-medium">
                            Recibe notificaciones exclusivas sobre eventos en Lima, preventas locales y noticias de la comunidad directo en tu correo.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className="flex-1 bg-white dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] text-[#1C1612] dark:text-[#ffffff] placeholder-[#888888] dark:placeholder-[#6E7B8A] rounded-full px-6 py-4 focus:outline-none focus:border-[#ff5500] dark:focus:border-[#ff5500] transition-colors shadow-sm text-sm"
                            />
                            <button className="bg-[#934B22] hover:bg-[#733A1A] text-white px-8 py-4 rounded-full font-bold text-[11px] tracking-widest uppercase transition-all shadow-md shrink-0">
                                SUSCRIBIRME
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </PublicLayout>
    );
}
