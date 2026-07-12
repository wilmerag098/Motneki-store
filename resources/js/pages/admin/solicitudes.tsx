import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Search, Filter, Eye, ChevronLeft, ChevronRight, X, AlignLeft, Send, Link as LinkIcon, DollarSign } from 'lucide-react';

interface Solicitud {
    id_solicitud: number;
    id_usuario: number;
    nombre: string | null;
    descripcion: string;
    referencia_url: string | null;
    imagen: string | null;
    presupuesto: string | number | null;
    precio_cotizado: string | number | null;
    estado: string;
    comentario_admin: string | null;
    fecha_creacion: string;
    usuario?: {
        nombre: string;
        email: string;
    };
}

interface SolicitudesProps {
    solicitudes: {
        data: Solicitud[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: any[];
    };
    filters: {
        search?: string;
        estado?: string;
    };
}

export default function Solicitudes({ solicitudes, filters }: SolicitudesProps) {
    const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null);
    const [search, setSearch] = useState(filters.search || '');
    const [estadoFilter, setEstadoFilter] = useState(filters.estado || '');
    const [isSaving, setIsSaving] = useState(false);

    // Modal Edit State
    const [editData, setEditData] = useState({
        estado: 'pendiente',
        precio_cotizado: '',
        comentario_admin: ''
    });

    useEffect(() => {
        if (selectedSolicitud) {
            setEditData({
                estado: selectedSolicitud.estado || 'pendiente',
                precio_cotizado: selectedSolicitud.precio_cotizado?.toString() || '',
                comentario_admin: selectedSolicitud.comentario_admin || ''
            });
        }
    }, [selectedSolicitud]);

    const applyFilters = () => {
        router.get('/admin/solicitudes-figuras', { search, estado: estadoFilter }, { preserveState: true });
    };

