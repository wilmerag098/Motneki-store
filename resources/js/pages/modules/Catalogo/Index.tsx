import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import PublicLayout from '@/layouts/public-layout';
import FiguraPersonalizadaModal from '@/components/FiguraPersonalizadaModal';
import ProductCard from '@/components/ProductCard';
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
    LayoutGrid,
    DollarSign,
    Search,
    Star,
    Tag,
    Ruler,
    Palette,
    Percent
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
    disponibilidad: string;
    tipo_producto: string;
    material: string;
    imagen_url?: string;
    categoria: Categoria;
}

interface PaginatedProductos {
    data: Producto[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props {
    productos: PaginatedProductos;
    categorias: Categoria[];
    filtros: any;
}

export default function Index({ productos, categorias, filtros }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Filtros State
    const [buscar, setBuscar] = useState(filtros?.buscar || '');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(filtros?.categoria || null);
    const [precioMin, setPrecioMin] = useState(filtros?.precio_min !== undefined ? Number(filtros.precio_min) : 0);
    const [precioMax, setPriceMax] = useState(filtros?.precio_max !== undefined ? Number(filtros.precio_max) : 10000);
    const [disponibilidad, setDisponibilidad] = useState<string[]>(filtros?.disponibilidad || []);
    const [tipos, setTipos] = useState<string[]>(filtros?.tipos || []);
    const [materiales, setMateriales] = useState<string[]>(filtros?.materiales || []);
    const [tamanos, setTamanos] = useState<string[]>(filtros?.tamanos || []);
    const [destacados, setDestacados] = useState<string[]>(filtros?.destacados || []);
    const [ratingFilter, setRatingFilter] = useState(filtros?.valoracion ? Number(filtros.valoracion) : 0);
    const [orden, setOrden] = useState(filtros?.orden || 'recientes');

    const isInitialRender = useRef(true);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        const timer = setTimeout(() => {
            const params: any = {
                buscar,
                categoria: categoriaSeleccionada,
                disponibilidad,
                tipos,
                materiales,
                tamanos,
                destacados,
                valoracion: ratingFilter,
                orden
            };

            // Sólo enviar si son distintos de los límites para considerar el filtro "nulo" por defecto
            if (precioMin > 0) params.precio_min = precioMin;
            if (precioMax < 10000) params.precio_max = precioMax;

            router.get(
                window.location.pathname,
                params,
                { preserveState: true, replace: true }
            );
        }, 500);

        return () => clearTimeout(timer);
    }, [buscar, categoriaSeleccionada, precioMin, precioMax, disponibilidad, tipos, materiales, tamanos, destacados, ratingFilter, orden]);

    const toggleArrayFilter = (setter: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
        setter(prev => 
            prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
        );
    };

