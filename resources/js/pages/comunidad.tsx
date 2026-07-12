import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { ArrowRight, Calendar, MapPin, ChevronRight, Star, Quote, Facebook, Instagram, MessageCircle } from 'lucide-react';

interface Evento {
    id: number;
    titulo: string;
    fecha: string;
    ubicacion: string;
    tipo: string;
}

interface Discusion {
    id: number;
    titulo: string;
    cantidad_comentarios: number;
    ultima_actividad: string;
}

interface Showcase {
    id: number;
    usuario: string;
    descripcion: string;
    imagen_url: string;
    es_principal: boolean;
}

interface Testimonio {
    id: number;
    nombre_usuario: string;
    nivel: string | null;
    comentario: string;
    estrellas: number;
}

interface Props {
    eventos: Evento[];
    discusiones: Discusion[];
    showcases: Showcase[];
    testimonios: Testimonio[];
}

export default function Comunidad({ eventos, discusiones, showcases, testimonios }: Props) {
    const { data, setData, post, processing, reset } = useForm({
        email: ''
    });

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        post('/newsletter/subscribe', {
            onSuccess: () => {
                reset();
                alert('¡Gracias por suscribirte!');
            }
        });
    };

    const getRelativeTime = (timestamp: string) => {
        const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
        const diff = (new Date(timestamp).getTime() - new Date().getTime()) / 1000;
        
        if (Math.abs(diff) < 3600) return rtf.format(Math.round(diff / 60), 'minute');
        if (Math.abs(diff) < 86400) return rtf.format(Math.round(diff / 3600), 'hour');
        return rtf.format(Math.round(diff / 86400), 'day');
    };

    const principalShowcase = showcases.find(s => s.es_principal);
    const secondaryShowcases = showcases.filter(s => !s.es_principal).slice(0, 3);

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
                        <a href="https://discord.gg/motneki-dummy" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#ff5500] hover:bg-[#cc4400] text-white px-8 py-4 rounded-full font-bold text-sm shadow-xl shadow-[#ff5500]/20 transition-all hover:scale-105 uppercase tracking-wide w-full sm:w-auto">
                            <MessageCircle className="w-5 h-5" />
                            UNIRSE AL DISCORD
                        </a>
                        <a href="#eventos" className="flex items-center justify-center gap-2 bg-transparent border border-[#EADED5] dark:border-[#3a3939] hover:border-[#ffffff] hover:bg-[#ffffff] hover:text-white text-[#1C1612] dark:text-[#ffffff] px-8 py-4 rounded-full font-bold text-sm transition-all uppercase tracking-wide bg-[#FFF6F0] dark:bg-[#1c1b1b] shadow-sm w-full sm:w-auto">
                            <Calendar className="w-5 h-5" />
                            VER EVENTOS
                        </a>
                    </div>
                    
                    {/* Redes Sociales Extra */}
                    <div className="mt-8 flex items-center justify-center gap-6">
                        <span className="text-[#6E7B8A] text-sm font-medium">Síguenos en:</span>
                        <div className="flex items-center gap-3">
                            <a href="https://facebook.com/groups/motneki-dummy" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#FFF6F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] text-[#1C1612] dark:text-[#ffffff] flex items-center justify-center hover:bg-[#ff5500] hover:border-[#ff5500] hover:text-white transition-all shadow-sm">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="https://instagram.com/motnekistore-dummy" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#FFF6F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] text-[#1C1612] dark:text-[#ffffff] flex items-center justify-center hover:bg-[#ff5500] hover:border-[#ff5500] hover:text-white transition-all shadow-sm">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* SHOWCASE DE COLECCIONISTAS */}
                <div id="showcase" className="mb-32">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-10 gap-4">
                        <div>
                            <h2 className="font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[#1C1612] dark:text-[#ffffff] mb-2 tracking-tight">Showcase de Coleccionistas</h2>
                            <p className="text-[#6E7B8A] text-sm">Inspiración real de los espacios de nuestra comunidad en Perú.</p>
                        </div>
                        <a href="https://instagram.com/explore/tags/motneki-dummy" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#C25910] text-xs font-black tracking-widest uppercase hover:gap-3 transition-all w-max">
                            VER GALERÍA COMPLETA <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Main Large Image */}
                        {principalShowcase && (
                            <div className="relative rounded-[2rem] overflow-hidden group h-[400px] lg:h-[650px] shadow-lg">
                                <img src={principalShowcase.imagen_url} alt="Showcase Principal" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8">
                                    <p className="text-white font-bold text-lg mb-1">{principalShowcase.usuario}</p>
                                    <p className="text-white/80 text-sm">{principalShowcase.descripcion}</p>
                                </div>
                            </div>
                        )}

                        {/* Right Grid */}
                        <div className="grid grid-rows-2 gap-6 h-[600px] lg:h-[650px]">
                            {/* Top row with 2 images */}
                            <div className="grid grid-cols-2 gap-6 h-full">
                                {secondaryShowcases.slice(0, 2).map((showcase, idx) => (
                                    <div key={idx} className="rounded-[2rem] overflow-hidden shadow-lg group relative">
                                        <img src={showcase.imagen_url} alt={`Showcase ${idx}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-white font-bold text-sm">{showcase.usuario}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* Bottom Row 1 image */}
                            {secondaryShowcases[2] && (
                                <div className="rounded-[2rem] overflow-hidden shadow-lg group h-full relative">
                                    <img src={secondaryShowcases[2].imagen_url} alt="Showcase Bottom" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#A24814]/40 to-transparent mix-blend-overlay"></div>
                                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <p className="text-white font-bold text-lg">{secondaryShowcases[2].usuario}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* CALENDARIO & WIDGETS */}
                <div id="eventos" className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-32 pt-10">
                    {/* Left (Calendario) */}
                    <div>
                        <div className="flex items-center gap-4 mb-10">
                            <Calendar className="w-8 h-8 text-[#C25910]" strokeWidth={1.5} />
                            <h2 className="font-['Outfit'] text-3xl font-extrabold text-[#1C1612] dark:text-[#ffffff]">Calendario Local Perú</h2>
                        </div>

                        <div className="flex flex-col gap-4">
                            {eventos.map((evento, index) => {
                                const fecha = new Date(evento.fecha);
                                const mes = fecha.toLocaleString('es-ES', { month: 'short' });
                                const dia = fecha.getDate();
                                
                                return (
                                    <React.Fragment key={evento.id}>
                                        <a href={`https://facebook.com/events/motneki-dummy-${evento.id}`} target="_blank" rel="noreferrer" className={`flex items-center justify-between p-4 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl transition-colors cursor-pointer group border border-transparent hover:border-[#EADED5] dark:border-[#3a3939] hover:shadow-sm ${index === 0 ? 'bg-[#FAF5F0] dark:bg-[#131313]/50' : ''}`}>
                                            <div className="flex items-center gap-6">
                                                <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-md ${index === 0 ? 'bg-[#ff5500] text-white shadow-[#ff5500]/20' : 'bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] border border-[#EADED5] dark:border-[#3a3939]'}`}>
                                                    <span className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1">{mes}</span>
                                                    <span className="text-xl font-black leading-none">{dia}</span>
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-bold text-[#1C1612] dark:text-[#ffffff] mb-1 group-hover:text-[#ff5500] transition-colors leading-snug">{evento.titulo}</h3>
                                                    <div className="flex items-center gap-1.5 text-[#8A94A6] text-xs font-medium">
                                                        <MapPin className="w-3.5 h-3.5" />
                                                        <span>{evento.ubicacion}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-[#3a3939] group-hover:text-[#ff5500] transition-colors" />
                                        </a>
                                        {index < eventos.length - 1 && (
                                            <div className="h-px w-full bg-[#3a3939]/50 my-1"></div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right (Widgets) */}
                    <div className="flex flex-col gap-6 pt-2">
                        {/* Forum Widget */}
                        <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-[2.5rem] p-10 border border-[#EADED5] dark:border-[#3a3939] shadow-sm">
                            <h3 className="font-['Outfit'] text-2xl font-bold text-[#1C1612] dark:text-[#ffffff] mb-8">Discusiones Activas</h3>

                            <div className="flex flex-col gap-6">
                                {discusiones.map((discusion, index) => (
                                    <React.Fragment key={discusion.id}>
                                        <div className="cursor-pointer group">
                                            <h4 className={`text-[15px] font-bold group-hover:text-[#ff5500] transition-colors mb-2 leading-snug ${index === 0 ? 'text-[#A24814]' : 'text-[#1C1612] dark:text-[#ffffff]'}`}>
                                                {discusion.titulo}
                                            </h4>
                                            <p className="text-[11px] font-medium text-[#8A94A6]">
                                                {discusion.cantidad_comentarios} comentarios • Último {getRelativeTime(discusion.ultima_actividad)}
                                            </p>
                                        </div>
                                        {index < discusiones.length - 1 && (
                                            <div className="h-px w-full bg-[#3a3939]"></div>
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            <a href="https://facebook.com/groups/motneki-dummy" target="_blank" rel="noreferrer" className="w-full mt-10 inline-block text-center bg-[#FFF6F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] hover:border-[#ffffff] hover:bg-[#ffffff] hover:text-white text-[#1C1612] dark:text-[#ffffff] px-6 py-4 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all shadow-sm">
                                ENTRAR AL FORO DE FACEBOOK
                            </a>
                        </div>

                        {/* Trivia Widget */}
                        <div id="trivia" className="bg-[#ff5500] rounded-[2.5rem] p-10 text-center shadow-lg shadow-[#ff5500]/20 flex flex-col justify-center border border-[#ff5500]">
                            <span className="text-[#842E00] text-[10px] font-black uppercase tracking-widest mb-4 block">TRIVIA DEL MES</span>
                            <p className="text-white font-bold text-[17px] mb-8 leading-snug max-w-sm mx-auto">¿Cuál fue la primera pieza de Motneki en llegar a Perú?</p>
                            <a href="https://discord.gg/motneki-dummy" target="_blank" rel="noreferrer" className="text-white text-[10px] font-bold uppercase tracking-widest hover:text-[#1c1b1b] underline underline-offset-[6px] decoration-white/40 hover:decoration-white transition-all w-max mx-auto">
                                PARTICIPAR Y GANAR PUNTOS
                            </a>
                        </div>
                    </div>
                </div>

                {/* VOCES DE LA COMUNIDAD */}
                <div id="testimonios" className="mb-32">
                    <h2 className="font-['Outfit'] text-4xl lg:text-5xl font-extrabold text-center text-[#1C1612] dark:text-[#ffffff] mb-16 tracking-tight">Voces de la Comunidad</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonios.map((testimonio) => (
                            <div key={testimonio.id} className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-[2rem] p-10 shadow-sm border border-[#EADED5] dark:border-[#3a3939]/80 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div>
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex gap-1 text-[#FFC107]">
                                            {[...Array(testimonio.estrellas)].map((_, i) => (
                                                <Star key={i} className="w-[18px] h-[18px] fill-current" />
                                            ))}
                                        </div>
                                        <Quote className="w-10 h-10 text-[#1c1b1b] fill-current" />
                                    </div>
                                    <p className="text-[#6E7B8A] text-[15px] italic leading-relaxed mb-10 font-medium">
                                        {testimonio.comentario}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 pt-4 border-t border-[#131313]">
                                    <div className="w-12 h-12 rounded-full bg-[#3a3939] shrink-0"></div>
                                    <div>
                                        <h4 className="font-bold text-[#1C1612] dark:text-[#ffffff] text-sm">{testimonio.nombre_usuario}</h4>
                                        <p className="text-[10px] text-[#A24814] font-bold tracking-widest uppercase mt-0.5">{testimonio.nivel}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
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

                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                required
                                placeholder="Tu correo electrónico"
                                className="flex-1 bg-white dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] text-[#1C1612] dark:text-[#ffffff] placeholder-[#888888] dark:placeholder-[#6E7B8A] rounded-full px-6 py-4 focus:outline-none focus:border-[#ff5500] dark:focus:border-[#ff5500] transition-colors shadow-sm text-sm"
                            />
                            <button 
                                type="submit"
                                disabled={processing}
                                className="bg-[#934B22] hover:bg-[#733A1A] text-white px-8 py-4 rounded-full font-bold text-[11px] tracking-widest uppercase transition-all shadow-md shrink-0 disabled:opacity-70"
                            >
                                {processing ? 'Enviando...' : 'SUSCRIBIRME'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </PublicLayout>
    );
}
