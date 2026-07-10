import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Search,
    User,
    Heart,
    ShoppingCart,
    ChevronLeft,
    ChevronRight,
    Check,
    Plane,
    Calendar,
    ArrowRight,
    Globe,
    Share2,
    Mail,
    Menu,
    X,
    Sparkles,
    ShieldCheck
} from 'lucide-react';
import { login, register, dashboard } from '@/routes';
import PublicLayout from '@/layouts/public-layout';

export default function Welcome() {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Banners del carrusel (Imágenes completas proporcionadas por el usuario)
    const slides = [
        {
            src: '/images/Peluches.webp',
            link: '/catalogo',
            alt: 'Banner 1'
        },
        {
            src: '/images/Polos.webp', // Placeholder para la segunda imagen
            link: '/catalogo',
            alt: 'Banner 2'
        },
        {
            src: '/images/Figuras.webp', // Placeholder para la tercera imagen
            link: '/catalogo',
            alt: 'Banner 3'
        },
        {
            src: '/images/Anime.webp', // Placeholder para la tercera imagen
            link: '/catalogo',
            alt: 'Banner 4'
        },
    ];

    // Auto-play del carrusel
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <PublicLayout>
            <Head>
                <title>MotnekiStore</title>
                <meta name="description" content="Elevando el arte del coleccionismo con piezas exclusivas y curaduría premium desde Japón para el mundo." />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Outfit:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
            </Head>

            {/* SECCIÓN HERO / CARRUSEL */}
            <section className="w-full bg-black">
                <div className="relative w-full overflow-hidden group min-h-[320px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[600px] flex items-center">
                    {/* Contenido de los Slides */}
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 flex items-center ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                                }`}
                        >
                            <div className="relative w-full h-full flex items-center justify-center bg-black">
                                <img
                                    src={slide.src}
                                    alt={slide.alt}
                                    className="w-full h-full object-contain"
                                />
                                {/* Botón VER CATÁLOGO */}
                                <Link
                                    href={slide.link}
                                    className="absolute bottom-10 left-10 sm:bottom-12 sm:left-14 border border-white bg-transparent hover:bg-white hover:text-black text-white font-bold text-[10px] sm:text-xs uppercase tracking-[0.2em] px-8 py-3 transition-colors flex items-center gap-3 group/btn"
                                >
                                    VER CATÁLOGO
                                    <span className="text-[#ff5500] group-hover/btn:translate-x-1 transition-transform">▶</span>
                                </Link>
                            </div>
                        </div>
                    ))}

                    {/* Flechas de Navegación */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 sm:left-6 z-20 text-[#888888] hover:text-white transition-colors cursor-pointer hidden sm:block"
                    >
                        <span className="text-xs">◀</span>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 sm:right-6 z-20 text-[#888888] hover:text-white transition-colors cursor-pointer hidden sm:block"
                    >
                        <span className="text-xs">▶</span>
                    </button>

                    {/* Puntos de Navegación (Dots) */}
                    <div className="absolute bottom-4 left-10 sm:bottom-4 sm:left-14 z-20 flex gap-1.5">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${index === currentSlide ? 'bg-white' : 'bg-[#888888] hover:bg-white/70'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* SECCIÓN TENDENCIAS DE LA SEMANA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="font-['Outfit'] text-3xl font-extrabold text-[#1C1612] dark:text-[#ffffff] tracking-tight">
                            Tendencias de la Semana
                        </h2>
                        <p className="text-[#888888] dark:text-[#9ca3af] text-sm mt-1">
                            Las piezas más buscadas por coleccionistas de todo el mundo.
                        </p>
                    </div>
                    <Link
                        href="/catalogo"
                        className="text-xs sm:text-sm font-bold text-[#ff5500] hover:text-[#1C1612] dark:text-[#ffffff] tracking-wider uppercase transition-colors flex items-center gap-1 group"
                    >
                        VER TODAS
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grilla de Productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Tarjeta 1: Ichigo Kurosaki */}
                    <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl overflow-hidden border border-[#EADED5] dark:border-[#3a3939]/60 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                        <div className="relative aspect-square bg-[#F7F2EE] overflow-hidden">
                            <span className="absolute top-4 left-4 z-10 bg-[#ff5500] text-white text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm">
                                POPULAR
                            </span>
                            <button className="absolute top-4 right-4 z-10 p-2 bg-[#FFF6F0] dark:bg-[#1c1b1b]/80 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] hover:text-red-500 rounded-full transition-colors shadow-sm">
                                <Heart className="w-4 h-4" />
                            </button>
                            <img
                                src="/images/ichigo_kurosaki_figure.png"
                                alt="Figura Estatua de Resina Anime Forma Hueca Bleach Ichigo Kurosaki"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-5 flex flex-col flex-grow justify-between">
                            <div>
                                <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
                                    GOOD SMILE COMPANY
                                </span>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] mt-1.5 leading-snug line-clamp-2 hover:text-[#ff5500] transition-colors cursor-pointer">
                                    Figura Estatua de Resina Anime Forma Hueca Bleach Ichigo Kurosaki
                                </h3>
                                <span className="inline-block text-[11px] font-bold text-[#ff5500]/80 mt-1 bg-[#ff5500]/5 px-2 py-0.5 rounded">
                                    Bleach
                                </span>
                            </div>
                            <div className="mt-4 pt-3 border-t border-[#131313] flex items-center justify-between">
                                <span className="text-base font-extrabold text-[#ff5500]">
                                    S/. 721.96
                                </span>
                                <button className="text-xs font-bold text-[#1C1612] dark:text-[#ffffff] hover:text-[#ff5500] transition-colors">
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta 2: Goku Ultra Instinct */}
                    <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl overflow-hidden border border-[#EADED5] dark:border-[#3a3939]/60 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                        <div className="relative aspect-square bg-[#F7F2EE] overflow-hidden">
                            <button className="absolute top-4 right-4 z-10 p-2 bg-[#FFF6F0] dark:bg-[#1c1b1b]/80 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] hover:text-red-500 rounded-full transition-colors shadow-sm">
                                <Heart className="w-4 h-4" />
                            </button>
                            <img
                                src="/images/goku_ultra_instinct.png"
                                alt="Goku Ultra Instinct"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-5 flex flex-col flex-grow justify-between">
                            <div>
                                <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
                                    BANDAI SPIRITS
                                </span>
                                <h3 className="text-sm font-bold text-[#ff5500] mt-1.5 leading-snug line-clamp-2 hover:opacity-85 transition-opacity cursor-pointer">
                                    Goku Ultra Instinct
                                </h3>
                                <span className="inline-block text-[11px] font-bold text-[#ff5500]/80 mt-1 bg-[#ff5500]/5 px-2 py-0.5 rounded">
                                    Dragon Ball Super
                                </span>
                            </div>
                            <div className="mt-4 pt-3 border-t border-[#131313] flex items-center justify-between">
                                <span className="text-base font-extrabold text-[#ff5500]">
                                    S/. 931.00
                                </span>
                                <button className="text-xs font-bold text-[#1C1612] dark:text-[#ffffff] hover:text-[#ff5500] transition-colors">
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta 3: Gon Freecss */}
                    <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl overflow-hidden border border-[#EADED5] dark:border-[#3a3939]/60 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                        <div className="relative aspect-square bg-[#F7F2EE] overflow-hidden">
                            <span className="absolute top-4 left-4 z-10 bg-[#1D2A44] text-white text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm">
                                LIMITED
                            </span>
                            <button className="absolute top-4 right-4 z-10 p-2 bg-[#FFF6F0] dark:bg-[#1c1b1b]/80 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] hover:text-red-500 rounded-full transition-colors shadow-sm">
                                <Heart className="w-4 h-4" />
                            </button>
                            <img
                                src="/images/gon_freecss_figure.png"
                                alt="RD studio 1:4/1:6 Gon Freecss"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-5 flex flex-col flex-grow justify-between">
                            <div>
                                <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
                                    BANDAI HOBBY
                                </span>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] mt-1.5 leading-snug line-clamp-2 hover:text-[#ff5500] transition-colors cursor-pointer">
                                    RD studio 1:4/1:6 Gon Freecss
                                </h3>
                                <span className="inline-block text-[11px] font-bold text-[#ff5500]/80 mt-1 bg-[#ff5500]/5 px-2 py-0.5 rounded">
                                    Hunter x Hunter
                                </span>
                            </div>
                            <div className="mt-4 pt-3 border-t border-[#131313] flex items-center justify-between">
                                <span className="text-base font-extrabold text-[#ff5500]">
                                    S/. 362.90
                                </span>
                                <button className="text-xs font-bold text-[#1C1612] dark:text-[#ffffff] hover:text-[#ff5500] transition-colors">
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta 4: Rudo Gachiakuta */}
                    <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl overflow-hidden border border-[#EADED5] dark:border-[#3a3939]/60 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                        <div className="relative aspect-square bg-[#F7F2EE] overflow-hidden">
                            <button className="absolute top-4 right-4 z-10 p-2 bg-[#FFF6F0] dark:bg-[#1c1b1b]/80 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] hover:text-red-500 rounded-full transition-colors shadow-sm">
                                <Heart className="w-4 h-4" />
                            </button>
                            <img
                                src="/images/rudo_gachiakuta.png"
                                alt="Rudo Gachiakuta Estatua 1/6 Resina"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <div className="p-5 flex flex-col flex-grow justify-between">
                            <div>
                                <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
                                    WAKE STUDIO
                                </span>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] mt-1.5 leading-snug line-clamp-2 hover:text-[#ff5500] transition-colors cursor-pointer">
                                    Rudo Gachiakuta Estatua 1/6 Resina
                                </h3>
                                <span className="inline-block text-[11px] font-bold text-[#ff5500]/80 mt-1 bg-[#ff5500]/5 px-2 py-0.5 rounded">
                                    Re:Zero
                                </span>
                            </div>
                            <div className="mt-4 pt-3 border-t border-[#131313] flex items-center justify-between">
                                <span className="text-base font-extrabold text-[#ff5500]">
                                    S/. 1,178.00
                                </span>
                                <button className="text-xs font-bold text-[#1C1612] dark:text-[#ffffff] hover:text-[#ff5500] transition-colors">
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN IMPORTACIÓN DIRECTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-[#FAF2EC] rounded-3xl border border-[#EADED5] dark:border-[#3a3939] p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Columna Texto (Izquierda) */}
                    <div className="flex-1 space-y-6 text-left max-w-xl">
                        <span className="text-xs font-extrabold tracking-widest text-[#ff5500] uppercase block">
                            IMPORTACIÓN DIRECTA
                        </span>
                        <h2 className="font-['Outfit'] text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1C1612] dark:text-[#ffffff] tracking-tight leading-tight">
                            Joyas de Akihabara en tu puerta
                        </h2>
                        <p className="text-[#888888] dark:text-[#9ca3af] text-sm sm:text-base leading-relaxed">
                            Nuestra red exclusiva de proveedores en Tokio nos permite ofrecerte ediciones limitadas que rara vez salen de Japón. Autenticidad garantizada y empaque premium en cada envío.
                        </p>

                        <div className="space-y-4 pt-2">
                            {/* Beneficio 1 */}
                            <div className="flex items-start gap-3">
                                <span className="p-1 bg-[#ff5500]/10 text-[#ff5500] rounded-lg mt-0.5">
                                    <ShieldCheck className="w-5 h-5" />
                                </span>
                                <div>
                                    <h4 className="font-bold text-sm text-[#1C1612] dark:text-[#ffffff]">
                                        Certificado de Autenticidad
                                    </h4>
                                    <p className="text-[#888888] dark:text-[#9ca3af] text-xs mt-0.5">
                                        Cada pieza incluye holograma oficial y registro de fabricante.
                                    </p>
                                </div>
                            </div>

                            {/* Beneficio 2 */}
                            <div className="flex items-start gap-3">
                                <span className="p-1 bg-[#ff5500]/10 text-[#ff5500] rounded-lg mt-0.5">
                                    <Plane className="w-5 h-5" />
                                </span>
                                <div>
                                    <h4 className="font-bold text-sm text-[#1C1612] dark:text-[#ffffff]">
                                        Envío Express Asegurado
                                    </h4>
                                    <p className="text-[#888888] dark:text-[#9ca3af] text-xs mt-0.5">
                                        Logística especializada para figuras frágiles con rastreo global.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Link
                                href="/exclusivos"
                                className="inline-block bg-[#ffffff] hover:bg-[#A3592A] text-white text-xs font-extrabold uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all shadow-md"
                            >
                                EXPLORAR EXCLUSIVOS
                            </Link>
                        </div>
                    </div>

                    {/* Columna Visual (Derecha) */}
                    <div className="flex-1 flex items-center justify-center relative w-full max-w-md lg:max-w-none h-[340px] sm:h-[400px]">
                        {/* Imagen Principal: Kurumi Tokisaki */}
                        <div className="absolute left-0 w-3/5 h-4/5 rounded-3xl overflow-hidden shadow-xl border border-[#EADED5] dark:border-[#3a3939] bg-[#FFF6F0] dark:bg-[#1c1b1b] transition-all hover:scale-[1.02] z-10">
                            <img
                                src="/images/kurumi_tokisaki.png"
                                alt="Kurumi Tokisaki"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Imagen Secundaria: Anime Display */}
                        <div className="absolute right-0 bottom-4 w-1/2 h-3/4 rounded-3xl overflow-hidden shadow-lg border border-[#EADED5] dark:border-[#3a3939]/70 bg-[#FFF6F0] dark:bg-[#1c1b1b] transition-all hover:scale-[1.02] flex flex-col">
                            <div className="bg-[#FAF2EC] px-4 py-2 border-b border-[#EADED5] dark:border-[#3a3939]/40 text-[10px] font-bold text-[#888888] dark:text-[#9ca3af] tracking-wider">
                                Anime display
                            </div>
                            <div className="flex-grow overflow-hidden bg-[#FAF9F6]">
                                <img
                                    src="/images/anime_display.png"
                                    alt="Anime Display Shelf"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN PRÓXIMOS LANZAMIENTOS */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center space-y-2 mb-10">
                    <h2 className="font-['Outfit'] text-3xl font-extrabold text-[#1C1612] dark:text-[#ffffff] tracking-tight">
                        Próximos Lanzamientos
                    </h2>
                    <p className="text-[#888888] dark:text-[#9ca3af] text-sm">
                        Asegura tu lugar en la historia. Reservas abiertas para 2026.
                    </p>
                </div>

                {/* Grilla de Preventas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Tarjeta 1: Full Metal Alchemist */}
                    <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl p-4 border border-[#EADED5] dark:border-[#3a3939] hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full">
                        <div>
                            <div className="relative aspect-[16/10] bg-[#FAF8F5] rounded-xl overflow-hidden mb-4">
                                <button className="absolute top-3 right-3 z-10 p-2 bg-[#FFF6F0] dark:bg-[#1c1b1b]/90 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] rounded-full transition-colors shadow-sm">
                                    <Calendar className="w-4 h-4" />
                                </button>
                                <img
                                    src="/images/elric_brothers.png"
                                    alt="Full Metal Alchemist – Edward & Alphonse Elric"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="font-bold text-base text-[#1C1612] dark:text-[#ffffff] leading-snug hover:text-[#ff5500] transition-colors cursor-pointer">
                                Full Metal Alchemist – Edward & Alphonse Elric
                            </h3>
                            <p className="text-[#888888] dark:text-[#9ca3af] text-xs mt-1.5 leading-relaxed line-clamp-2">
                                Una pieza maestra de 1/7 que redefine el concepto de elegancia en PVC.
                            </p>
                        </div>
                        <div className="mt-5 pt-3 border-t border-[#131313] flex items-center justify-between">
                            <span className="text-base font-extrabold text-[#ff5500]">
                                S/. 165.00
                            </span>
                            <Link
                                href="/preventas"
                                className="text-xs font-bold text-[#ff5500] hover:text-[#1C1612] dark:text-[#ffffff] flex items-center gap-1 transition-colors"
                            >
                                PREVENTA <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Tarjeta 2: Shaman King */}
                    <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl p-4 border border-[#EADED5] dark:border-[#3a3939] hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full">
                        <div>
                            <div className="relative aspect-[16/10] bg-[#FAF8F5] rounded-xl overflow-hidden mb-4">
                                <span className="absolute top-3 left-3 z-10 bg-[#FAF2EC] text-[#ff5500] text-[9px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded shadow-sm">
                                    DICIEMBRE 2026
                                </span>
                                <button className="absolute top-3 right-3 z-10 p-2 bg-[#FFF6F0] dark:bg-[#1c1b1b]/90 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] rounded-full transition-colors shadow-sm">
                                    <Calendar className="w-4 h-4" />
                                </button>
                                <img
                                    src="/images/yoh_asakura.png"
                                    alt="Shaman King: Wonder Statue - Yoh Asakura & Amidamaru"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="font-bold text-base text-[#1C1612] dark:text-[#ffffff] leading-snug hover:text-[#ff5500] transition-colors cursor-pointer">
                                Shaman King: Wonder Statue - Yoh Asakura & Amidamaru
                            </h3>
                            <p className="text-[#888888] dark:text-[#9ca3af] text-xs mt-1.5 leading-relaxed line-clamp-2">
                                Réplica cinematográfica con efectos de iluminación LED integrados.
                            </p>
                        </div>
                        <div className="mt-5 pt-3 border-t border-[#131313] flex items-center justify-between">
                            <span className="text-base font-extrabold text-[#ff5500]">
                                S/. 420.00
                            </span>
                            <Link
                                href="/preventas"
                                className="text-xs font-bold text-[#ff5500] hover:text-[#1C1612] dark:text-[#ffffff] flex items-center gap-1 transition-colors"
                            >
                                PREVENTA <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Tarjeta 3: Solo Leveling */}
                    <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl p-4 border border-[#EADED5] dark:border-[#3a3939] hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full">
                        <div>
                            <div className="relative aspect-[16/10] bg-[#FAF8F5] rounded-xl overflow-hidden mb-4">
                                <span className="absolute top-3 left-3 z-10 bg-[#FAF2EC] text-[#ff5500] text-[9px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded shadow-sm">
                                    ENERO 2026
                                </span>
                                <button className="absolute top-3 right-3 z-10 p-2 bg-[#FFF6F0] dark:bg-[#1c1b1b]/90 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] rounded-full transition-colors shadow-sm">
                                    <Calendar className="w-4 h-4" />
                                </button>
                                <img
                                    src="/images/sung_jin_woo.png"
                                    alt="SUNG JIN WOO E IGRIS - SOLO LEVELING"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="font-bold text-base text-[#1C1612] dark:text-[#ffffff] leading-snug hover:text-[#ff5500] transition-colors cursor-pointer">
                                SUNG JIN WOO E IGRIS - SOLO LEVELING
                            </h3>
                            <p className="text-[#888888] dark:text-[#9ca3af] text-xs mt-1.5 leading-relaxed line-clamp-2">
                                Figura estática con base diorama detallada y acabados de lujo.
                            </p>
                        </div>
                        <div className="mt-5 pt-3 border-t border-[#131313] flex items-center justify-between">
                            <span className="text-base font-extrabold text-[#ff5500]">
                                S/. 210.00
                            </span>
                            <Link
                                href="/preventas"
                                className="text-xs font-bold text-[#ff5500] hover:text-[#1C1612] dark:text-[#ffffff] flex items-center gap-1 transition-colors"
                            >
                                PREVENTA <span className="translate-x-0 group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* BANNER SUSCRIPCIÓN ("Únete a la elite") */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-[#2F1B10] rounded-[32px] overflow-hidden p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative shadow-2xl">
                    {/* Círculo sutil en el fondo */}
                    <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#FFF6F0] dark:bg-[#1c1b1b]/5 rounded-full pointer-events-none blur-3xl"></div>

                    {/* Contenido (Izquierda) */}
                    <div className="flex-grow space-y-4 text-left max-w-2xl z-10">
                        <h2 className="font-['Outfit'] text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                            Únete a la elite del coleccionismo
                        </h2>
                        <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                            Recibe acceso anticipado a preventas exclusivas, eventos VIP y descuentos de comunidad antes que nadie.
                        </p>

                        {/* Formulario */}
                        <form className="flex flex-col sm:flex-row gap-3 pt-4" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className="bg-[#3D2619] text-white placeholder-neutral-400 border border-[#EADED5] dark:border-[#3a3939]/15 rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff5500] flex-grow sm:max-w-sm transition-all"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-[#ff5500] hover:bg-[#FF8533] text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-md shadow-[#ff5500]/10 shrink-0 cursor-pointer"
                            >
                                SUSCRIBIRSE
                            </button>
                        </form>
                    </div>

                    {/* Insignia Circular (Derecha) */}
                    <div className="flex items-center justify-center shrink-0 z-10 relative">
                        {/* Círculos decorativos concéntricos */}
                        <div className="absolute w-44 h-44 rounded-full border border-white/5 animate-ping" style={{ animationDuration: '3s' }}></div>
                        <div className="absolute w-40 h-40 rounded-full border border-white/10"></div>
                        <div className="absolute w-36 h-36 rounded-full border-2 border-[#ff5500]/40"></div>

                        {/* Círculo Principal */}
                        <div className="w-32 h-32 bg-[#ff5500] rounded-full flex flex-col items-center justify-center text-center shadow-lg transition-transform hover:scale-105 duration-300 cursor-pointer group">
                            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest leading-none">
                                Motneki
                            </span>
                            <span className="text-sm font-black text-white uppercase tracking-wider leading-none mt-1 group-hover:scale-105 transition-transform">
                                INNER
                            </span>
                            <span className="text-sm font-black text-white uppercase tracking-wider leading-none group-hover:scale-105 transition-transform">
                                CIRCLE
                            </span>
                        </div>
                    </div>
                </div>
            </section>

        </PublicLayout>
    );
}
