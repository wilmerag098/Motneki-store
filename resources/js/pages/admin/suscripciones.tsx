import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Search, Ban, Trash2, Mail, AlertTriangle, X } from 'lucide-react';

interface Subscriber {
    id: number;
    email: string;
    is_active: boolean;
    created_at: string;
}

interface SuscripcionesProps {
    suscriptores: {
        data: Subscriber[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: any[];
    };
    filters: {
        search?: string;
    };
}

export default function Suscripciones({ suscriptores, filters }: SuscripcionesProps) {
    const [search, setSearch] = useState(filters.search || '');

    // Status Modal State
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [subscriberToChangeStatus, setSubscriberToChangeStatus] = useState<Subscriber | null>(null);
    const [newStatus, setNewStatus] = useState(true);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [subscriberToDelete, setSubscriberToDelete] = useState<Subscriber | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const applyFilters = () => {
        router.get('/admin/suscripciones', { search }, { preserveState: true });
    };

    const handleFilterKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    };

    // Status change
    const openStatusModal = (subscriber: Subscriber) => {
        setSubscriberToChangeStatus(subscriber);
        setNewStatus(subscriber.is_active);
        setIsStatusModalOpen(true);
    };

    const handleUpdateStatus = () => {
        if (!subscriberToChangeStatus) return;
        setIsUpdatingStatus(true);
        router.put(`/admin/suscripciones/${subscriberToChangeStatus.id}`, { is_active: newStatus }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsStatusModalOpen(false);
                setSubscriberToChangeStatus(null);
                setIsUpdatingStatus(false);
            },
            onError: () => setIsUpdatingStatus(false)
        });
    };

    // Delete
    const confirmDelete = (subscriber: Subscriber) => {
        setSubscriberToDelete(subscriber);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!subscriberToDelete) return;
        setIsDeleting(true);
        router.delete(`/admin/suscripciones/${subscriberToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setSubscriberToDelete(null);
                setIsDeleting(false);
            },
            onError: () => setIsDeleting(false)
        });
    };

    return (
        <AdminLayout title="Suscripciones">
            <Head title="Suscripciones Newsletter - MotnekiStore" />

            {/* Encabezado */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Suscripciones Newsletter</h1>
                    <p className="text-gray-500 mt-1">Gestión de usuarios inscritos al Motneki Inner Circle.</p>
                </div>
                <div className="bg-[#ff5500]/10 text-[#ff5500] px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 border border-[#ff5500]/20">
                    <Mail className="w-4 h-4" />
                    {suscriptores.total} Suscriptores Totales
                </div>
            </div>

            {/* Panel de Filtros */}
            <div className="bg-white rounded-t-xl border-x border-t border-gray-200 p-5 mt-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-[400px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Buscar por correo electrónico..." 
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff5500] focus:border-[#ff5500] outline-none text-sm transition-shadow bg-gray-50/50"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={handleFilterKeyPress}
                        />
                    </div>
                </div>
            </div>

            {/* Tabla de Resultados */}
            <div className="bg-white rounded-b-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-[#f8f9fa] border-b border-gray-200">
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">EMAIL DEL SUSCRIPTOR</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">ESTADO</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">FECHA DE SUSCRIPCIÓN</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-right pr-10">ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {suscriptores.data.length > 0 ? (
                                suscriptores.data.map((sub) => (
                                    <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-sm font-bold text-[#ff5500] shrink-0 border border-orange-100">
                                                    <Mail className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{sub.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase font-bold rounded-full border ${sub.is_active ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${sub.is_active ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                {sub.is_active ? 'Activo' : 'Dado de baja'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                                            {new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(sub.created_at))}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-3 pr-4">
                                                <button 
                                                    onClick={() => openStatusModal(sub)}
                                                    className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded transition-colors" 
                                                    title={sub.is_active ? "Dar de baja temporalmente" : "Reactivar suscripción"}
                                                >
                                                    <Ban className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => confirmDelete(sub)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" 
                                                    title="Eliminar registro"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm">
                                        No se encontraron suscriptores en la lista.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Paginación */}
                {suscriptores.total > 0 && (
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-[#f8f9fa]">
                        <div className="text-sm text-gray-500">
                            Mostrando {(suscriptores.current_page - 1) * suscriptores.per_page + 1} a {Math.min(suscriptores.current_page * suscriptores.per_page, suscriptores.total)} de {suscriptores.total}
                        </div>
                        
                        <div className="flex items-center gap-1">
                            {suscriptores.links.map((link, index) => {
                                const isPrev = link.label.includes('Previous');
                                const isNext = link.label.includes('Next');
                                
                                if (isPrev || isNext) return null;

                                return (
                                    <button 
                                        key={index}
                                        onClick={() => link.url && router.get(link.url, { search }, { preserveState: true })}
                                        disabled={!link.url}
                                        className={`w-8 h-8 flex items-center justify-center rounded border font-medium text-sm transition-colors ${
                                            link.active 
                                                ? 'bg-[#ff5500] border-[#ff5500] text-white' 
                                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Cambiar Estado */}
            {isStatusModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
                        
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
                            <h2 className="text-[15px] font-bold text-gray-900 tracking-tight">Cambiar Estado de Suscripción</h2>
                            <button 
                                onClick={() => setIsStatusModalOpen(false)}
                                className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 bg-white">
                            <p className="text-[12px] text-gray-600 leading-relaxed mb-6 font-medium">
                                Si das de baja a este usuario, dejará de recibir correos del Newsletter.
                            </p>

                            <div className="bg-[#f5f7fa] border border-gray-100 rounded-xl p-4 flex items-center justify-between">
                                <div>
                                    <h4 className="text-[13px] font-bold text-gray-800">Estado</h4>
                                    <p className="text-[11px] text-gray-500 mt-0.5">Actualmente: {newStatus ? 'Activo' : 'Dado de baja'}</p>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => setNewStatus(!newStatus)}
                                    className={`w-12 h-6 rounded-full relative transition-colors duration-200 ease-in-out focus:outline-none shadow-inner ${newStatus ? 'bg-[#ff5500]' : 'bg-gray-300'}`}
                                >
                                    <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out shadow-sm ${newStatus ? 'translate-x-6' : 'translate-x-0'}`}></span>
                                </button>
                            </div>
                        </div>
                        
                        <div className="px-6 py-4 border-t border-gray-50 bg-[#f8f9fa] flex justify-center gap-3">
                            <button 
                                type="button"
                                onClick={() => setIsStatusModalOpen(false)}
                                className="px-5 py-2.5 bg-transparent text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors text-sm"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleUpdateStatus}
                                disabled={isUpdatingStatus}
                                className="px-5 py-2.5 bg-[#ff5500] text-white font-bold rounded-lg hover:bg-[#e64a00] transition-colors shadow-md text-sm disabled:opacity-50"
                            >
                                {isUpdatingStatus ? 'Actualizando...' : 'Actualizar Estado'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Confirmar Eliminación */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                    <div className="bg-[#f8f9fa] rounded-2xl shadow-xl w-full max-w-sm overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-8 flex flex-col items-center text-center">
                            
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <AlertTriangle className="w-6 h-6 text-red-500" />
                            </div>

                            <h2 className="text-xl font-bold text-gray-900 mb-2">Eliminar Suscriptor</h2>
                            <p className="text-[13px] text-gray-500 mb-8 leading-relaxed px-2">
                                ¿Seguro que deseas eliminar el correo <strong>{subscriberToDelete?.email}</strong>? Esta acción borrará permanentemente su registro.
                            </p>

                            <div className="flex items-center justify-center gap-3 w-full px-2">
                                <button 
                                    onClick={() => {
                                        setIsDeleteModalOpen(false);
                                        setSubscriberToDelete(null);
                                    }}
                                    disabled={isDeleting}
                                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="flex-1 px-4 py-2.5 bg-[#c81e1e] text-white font-bold rounded-lg hover:bg-[#a51818] transition-colors text-sm disabled:opacity-50 flex justify-center items-center gap-2"
                                >
                                    {isDeleting ? 'Eliminando...' : 'Eliminar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </AdminLayout>
    );
}
