import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import {
    Heart,
    ChevronRight,
    ChevronLeft,
    Grid,
    List,
    ShoppingBag,
    Boxes,
    Edit3,
    Flame,
    Box,
    Key,
    User,
    Smile,
    Gem,
    Watch,
    Shirt,
    LayoutGrid
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface Categoria {
    id_categoria: number;
    nombre: string;
    descripcion: string;
}

interface Producto {
    id_producto: number;
    id_categoria: number;
    nombre: string;
    descripcion: string;
    precio: string;
    stock: number;
    disponibilidad: 'stock' | 'preventa' | 'bajo demanda';
    categoria: Categoria;
}

interface Props {
    productos: Producto[];
    categorias: Categoria[];
    filtros: {
        buscar: string;
        categoria_id: string;
        disponibilidad: string;
    };
}

export default function Index({ productos, categorias, filtros }: Props) {
    return (
        <PublicLayout>
            <Head title="Catálogo - MotnekiStore" />

            {/* WHITE TOP SECTION */}
            <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] border-b border-[#EADED5] dark:border-[#3a3939] w-full shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">

                    {/* CABECERA: Explora por Categoría */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                        <h1 className="font-['Outfit'] text-2xl font-extrabold text-[#1C1612] dark:text-[#ffffff]">
                            Explora por Categoría
                        </h1>
                        <div className="bg-[#3a3939] text-[#1C1612] dark:text-[#ffffff] text-xs font-bold px-3 py-1 rounded-full">
                            61 productos
                        </div>
                    </div>

                    {/* FILTROS DE PÍLDORA */}
                    <div className="flex flex-wrap items-center gap-3 mb-8">
                        <button className="flex items-center gap-2 bg-[#ff5500] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md transition-transform hover:scale-105">
                            <Grid className="w-4 h-4" /> Todos
                        </button>
                        {['Llaveros', 'Figuras', 'Peluches', 'Collares', 'Relojes', 'Polos'].map((cat, i) => (
                            <button key={i} className="flex items-center gap-2 bg-[#FFF6F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] text-[#888888] dark:text-[#9ca3af] px-5 py-2.5 rounded-full text-sm font-bold shadow-sm hover:border-[#ff5500] hover:text-[#ff5500] transition-colors">
                                {cat === 'Llaveros' && <Key className="w-4 h-4 text-neutral-400" />}
                                {cat === 'Figuras' && <User className="w-4 h-4 text-neutral-400" />}
                                {cat === 'Peluches' && <Smile className="w-4 h-4 text-neutral-400" />}
                                {cat === 'Collares' && <Gem className="w-4 h-4 text-neutral-400" />}
                                {cat === 'Relojes' && <Watch className="w-4 h-4 text-neutral-400" />}
                                {cat === 'Polos' && <Shirt className="w-4 h-4 text-neutral-400" />}
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* TARJETAS DE CATEGORÍA SUPERIORES */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                        {[
                            { name: 'Llaveros', img: '/images/Llavero01.webp' },
                            { name: 'Figuras', img: '/images/Figura01.webp' },
                            { name: 'Peluches', img: '/images/Peluche01.webp' },
                            { name: 'Collares', img: '/images/Collar01.webp' },
                            { name: 'Relojes', img: '/images/Reloj01.webp' },
                            { name: 'Polos', img: '/images/Polo01.webp' }
                        ].map((cat, i) => (
                            <div key={i} className="bg-[#FFF6F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-lg transition-all cursor-pointer group">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF5F0] dark:bg-[#131313] flex items-center justify-center overflow-hidden border border-[#EADED5] dark:border-[#3a3939] group-hover:border-[#ff5500]/50 transition-colors">
                                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" onError={(e) => e.currentTarget.style.display = 'none'} />
                                </div>
                                <span className="text-xs sm:text-sm font-bold text-[#1C1612] dark:text-[#ffffff] group-hover:text-[#ff5500] transition-colors">{cat.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* LIGHT GRAY BOTTOM SECTION */}
            <div className="bg-[#F8F9FA] w-full min-h-screen pt-10 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* LAYOUT PRINCIPAL: SIDEBAR + GRID */}
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* SIDEBAR (PANEL DE NAVEGACIÓN LATERAL) */}
                        <aside className="w-full lg:w-64 flex-shrink-0 space-y-10 bg-[#FFF6F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] rounded-3xl p-6 shadow-sm self-start">

                            {/* CATEGORÍAS */}
                            <div>
                                <h3 className="flex items-center gap-2 text-[11px] font-black tracking-widest text-neutral-400 uppercase mb-5">
                                    <LayoutGrid className="w-4 h-4" /> CATEGORÍAS
                                </h3>
                                <ul className="space-y-4 border-l-2 border-[#EADED5] dark:border-[#3a3939] pl-4 ml-2">
                                    {['Figuras', 'Llaveros', 'Peluches', 'Collares', 'Relojes', 'Polos'].map((cat, i) => (
                                        <li key={i}>
                                            <Link href="#" className="flex items-center gap-3 text-sm font-semibold text-[#6E7B8A] hover:text-[#ff5500] transition-colors">
                                                <ShoppingBag className="w-4 h-4" /> {cat}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* DISPONIBILIDAD */}
                            <div>
                                <h3 className="flex items-center gap-2 text-[11px] font-black tracking-widest text-neutral-400 uppercase mb-5">
                                    <Box className="w-4 h-4" /> DISPONIBILIDAD
                                </h3>
                                <div className="space-y-4 border-l-2 border-[#EADED5] dark:border-[#3a3939] pl-4 ml-2">
                                    <div className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <Checkbox id="stock" defaultChecked className="border-[#ff5500] data-[state=checked]:bg-[#ff5500] data-[state=checked]:text-white rounded text-[#ff5500] w-4 h-4" />
                                            <label htmlFor="stock" className="text-sm font-medium text-[#4A5568] group-hover:text-[#ff5500] cursor-pointer transition-colors">
                                                En stock
                                            </label>
                                        </div>
                                        <span className="text-xs text-[#6E7B8A]">(43)</span>
                                    </div>
                                    <div className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <Checkbox id="preventa" defaultChecked className="border-[#ff5500] data-[state=checked]:bg-[#ff5500] data-[state=checked]:text-white rounded text-[#ff5500] w-4 h-4" />
                                            <label htmlFor="preventa" className="text-sm font-medium text-[#4A5568] group-hover:text-[#ff5500] cursor-pointer transition-colors">
                                                Preventa
                                            </label>
                                        </div>
                                        <span className="text-xs text-[#6E7B8A]">(15)</span>
                                    </div>
                                    <div className="flex items-center justify-between group">
                                        <div className="flex items-center gap-3">
                                            <Checkbox id="agotado" className="border-neutral-300 text-neutral-300 w-4 h-4 rounded" />
                                            <label htmlFor="agotado" className="text-sm font-medium text-[#4A5568] group-hover:text-[#ff5500] cursor-pointer transition-colors">
                                                Agotado
                                            </label>
                                        </div>
                                        <span className="text-xs text-[#6E7B8A]">(3)</span>
                                    </div>
                                </div>
                            </div>

                            {/* SERIES POPULARES */}
                            <div>
                                <h3 className="flex items-center gap-2 text-[11px] font-black tracking-widest text-neutral-400 uppercase mb-5">
                                    <Flame className="w-4 h-4" /> SERIES POPULARES
                                </h3>
                                <ul className="space-y-4 border-l-2 border-[#EADED5] dark:border-[#3a3939] pl-4 ml-2">
                                    {[
                                        'Genshin Impact',
                                        'Chainsaw Man',
                                        'Hololive Production',
                                        'Jujutsu Kaisen',
                                        'One Piece',
                                        'Dragon Ball Z',
                                        'Dragon Ball Super',
                                        'Fullmetal Alchemist'
                                    ].map((serie, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]"></span>
                                            <Link href="#" className="text-sm font-medium text-[#6E7B8A] hover:text-[#ff5500] transition-colors">
                                                {serie}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* BOTÓN SOLICITAR FIGURA PERSONALIZADA */}
                            <div className="pt-4 border-l-2 border-[#131313] pl-2">
                                <button className="w-full bg-[#ff5500] hover:bg-[#cc4400] text-white flex items-center justify-center gap-3 px-4 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all font-bold text-sm tracking-wide">
                                    <Edit3 className="w-5 h-5" />
                                    <span className="text-left leading-tight">SOLICITAR FIGURA<br />PERSONALIZADA</span>
                                </button>
                            </div>
                        </aside>

                        {/* CONTENIDO PRINCIPAL: GRILLA DE PRODUCTOS */}
                        <div className="flex-1">

                            {/* Breadcrumbs y Título */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 text-xs font-semibold text-[#888888] dark:text-[#9ca3af] mb-2">
                                    <Link href="/" className="hover:text-[#ff5500] transition-colors">Inicio</Link>
                                    <ChevronRight className="w-3 h-3" />
                                    <span className="text-[#1C1612] dark:text-[#ffffff]">Catálogo</span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                    <div>
                                        <h2 className="font-['Outfit'] text-3xl font-extrabold text-[#1C1612] dark:text-[#ffffff] tracking-tight">
                                            Catálogo de Productos
                                        </h2>
                                        <p className="text-[#6E7B8A] text-sm mt-1">Mostrando 58 artículos</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {/* Select de Novedades */}
                                        <div className="relative border border-[#EADED5] dark:border-[#3a3939] rounded-lg bg-[#FFF6F0] dark:bg-[#1c1b1b] px-3 py-2 flex items-center gap-2 min-w-[140px] cursor-pointer hover:border-[#ff5500] transition-colors">
                                            <span className="text-neutral-400">⇅</span>
                                            <span className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] flex-1">Novedades</span>
                                            <ChevronRight className="w-4 h-4 rotate-90 text-neutral-400" />
                                        </div>

                                        {/* Toggle Vista */}
                                        <div className="flex items-center bg-[#FFF6F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] rounded-lg p-1">
                                            <button className="p-1.5 bg-[#FFF0E5] text-[#ff5500] rounded shadow-sm">
                                                <Grid className="w-4 h-4" />
                                            </button>
                                            <button className="p-1.5 text-neutral-400 hover:text-[#1C1612] dark:text-[#ffffff] transition-colors rounded">
                                                <List className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PRODUCT GRID */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

                                {/* Producto 1 */}
                                <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl overflow-hidden border border-[#EADED5] dark:border-[#3a3939]/60 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                                    <div className="relative aspect-[4/5] bg-[#F7F2EE] overflow-hidden p-4 flex items-center justify-center">
                                        <span className="absolute top-4 left-4 z-10 bg-[#ff5500] text-white text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm">
                                            POPULAR
                                        </span>
                                        <button className="absolute top-4 right-4 z-10 p-2 bg-[#FFF6F0] dark:bg-[#1c1b1b]/80 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] hover:text-red-500 rounded-full transition-colors shadow-sm">
                                            <Heart className="w-4 h-4" />
                                        </button>
                                        <img
                                            src="/images/ichigo_kurosaki_figure.png"
                                            alt="Figura Estatua de Resina Anime Forma Hueca Bleach Ichigo Kurosaki"
                                            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => e.currentTarget.style.display = 'none'}
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
                                            <span className="inline-block text-[11px] font-bold text-[#ff5500]/80 mt-2">
                                                Bleach
                                            </span>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-[#131313]">
                                            <span className="text-lg font-extrabold text-[#ff5500]">
                                                S/. 721.96
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Producto 2 */}
                                <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl overflow-hidden border border-[#EADED5] dark:border-[#3a3939]/60 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                                    <div className="relative aspect-[4/5] bg-[#F7F2EE] overflow-hidden p-4 flex items-center justify-center">
                                        <button className="absolute top-4 right-4 z-10 p-2 bg-[#FFF6F0] dark:bg-[#1c1b1b]/80 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] hover:text-red-500 rounded-full transition-colors shadow-sm">
                                            <Heart className="w-4 h-4" />
                                        </button>
                                        <img
                                            src="/images/goku_ultra_instinct.png"
                                            alt="Goku Ultra Instinct"
                                            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => e.currentTarget.style.display = 'none'}
                                        />
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow justify-between">
                                        <div>
                                            <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
                                                BANDAI SPIRITS
                                            </span>
                                            <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] mt-1.5 leading-snug line-clamp-2 hover:text-[#ff5500] transition-colors cursor-pointer">
                                                Goku Ultra Instinct
                                            </h3>
                                            <span className="inline-block text-[11px] font-bold text-[#ff5500]/80 mt-2">
                                                Dragon Ball Super
                                            </span>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-[#131313]">
                                            <span className="text-lg font-extrabold text-[#ff5500]">
                                                S/. 931.00
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Producto 3 */}
                                <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl overflow-hidden border border-[#EADED5] dark:border-[#3a3939]/60 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                                    <div className="relative aspect-[4/5] bg-[#F7F2EE] overflow-hidden p-4 flex items-center justify-center">
                                        <span className="absolute top-4 left-4 z-10 bg-[#1D2A44] text-white text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md shadow-sm">
                                            LIMITED
                                        </span>
                                        <button className="absolute top-4 right-4 z-10 p-2 bg-[#FFF6F0] dark:bg-[#1c1b1b]/80 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] hover:text-red-500 rounded-full transition-colors shadow-sm">
                                            <Heart className="w-4 h-4" />
                                        </button>
                                        <img
                                            src="/images/gon_freecss_figure.png"
                                            alt="RD studio 1:4/1:6 Gon Freecss"
                                            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => e.currentTarget.style.display = 'none'}
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
                                            <span className="inline-block text-[11px] font-bold text-[#ff5500]/80 mt-2">
                                                Hunter x Hunter
                                            </span>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-[#131313]">
                                            <span className="text-lg font-extrabold text-[#ff5500]">
                                                S/. 362.90
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Producto 4 */}
                                <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl overflow-hidden border border-[#EADED5] dark:border-[#3a3939]/60 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                                    <div className="relative aspect-[4/5] bg-[#F7F2EE] overflow-hidden p-4 flex items-center justify-center opacity-70 group-hover:opacity-100">
                                        <div className="absolute inset-0 bg-[#FFF6F0] dark:bg-[#1c1b1b]/20 z-0"></div>
                                        <button className="absolute top-4 right-4 z-10 p-2 bg-[#FFF6F0] dark:bg-[#1c1b1b]/80 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] hover:text-red-500 rounded-full transition-colors shadow-sm">
                                            <Heart className="w-4 h-4" />
                                        </button>
                                        <img
                                            src="/images/rudo_gachiakuta.png"
                                            alt="Rudo Gachiakuta Estatua 1/6 Resina"
                                            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105 z-10"
                                            onError={(e) => e.currentTarget.style.display = 'none'}
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
                                            <span className="inline-block text-[11px] font-bold text-[#ff5500]/80 mt-2">
                                                Re:Zero
                                            </span>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-[#131313]">
                                            <span className="text-lg font-extrabold text-[#ff5500]">
                                                S/. 1,178.00
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Producto 5 */}
                                <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl overflow-hidden border border-[#EADED5] dark:border-[#3a3939]/60 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                                    <div className="relative aspect-[4/5] bg-[#F7F2EE] overflow-hidden p-4 flex items-center justify-center">
                                        <button className="absolute top-4 right-4 z-10 p-2 bg-[#FFF6F0] dark:bg-[#1c1b1b]/80 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] hover:text-red-500 rounded-full transition-colors shadow-sm">
                                            <Heart className="w-4 h-4" />
                                        </button>
                                        <img
                                            src="/images/eren_jaeger.png"
                                            alt="Estatua Eren Jaeger Trono Resina KIDULT"
                                            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => e.currentTarget.style.display = 'none'}
                                        />
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow justify-between">
                                        <div>
                                            <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
                                                CELESTIAL CRAFTS
                                            </span>
                                            <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] mt-1.5 leading-snug line-clamp-2 hover:text-[#ff5500] transition-colors cursor-pointer">
                                                Estatua Eren Jaeger Trono Resina KIDULT
                                            </h3>
                                            <span className="inline-block text-[11px] font-bold text-[#ff5500]/80 mt-2">
                                                Attack on Titan
                                            </span>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-[#131313]">
                                            <span className="text-lg font-extrabold text-[#ff5500]">
                                                S/. 1,045.00
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Producto 6 */}
                                <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-2xl overflow-hidden border border-[#EADED5] dark:border-[#3a3939]/60 hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                                    <div className="relative aspect-[4/5] bg-[#F7F2EE] overflow-hidden p-4 flex items-center justify-center">
                                        <button className="absolute top-4 right-4 z-10 p-2 bg-[#FFF6F0] dark:bg-[#1c1b1b]/80 hover:bg-[#FFF6F0] dark:bg-[#1c1b1b] text-[#1C1612] dark:text-[#ffffff] hover:text-red-500 rounded-full transition-colors shadow-sm">
                                            <Heart className="w-4 h-4" />
                                        </button>
                                        <img
                                            src="/images/soul_chogokin.png"
                                            alt="Soul of Chogokin: GX-100 Gaiking"
                                            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                                            onError={(e) => e.currentTarget.style.display = 'none'}
                                        />
                                    </div>
                                    <div className="p-5 flex flex-col flex-grow justify-between">
                                        <div>
                                            <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
                                                BANDAI SPIRITS
                                            </span>
                                            <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] mt-1.5 leading-snug line-clamp-2 hover:text-[#ff5500] transition-colors cursor-pointer">
                                                Soul of Chogokin: GX-100 Gaiking
                                            </h3>
                                            <span className="inline-block text-[11px] font-bold text-[#ff5500]/80 mt-2">
                                                Gaiking
                                            </span>
                                        </div>
                                        <div className="mt-4 pt-3 border-t border-[#131313]">
                                            <span className="text-lg font-extrabold text-[#ff5500]">
                                                S/. 3,382.00
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PAGINACIÓN */}
                            <div className="flex justify-center items-center gap-2 mt-16 pb-8">
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#FFF6F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] text-neutral-400 hover:text-[#1C1612] dark:text-[#ffffff] hover:border-[#ffffff] transition-colors">
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#ff5500] text-white font-bold shadow-md">
                                    1
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#FFF6F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] text-[#1C1612] dark:text-[#ffffff] font-semibold hover:border-[#ff5500] hover:text-[#ff5500] transition-colors">
                                    2
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#FFF6F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] text-[#1C1612] dark:text-[#ffffff] font-semibold hover:border-[#ff5500] hover:text-[#ff5500] transition-colors">
                                    3
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#FFF6F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] text-[#1C1612] dark:text-[#ffffff] font-semibold hover:border-[#ff5500] hover:text-[#ff5500] transition-colors">
                                    4
                                </button>
                                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#FFF6F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] text-neutral-400 hover:text-[#1C1612] dark:text-[#ffffff] hover:border-[#ffffff] transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