    const handleFilterKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    };

    const saveChanges = (newEstado?: string) => {
        if (!selectedSolicitud) return;
        setIsSaving(true);
        const payload = {
            ...editData,
            estado: newEstado || editData.estado
        };

        router.put(`/admin/solicitudes-figuras/${selectedSolicitud.id_solicitud}`, payload, {
            preserveScroll: true,
            onSuccess: () => {
                setIsSaving(false);
                setSelectedSolicitud(null);
            },
            onError: () => setIsSaving(false)
        });
    };

    const handlePagination = (url: string | null) => {
        if (url) {
            router.get(url, { search, estado: estadoFilter }, { preserveState: true });
        }
    };

    // Helpers para estilo basado en el estado
    const getBadgeStyle = (estado: string) => {
        const est = estado?.toLowerCase() || '';
        if (est === 'enviado' || est.includes('revisión')) {
            return 'bg-blue-100 text-blue-700 border-blue-200';
        } else if (est.includes('aprobado')) {
            return 'bg-green-100 text-green-700 border-green-200';
        } else if (est.includes('cotizado')) {
            return 'bg-purple-100 text-purple-700 border-purple-200';
        } else if (est.includes('rechazado')) {
            return 'bg-red-100 text-red-700 border-red-200';
        }
        return 'bg-orange-100 text-orange-600 border-orange-200';
    };

    const formatBadgeText = (estado: string) => {
        const est = estado?.toLowerCase() || '';
        if (est === 'enviado' || est === 'revision') return 'EN REVISIÓN';
        if (est === 'borrador' || est === 'pendiente') return 'PENDIENTE';
        return estado?.toUpperCase() || 'PENDIENTE';
    };

    return (
        <AdminLayout title="Solicitudes">
            <Head title="Lista de Solicitudes" />

            {/* Encabezado */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Lista de Solicitudes</h1>
                <p className="text-gray-500 mt-1">Panel de administración operativa de MOTNEKISTORE</p>
            </div>

            {/* Panel de Filtros */}
            <div className="bg-white rounded-xl border border-orange-100 p-6 mb-6 shadow-sm">
                <div className="flex flex-wrap gap-6 items-end">
                    <div className="flex-1 min-w-[250px]">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar Solicitud</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Nombre producto o cliente..." 
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5500] focus:border-[#ff5500] outline-none text-sm transition-shadow"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onKeyDown={handleFilterKeyPress}
                            />
                        </div>
                    </div>
                    
                    <div className="w-[200px]">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                        <select 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5500] outline-none text-sm appearance-none bg-white"
                            value={estadoFilter}
                            onChange={e => {
                                setEstadoFilter(e.target.value);
                            }}
                        >
                            <option value="">Todos los estados</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="revision">En Revisión</option>
                            <option value="aprobado">Aprobado</option>
                            <option value="cotizado">Cotizado</option>
                            <option value="rechazado">Rechazado</option>
                        </select>
                    </div>

                    <div>
                        <button 
                            onClick={applyFilters}
                            className="flex items-center gap-2 px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors text-sm"
                        >
                            <Filter className="w-4 h-4" />
                            Aplicar Filtros
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabla de Resultados */}
            <div className="bg-white rounded-xl border border-orange-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-orange-100">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Producto Deseado</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Presupuesto</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Estado</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Fecha</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-orange-50">
                            {solicitudes.data.length > 0 ? (
                                solicitudes.data.map((solicitud) => (
                                    <tr key={solicitud.id_solicitud} className="hover:bg-orange-50/30 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                            #REQ-{8900 + solicitud.id_solicitud}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-gray-900">{solicitud.usuario?.nombre || 'Usuario Anónimo'}</p>
                                            <p className="text-xs text-gray-500">{solicitud.usuario?.email || 'N/A'}</p>
                                        </td>
                                        <td className="px-6 py-4 max-w-[200px]">
                                            <p className="text-sm font-bold text-gray-800 line-clamp-1">{solicitud.nombre || 'Sin título'}</p>
                                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{solicitud.descripcion}</p>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                            {solicitud.presupuesto ? `S/ ${solicitud.presupuesto}` : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 text-[10px] font-bold border rounded-full ${getBadgeStyle(solicitud.estado)}`}>
                                                {formatBadgeText(solicitud.estado)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-gray-600">
                                                {new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(solicitud.fecha_creacion))}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <button 
                                                onClick={() => setSelectedSolicitud(solicitud)}
                                                className="text-[#ff5500] hover:text-[#cc4400] transition-colors p-2 bg-orange-50 rounded-full hover:bg-orange-100"
                                            >
                                                <Eye className="w-5 h-5 mx-auto" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500 text-sm">
                                        No se encontraron solicitudes con los filtros aplicados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Paginación */}
                {solicitudes.total > 0 && (
                    <div className="px-6 py-4 border-t border-orange-100 flex items-center justify-between bg-white">
                        <div className="text-sm text-gray-500">
                            Mostrando {(solicitudes.current_page - 1) * solicitudes.per_page + 1} a {Math.min(solicitudes.current_page * solicitudes.per_page, solicitudes.total)} de {solicitudes.total} solicitudes
                        </div>
                        
                        <div className="flex items-center gap-1">
                            {solicitudes.links.map((link, index) => {
                                const isPrev = link.label.includes('Previous');
                                const isNext = link.label.includes('Next');
                                
                                if (isPrev) {
                                    return (
                                        <button 
                                            key={index}
                                            disabled={!link.url}
                                            onClick={() => handlePagination(link.url)}
                                            className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>
                                    );
                                }
                                
                                if (isNext) {
                                    return (
                                        <button 
                                            key={index}
                                            disabled={!link.url}
                                            onClick={() => handlePagination(link.url)}
                                            className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    );
                                }

                                return (
                                    <button 
                                        key={index}
                                        onClick={() => handlePagination(link.url)}
                                        className={`w-8 h-8 flex items-center justify-center rounded border font-medium text-sm transition-colors ${
                                            link.active 
                                                ? 'bg-[#ff5500] border-[#ff5500] text-white' 
                                                : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {link.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de Detalle y Edición */}
            {selectedSolicitud && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
                        {/* Header Modal */}
                        <div className="p-6 border-b border-gray-100 relative bg-white sticky top-0 z-10 flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Gestión de Solicitud</h2>
                                <p className="text-sm text-gray-500 mt-0.5">ID: #REQ-{8900 + selectedSolicitud.id_solicitud} • {new Intl.DateTimeFormat('es-ES', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(selectedSolicitud.fecha_creacion))}</p>
                            </div>
                            <button 
                                onClick={() => setSelectedSolicitud(null)}
                                className="p-2 text-gray-400 hover:text-gray-800 bg-gray-50 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Body Modal */}
                        <div className="p-6 space-y-6">
                            
                            {/* Información del Cliente & Producto */}
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 mb-3 border-b border-gray-100 pb-2">Información de la Solicitud</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Producto Deseado</p>
                                        <p className="text-sm font-bold text-gray-900 mb-3">{selectedSolicitud.nombre || 'N/A'}</p>
                                        
                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Descripción y Contacto</p>
                                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{selectedSolicitud.descripcion}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                                            <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider mb-1">Presupuesto Cliente</p>
                                            <p className="text-2xl font-black text-[#ff5500]">
                                                {selectedSolicitud.presupuesto ? `S/ ${selectedSolicitud.presupuesto}` : 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Imágenes / Enlaces</p>
                                            <div className="flex gap-3">
                                                {selectedSolicitud.imagen && (
                                                    <a href={`/storage/${selectedSolicitud.imagen}`} target="_blank" rel="noreferrer" className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 block hover:opacity-80 transition-opacity">
                                                        <img src={`/storage/${selectedSolicitud.imagen}`} alt="Referencia" className="w-full h-full object-cover" />
                                                    </a>
                                                )}
                                                {selectedSolicitud.referencia_url && (
                                                    <a href={selectedSolicitud.referencia_url} target="_blank" rel="noreferrer" className="flex items-center justify-center w-16 h-16 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 hover:text-[#ff5500] hover:border-[#ff5500] transition-colors">
                                                        <LinkIcon className="w-6 h-6" />
                                                    </a>
                                                )}
                                                {!selectedSolicitud.imagen && !selectedSolicitud.referencia_url && (
                                                    <p className="text-xs text-gray-400 italic">No se adjuntaron referencias.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Gestión Operativa */}
                            <div className="border border-orange-200 rounded-xl bg-white shadow-sm overflow-hidden">
                                <div className="bg-orange-50/50 px-5 py-3 border-b border-orange-100 flex items-center gap-2">
                                    <AlignLeft className="w-4 h-4 text-[#ff5500]" />
                                    <h3 className="font-bold text-gray-800 text-sm">GESTIÓN OPERATIVA</h3>
                                </div>
                                
                                <div className="p-5 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Estado de la Solicitud</label>
                                            <select 
                                                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5500] outline-none text-sm appearance-none font-medium text-gray-800"
                                                value={editData.estado}
                                                onChange={e => setEditData({...editData, estado: e.target.value})}
                                            >
                                                <option value="pendiente">Pendiente</option>
                                                <option value="revision">En Revisión</option>
                                                <option value="cotizado">Cotizado</option>
                                                <option value="aprobado">Aprobado</option>
                                                <option value="rechazado">Rechazado</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Precio de Cotización (S/)</label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <input 
                                                    type="number" 
                                                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5500] outline-none text-sm font-bold text-gray-800" 
                                                    placeholder="Ej: 350.00"
                                                    value={editData.precio_cotizado}
                                                    onChange={e => setEditData({...editData, precio_cotizado: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">Notas y Comentarios Internos (Privado)</label>
                                        <textarea 
                                            rows={3} 
                                            placeholder="Detalles sobre costos de importación, tiempos de entrega, proveedores..." 
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff5500] outline-none text-sm resize-y font-medium text-gray-700"
                                            value={editData.comentario_admin}
                                            onChange={e => setEditData({...editData, comentario_admin: e.target.value})}
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Modal */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-between items-center sticky bottom-0 z-10">
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => saveChanges('aprobado')}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors shadow-sm text-sm disabled:opacity-50"
                                >
                                    Aprobar
                                </button>
                                <button 
                                    onClick={() => saveChanges('rechazado')}
                                    disabled={isSaving}
                                    className="px-4 py-2 bg-white border border-red-200 text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors shadow-sm text-sm disabled:opacity-50"
                                >
                                    Rechazar
                                </button>
                            </div>
                            
                            <button 
                                onClick={() => saveChanges()}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-2 bg-[#ff5500] text-white font-bold rounded-lg hover:bg-[#e64a00] transition-colors shadow-md text-sm disabled:opacity-50"
                            >
                                <Send className="w-4 h-4" />
                                {isSaving ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
