import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Package, Clock, ShieldCheck, Heart, User, MapPin, ChevronRight, CheckCircle2, LogOut, Settings2, Edit, AlertCircle, Info, Truck, Star, Pencil, X, Sparkles, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import FiguraPersonalizadaModal from '@/components/FiguraPersonalizadaModal';

interface Producto {
    id_producto: number;
    nombre: string;
    imagen_url: string;
}

interface DetallePedido {
    id_detalle: number;
    producto: Producto;
    cantidad: number;
    precio_unitario: string;
}

interface Pedido {
    id_pedido: number;
    total: string;
    estado: string;
    fecha_creacion: string;
    detalles: DetallePedido[];
}

interface Direccion {
    id_direccion: number;
    direccion: string;
    ciudad: string;
    pais: string;
    codigo_postal: string;
}

interface Solicitud {
    id_solicitud: number;
    nombre: string;
    estado: string;
    fecha_creacion: string;
    precio_cotizado: string | null;
}

interface Props {
    auth: {
        user: {
            id: number;
            nombre: string;
            email: string;
            telefono?: string;
            rol?: {
                nombre: string;
            }
        }
    };
    pedidosPreventa: Pedido[];
    pedidosStock: Pedido[];
    solicitudes: Solicitud[];
    direcciones: Direccion[];
}

