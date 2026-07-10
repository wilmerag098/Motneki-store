import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Search, Plus, Edit2, Trash2, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface Producto {
    id_producto: number;
    nombre: string;
    fabricante: string;
    precio: number;
    stock: number;
    disponibilidad: string;
    activo: boolean;
    imagen_url: string;
    categoria: {
        nombre: string;
    };
}

interface Props {
    productos: Producto[];
}

export default function AdminProductos({ productos }: Props) {
    const [activeTab, setActiveTab] = useState('TODOS');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [productoToDelete, setProductoToDelete] = useState<Producto | null>(null);

    const filteredProductos = productos.filter(producto => {
        // Filtro por Tab (Categoría)
        if (activeTab !== 'TODOS') {
            if (producto.categoria?.nombre.toUpperCase() !== activeTab) {
                return false;
            }
        }
        
        // Filtro por búsqueda
        if (searchQuery.trim() !== '') {
            const query = searchQuery.toLowerCase();
            const matchName = producto.nombre.toLowerCase().includes(query);
            const matchFabricante = producto.fabricante?.toLowerCase().includes(query) || false;
            if (!matchName && !matchFabricante) return false;
        }

        return true;
    });
    
    const handleDeleteClick = (producto: Producto) => {
        setProductoToDelete(producto);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setProductoToDelete(null);
    };

    const confirmDelete = () => {
        if (productoToDelete) {
            router.delete(`/admin/productos/${productoToDelete.id_producto}`, {
                onSuccess: () => closeDeleteModal(),
            });
        }
    };

    return (
        <AdminLayout title="Inventario de Coleccionables">
            <div className="max-w-7xl mx-auto space-y-8 pb-12">
                
                {/* Header Section */}
                <div className="flex justify-between items-end border-b border-gray-200 pb-6">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Inventario de Coleccionables</h2>
                        <p className="text-sm font-medium text-gray-500 mt-2">Gestiona el catálogo de figuras de alta gama y preventas exclusivas.</p>
                    </div>
                    <div>
                        <Link href="/admin/productos/crear" className="flex items-center gap-2 px-6 py-3 bg-[#ff5500] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#e04a00] transition-colors shadow-sm rounded-sm">
                            <Plus className="w-4 h-4" strokeWidth={3} /> CREAR PRODUCTO
                        </Link>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 border border-gray-200 shadow-sm">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full md:w-auto">
                        {/* Search Input */}
                        <div className="relative w-full md:w-[320px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Buscar por nombre o fabricante..." 
                                className="w-full bg-[#fcfcfc] border border-gray-200 text-sm py-2 pl-9 pr-4 focus:ring-2 focus:ring-[#ff5500] focus:border-[#ff5500] placeholder:text-gray-400 text-gray-700 outline-none rounded-sm transition-all"
                            />
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex border border-gray-200 rounded-sm overflow-hidden bg-white">
                            {['TODOS', 'LLAVEROS', 'FIGURAS', 'PELUCHES', 'COLLARES', 'RELOJES', 'POLOS'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-colors border-r border-gray-200 last:border-r-0 ${
                                        activeTab === tab 
                                            ? 'text-[#ff5500] border-b-2 border-b-[#ff5500] bg-orange-50/30' 
                                            : 'text-gray-500 hover:bg-gray-50'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
                            <svg className="w-3 h-3 mr-1.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>
                            FILTRAR POR ESTADO:
                        </span>
                        <button className="flex items-center gap-1 text-sm font-bold text-gray-900 hover:text-[#ff5500] transition-colors">
                            Activos <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#fcfcfc] border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest w-[40%]">PRODUCTO</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">CATEGORÍA / TIPO</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">PRECIO</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">ESTADO</th>
                                    <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredProductos && filteredProductos.length > 0 ? (
                                    filteredProductos.map((producto) => (
                                        <tr key={producto.id_producto} className={`hover:bg-gray-50 transition-colors group ${!producto.activo ? 'opacity-70' : ''}`}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-14 h-14 bg-[#111] rounded-sm overflow-hidden flex-shrink-0 relative border border-gray-200 ${!producto.activo ? 'flex items-center justify-center bg-gray-200' : ''}`}>
                                                        {producto.imagen_url ? (
                                                            <img 
                                                                src={producto.imagen_url} 
                                                                alt={producto.nombre} 
                                                                className={`w-full h-full object-cover ${!producto.activo ? 'grayscale' : 'opacity-90'}`} 
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                                                Sin img
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className={`text-[13px] font-medium ${producto.activo ? 'text-gray-800' : 'text-gray-500'}`}>
                                                            {producto.nombre}
                                                        </h4>
                                                        <p className="text-[11px] text-gray-400 mt-0.5">
                                                            Fabricante: {producto.fabricante || 'Desconocido'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border border-gray-300 text-gray-500 rounded-sm">
                                                    {producto.categoria?.nombre || 'SIN CATEGORÍA'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`text-[15px] font-black text-[#ff5500] ${!producto.activo ? 'opacity-80' : ''}`}>
                                                    S/. {Number(producto.precio).toFixed(2)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${producto.activo ? 'bg-green-500' : 'border-2 border-gray-300'}`}></div>
                                                    <span className={`text-[11px] font-bold uppercase tracking-widest ${producto.activo ? 'text-gray-900' : 'text-gray-400'}`}>
                                                        {producto.activo ? 'ACTIVO' : 'DESACTIVADO'}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`flex items-center justify-center gap-4 ${producto.activo ? 'text-gray-400' : 'text-gray-300'}`}>
                                                    <Link href={`/admin/productos/editar/${producto.id_producto}`} className="hover:text-[#ff5500] transition-colors"><Edit2 className="w-4 h-4" strokeWidth={2.5} /></Link>
                                                    <button onClick={() => handleDeleteClick(producto)} className="hover:text-[#e52e2e] transition-colors"><Trash2 className="w-4 h-4" strokeWidth={2.5} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500 text-sm">
                                            No hay productos registrados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination (Static for now) */}
                <div className="flex justify-center items-center py-6">
                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-500 rounded-sm hover:bg-gray-50 transition-colors">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center bg-orange-50/50 border-2 border-[#ff5500] text-[#ff5500] font-bold rounded-sm">
                            1
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-gray-500 rounded-sm hover:bg-gray-50 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Delete Modal Overlay */}
                {isDeleteModalOpen && productoToDelete && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                        <div className="bg-white shadow-2xl w-[500px] max-w-full relative animate-in fade-in zoom-in duration-200">
                            
                            <div className="p-8">
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1.5 h-6 bg-[#e52e2e]"></div>
                                    <h3 className="text-[#111] text-[17px] font-black uppercase tracking-tight">CONFIRMAR ELIMINACIÓN</h3>
                                </div>

                                {/* Body */}
                                <p className="text-[#555] text-[13px] leading-relaxed mb-6 font-medium">
                                    ¿Estás seguro de que deseas eliminar este producto?<br />
                                    Esta acción no se puede deshacer.
                                </p>

                                {/* Product Info Card */}
                                <div className="bg-[#f8f9fa] border border-[#e5e7eb] p-4 flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 bg-white border border-[#e5e7eb] shrink-0 p-1 shadow-sm">
                                        {productoToDelete.imagen_url ? (
                                            <img 
                                                src={productoToDelete.imagen_url} 
                                                alt={productoToDelete.nombre} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-400 bg-gray-100">
                                                Sin img
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">PRODUCTO SELECCIONADO</p>
                                        <h4 className="text-[13px] font-bold text-[#111]">{productoToDelete.nombre}</h4>
                                    </div>
                                </div>

                                {/* Footer Actions */}
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        onClick={closeDeleteModal}
                                        className="py-3.5 bg-white border border-[#d1d5db] text-[#555] text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 hover:text-gray-900 transition-colors"
                                    >
                                        CANCELAR
                                    </button>
                                    <button 
                                        onClick={confirmDelete}
                                        className="py-3.5 bg-[#e52e2e] text-white text-[11px] font-black uppercase tracking-widest hover:bg-[#cc2929] transition-colors"
                                    >
                                        ELIMINAR PRODUCTO
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </AdminLayout>
    );
}
