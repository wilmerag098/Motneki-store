import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { 
    User, Shield, Bell, Key, MonitorSmartphone,
    Save, CheckCircle2, AlertCircle
} from 'lucide-react';

export default function Perfil() {
    const { auth, flash } = usePage().props as any;
    const user = auth.user;
    
    const [activeTab, setActiveTab] = useState('informacion');

    // Formulario para Información Personal
    const infoForm = useForm({
        nombre: user?.nombre || '',
        email: user?.email || '',
    });

    // Formulario para Contraseña
    const passwordForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitInfo = (e: React.FormEvent) => {
        e.preventDefault();
        infoForm.put('/admin/perfil/info', {
            preserveScroll: true,
        });
    };

    const submitPassword = (e: React.FormEvent) => {
        e.preventDefault();
        passwordForm.put('/admin/perfil/password', {
            preserveScroll: true,
            onSuccess: () => passwordForm.reset(),
        });
    };

    const tabs = [
        { id: 'informacion', label: 'Información Personal', icon: User },
        { id: 'seguridad', label: 'Seguridad', icon: Shield },
        { id: 'preferencias', label: 'Preferencias', icon: Bell },
    ];

    // Mostrar mensaje de éxito si alguna de las formas fue exitosa
    const showSuccess = flash?.success || infoForm.recentlySuccessful || passwordForm.recentlySuccessful;
    const successMessage = flash?.success || 'Cambios guardados correctamente.';

    return (
        <AdminLayout title="Perfil del Administrador">
            <Head title="Mi Perfil" />

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mt-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1C1612] tracking-tight">Mi Perfil</h1>
                    <p className="text-sm text-gray-500 mt-1">Gestiona tu información personal y credenciales de acceso.</p>
                </div>
            </div>

            {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700 animate-in fade-in slide-in-from-top-4">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-bold">{successMessage}</span>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
                {/* Tabs Navigation */}
                <div className="w-full md:w-64 shrink-0 space-y-1">
                    {/* Tarjeta de perfil lateral */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 flex flex-col items-center mb-4">
                        <div className="w-24 h-24 bg-[#1c1b1b] rounded-full flex items-center justify-center mb-4 border-4 border-gray-50 shadow-inner">
                            <span className="text-3xl font-black text-[#ff5500]">
                                {user?.nombre?.charAt(0)?.toUpperCase() || 'A'}
                            </span>
                        </div>
                        <h2 className="font-black text-gray-900 text-lg uppercase tracking-wide text-center">{user?.nombre}</h2>
                        <p className="text-xs text-gray-500 font-medium truncate w-full text-center">{user?.email}</p>
                        <span className="mt-3 px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-widest border border-green-200">Admin Activo</span>
                    </div>

                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-sm transition-colors ${
                                activeTab === tab.id 
                                    ? 'bg-white text-[#ff5500] shadow-sm border border-gray-100' 
                                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900 border border-transparent'
                            }`}
                        >
                            <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-[#ff5500]' : 'text-gray-400'}`} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        
                        {/* Tab: Información Personal */}
                        {activeTab === 'informacion' && (
                            <form onSubmit={submitInfo} className="p-6 md:p-8 animate-in fade-in">
                                <div>
                                    <h3 className="text-lg font-bold text-[#1C1612] mb-1">Información Básica</h3>
                                    <p className="text-sm text-gray-500 mb-6">Actualiza tu nombre y correo electrónico.</p>
                                </div>
                                
                                <div className="space-y-6 max-w-xl">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Nombre Completo</label>
                                        <input 
                                            type="text" 
                                            value={infoForm.data.nombre}
                                            onChange={e => infoForm.setData('nombre', e.target.value)}
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]" 
                                            disabled={infoForm.processing}
                                        />
                                        {infoForm.errors.nombre && <p className="text-red-500 text-xs mt-1">{infoForm.errors.nombre}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Correo Electrónico</label>
                                        <input 
                                            type="email" 
                                            value={infoForm.data.email}
                                            onChange={e => infoForm.setData('email', e.target.value)}
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]" 
                                            disabled={infoForm.processing}
                                        />
                                        {infoForm.errors.email && <p className="text-red-500 text-xs mt-1">{infoForm.errors.email}</p>}
                                    </div>
                                    
                                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                                        <button 
                                            type="submit"
                                            disabled={infoForm.processing || !infoForm.isDirty}
                                            className="flex items-center gap-2 px-6 py-2.5 bg-[#1C1612] text-white font-bold rounded-lg hover:bg-black transition-colors shadow-sm disabled:opacity-50"
                                        >
                                            <Save className="w-4 h-4" />
                                            {infoForm.processing ? 'Guardando...' : 'Actualizar Datos'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}

                        {/* Tab: Seguridad */}
                        {activeTab === 'seguridad' && (
                            <div className="animate-in fade-in">
                                <form onSubmit={submitPassword} className="p-6 md:p-8 border-b border-gray-100">
                                    <div>
                                        <h3 className="text-lg font-bold text-[#1C1612] mb-1">Cambiar Contraseña</h3>
                                        <p className="text-sm text-gray-500 mb-6">Asegúrate de que tu cuenta esté usando una contraseña larga y aleatoria para mantenerse segura.</p>
                                    </div>
                                    
                                    <div className="space-y-6 max-w-xl">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Contraseña Actual</label>
                                            <input 
                                                type="password" 
                                                value={passwordForm.data.current_password}
                                                onChange={e => passwordForm.setData('current_password', e.target.value)}
                                                className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]" 
                                                disabled={passwordForm.processing}
                                            />
                                            {passwordForm.errors.current_password && <p className="text-red-500 text-xs mt-1">{passwordForm.errors.current_password}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Nueva Contraseña</label>
                                            <input 
                                                type="password" 
                                                value={passwordForm.data.password}
                                                onChange={e => passwordForm.setData('password', e.target.value)}
                                                className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]" 
                                                disabled={passwordForm.processing}
                                            />
                                            {passwordForm.errors.password && <p className="text-red-500 text-xs mt-1">{passwordForm.errors.password}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Confirmar Nueva Contraseña</label>
                                            <input 
                                                type="password" 
                                                value={passwordForm.data.password_confirmation}
                                                onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                                className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]" 
                                                disabled={passwordForm.processing}
                                            />
                                        </div>
                                        
                                        <div className="pt-4 flex justify-end">
                                            <button 
                                                type="submit"
                                                disabled={passwordForm.processing || !passwordForm.data.current_password}
                                                className="flex items-center gap-2 px-6 py-2.5 bg-[#ff5500] text-white font-bold rounded-lg hover:bg-[#e64a00] transition-colors shadow-sm disabled:opacity-50"
                                            >
                                                <Key className="w-4 h-4" />
                                                {passwordForm.processing ? 'Actualizando...' : 'Actualizar Contraseña'}
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                <div className="p-6 md:p-8 bg-[#fcfaf9]">
                                    <div className="mb-6 flex justify-between items-start">
                                        <div>
                                            <h3 className="text-lg font-bold text-[#1C1612] mb-1">Sesiones de Navegador</h3>
                                            <p className="text-sm text-gray-500">Sesiones activas en otros dispositivos y navegadores.</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                                            <MonitorSmartphone className="w-8 h-8 text-green-500 shrink-0" strokeWidth={1.5} />
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-gray-900">Windows - Chrome</p>
                                                <p className="text-xs text-gray-500">Lima, Perú • 192.168.1.5</p>
                                            </div>
                                            <span className="text-[10px] font-bold text-green-700 bg-green-100 px-2 py-1 rounded uppercase tracking-widest">Este dispositivo</span>
                                        </div>
                                        <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-100 shadow-sm opacity-60">
                                            <MonitorSmartphone className="w-8 h-8 text-gray-400 shrink-0" strokeWidth={1.5} />
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-gray-900">iOS - Safari</p>
                                                <p className="text-xs text-gray-500">Lima, Perú • Hace 2 días</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab: Preferencias */}
                        {activeTab === 'preferencias' && (
                            <div className="p-6 md:p-8 animate-in fade-in">
                                <div>
                                    <h3 className="text-lg font-bold text-[#1C1612] mb-1">Preferencias del Panel</h3>
                                    <p className="text-sm text-gray-500 mb-6">Configura cómo interactúas con el sistema de administración.</p>
                                </div>
                                <div className="space-y-6 max-w-2xl">
                                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                        <div>
                                            <h4 className="font-bold text-gray-900">Modo Oscuro (Dark Mode)</h4>
                                            <p className="text-xs text-gray-500 mt-1">Cambia la apariencia del panel a colores oscuros.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#ff5500]/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff5500]"></div>
                                        </label>
                                    </div>
                                    
                                    <div className="p-4 border border-gray-100 rounded-lg space-y-4">
                                        <h4 className="font-bold text-gray-900 border-b border-gray-100 pb-2">Notificaciones por Correo Electrónico</h4>
                                        
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-bold text-gray-700">Nuevos Pedidos</p>
                                                <p className="text-xs text-gray-500">Recibe un correo cada vez que un cliente realice una compra.</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#ff5500]/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                                            </label>
                                        </div>
                                        
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-bold text-gray-700">Alertas de Stock</p>
                                                <p className="text-xs text-gray-500">Notificarme cuando un producto esté por agotarse.</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#ff5500]/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