export default function Dashboard({ auth, pedidosPreventa, pedidosStock, solicitudes, direcciones = [] }: Props) {
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [editingAddressId, setEditingAddressId] = useState<number | null>(null);

    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [activeProfileTab, setActiveProfileTab] = useState('informacion');
    const [isSolicitudModalOpen, setIsSolicitudModalOpen] = useState(false);

    const { 
        data: profileData, 
        setData: setProfileData, 
        patch: patchProfile, 
        processing: profileProcessing, 
        errors: profileErrors 
    } = useForm({
        nombre: auth.user.nombre || '',
        email: auth.user.email || '',
        telefono: auth.user.telefono || ''
    });

    const {
        data: passwordData,
        setData: setPasswordData,
        put: putPassword,
        processing: passwordProcessing,
        errors: passwordErrors,
        reset: resetPassword
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: ''
    });

    const { data: addressData, setData: setAddressData, post: postAddress, put: putAddress, processing: addressProcessing, errors: addressErrors, reset: resetAddress } = useForm({
        direccion: '',
        ciudad: '',
        pais: '',
        codigo_postal: ''
    });

    const openAddressModal = (address?: Direccion) => {
        if (address) {
            setEditingAddressId(address.id_direccion);
            setAddressData({
                direccion: address.direccion,
                ciudad: address.ciudad,
                pais: address.pais,
                codigo_postal: address.codigo_postal
            });
        } else {
            setEditingAddressId(null);
            resetAddress();
        }
        setIsAddressModalOpen(true);
    };

    const submitAddress = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingAddressId) {
            putAddress(`/direcciones/${editingAddressId}`, {
                onSuccess: () => {
                    setIsAddressModalOpen(false);
                    resetAddress();
                }
            });
        } else {
            postAddress('/direcciones', {
                onSuccess: () => {
                    setIsAddressModalOpen(false);
                    resetAddress();
                }
            });
        }
    };

    const submitProfile = (e: React.FormEvent) => {
        e.preventDefault();
        patchProfile('/settings/profile', {
            onSuccess: () => {
                // Keep modal open, show success toast normally via flash, or just close
                setIsProfileModalOpen(false);
            },
            preserveScroll: true
        });
    };

    const submitPassword = (e: React.FormEvent) => {
        e.preventDefault();
        putPassword('/settings/password', {
            onSuccess: () => {
                resetPassword();
                setIsProfileModalOpen(false);
            },
            preserveScroll: true
        });
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const pendientes = solicitudes.filter(s => s.estado !== 'entregado' && s.estado !== 'cancelado').length;

    // Calcular datos dinámicos para los widgets
    const todosPedidos = [...pedidosPreventa, ...pedidosStock].sort((a, b) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime());
    
    // Obtener pedido en tránsito (si hay alguno 'enviado' o usamos el más reciente que no esté 'entregado')
    const pedidoEnTransito = todosPedidos.find(p => p.estado.toLowerCase() === 'enviado' || p.estado.toLowerCase() === 'en tránsito') 
        || todosPedidos.find(p => p.estado.toLowerCase() !== 'entregado' && p.estado.toLowerCase() !== 'cancelado');

    // Generar alertas simuladas a partir de la data real
    const alertas = [];
    solicitudes.slice(0, 2).forEach(sol => {
        if (sol.precio_cotizado) {
            alertas.push({
                icon: AlertCircle,
                color: 'red',
                text: `Cotización para ${sol.nombre} lista por ¥${Number(sol.precio_cotizado).toLocaleString()}.`,
                date: sol.fecha_creacion
            });
        }
    });
    if (pedidoEnTransito && pedidoEnTransito.estado.toLowerCase() === 'enviado') {
        alertas.push({
            icon: CheckCircle2,
            color: 'blue',
            text: `El pedido ${pedidoEnTransito.id_pedido} está en camino a tu domicilio.`,
            date: pedidoEnTransito.fecha_creacion
        });
    }
    if (alertas.length === 0) {
        alertas.push({
            icon: Info,
            color: 'neutral',
            text: `No hay alertas nuevas por el momento. Explora nuestro catálogo de preventas.`,
            date: new Date().toISOString()
        });
    }

    return (
        <PublicLayout>
            <Head title="Mi Perfil - MotnekiStore" />

            <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 w-full font-sans">
                
                {/* TOP ROW: Welcome & Rank */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Welcome Card */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#1C1612] rounded-2xl border border-[#ff5500]/20 p-8 shadow-sm flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff5500]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                            <h1 className="text-3xl font-bold text-neutral-800 dark:text-white mb-2">Hola, {auth.user.nombre} 👋</h1>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base">
                                Bienvenido a tu panel de gestión empresarial. Tienes <span className="font-bold text-[#ff5500]">{pendientes} cotizaciones pendientes</span> de revisión.
                            </p>
                        </div>
                    </div>

                    {/* Rank Card */}
                    <div className="lg:col-span-1 bg-white dark:bg-[#1C1612] rounded-2xl border border-[#ff5500]/20 p-6 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="font-bold text-lg text-neutral-800 dark:text-white">Otaku Rank</h2>
                                <p className="text-sm text-neutral-500">Nivel Actual</p>
                            </div>
                            <span className="bg-[#ff5500]/20 text-[#ff5500] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-[#ff5500]/30 shadow-[0_0_10px_rgba(255,85,0,0.2)]">
                                <Star className="w-3 h-3 fill-current" /> VIP
                            </span>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-xs mb-2">
                                <span className="font-bold text-neutral-800 dark:text-white">4,500 Pts</span>
                                <span className="text-neutral-500">5,000 Pts para Legend</span>
                            </div>
                            <div className="w-full h-2.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden flex">
                                <div className="h-full bg-gradient-to-r from-[#ff5500] to-[#ff8800] w-[90%] rounded-full shadow-[0_0_8px_rgba(255,85,0,0.5)]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MIDDLE ROW: Profile & Interests */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {/* Mi Perfil */}
                    <div className="lg:col-span-2 bg-white dark:bg-[#1C1612] rounded-2xl border border-[#ff5500]/20 p-6 sm:p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-6 border-b border-neutral-100 dark:border-neutral-800/50 pb-4">
                            <h2 className="font-bold text-xl text-neutral-800 dark:text-white flex items-center gap-2"><User className="w-5 h-5 text-neutral-400" /> Mi Perfil</h2>
                            <button 
                                onClick={() => setIsProfileModalOpen(true)}
                                className="flex items-center gap-2 text-sm font-bold text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                            >
                                <Edit className="w-4 h-4" /> Editar
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-2">Nombre Completo</label>
                                <div className="px-4 py-3 bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-800 dark:text-neutral-200 text-sm font-medium">{auth.user.nombre}</div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-2">Email Corporativo</label>
                                <div className="px-4 py-3 bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-800 dark:text-neutral-200 text-sm font-medium">{auth.user.email}</div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-2">Teléfono</label>
                                <div className="px-4 py-3 bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 rounded-lg text-neutral-800 dark:text-neutral-200 text-sm w-full md:w-1/2 font-medium">{auth.user.telefono || 'No registrado'}</div>
                            </div>
                        </div>

                        <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
                            <DialogContent className="sm:max-w-xl bg-white dark:bg-[#1C1612] border-neutral-200 dark:border-[#3a3939]/30 p-0 overflow-hidden">
                                <div className="flex border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#151515]">
                                    <button
                                        onClick={() => setActiveProfileTab('informacion')}
                                        className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeProfileTab === 'informacion' ? 'text-[#ff5500] border-b-2 border-[#ff5500] bg-white dark:bg-[#1C1612]' : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'}`}
                                    >
                                        <User className="w-4 h-4" /> Información Personal
                                    </button>
                                    <button
                                        onClick={() => setActiveProfileTab('seguridad')}
                                        className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeProfileTab === 'seguridad' ? 'text-[#ff5500] border-b-2 border-[#ff5500] bg-white dark:bg-[#1C1612]' : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300'}`}
                                    >
                                        <Shield className="w-4 h-4" /> Seguridad
                                    </button>
                                </div>

                                <div className="p-6">
                                    {activeProfileTab === 'informacion' && (
                                        <form onSubmit={submitProfile} className="space-y-4 animate-in fade-in">
                                            <div>
                                                <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-1">Información Básica</h3>
                                                <p className="text-sm text-neutral-500 mb-4">Actualiza tu nombre, correo electrónico y teléfono.</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1">Nombre Completo</label>
                                                <input 
                                                    type="text" 
                                                    value={profileData.nombre}
                                                    onChange={e => setProfileData('nombre', e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-800 dark:text-neutral-200 focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] outline-none"
                                                />
                                                {profileErrors.nombre && <p className="text-red-500 text-xs mt-1">{profileErrors.nombre}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1">Email</label>
                                                <input 
                                                    type="email" 
                                                    value={profileData.email}
                                                    onChange={e => setProfileData('email', e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-800 dark:text-neutral-200 focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] outline-none"
                                                />
                                                {profileErrors.email && <p className="text-red-500 text-xs mt-1">{profileErrors.email}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1">Teléfono</label>
                                                <input 
                                                    type="text" 
                                                    value={profileData.telefono}
                                                    onChange={e => setProfileData('telefono', e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-800 dark:text-neutral-200 focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] outline-none"
                                                    placeholder="Ej. +81 90-1234-5678"
                                                />
                                                {profileErrors.telefono && <p className="text-red-500 text-xs mt-1">{profileErrors.telefono}</p>}
                                            </div>
                                            <div className="pt-2 flex justify-end gap-3">
                                                <button 
                                                    type="button" 
                                                    onClick={() => setIsProfileModalOpen(false)}
                                                    className="px-5 py-2.5 rounded-lg text-sm font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#151515] transition-colors"
                                                >
                                                    Cancelar
                                                </button>
                                                <button 
                                                    type="submit" 
                                                    disabled={profileProcessing}
                                                    className="px-5 py-2.5 bg-[#ff5500] hover:bg-[#cc4400] text-white rounded-lg text-sm font-bold shadow-md disabled:opacity-50 transition-colors"
                                                >
                                                    {profileProcessing ? 'Guardando...' : 'Guardar Cambios'}
                                                </button>
                                            </div>
                                        </form>
                                    )}

                                    {activeProfileTab === 'seguridad' && (
                                        <form onSubmit={submitPassword} className="space-y-4 animate-in fade-in">
                                            <div>
                                                <h3 className="text-lg font-bold text-neutral-800 dark:text-white mb-1">Cambiar Contraseña</h3>
                                                <p className="text-sm text-neutral-500 mb-4">Asegúrate de usar una contraseña larga y segura para proteger tu cuenta.</p>
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1">Contraseña Actual</label>
                                                <input 
                                                    type="password" 
                                                    value={passwordData.current_password}
                                                    onChange={e => setPasswordData('current_password', e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-800 dark:text-neutral-200 focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] outline-none"
                                                />
                                                {passwordErrors.current_password && <p className="text-red-500 text-xs mt-1">{passwordErrors.current_password}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1">Nueva Contraseña</label>
                                                <input 
                                                    type="password" 
                                                    value={passwordData.password}
                                                    onChange={e => setPasswordData('password', e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-800 dark:text-neutral-200 focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] outline-none"
                                                />
                                                {passwordErrors.password && <p className="text-red-500 text-xs mt-1">{passwordErrors.password}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1">Confirmar Nueva Contraseña</label>
                                                <input 
                                                    type="password" 
                                                    value={passwordData.password_confirmation}
                                                    onChange={e => setPasswordData('password_confirmation', e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-800 dark:text-neutral-200 focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] outline-none"
                                                />
                                                {passwordErrors.password_confirmation && <p className="text-red-500 text-xs mt-1">{passwordErrors.password_confirmation}</p>}
                                            </div>
                                            <div className="pt-2 flex justify-end gap-3">
                                                <button 
                                                    type="button" 
                                                    onClick={() => setIsProfileModalOpen(false)}
                                                    className="px-5 py-2.5 rounded-lg text-sm font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#151515] transition-colors"
                                                >
                                                    Cancelar
                                                </button>
                                                <button 
                                                    type="submit" 
                                                    disabled={passwordProcessing}
                                                    className="px-5 py-2.5 bg-[#ff5500] hover:bg-[#cc4400] text-white rounded-lg text-sm font-bold shadow-md disabled:opacity-50 transition-colors"
                                                >
                                                    {passwordProcessing ? 'Guardando...' : 'Actualizar Contraseña'}
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </DialogContent>
                        </Dialog>
                        
                        <div>
                            <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-3">Direcciones de Envío</label>
                            
                            <div className="space-y-3 mb-4">
                                {direcciones.map((dir, index) => (
                                    <div key={dir.id_direccion} className="flex items-start justify-between p-4 bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 rounded-xl relative group">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-bold text-sm text-neutral-800 dark:text-white">{dir.direccion}</p>
                                                {index === 0 && <span className="bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Principal</span>}
                                            </div>
                                            <p className="text-xs text-neutral-500">{dir.ciudad}, {dir.pais} - {dir.codigo_postal}</p>
                                        </div>
                                        <button 
                                            onClick={() => openAddressModal(dir)}
                                            className="text-neutral-400 hover:text-[#ff5500] p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Editar Dirección"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                
                                {direcciones.length === 0 && (
                                    <p className="text-sm text-neutral-500 py-2">No tienes direcciones registradas.</p>
                                )}
                            </div>

                            <button onClick={() => openAddressModal()} className="w-full py-3.5 border border-dashed border-neutral-300 dark:border-neutral-700 hover:border-[#ff5500]/50 text-neutral-500 hover:text-[#ff5500] font-bold text-sm rounded-xl hover:bg-[#ff5500]/5 transition-all flex items-center justify-center gap-2">
                                + Agregar Nueva Dirección
                            </button>
                            <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
                                <DialogContent className="sm:max-w-md bg-white dark:bg-[#1C1612] border-neutral-200 dark:border-[#3a3939]/30">
                                    <DialogHeader>
                                        <DialogTitle className="text-lg font-bold text-neutral-800 dark:text-white">
                                            {editingAddressId ? 'Editar Dirección' : 'Agregar Nueva Dirección'}
                                        </DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={submitAddress} className="space-y-4 mt-4">
                                        <div>
                                            <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1">Dirección completa</label>
                                            <input 
                                                type="text" 
                                                value={addressData.direccion}
                                                onChange={e => setAddressData('direccion', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-800 dark:text-neutral-200 focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] outline-none"
                                                placeholder="Ej. Av. Javier Prado Este 1234"
                                            />
                                            {addressErrors.direccion && <p className="text-red-500 text-xs mt-1">{addressErrors.direccion}</p>}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1">Ciudad</label>
                                                <input 
                                                    type="text" 
                                                    value={addressData.ciudad}
                                                    onChange={e => setAddressData('ciudad', e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-800 dark:text-neutral-200 focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] outline-none"
                                                    placeholder="Ej. Lima"
                                                />
                                                {addressErrors.ciudad && <p className="text-red-500 text-xs mt-1">{addressErrors.ciudad}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1">País</label>
                                                <input 
                                                    type="text" 
                                                    value={addressData.pais}
                                                    onChange={e => setAddressData('pais', e.target.value)}
                                                    className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-800 dark:text-neutral-200 focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] outline-none"
                                                    placeholder="Ej. Perú"
                                                />
                                                {addressErrors.pais && <p className="text-red-500 text-xs mt-1">{addressErrors.pais}</p>}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1">Código Postal</label>
                                            <input 
                                                type="text" 
                                                value={addressData.codigo_postal}
                                                onChange={e => setAddressData('codigo_postal', e.target.value)}
                                                className="w-full px-4 py-2.5 bg-neutral-50 dark:bg-[#151515] border border-neutral-200 dark:border-neutral-800 rounded-lg text-sm text-neutral-800 dark:text-neutral-200 focus:border-[#ff5500] focus:ring-1 focus:ring-[#ff5500] outline-none"
                                                placeholder="Ej. 15021"
                                            />
                                            {addressErrors.codigo_postal && <p className="text-red-500 text-xs mt-1">{addressErrors.codigo_postal}</p>}
                                        </div>
                                        <div className="pt-2 flex justify-end gap-3">
                                            <button 
                                                type="button" 
                                                onClick={() => setIsAddressModalOpen(false)}
                                                className="px-5 py-2.5 rounded-lg text-sm font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#151515] transition-colors"
                                            >
                                                Cancelar
                                            </button>
                                            <button 
                                                type="submit" 
                                                disabled={addressProcessing}
                                                className="px-5 py-2.5 bg-[#ff5500] hover:bg-[#cc4400] text-white rounded-lg text-sm font-bold shadow-md disabled:opacity-50 transition-colors"
                                            >
                                                {addressProcessing ? 'Guardando...' : 'Guardar Dirección'}
                                            </button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                    
                    {/* Mis Intereses */}
                    <div className="lg:col-span-1 bg-white dark:bg-[#1C1612] rounded-2xl border border-[#ff5500]/20 p-6 shadow-sm flex flex-col">
                        <h2 className="font-bold text-lg text-neutral-800 dark:text-white flex items-center gap-2 mb-6 border-b border-neutral-100 dark:border-neutral-800/50 pb-4"><Settings2 className="w-5 h-5 text-neutral-400" /> Mis Intereses</h2>
                        <div className="flex flex-wrap gap-2.5">
                            {['Gundam', 'Evangelion', 'Scale Figures 1/7', 'Artbooks'].map(tag => (
                                <span key={tag} className="px-4 py-1.5 border border-neutral-200 dark:border-neutral-700 rounded-full text-sm text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-[#151515] font-medium">
                                    {tag}
                                </span>
                            ))}
                            <button className="px-4 py-1.5 border border-dashed border-[#ff5500]/50 rounded-full text-sm text-[#ff5500] hover:bg-[#ff5500]/10 transition-colors font-medium">
                                + Agregar
                            </button>
                        </div>
                    </div>
                </div>

                {/* BOTTOM ROW: Requests, Tracking, Alerts, Preorders */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    <div className="lg:col-span-2 space-y-6">
                        {/* Solicitudes Proxy -> Solicitudes Personalizadas */}
                        <div className="bg-white dark:bg-[#1C1612] rounded-2xl border border-[#ff5500]/20 p-6 shadow-sm">
                            <div className="flex justify-between items-center mb-6 border-b border-neutral-100 dark:border-neutral-800/50 pb-4">
                                <h2 className="font-bold text-lg text-neutral-800 dark:text-white flex items-center gap-2"><Sparkles className="w-5 h-5 text-[#ff5500]" /> Solicitudes de figuras personalizadas</h2>
                                <button 
                                    onClick={() => setIsSolicitudModalOpen(true)}
                                    className="text-sm font-bold text-[#ff5500] hover:underline"
                                >
                                    + Nueva Solicitud
                                </button>
                            </div>
                            
                            <div className="space-y-4">
                                {solicitudes.length > 0 ? (
                                    solicitudes.map(solicitud => (
                                        <div key={solicitud.id_solicitud} className="border border-[#ff5500]/20 rounded-xl p-5 hover:border-[#ff5500]/50 transition-colors bg-neutral-50/50 dark:bg-[#151515]/50">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-neutral-800 dark:text-white text-base">{solicitud.nombre}</h3>
                                                <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${solicitud.estado === 'En evaluación' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                                    {solicitud.estado}
                                                </span>
                                            </div>
                                            <p className="text-xs text-neutral-500 mb-5">ID: PRX-{new Date(solicitud.fecha_creacion).getFullYear()}-{solicitud.id_solicitud.toString().padStart(3, '0')} • {formatDate(solicitud.fecha_creacion)}</p>
                                            <div className="flex justify-end gap-3">
                                                <button className="px-5 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-lg text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">Ver Detalle</button>
                                                {solicitud.precio_cotizado && (
                                                    <button className="px-5 py-2.5 bg-[#ff5500] hover:bg-[#cc4400] transition-colors rounded-lg text-xs font-bold text-white shadow-md shadow-[#ff5500]/20">Aprobar (¥ {Number(solicitud.precio_cotizado).toLocaleString()})</button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-neutral-500 text-sm py-4 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">No tienes solicitudes pendientes. ¡Anímate a solicitar una figura!</p>
                                )}
                            </div>
                        </div>

                        <FiguraPersonalizadaModal 
                            isOpen={isSolicitudModalOpen} 
                            onClose={() => setIsSolicitudModalOpen(false)} 
                        />
                        
                        {/* En Tránsito */}
                        <div className="bg-white dark:bg-[#1C1612] rounded-2xl border border-[#ff5500]/20 p-6 shadow-sm">
                            <h2 className="font-bold text-lg text-neutral-800 dark:text-white flex items-center gap-2 mb-6 border-b border-neutral-100 dark:border-neutral-800/50 pb-4"><Package className="w-5 h-5 text-neutral-400" /> En Tránsito</h2>
                            
                            {pedidoEnTransito ? (
                                <div className="border border-[#ff5500]/20 rounded-xl p-6 bg-neutral-50/50 dark:bg-[#151515]/50">
                                    <div className="flex justify-between items-center mb-8 border-b border-neutral-200/50 dark:border-neutral-800/50 pb-4">
                                        <h3 className="font-bold text-neutral-800 dark:text-white text-sm line-clamp-1">{pedidoEnTransito.detalles[0]?.producto?.nombre || `Pedido #${pedidoEnTransito.id_pedido}`}</h3>
                                        <span className="text-xs font-bold text-neutral-500 uppercase">{pedidoEnTransito.estado}</span>
                                    </div>
                                    
                                    <div className="relative mt-8 px-4 pb-2">
                                        <div className="absolute top-2.5 left-8 right-8 h-[2px] bg-neutral-200 dark:bg-neutral-800"></div>
                                        <div className={`absolute top-2.5 left-8 h-[2px] bg-[#ff5500] transition-all duration-1000 ${pedidoEnTransito.estado.toLowerCase() === 'enviado' ? 'w-full' : pedidoEnTransito.estado.toLowerCase() === 'pagado' ? 'w-1/2' : 'w-1/4'}`}></div>
                                        <div className="flex justify-between relative z-10">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-[#ff5500] text-white flex items-center justify-center"><CheckCircle2 className="w-3 h-3" /></div>
                                                <span className="text-[10px] font-bold text-neutral-800 dark:text-white">Recibido</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-2">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${['pagado', 'enviado', 'entregado'].includes(pedidoEnTransito.estado.toLowerCase()) ? 'bg-[#ff5500] text-white' : 'bg-neutral-200 dark:bg-neutral-800 text-transparent'}`}><CheckCircle2 className="w-3 h-3" /></div>
                                                <span className="text-[10px] font-bold text-neutral-800 dark:text-white">Procesado</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-2">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${['enviado', 'entregado'].includes(pedidoEnTransito.estado.toLowerCase()) ? 'bg-[#ff5500] text-white' : 'border-[3px] border-[#ff5500] bg-white dark:bg-[#1C1612] shadow-[0_0_8px_rgba(255,85,0,0.4)]'}`}>{['enviado', 'entregado'].includes(pedidoEnTransito.estado.toLowerCase()) && <CheckCircle2 className="w-3 h-3" />}</div>
                                                <span className="text-[10px] font-bold text-neutral-800 dark:text-white">En Camino</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-2">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${pedidoEnTransito.estado.toLowerCase() === 'entregado' ? 'bg-[#ff5500] text-white' : 'bg-neutral-200 dark:bg-neutral-800'}`}>{pedidoEnTransito.estado.toLowerCase() === 'entregado' && <CheckCircle2 className="w-3 h-3" />}</div>
                                                <span className="text-[10px] font-bold text-neutral-400">Entregado</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-neutral-500 text-sm py-4 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">No tienes paquetes en tránsito actualmente.</p>
                            )}
                        </div>
                    </div>
                    
                    <div className="lg:col-span-1 space-y-6">
                        {/* Alertas Recientes */}
                        <div className="bg-white dark:bg-[#1C1612] rounded-2xl border border-[#ff5500]/20 p-6 shadow-sm">
                            <h2 className="font-bold text-lg text-neutral-800 dark:text-white flex items-center gap-2 mb-6 border-b border-neutral-100 dark:border-neutral-800/50 pb-4"><AlertCircle className="w-5 h-5 text-neutral-400" /> Alertas Recientes</h2>
                            <div className="space-y-5">
                                {alertas.map((alerta, i) => (
                                    <React.Fragment key={i}>
                                        <div className="flex gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${alerta.color === 'red' ? 'bg-red-500/10 text-red-500' : alerta.color === 'blue' ? 'bg-blue-500/10 text-blue-500' : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'}`}>
                                                <alerta.icon className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-neutral-800 dark:text-white leading-tight mb-1">{alerta.text}</p>
                                                <p className="text-xs text-neutral-500">{formatDate(alerta.date)}</p>
                                            </div>
                                        </div>
                                        {i < alertas.length - 1 && <div className="w-full h-px bg-neutral-100 dark:bg-neutral-800/50"></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                        
                        {/* Preventas Activas */}
                        <div className="bg-white dark:bg-[#1C1612] rounded-2xl border border-[#ff5500]/20 p-6 shadow-sm">
                            <h2 className="font-bold text-lg text-neutral-800 dark:text-white flex items-center gap-2 mb-6 border-b border-neutral-100 dark:border-neutral-800/50 pb-4"><Clock className="w-5 h-5 text-neutral-400" /> Preventas Activas</h2>
                            <div className="space-y-4">
                                {pedidosPreventa.length > 0 ? pedidosPreventa.slice(0,3).map(pedido => (
                                    <div key={pedido.id_pedido} className="border border-neutral-200 dark:border-neutral-800 hover:border-[#ff5500]/40 transition-colors rounded-xl p-3 flex gap-4 items-center bg-neutral-50/50 dark:bg-[#151515]/50">
                                        <div className="w-14 h-14 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shrink-0 flex items-center justify-center shadow-sm">
                                            {pedido.detalles[0]?.producto?.imagen_url ? (
                                                <img src={pedido.detalles[0].producto.imagen_url} alt="Producto" className="w-full h-full object-cover" />
                                            ) : (
                                                <Package className="w-5 h-5 text-neutral-400" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-neutral-800 dark:text-white leading-tight mb-1.5 line-clamp-2">{pedido.detalles[0]?.producto?.nombre || 'Producto Desconocido'}</p>
                                            <p className="text-xs text-[#ff5500] font-bold">Llegada: {new Date(pedido.fecha_creacion).toLocaleDateString('es-ES', { month: 'short', year: 'numeric'})}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-neutral-500 text-sm py-4 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">No tienes preventas activas.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </PublicLayout>
    );
}
