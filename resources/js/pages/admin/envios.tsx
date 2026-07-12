import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Search, Edit2, Truck, PackageCheck, Eye, SearchCode, Filter, X, Hash, Barcode, Calendar, Save, CheckCircle2 } from 'lucide-react';

interface Envio {
    id: number;
    codigo_pedido: string;
    cliente: string;
    direccion: string;
    codigo_seguimiento: string;
    estado: string;
    fecha: string;
}

interface EnviosProps {
    envios: {
        data: Envio[];
        links: any[];
    };
}

export default function Envios({ envios }: EnviosProps) {
    const [search, setSearch] = useState('');
    const [estadoFilter, setEstadoFilter] = useState('Todos');
    
    // Filtros avanzados
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const [fechaDesde, setFechaDesde] = useState('');
    const [fechaHasta, setFechaHasta] = useState('');
    const [ordenarPor, setOrdenarPor] = useState('recientes');

    const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
    const [isDetallesModalOpen, setIsDetallesModalOpen] = useState(false);
    const [isEntregadoModalOpen, setIsEntregadoModalOpen] = useState(false);
    const [selectedEnvio, setSelectedEnvio] = useState<Envio | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        id_solicitud: '',
        empresa_logistica: '',
        numero_tracking: '',
        fecha_entrega: '',
    });

    const openTrackingModal = (envio?: Envio) => {
        reset();
        if (envio) {
            setData('id_solicitud', envio.codigo_pedido);
        }
        setIsTrackingModalOpen(true);
    };

    const submitTracking = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/envios/tracking', {
            onSuccess: () => {
                setIsTrackingModalOpen(false);
                reset();
            }
        });
    };

    const confirmarEntregado = () => {
        if (!selectedEnvio) return;
        router.put('/admin/envios/' + selectedEnvio.id + '/entregado', {}, {
            onSuccess: () => {
                setIsEntregadoModalOpen(false);
                setSelectedEnvio(null);
            }
        });
    };

    const filteredEnvios = envios.data.filter(envio => {
        const matchesSearch = envio.cliente.toLowerCase().includes(search.toLowerCase()) || 
                              envio.codigo_pedido.toLowerCase().includes(search.toLowerCase());
        const matchesEstado = estadoFilter === 'Todos' || envio.estado === estadoFilter;
        
        let matchesFecha = true;
        if (fechaDesde && envio.fecha < fechaDesde) matchesFecha = false;
        if (fechaHasta && envio.fecha > fechaHasta) matchesFecha = false;

        return matchesSearch && matchesEstado && matchesFecha;
    }).sort((a, b) => {
        if (ordenarPor === 'antiguos') {
            return new Date(a.fecha).getTime() - new Date(b.fecha).getTime();
        } else {
            return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
        }
    });

    const getStatusStyle = (estado: string) => {
        switch (estado) {
            case 'Pendiente': return 'bg-gray-100 text-gray-700 border-gray-200';
            case 'Preparando': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'Enviado': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'Entregado': return 'bg-green-50 text-green-700 border-green-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <AdminLayout>
            <Head title="Gestión de Envíos" />
            
            <div className="mb-6 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-[#1C1612] tracking-tight">Envíos Activos</h1>
                    <p className="text-sm text-gray-500 mt-1">Gestione y rastree el estado de los paquetes en la red.</p>
                </div>
                <div className="flex gap-3 relative">
                    <div className="relative">
                        <button 
                            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                            className={`flex items-center gap-2 px-4 py-2 border font-bold rounded-lg transition-colors text-sm shadow-sm ${isFilterMenuOpen ? 'bg-gray-100 border-gray-300 text-gray-900' : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                        >
                            <Filter className="w-4 h-4" />
                            Filtros
                        </button>
                        
                        {/* Menú desplegable de Filtros */}
                        {isFilterMenuOpen && (
                            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 z-10 p-4">
                                <h3 className="text-sm font-bold text-[#1C1612] mb-3">Filtros Avanzados</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 mb-1">Ordenar por</label>
                                        <select 
                                            value={ordenarPor}
                                            onChange={(e) => setOrdenarPor(e.target.value)}
                                            className="w-full text-sm border border-gray-200 rounded-lg p-2 focus:ring-[#ff5500] focus:border-[#ff5500] outline-none"
                                        >
                                            <option value="recientes">Más recientes primero</option>
                                            <option value="antiguos">Más antiguos primero</option>
                                        </select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">Fecha Desde</label>
                                            <input 
                                                type="date" 
                                                value={fechaDesde}
                                                onChange={(e) => setFechaDesde(e.target.value)}
                                                className="w-full text-xs border border-gray-200 rounded-lg p-2 focus:ring-[#ff5500] focus:border-[#ff5500] outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 mb-1">Fecha Hasta</label>
                                            <input 
                                                type="date" 
                                                value={fechaHasta}
                                                onChange={(e) => setFechaHasta(e.target.value)}
                                                className="w-full text-xs border border-gray-200 rounded-lg p-2 focus:ring-[#ff5500] focus:border-[#ff5500] outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                                    <button 
                                        onClick={() => { setFechaDesde(''); setFechaHasta(''); setOrdenarPor('recientes'); }}
                                        className="text-xs text-[#ff5500] font-bold hover:underline"
                                    >
                                        Limpiar filtros
                                    </button>
                                    <button 
                                        onClick={() => setIsFilterMenuOpen(false)}
                                        className="text-xs bg-[#1C1612] text-white px-3 py-1.5 rounded-md font-bold hover:bg-black transition-colors"
                                    >
                                        Aplicar
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <button 
                        onClick={() => openTrackingModal()}
                        className="flex items-center gap-2 px-4 py-2 bg-[#ff5500] text-white font-bold rounded-lg hover:bg-[#e64a00] transition-colors shadow-sm text-sm"
                    >
                        + Registrar Tracking
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-6 border border-gray-200 p-1.5 rounded-xl">
                    <div className="relative w-full lg:flex-1">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Search className="w-5 h-5 text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            className="bg-transparent border-0 text-gray-900 text-sm focus:ring-0 block w-full pl-10 p-2 outline-none" 
                            placeholder="Buscar por ID de Solicitud o Tracking..." 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto pr-2 pl-2 lg:pl-0 lg:border-l lg:border-gray-200 lg:py-1">
                        {['Todos', 'Pendiente', 'Preparando', 'Enviado', 'Entregado'].map((estado) => (
                            <button
                                key={estado}
                                onClick={() => setEstadoFilter(estado)}
                                className={`px-4 py-1.5 text-sm font-bold rounded-full border transition-colors ${
                                    estadoFilter === estado 
                                    ? 'bg-[#fff4ed] text-[#ff5500] border-[#ff5500]' 
                                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                {estado}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-100">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#fcfaf9] border-b border-gray-100">
                                <th className="px-6 py-4 text-xs font-bold text-[#8c7365] uppercase tracking-wider">PEDIDO / FECHA</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#8c7365] uppercase tracking-wider">CLIENTE</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#8c7365] uppercase tracking-wider">DIRECCIÓN</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#8c7365] uppercase tracking-wider">ESTADO</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#8c7365] uppercase tracking-wider">TRACKING</th>
                                <th className="px-6 py-4 text-xs font-bold text-[#8c7365] uppercase tracking-wider text-right">ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-50">
                            {filteredEnvios.length > 0 ? (
                                filteredEnvios.map((envio) => (
                                    <tr key={envio.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-[#1C1612]">{envio.codigo_pedido}</div>
                                            <div className="text-[11px] text-gray-500 mt-0.5">{envio.fecha}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-gray-800 text-[13px]">{envio.cliente}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[13px] text-gray-600 line-clamp-1 max-w-[200px]" title={envio.direccion}>
                                                {envio.direccion}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border uppercase tracking-wider inline-block ${getStatusStyle(envio.estado)}`}>
                                                {envio.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5 text-gray-600 font-mono text-[13px]">
                                                <SearchCode className="w-3.5 h-3.5 text-gray-400" />
                                                {envio.codigo_seguimiento}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2 pr-4">
                                                <button 
                                                    onClick={() => { setSelectedEnvio(envio); setIsDetallesModalOpen(true); }}
                                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Ver Detalles">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => openTrackingModal(envio)}
                                                    className="p-1.5 text-gray-400 hover:text-[#ff5500] hover:bg-[#ff5500]/10 rounded transition-colors" title="Actualizar Tracking">
                                                    <Truck className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => { setSelectedEnvio(envio); setIsEntregadoModalOpen(true); }}
                                                    className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors" title="Marcar Entregado">
                                                    <PackageCheck className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No se encontraron envíos que coincidan con tu búsqueda.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de Registro de Tracking */}
            {isTrackingModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EADED5]">
                            <h2 className="text-lg font-bold text-[#1C1612]">Registrar Información de Envío</h2>
                            <button 
                                onClick={() => { setIsTrackingModalOpen(false); reset(); }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={submitTracking}>
                            <div className="px-6 py-5 space-y-4">
                                {/* ID de Solicitud */}
                                <div>
                                    <label className="block text-xs font-bold text-[#8c7365] uppercase mb-1.5 tracking-wider">
                                        ID DE SOLICITUD
                                    </label>
                                    <div className="relative">
                                        <input 
                                            type="text"
                                            value={data.id_solicitud}
                                            onChange={e => setData('id_solicitud', e.target.value)}
                                            placeholder="Ej. REQ-2023-0891"
                                            className="w-full pl-4 pr-10 py-2.5 border border-[#e5d9d3] rounded-lg text-sm text-[#1C1612] focus:ring-[#ff5500] focus:border-[#ff5500] outline-none"
                                            required
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#8c7365]">
                                            <Hash className="w-4 h-4" />
                                        </div>
                                    </div>
                                    {errors.id_solicitud && <p className="text-xs text-red-500 mt-1">{errors.id_solicitud}</p>}
                                </div>

                                {/* Empresa Logística */}
                                <div>
                                    <label className="block text-xs font-bold text-[#8c7365] uppercase mb-1.5 tracking-wider">
                                        EMPRESA DE LOGÍSTICA
                                    </label>
                                    <select 
                                        value={data.empresa_logistica}
                                        onChange={e => setData('empresa_logistica', e.target.value)}
                                        className="w-full px-4 py-2.5 border border-[#e5d9d3] rounded-lg text-sm text-[#1C1612] focus:ring-[#ff5500] focus:border-[#ff5500] outline-none appearance-none bg-white"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                                        required
                                    >
                                        <option value="" disabled>Seleccione empresa</option>
                                        <option value="Olva Courier">Olva Courier</option>
                                        <option value="Shalom">Shalom</option>
                                        <option value="DHL">DHL Express</option>
                                    </select>
                                    {errors.empresa_logistica && <p className="text-xs text-red-500 mt-1">{errors.empresa_logistica}</p>}
                                </div>

                                {/* Número de Tracking */}
                                <div>
                                    <label className="block text-xs font-bold text-[#8c7365] uppercase mb-1.5 tracking-wider">
                                        NÚMERO DE TRACKING
                                    </label>
                                    <div className="relative">
                                        <input 
                                            type="text"
                                            value={data.numero_tracking}
                                            onChange={e => setData('numero_tracking', e.target.value)}
                                            placeholder="Ingrese el código de seguimiento"
                                            className="w-full pl-4 pr-10 py-2.5 border border-[#e5d9d3] rounded-lg text-sm text-[#1C1612] focus:ring-[#ff5500] focus:border-[#ff5500] outline-none"
                                            required
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#8c7365]">
                                            <Barcode className="w-4 h-4" />
                                        </div>
                                    </div>
                                    {errors.numero_tracking && <p className="text-xs text-red-500 mt-1">{errors.numero_tracking}</p>}
                                </div>

                                {/* Fecha Estimada */}
                                <div>
                                    <label className="block text-xs font-bold text-[#8c7365] uppercase mb-1.5 tracking-wider">
                                        FECHA ESTIMADA DE ENTREGA
                                    </label>
                                    <div className="relative">
                                        <input 
                                            type="date"
                                            value={data.fecha_entrega}
                                            onChange={e => setData('fecha_entrega', e.target.value)}
                                            className="w-full pl-4 pr-10 py-2.5 border border-[#e5d9d3] rounded-lg text-sm text-[#1C1612] focus:ring-[#ff5500] focus:border-[#ff5500] outline-none"
                                            required
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#8c7365] bg-white border-l border-transparent">
                                            <Calendar className="w-4 h-4" />
                                        </div>
                                    </div>
                                    {errors.fecha_entrega && <p className="text-xs text-red-500 mt-1">{errors.fecha_entrega}</p>}
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t border-[#EADED5] flex justify-end gap-3 bg-gray-50/50">
                                <button
                                    type="button"
                                    onClick={() => { setIsTrackingModalOpen(false); reset(); }}
                                    className="px-5 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-[#ff5500] rounded-lg hover:bg-[#e64a00] transition-colors shadow-sm disabled:opacity-70"
                                >
                                    <Save className="w-4 h-4" />
                                    {processing ? 'Guardando...' : 'Guardar Seguimiento'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Detalles del Envío */}
            {isDetallesModalOpen && selectedEnvio && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EADED5]">
                            <h2 className="text-lg font-bold text-[#1C1612]">Detalles del Pedido</h2>
                            <button 
                                onClick={() => { setIsDetallesModalOpen(false); setSelectedEnvio(null); }}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="px-6 py-5 space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                <p className="text-xs font-bold text-[#8c7365] uppercase tracking-wider mb-1">ID DE PEDIDO</p>
                                <p className="text-sm font-bold text-[#1C1612]">{selectedEnvio.codigo_pedido}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[#8c7365] uppercase tracking-wider mb-1">Cliente</p>
                                <p className="text-sm text-[#1C1612]">{selectedEnvio.cliente}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-[#8c7365] uppercase tracking-wider mb-1">Dirección de Envío</p>
                                <p className="text-sm text-[#1C1612] leading-relaxed">{selectedEnvio.direccion}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-bold text-[#8c7365] uppercase tracking-wider mb-1">Estado</p>
                                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border uppercase tracking-wider inline-block ${getStatusStyle(selectedEnvio.estado)}`}>
                                        {selectedEnvio.estado}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-[#8c7365] uppercase tracking-wider mb-1">Tracking</p>
                                    <p className="text-sm text-[#1C1612] font-mono">{selectedEnvio.codigo_seguimiento}</p>
                                </div>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-[#EADED5] flex justify-end bg-gray-50/50">
                            <button
                                onClick={() => { setIsDetallesModalOpen(false); setSelectedEnvio(null); }}
                                className="px-5 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Confirmar Entregado */}
            {isEntregadoModalOpen && selectedEnvio && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-6 py-8 text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-bold text-[#1C1612] mb-2">Marcar como Entregado</h3>
                            <p className="text-sm text-gray-500">
                                ¿Estás seguro de que deseas marcar el pedido <span className="font-bold">{selectedEnvio.codigo_pedido}</span> de {selectedEnvio.cliente} como Entregado?
                            </p>
                        </div>
                        <div className="px-6 py-4 flex gap-3 bg-gray-50 border-t border-gray-100">
                            <button
                                onClick={() => { setIsEntregadoModalOpen(false); setSelectedEnvio(null); }}
                                className="flex-1 px-4 py-2 text-sm font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmarEntregado}
                                className="flex-1 px-4 py-2 text-sm font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