    return (
        <PublicLayout>
            <Head title="Catálogo - MotnekiStore" />

            {/* WHITE TOP SECTION */}
            <div className="bg-[#FFF6F0] dark:bg-[#1c1b1b] border-b border-[#EADED5] dark:border-[#3a3939] w-full shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">

                    {/* CABECERA: Explora por Categoría */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3 sm:gap-4">
                        <h1 className="font-['Outfit'] text-2xl md:text-3xl font-extrabold text-[#1C1612] dark:text-[#ffffff] tracking-tight">
                            Explora por Categoría
                        </h1>
                        <div className="inline-flex items-center gap-2.5 bg-white dark:bg-[#131313] border border-[#EADED5] dark:border-[#3a3939] px-4 py-1.5 rounded-full shadow-sm w-fit">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5500] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5500]"></span>
                            </span>
                            <span className="text-xs font-bold text-[#888888] dark:text-[#9ca3af] uppercase tracking-wider">
                                <span className="text-[#1C1612] dark:text-white font-black">{productos.total || 0}</span> Productos
                            </span>
                        </div>
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
                        ].map((cat, i) => {
                            const isSelected = categoriaSeleccionada === cat.name;
                            return (
                                <div 
                                    key={i} 
                                    onClick={() => setCategoriaSeleccionada(isSelected ? null : cat.name)}
                                    className={`border rounded-2xl p-4 flex flex-col items-center justify-center gap-3 shadow-sm hover:shadow-lg transition-all cursor-pointer group ${
                                        isSelected 
                                            ? 'bg-white dark:bg-[#2A2A2A] border-[#ff5500] ring-1 ring-[#ff5500] shadow-md' 
                                            : 'bg-[#FFF6F0] dark:bg-[#1c1b1b] border-[#EADED5] dark:border-[#3a3939]'
                                    }`}
                                >
                                    <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center overflow-hidden border transition-colors ${
                                        isSelected 
                                            ? 'bg-[#FAF5F0] dark:bg-[#1A1A1A] border-[#ff5500]' 
                                            : 'bg-[#FAF5F0] dark:bg-[#131313] border-[#EADED5] dark:border-[#3a3939] group-hover:border-[#ff5500]/50'
                                    }`}>
                                        <img src={cat.img} alt={cat.name} className={`w-full h-full object-cover transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`} onError={(e) => e.currentTarget.style.display = 'none'} />
                                    </div>
                                    <span className={`text-xs sm:text-sm font-bold transition-colors ${
                                        isSelected 
                                            ? 'text-[#ff5500]' 
                                            : 'text-[#1C1612] dark:text-[#ffffff] group-hover:text-[#ff5500]'
                                    }`}>
                                        {cat.name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* LIGHT GRAY BOTTOM SECTION */}
            <div className="bg-[#F8F9FA] dark:bg-[#131313] w-full min-h-screen pt-10 pb-16 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* LAYOUT PRINCIPAL: SIDEBAR + GRID */}
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* SIDEBAR (PANEL DE NAVEGACIÓN LATERAL) */}
                        <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-8 bg-[#FFF6F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] rounded-3xl p-6 shadow-sm h-fit">

                            {/* ENCABEZADO DE FILTROS & BOTÓN TODOS */}
                            <div className="flex items-center justify-between border-b border-[#EADED5] dark:border-[#3a3939] pb-4 -mb-2">
                                <h2 className="font-['Outfit'] text-lg font-bold text-[#1C1612] dark:text-white flex items-center gap-2">
                                    Filtros
                                </h2>
                                <button
                                    onClick={() => {
                                        setBuscar('');
                                        setCategoriaSeleccionada(null);
                                        setPrecioMin(0);
                                        setPriceMax(10000);
                                        setDisponibilidad([]);
                                        setTipos([]);
                                        setMateriales([]);
                                        setTamanos([]);
                                        setDestacados([]);
                                        setRatingFilter(0);
                                        setOrden('recientes');
                                    }}
                                    className="text-[10px] font-black tracking-widest text-[#1C1612] dark:text-white bg-white dark:bg-[#2A2A2A] hover:bg-[#ff5500] hover:text-white px-4 py-1.5 rounded-full border border-[#EADED5] dark:border-[#3a3939] hover:border-[#ff5500] transition-colors uppercase shadow-sm"
                                >
                                    Todos
                                </button>
                            </div>

                            {/* 1. BÚSQUEDA */}
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Buscar por nombre..." value={buscar} onChange={(e) => setBuscar(e.target.value)} 
                                    className="w-full bg-white dark:bg-[#131313] border border-[#EADED5] dark:border-[#3a3939] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] transition-all dark:text-white placeholder-neutral-400 shadow-sm"
                                />
                                <Search className="w-4.5 h-4.5 text-neutral-400 absolute left-3.5 top-3.5" />
                            </div>



                            {/* 3. RANGO DE PRECIO */}
                            <div>
                                <h3 className="flex items-center gap-2 text-[11px] font-black tracking-widest text-neutral-400 uppercase mb-4">
                                    <DollarSign className="w-4 h-4" /> RANGO DE PRECIO
                                </h3>
                                <div className="border-l-2 border-[#EADED5] dark:border-[#3a3939] pl-4 ml-2 space-y-4">
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="10000" 
                                        value={precioMax}
                                        onChange={(e) => setPriceMax(Number(e.target.value))}
                                        className="w-full accent-[#ff5500] h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" 
                                    />
                                    <div className="flex justify-between items-center gap-2">
                                        <div className="relative flex-1">
                                            <span className="absolute left-2.5 top-2 text-xs text-neutral-500 font-medium">S/</span>
                                            <input type="number" value={precioMin} onChange={(e) => setPrecioMin(Number(e.target.value))} min="0" className="w-full bg-white dark:bg-[#131313] border border-[#EADED5] dark:border-[#3a3939] rounded-lg pl-7 pr-2 py-1.5 text-xs font-semibold text-[#1C1612] dark:text-white focus:outline-none focus:border-[#ff5500]" />
                                        </div>
                                        <span className="text-neutral-400 text-xs font-bold">-</span>
                                        <div className="relative flex-1">
                                            <span className="absolute left-2.5 top-2 text-xs text-neutral-500 font-medium">S/</span>
                                            <input type="number" value={precioMax} onChange={(e) => setPriceMax(Number(e.target.value))} max="10000" className="w-full bg-white dark:bg-[#131313] border border-[#EADED5] dark:border-[#3a3939] rounded-lg pl-7 pr-2 py-1.5 text-xs font-semibold text-[#1C1612] dark:text-white focus:outline-none focus:border-[#ff5500]" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 4. DISPONIBILIDAD */}
                            <div>
                                <h3 className="flex items-center gap-2 text-[11px] font-black tracking-widest text-neutral-400 uppercase mb-4">
                                    <Box className="w-4 h-4" /> DISPONIBILIDAD
                                </h3>
                                <div className="space-y-3 border-l-2 border-[#EADED5] dark:border-[#3a3939] pl-4 ml-2">
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="solo_disponibles" checked={disponibilidad.includes("solo_disponibles")} onCheckedChange={() => toggleArrayFilter(setDisponibilidad, "solo_disponibles")} className="border-[#ff5500] data-[state=checked]:bg-[#ff5500] data-[state=checked]:text-white rounded text-[#ff5500] w-4 h-4" />
                                        <label htmlFor="solo_disponibles" className="text-[13px] font-medium text-[#4A5568] dark:text-[#9ca3af] hover:text-[#ff5500] cursor-pointer transition-colors">
                                            Solo disponibles
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="incluir_sin_stock" checked={disponibilidad.includes("incluir_sin_stock")} onCheckedChange={() => toggleArrayFilter(setDisponibilidad, "incluir_sin_stock")} className="border-neutral-300 dark:border-[#3a3939] text-neutral-300 w-4 h-4 rounded" />
                                        <label htmlFor="incluir_sin_stock" className="text-[13px] font-medium text-[#4A5568] dark:text-[#9ca3af] hover:text-[#ff5500] cursor-pointer transition-colors">
                                            Incluir sin stock
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* 5. TIPO DE PRODUCTO */}
                            <div>
                                <h3 className="flex items-center gap-2 text-[11px] font-black tracking-widest text-neutral-400 uppercase mb-4">
                                    <Tag className="w-4 h-4" /> TIPO DE PRODUCTO
                                </h3>
                                <div className="space-y-3 border-l-2 border-[#EADED5] dark:border-[#3a3939] pl-4 ml-2">
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="tipo_stock" checked={tipos.includes("stock")} onCheckedChange={() => toggleArrayFilter(setTipos, "stock")} className="border-[#ff5500] data-[state=checked]:bg-[#ff5500] data-[state=checked]:text-white rounded text-[#ff5500] w-4 h-4" />
                                        <label htmlFor="tipo_stock" className="text-[13px] font-medium text-[#4A5568] dark:text-[#9ca3af] hover:text-[#ff5500] cursor-pointer transition-colors">
                                            Stock
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="tipo_preventa" checked={tipos.includes("preventa")} onCheckedChange={() => toggleArrayFilter(setTipos, "preventa")} className="border-neutral-300 dark:border-[#3a3939] text-neutral-300 w-4 h-4 rounded" />
                                        <label htmlFor="tipo_preventa" className="text-[13px] font-medium text-[#4A5568] dark:text-[#9ca3af] hover:text-[#ff5500] cursor-pointer transition-colors">
                                            Preventa
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="tipo_exclusivo" checked={tipos.includes("Exclusivo")} onCheckedChange={() => toggleArrayFilter(setTipos, "Exclusivo")} className="border-neutral-300 dark:border-[#3a3939] text-neutral-300 w-4 h-4 rounded" />
                                        <label htmlFor="tipo_exclusivo" className="text-[13px] font-medium text-[#4A5568] dark:text-[#9ca3af] hover:text-[#ff5500] cursor-pointer transition-colors">
                                            Exclusivo
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* 6. MATERIAL / ESTILO */}
                            <div>
                                <h3 className="flex items-center gap-2 text-[11px] font-black tracking-widest text-neutral-400 uppercase mb-4">
                                    <Palette className="w-4 h-4" /> MATERIAL / ESTILO
                                </h3>
                                <div className="space-y-3 border-l-2 border-[#EADED5] dark:border-[#3a3939] pl-4 ml-2">
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="mat_resina" checked={materiales.includes("Resina")} onCheckedChange={() => toggleArrayFilter(setMateriales, "Resina")} className="border-neutral-300 dark:border-[#3a3939] text-neutral-300 w-4 h-4 rounded" />
                                        <label htmlFor="mat_resina" className="text-[13px] font-medium text-[#4A5568] dark:text-[#9ca3af] hover:text-[#ff5500] cursor-pointer transition-colors">
                                            Resina
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="mat_pla" checked={materiales.includes("PLA")} onCheckedChange={() => toggleArrayFilter(setMateriales, "PLA")} className="border-neutral-300 dark:border-[#3a3939] text-neutral-300 w-4 h-4 rounded" />
                                        <label htmlFor="mat_pla" className="text-[13px] font-medium text-[#4A5568] dark:text-[#9ca3af] hover:text-[#ff5500] cursor-pointer transition-colors">
                                            PLA (Impresión 3D)
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="mat_pintado" checked={materiales.includes("Pintado a mano")} onCheckedChange={() => toggleArrayFilter(setMateriales, "Pintado a mano")} className="border-neutral-300 dark:border-[#3a3939] text-neutral-300 w-4 h-4 rounded" />
                                        <label htmlFor="mat_pintado" className="text-[13px] font-medium text-[#4A5568] dark:text-[#9ca3af] hover:text-[#ff5500] cursor-pointer transition-colors">
                                            Pintado a mano
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* 7. VALORACIÓN */}
                            <div>
                                <h3 className="flex items-center gap-2 text-[11px] font-black tracking-widest text-neutral-400 uppercase mb-4">
                                    <Star className="w-4 h-4" /> VALORACIÓN
                                </h3>
                                <div className="border-l-2 border-[#EADED5] dark:border-[#3a3939] pl-4 ml-2">
                                    <div className="flex items-center gap-1" onMouseLeave={() => setHoverRating(0)}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star 
                                                key={star}
                                                className={`w-5 h-5 cursor-pointer transition-all duration-200 ${
                                                    (hoverRating || ratingFilter) >= star 
                                                        ? 'fill-[#FACC15] text-[#FACC15] scale-110' 
                                                        : 'fill-transparent text-neutral-300 dark:text-[#4b5563] hover:scale-110'
                                                }`}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onClick={() => setRatingFilter(ratingFilter === star ? 0 : star)}
                                            />
                                        ))}
                                    </div>
                                    <div className="mt-2 text-[12px] font-medium text-[#6E7B8A] dark:text-[#9ca3af]">
                                        {ratingFilter > 0 ? `${ratingFilter} estrella${ratingFilter > 1 ? 's' : ''} o más` : 'Cualquier valoración'}
                                    </div>
                                </div>
                            </div>

                            {/* 8. DESTACADOS / PROMOCIONES */}
                            <div>
                                <h3 className="flex items-center gap-2 text-[11px] font-black tracking-widest text-neutral-400 uppercase mb-4">
                                    <Percent className="w-4 h-4" /> DESTACADOS
                                </h3>
                                <div className="space-y-3 border-l-2 border-[#EADED5] dark:border-[#3a3939] pl-4 ml-2">
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="dest_oferta" checked={destacados.includes("oferta")} onCheckedChange={() => toggleArrayFilter(setDestacados, "oferta")} className="border-neutral-300 dark:border-[#3a3939] text-neutral-300 w-4 h-4 rounded" />
                                        <label htmlFor="dest_oferta" className="text-[13px] font-medium text-[#4A5568] dark:text-[#9ca3af] hover:text-[#ff5500] cursor-pointer transition-colors">
                                            En oferta
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="dest_vendidos" checked={destacados.includes("vendidos")} onCheckedChange={() => toggleArrayFilter(setDestacados, "vendidos")} className="border-neutral-300 dark:border-[#3a3939] text-neutral-300 w-4 h-4 rounded" />
                                        <label htmlFor="dest_vendidos" className="text-[13px] font-medium text-[#4A5568] dark:text-[#9ca3af] hover:text-[#ff5500] cursor-pointer transition-colors">
                                            Más vendidos
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="dest_nuevos" checked={destacados.includes("nuevos")} onCheckedChange={() => toggleArrayFilter(setDestacados, "nuevos")} className="border-neutral-300 dark:border-[#3a3939] text-neutral-300 w-4 h-4 rounded" />
                                        <label htmlFor="dest_nuevos" className="text-[13px] font-medium text-[#4A5568] dark:text-[#9ca3af] hover:text-[#ff5500] cursor-pointer transition-colors">
                                            Nuevos
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* 9. TAMAÑO / DIMENSIONES */}
                            <div>
                                <h3 className="flex items-center gap-2 text-[11px] font-black tracking-widest text-neutral-400 uppercase mb-4">
                                    <Ruler className="w-4 h-4" /> TAMAÑO
                                </h3>
                                <div className="space-y-3 border-l-2 border-[#EADED5] dark:border-[#3a3939] pl-4 ml-2">
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="tam_pequeno" checked={tamanos.includes("Pequeño")} onCheckedChange={() => toggleArrayFilter(setTamanos, "Pequeño")} className="border-neutral-300 dark:border-[#3a3939] text-neutral-300 w-4 h-4 rounded" />
                                        <label htmlFor="tam_pequeno" className="text-[13px] font-medium text-[#4A5568] dark:text-[#9ca3af] hover:text-[#ff5500] cursor-pointer transition-colors">
                                            Pequeño
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="tam_mediano" checked={tamanos.includes("Mediano")} onCheckedChange={() => toggleArrayFilter(setTamanos, "Mediano")} className="border-neutral-300 dark:border-[#3a3939] text-neutral-300 w-4 h-4 rounded" />
                                        <label htmlFor="tam_mediano" className="text-[13px] font-medium text-[#4A5568] dark:text-[#9ca3af] hover:text-[#ff5500] cursor-pointer transition-colors">
                                            Mediano
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="tam_grande" checked={tamanos.includes("Grande")} onCheckedChange={() => toggleArrayFilter(setTamanos, "Grande")} className="border-neutral-300 dark:border-[#3a3939] text-neutral-300 w-4 h-4 rounded" />
                                        <label htmlFor="tam_grande" className="text-[13px] font-medium text-[#4A5568] dark:text-[#9ca3af] hover:text-[#ff5500] cursor-pointer transition-colors">
                                            Grande
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Checkbox id="tam_escala" checked={tamanos.includes("Escala")} onCheckedChange={() => toggleArrayFilter(setTamanos, "Escala")} className="border-neutral-300 dark:border-[#3a3939] text-neutral-300 w-4 h-4 rounded" />
                                        <label htmlFor="tam_escala" className="text-[13px] font-medium text-[#4A5568] dark:text-[#9ca3af] hover:text-[#ff5500] cursor-pointer transition-colors">
                                            Escala
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* BOTÓN SOLICITAR FIGURA PERSONALIZADA (VERSIÓN FIJA ABAJO) */}
                            {/* Eliminado del sidebar y movido fuera para que sea fixed (ver línea ~490) */}
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
                                        <p className="text-[#6E7B8A] text-sm mt-1">Mostrando {productos.total || 0} artículos</p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {/* 10. ORDENAMIENTO */}
                                        <div className="relative border border-[#EADED5] dark:border-[#3a3939] rounded-lg bg-[#FFF6F0] dark:bg-[#1c1b1b] px-3 py-2 flex items-center gap-2 w-[240px] cursor-pointer hover:border-[#ff5500] transition-colors group">
                                            <span className="text-neutral-400 group-hover:text-[#ff5500]">⇅</span>
                                            <select value={orden} onChange={(e) => setOrden(e.target.value)} className="border-none bg-transparent text-sm font-bold text-[#1C1612] dark:text-[#ffffff] focus:ring-0 cursor-pointer appearance-none outline-none flex-1 w-full pl-1 pr-6 z-10 relative">
                                                <option className="dark:bg-[#1c1b1b] dark:text-white" value="recientes">Más recientes</option>
                                                <option className="dark:bg-[#1c1b1b] dark:text-white" value="precio_asc">Precio: Menor a Mayor (↑)</option>
                                                <option className="dark:bg-[#1c1b1b] dark:text-white" value="precio_desc">Precio: Mayor a Menor (↓)</option>
                                                <option className="dark:bg-[#1c1b1b] dark:text-white" value="vendidos">Más vendidos</option>
                                            </select>
                                            <ChevronRight className="w-4 h-4 rotate-90 text-neutral-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                                        </div>

                                        {/* Toggle Vista */}
                                        <div className="flex items-center bg-[#FFF6F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] rounded-lg p-1">
                                            <button 
                                                onClick={() => setViewMode('grid')}
                                                className={`p-1.5 rounded transition-colors ${viewMode === 'grid' ? 'bg-[#FFF0E5] dark:bg-[#2A2A2A] text-[#ff5500] shadow-sm' : 'text-neutral-400 hover:text-[#1C1612] dark:hover:text-[#ffffff]'}`}
                                            >
                                                <Grid className="w-4 h-4" />
                                            </button>
                                            <button 
                                                onClick={() => setViewMode('list')}
                                                className={`p-1.5 rounded transition-colors ${viewMode === 'list' ? 'bg-[#FFF0E5] dark:bg-[#2A2A2A] text-[#ff5500] shadow-sm' : 'text-neutral-400 hover:text-[#1C1612] dark:hover:text-[#ffffff]'}`}
                                            >
                                                <List className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PRODUCT GRID */}
                            <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" : "flex flex-col gap-6"}>


                                {productos.data && productos.data.length > 0 ? (
                                    productos.data.map((producto) => (
                                        <ProductCard 
                                            key={producto.id_producto}
                                            id={producto.id_producto}
                                            title={producto.nombre}
                                            brand={"MOTNEKI"} // Default or from DB
                                            franchise={producto.categoria?.nombre || "Coleccionables"}
                                            price={parseFloat(producto.precio)}
                                            image={producto.imagen_url ? (producto.imagen_url.startsWith('http') || producto.imagen_url.startsWith('/') ? producto.imagen_url : `/storage/${producto.imagen_url}`) : "/images/ichigo_kurosaki_figure.png"}
                                            status={producto.tipo_producto === 'stock' ? 'EN STOCK' : producto.tipo_producto === 'preventa' ? 'PREVENTA' : 'EXCLUSIVO'}
                                            badge={producto.en_oferta ? '¡OFERTA!' : (producto.tipo_producto === 'preventa' ? 'NUEVO' : undefined)}
                                            releaseDate={producto.fecha_disponibilidad}
                                            viewMode={viewMode}
                                        />
                                    ))
                                ) : (
                                    <div className="col-span-full py-12 text-center flex flex-col items-center">
                                        <div className="w-16 h-16 bg-[#FFF6F0] dark:bg-[#1c1b1b] rounded-full flex items-center justify-center mb-4">
                                            <Box className="w-8 h-8 text-neutral-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-[#1C1612] dark:text-white">No se encontraron productos</h3>
                                        <p className="text-[#888888] mt-2 max-w-md">Intenta cambiar los filtros o realizar una nueva búsqueda para encontrar lo que necesitas.</p>
                                    </div>
                                )}
                            </div>

                            {/* PAGINACIÓN */}
                            {productos.last_page > 1 && (
                                <div className="flex justify-center items-center gap-2 sm:gap-3 mt-16 pb-8 flex-wrap">
                                    {productos.links.map((link, index) => {
                                        const isActive = link.active;
                                        const isPrev = link.label.includes('Previous');
                                        const isNext = link.label.includes('Next');
                                        
                                        if (link.url === null) {
                                            return (
                                                <button key={index} disabled className={`h-11 flex items-center justify-center font-bold text-sm rounded-full bg-white dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] text-gray-300 dark:text-neutral-600 opacity-50 cursor-not-allowed ${isPrev || isNext ? 'px-5 gap-2' : 'w-11'}`}>
                                                    {isPrev ? <><ChevronLeft className="w-4 h-4" /><span className="hidden sm:inline tracking-wide">ANTERIOR</span></> : isNext ? <><span className="hidden sm:inline tracking-wide">SIGUIENTE</span><ChevronRight className="w-4 h-4" /></> : <span dangerouslySetInnerHTML={{ __html: link.label }} />}
                                                </button>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                preserveScroll
                                                preserveState
                                                className={`h-11 flex items-center justify-center font-bold text-sm rounded-full transition-all duration-300 shadow-sm ${isPrev || isNext ? 'px-5 gap-2' : 'w-11'} ${
                                                    isActive 
                                                        ? 'bg-[#ff5500] text-white border-transparent shadow-[0_4px_12px_rgba(255,85,0,0.3)] scale-110 z-10' 
                                                        : 'bg-white dark:bg-[#131313] border border-[#EADED5] dark:border-[#3a3939] text-[#1C1612] dark:text-[#ffffff] hover:border-[#ff5500] hover:text-[#ff5500] hover:-translate-y-1 hover:shadow-md'
                                                }`}
                                            >
                                                {isPrev ? <><ChevronLeft className="w-4 h-4" /><span className="hidden sm:inline tracking-wide">ANTERIOR</span></> : isNext ? <><span className="hidden sm:inline tracking-wide">SIGUIENTE</span><ChevronRight className="w-4 h-4" /></> : <span dangerouslySetInnerHTML={{ __html: link.label }} />}
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            {/* BOTÓN FIJO EN PANTALLA PARA SOLICITAR FIGURA */}
            <button 
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-8 right-8 z-50 bg-[#ff5500] hover:bg-[#cc4400] text-white flex items-center justify-center gap-3 px-6 py-4 rounded-full shadow-2xl hover:shadow-[#ff5500]/50 hover:-translate-y-1 transition-all duration-300 font-extrabold text-sm tracking-wide group border-2 border-white/20"
            >
                <div className="relative">
                    <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                    </span>
                </div>
                <span className="hidden sm:inline-block">SOLICITAR FIGURA PERSONALIZADA</span>
            </button>

            <FiguraPersonalizadaModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </PublicLayout>
    );
}
