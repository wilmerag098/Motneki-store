import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import {
    Heart,
    Calendar,
    ArrowRight,
    Plane,
    ShieldCheck,
    Box,
    Smile,
    Puzzle,
    Gift,
    Shirt,
    BookOpen,
    Star
} from 'lucide-react';
import PublicLayout from '@/layouts/public-layout';

export default function Welcome() {
    const { data, setData, post, processing, reset, errors } = useForm({
        email: '',
    });
    
    // Asumiendo que el middleware ShareInertiaData inyecta 'flash'
    const { flash } = usePage().props as any;

    const submitNewsletter = (e: React.FormEvent) => {
        e.preventDefault();
        post('/newsletter/subscribe', {
            preserveScroll: true,
            onSuccess: () => reset('email'),
        });
    };

    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            src: '/images/Figuras.webp',
            link: '/catalogo',
            alt: 'Figuras Exclusivas',
            title: 'NUEVAS FIGURAS A ESCALA',
            subtitle: 'Obras maestras directamente desde Japón para tu colección'
        },
        {
            src: '/images/Peluches.webp',
            link: '/catalogo',
            alt: 'Peluches Anime',
            title: 'COLECCIÓN DE PELUCHES',
            subtitle: 'Encuentra a tus personajes favoritos en formato adorable'
        },
        {
            src: '/images/Polos.webp',
            link: '/catalogo',
            alt: 'Ropa Anime',
            title: 'APPAREL EXCLUSIVO',
            subtitle: 'Viste tu pasión con nuestra nueva línea de ropa'
        },
        {
            src: '/images/Anime.webp',
            link: '/catalogo',
            alt: 'Coleccionables Anime',
            title: 'EDICIONES LIMITADAS',
            subtitle: 'Asegura piezas únicas antes de que se agoten'
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    const categories = [
        { name: 'Figuras', image: '/images/Figura01.webp', link: '/catalogo?categoria=figuras' },
        { name: 'Peluches', image: '/images/Peluche01.webp', link: '/catalogo?categoria=peluches' },
        { name: 'Polos', image: '/images/Polo01.webp', link: '/catalogo?categoria=polos' },
        { name: 'Llaveros', image: '/images/Llavero01.webp', link: '/catalogo?categoria=llaveros' },
        { name: 'Collares', image: '/images/Collar01.webp', link: '/catalogo?categoria=collares' },
        { name: 'Relojes', image: '/images/Reloj01.webp', link: '/catalogo?categoria=relojes' },
    ];

    return (
        <PublicLayout>
            <Head>
                <title>MotnekiStore | Coleccionismo Premium</title>
                <meta name="description" content="Elevando el arte del coleccionismo con piezas exclusivas y curaduría premium desde Japón para el mundo." />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800;900&display=swap" rel="stylesheet" />
            </Head>

            {/* HERO SECTION */}
            <section className="w-full relative bg-[#131313] overflow-hidden">
                <div className="relative w-full h-[60vh] md:h-[75vh] lg:h-[85vh] flex items-center">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'}`}
                        >
                            <img
                                src={slide.src}
                                alt={slide.alt}
                                className="w-full h-full object-cover"
                            />
                            {/* Modern Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/60 to-transparent lg:bg-gradient-to-r lg:from-[#131313] lg:via-[#131313]/80 lg:to-transparent"></div>

                            <div className="absolute inset-0 flex flex-col justify-end lg:justify-center p-8 md:p-16 lg:p-24 max-w-7xl mx-auto w-full z-20">
                                <span className="text-[#ff5500] font-bold tracking-[0.3em] text-xs sm:text-sm uppercase mb-4 animate-fade-in-up">
                                    Motneki Exclusives
                                </span>
                                <h1 className="text-white font-['Outfit'] font-black text-4xl sm:text-5xl lg:text-7xl uppercase leading-[1.1] tracking-tight mb-4 max-w-3xl animate-fade-in-up delay-100">
                                    {slide.title}
                                </h1>
                                <p className="text-neutral-300 text-sm md:text-base lg:text-lg mb-8 max-w-xl animate-fade-in-up delay-200">
                                    {slide.subtitle}
                                </p>
                                <div className="animate-fade-in-up delay-300">
                                    <Link
                                        href={slide.link}
                                        className="inline-flex items-center gap-3 bg-[#ff5500] hover:bg-white text-white hover:text-black font-bold text-xs sm:text-sm uppercase tracking-widest px-8 py-4 transition-all duration-300 group/btn"
                                    >
                                        DESCUBRIR
                                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Navigation Arrows */}
                    <button onClick={prevSlide} className="absolute left-4 lg:left-12 z-30 p-3 rounded-full bg-black/20 hover:bg-[#ff5500] text-white backdrop-blur-md transition-all hidden md:flex items-center justify-center border border-white/10 hover:border-transparent">
                        <ArrowRight className="w-5 h-5 rotate-180" />
                    </button>
                    <button onClick={nextSlide} className="absolute right-4 lg:right-12 z-30 p-3 rounded-full bg-black/20 hover:bg-[#ff5500] text-white backdrop-blur-md transition-all hidden md:flex items-center justify-center border border-white/10 hover:border-transparent">
                        <ArrowRight className="w-5 h-5" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-1 transition-all duration-500 rounded-full ${index === currentSlide ? 'w-8 bg-[#ff5500]' : 'w-2 bg-white/50 hover:bg-white'}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CATEGORIES GRID */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="font-['Outfit'] text-2xl md:text-3xl font-extrabold text-[#1C1612] dark:text-white tracking-tight flex items-center gap-2">
                        Explorar Categorías
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category, index) => (
                        <Link
                            key={index}
                            href={category.link}
                            className="group relative flex flex-col items-center justify-center h-32 md:h-40 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                        >
                            {/* Background Image */}
                            <img
                                src={category.image}
                                alt={category.name}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                onError={(e) => {
                                    // Fallback en caso de que la imagen no exista aún
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/131313/ff5500?text=' + category.name;
                                }}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300"></div>

                            {/* Text */}
                            <span className="relative z-10 text-sm font-black text-white uppercase tracking-widest text-center px-2 group-hover:text-[#ff5500] transition-colors drop-shadow-md">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            {/* FEATURED PRODUCTS (TENDENCIAS) */}
            <section className="bg-[#FAF5F0] dark:bg-[#131313] py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Star className="w-5 h-5 text-[#ff5500] fill-[#ff5500]" />
                                <span className="text-xs font-extrabold tracking-widest text-[#ff5500] uppercase">
                                    DESTACADOS
                                </span>
                            </div>
                            <h2 className="font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[#1C1612] dark:text-white tracking-tight">
                                Tendencias de la Semana
                            </h2>
                        </div>
                        <Link
                            href="/catalogo"
                            className="text-xs font-bold text-[#1C1612] dark:text-white hover:text-[#ff5500] dark:hover:text-[#ff5500] tracking-widest uppercase transition-colors flex items-center gap-2 group border-b-2 border-transparent hover:border-[#ff5500] pb-1"
                        >
                            VER CATÁLOGO COMPLETO
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                        {/* PRODUCT 1 */}
                        <div className="group bg-white dark:bg-[#1C1B1B] rounded-2xl overflow-hidden border border-[#EADED5] dark:border-[#3A3939] hover:border-[#ff5500] dark:hover:border-[#ff5500] hover:shadow-xl transition-all duration-300 flex flex-col">
                            <div className="relative aspect-[4/5] bg-neutral-100 dark:bg-[#131313] overflow-hidden">
                                <span className="absolute top-4 left-4 z-10 bg-[#ff5500] text-white text-[9px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg">
                                    POPULAR
                                </span>
                                <button className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 dark:bg-black/50 backdrop-blur-sm text-[#1C1612] dark:text-white hover:text-[#ff5500] dark:hover:text-[#ff5500] rounded-full transition-all shadow-sm hover:scale-110">
                                    <Heart className="w-4 h-4" />
                                </button>
                                <img
                                    src="/images/ichigo_kurosaki_figure.png"
                                    alt="Ichigo Kurosaki"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <span className="text-[10px] font-bold text-[#888888] dark:text-neutral-500 tracking-widest uppercase mb-2">
                                    GOOD SMILE COMPANY
                                </span>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-white leading-relaxed line-clamp-2 group-hover:text-[#ff5500] transition-colors mb-2">
                                    Figura Estatua de Resina Anime Forma Hueca Bleach Ichigo Kurosaki
                                </h3>
                                <div className="mt-auto pt-4 flex items-center justify-between">
                                    <span className="text-lg font-black text-[#1C1612] dark:text-white">
                                        S/. 721.96
                                    </span>
                                    <button className="text-xs font-bold bg-neutral-100 dark:bg-[#2A2A2A] hover:bg-[#ff5500] dark:hover:bg-[#ff5500] text-[#1C1612] dark:text-white hover:text-white px-4 py-2 rounded-full transition-colors">
                                        Añadir
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* PRODUCT 2 */}
                        <div className="group bg-white dark:bg-[#1C1B1B] rounded-2xl overflow-hidden border border-[#EADED5] dark:border-[#3A3939] hover:border-[#ff5500] dark:hover:border-[#ff5500] hover:shadow-xl transition-all duration-300 flex flex-col">
                            <div className="relative aspect-[4/5] bg-neutral-100 dark:bg-[#131313] overflow-hidden">
                                <button className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 dark:bg-black/50 backdrop-blur-sm text-[#1C1612] dark:text-white hover:text-[#ff5500] dark:hover:text-[#ff5500] rounded-full transition-all shadow-sm hover:scale-110">
                                    <Heart className="w-4 h-4" />
                                </button>
                                <img
                                    src="/images/goku_ultra_instinct.png"
                                    alt="Goku Ultra Instinct"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <span className="text-[10px] font-bold text-[#888888] dark:text-neutral-500 tracking-widest uppercase mb-2">
                                    BANDAI SPIRITS
                                </span>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-white leading-relaxed line-clamp-2 group-hover:text-[#ff5500] transition-colors mb-2">
                                    Goku Ultra Instinct Masterlise
                                </h3>
                                <div className="mt-auto pt-4 flex items-center justify-between">
                                    <span className="text-lg font-black text-[#1C1612] dark:text-white">
                                        S/. 931.00
                                    </span>
                                    <button className="text-xs font-bold bg-neutral-100 dark:bg-[#2A2A2A] hover:bg-[#ff5500] dark:hover:bg-[#ff5500] text-[#1C1612] dark:text-white hover:text-white px-4 py-2 rounded-full transition-colors">
                                        Añadir
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* PRODUCT 3 */}
                        <div className="group bg-white dark:bg-[#1C1B1B] rounded-2xl overflow-hidden border border-[#EADED5] dark:border-[#3A3939] hover:border-[#ff5500] dark:hover:border-[#ff5500] hover:shadow-xl transition-all duration-300 flex flex-col">
                            <div className="relative aspect-[4/5] bg-neutral-100 dark:bg-[#131313] overflow-hidden">
                                <span className="absolute top-4 left-4 z-10 bg-[#1C1612] dark:bg-white dark:text-[#1C1612] text-white text-[9px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-full shadow-lg">
                                    LIMITED
                                </span>
                                <button className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 dark:bg-black/50 backdrop-blur-sm text-[#1C1612] dark:text-white hover:text-[#ff5500] dark:hover:text-[#ff5500] rounded-full transition-all shadow-sm hover:scale-110">
                                    <Heart className="w-4 h-4" />
                                </button>
                                <img
                                    src="/images/gon_freecss_figure.png"
                                    alt="Gon Freecss"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <span className="text-[10px] font-bold text-[#888888] dark:text-neutral-500 tracking-widest uppercase mb-2">
                                    RD STUDIO
                                </span>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-white leading-relaxed line-clamp-2 group-hover:text-[#ff5500] transition-colors mb-2">
                                    Gon Freecss 1:4/1:6 Resin Statue
                                </h3>
                                <div className="mt-auto pt-4 flex items-center justify-between">
                                    <span className="text-lg font-black text-[#1C1612] dark:text-white">
                                        S/. 362.90
                                    </span>
                                    <button className="text-xs font-bold bg-neutral-100 dark:bg-[#2A2A2A] hover:bg-[#ff5500] dark:hover:bg-[#ff5500] text-[#1C1612] dark:text-white hover:text-white px-4 py-2 rounded-full transition-colors">
                                        Añadir
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* PRODUCT 4 */}
                        <div className="group bg-white dark:bg-[#1C1B1B] rounded-2xl overflow-hidden border border-[#EADED5] dark:border-[#3A3939] hover:border-[#ff5500] dark:hover:border-[#ff5500] hover:shadow-xl transition-all duration-300 flex flex-col">
                            <div className="relative aspect-[4/5] bg-neutral-100 dark:bg-[#131313] overflow-hidden">
                                <button className="absolute top-4 right-4 z-10 p-2.5 bg-white/80 dark:bg-black/50 backdrop-blur-sm text-[#1C1612] dark:text-white hover:text-[#ff5500] dark:hover:text-[#ff5500] rounded-full transition-all shadow-sm hover:scale-110">
                                    <Heart className="w-4 h-4" />
                                </button>
                                <img
                                    src="/images/rudo_gachiakuta.png"
                                    alt="Rudo Gachiakuta"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <span className="text-[10px] font-bold text-[#888888] dark:text-neutral-500 tracking-widest uppercase mb-2">
                                    WAKE STUDIO
                                </span>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-white leading-relaxed line-clamp-2 group-hover:text-[#ff5500] transition-colors mb-2">
                                    Rudo Gachiakuta Estatua 1/6 Resina
                                </h3>
                                <div className="mt-auto pt-4 flex items-center justify-between">
                                    <span className="text-lg font-black text-[#1C1612] dark:text-white">
                                        S/. 1,178.00
                                    </span>
                                    <button className="text-xs font-bold bg-neutral-100 dark:bg-[#2A2A2A] hover:bg-[#ff5500] dark:hover:bg-[#ff5500] text-[#1C1612] dark:text-white hover:text-white px-4 py-2 rounded-full transition-colors">
                                        Añadir
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DIRECT IMPORT BANNER */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#1C1612] dark:bg-[#1A1A1A] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center border border-transparent dark:border-[#333333]">
                        {/* Text */}
                        <div className="flex-1 p-10 md:p-16 text-left">
                            <div className="flex items-center gap-2 mb-4">
                                <Plane className="w-5 h-5 text-[#ff5500]" />
                                <span className="text-[10px] font-extrabold tracking-widest text-[#ff5500] uppercase">
                                    IMPORTACIÓN DIRECTA
                                </span>
                            </div>
                            <h2 className="font-['Outfit'] text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6">
                                Joyas de Akihabara en tu puerta
                            </h2>
                            <p className="text-[#A0A0A0] text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                                Nuestra red exclusiva de proveedores en Tokio nos permite ofrecerte ediciones limitadas que rara vez salen de Japón. Autenticidad garantizada y empaque premium.
                            </p>

                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3 text-white">
                                    <div className="bg-white/10 p-2 rounded-full text-[#ff5500]">
                                        <ShieldCheck className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">Certificado de Autenticidad</h4>
                                        <p className="text-[#A0A0A0] text-xs">Incluye holograma oficial</p>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href="/exclusivos"
                                className="inline-flex items-center gap-2 bg-[#ff5500] hover:bg-white text-white hover:text-black font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-colors"
                            >
                                EXPLORAR EXCLUSIVOS
                            </Link>
                        </div>
                        {/* Images */}
                        <div className="flex-1 w-full h-[400px] lg:h-auto relative bg-[#131313]">
                            <img src="/images/kurumi_tokisaki.png" alt="Kurumi" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1C1612] dark:from-[#1A1A1A] to-transparent"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* UPCOMING RELEASES */}
            <section className="bg-white dark:bg-[#1A1A1A] py-16 border-t border-[#EADED5] dark:border-[#333333]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="text-[10px] font-extrabold tracking-widest text-[#ff5500] uppercase mb-2 block">
                            PREVENTAS 2026
                        </span>
                        <h2 className="font-['Outfit'] text-3xl md:text-4xl font-extrabold text-[#1C1612] dark:text-white tracking-tight">
                            Próximos Lanzamientos
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Release 1 */}
                        <div className="group bg-[#FAF5F0] dark:bg-[#131313] rounded-2xl p-4 border border-transparent dark:border-[#3A3939] hover:border-[#EADED5] dark:hover:border-[#ff5500] transition-all">
                            <div className="relative aspect-[16/10] bg-neutral-200 dark:bg-black rounded-xl overflow-hidden mb-5">
                                <span className="absolute top-3 left-3 z-10 bg-white dark:bg-[#222222] text-[#1C1612] dark:text-white text-[9px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-md shadow-sm flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-[#ff5500]" /> DICIEMBRE
                                </span>
                                <img src="/images/elric_brothers.png" alt="FMA" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <h3 className="font-bold text-lg text-[#1C1612] dark:text-white leading-tight mb-2 group-hover:text-[#ff5500] transition-colors">
                                Full Metal Alchemist – Edward & Alphonse
                            </h3>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#EADED5] dark:border-[#333333]">
                                <span className="text-lg font-black text-[#1C1612] dark:text-white">S/. 165.00</span>
                                <Link href="/preventas" className="text-xs font-bold text-[#ff5500] hover:text-white bg-transparent hover:bg-[#ff5500] px-4 py-2 rounded-full border border-[#ff5500] transition-colors">
                                    RESERVAR
                                </Link>
                            </div>
                        </div>

                        {/* Release 2 */}
                        <div className="group bg-[#FAF5F0] dark:bg-[#131313] rounded-2xl p-4 border border-transparent dark:border-[#3A3939] hover:border-[#EADED5] dark:hover:border-[#ff5500] transition-all">
                            <div className="relative aspect-[16/10] bg-neutral-200 dark:bg-black rounded-xl overflow-hidden mb-5">
                                <span className="absolute top-3 left-3 z-10 bg-white dark:bg-[#222222] text-[#1C1612] dark:text-white text-[9px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-md shadow-sm flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-[#ff5500]" /> ENERO 2027
                                </span>
                                <img src="/images/yoh_asakura.png" alt="Shaman King" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <h3 className="font-bold text-lg text-[#1C1612] dark:text-white leading-tight mb-2 group-hover:text-[#ff5500] transition-colors">
                                Shaman King - Yoh Asakura & Amidamaru
                            </h3>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#EADED5] dark:border-[#333333]">
                                <span className="text-lg font-black text-[#1C1612] dark:text-white">S/. 420.00</span>
                                <Link href="/preventas" className="text-xs font-bold text-[#ff5500] hover:text-white bg-transparent hover:bg-[#ff5500] px-4 py-2 rounded-full border border-[#ff5500] transition-colors">
                                    RESERVAR
                                </Link>
                            </div>
                        </div>

                        {/* Release 3 */}
                        <div className="group bg-[#FAF5F0] dark:bg-[#131313] rounded-2xl p-4 border border-transparent dark:border-[#3A3939] hover:border-[#EADED5] dark:hover:border-[#ff5500] transition-all">
                            <div className="relative aspect-[16/10] bg-neutral-200 dark:bg-black rounded-xl overflow-hidden mb-5">
                                <span className="absolute top-3 left-3 z-10 bg-white dark:bg-[#222222] text-[#1C1612] dark:text-white text-[9px] font-extrabold tracking-widest uppercase px-3 py-1.5 rounded-md shadow-sm flex items-center gap-1">
                                    <Calendar className="w-3 h-3 text-[#ff5500]" /> FEBRERO 2027
                                </span>
                                <img src="/images/sung_jin_woo.png" alt="Solo Leveling" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            </div>
                            <h3 className="font-bold text-lg text-[#1C1612] dark:text-white leading-tight mb-2 group-hover:text-[#ff5500] transition-colors">
                                Sung Jin Woo e Igris - Solo Leveling
                            </h3>
                            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#EADED5] dark:border-[#333333]">
                                <span className="text-lg font-black text-[#1C1612] dark:text-white">S/. 210.00</span>
                                <Link href="/preventas" className="text-xs font-bold text-[#ff5500] hover:text-white bg-transparent hover:bg-[#ff5500] px-4 py-2 rounded-full border border-[#ff5500] transition-colors">
                                    RESERVAR
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-gradient-to-br from-[#ff5500] to-[#E64D00] rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                        <Star className="w-64 h-64" />
                    </div>
                    <div className="relative z-10">
                        <span className="text-[10px] font-extrabold tracking-[0.2em] uppercase mb-4 block">
                            MOTNEKI INNER CIRCLE
                        </span>
                        <h2 className="font-['Outfit'] text-3xl md:text-5xl font-black mb-6">
                            Únete a la elite del coleccionismo
                        </h2>
                        <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto mb-10">
                            Recibe acceso anticipado a preventas exclusivas, eventos VIP y drops limitados antes que nadie.
                        </p>
                        {flash?.success && (
                            <div className="bg-green-500/20 text-green-100 border border-green-500/50 p-3 rounded-xl mb-6 text-sm max-w-lg mx-auto">
                                {flash.success}
                            </div>
                        )}
                        {flash?.info && (
                            <div className="bg-blue-500/20 text-blue-100 border border-blue-500/50 p-3 rounded-xl mb-6 text-sm max-w-lg mx-auto">
                                {flash.info}
                            </div>
                        )}
                        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={submitNewsletter}>
                            <div className="flex-1">
                                <input
                                    type="email"
                                    placeholder="Tu correo electrónico"
                                    className="w-full bg-white/10 text-white placeholder-white/50 border border-white/20 rounded-full px-6 py-4 text-sm focus:outline-none focus:bg-white/20 transition-colors"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    disabled={processing}
                                />
                                {errors.email && <div className="text-white text-xs mt-1 text-left px-2">{errors.email}</div>}
                            </div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-white text-[#ff5500] hover:bg-neutral-100 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-colors shadow-lg disabled:opacity-70 disabled:cursor-not-allowed h-fit"
                            >
                                {processing ? 'Enviando...' : 'SUSCRIBIRSE'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
