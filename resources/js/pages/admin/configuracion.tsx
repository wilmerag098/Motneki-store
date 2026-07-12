import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { 
    Store, Truck, Share2, Settings as SettingsIcon, 
    Save, CheckCircle2, AlertCircle
} from 'lucide-react';

interface ConfiguracionProps {
    configuracion: {
        nombre_tienda: string;
        correo_contacto: string;
        telefono_contacto: string;
        direccion_fisica: string;
        costo_envio_estandar: number;
        costo_envio_express: number;
        umbral_envio_gratis: number;
        instagram_url: string;
        tiktok_url: string;
        facebook_url: string;
        twitter_url: string;
        modo_mantenimiento: boolean;
        moneda_base: string;
        mensaje_anuncio: string;
    };
}

export default function Configuracion({ configuracion }: ConfiguracionProps) {
    const { flash } = usePage().props as any;
    const [activeTab, setActiveTab] = useState('general');

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        ...configuracion
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/configuracion', {
            preserveScroll: true
        });
    };

    const tabs = [
        { id: 'general', label: 'General', icon: Store },
        { id: 'logistica', label: 'Envíos y Logística', icon: Truck },
        { id: 'social', label: 'Redes Sociales', icon: Share2 },
        { id: 'avanzado', label: 'Avanzado', icon: SettingsIcon },
    ];

    return (
        <AdminLayout title="Configuración de Tienda">
            <Head title="Configuración" />

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mt-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1C1612] tracking-tight">Configuración Global</h1>
                    <p className="text-sm text-gray-500 mt-1">Administra los parámetros generales de Motneki Store.</p>
                </div>
                <button 
                    onClick={handleSubmit}
                    disabled={processing}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#ff5500] text-white font-bold rounded-lg hover:bg-[#e64a00] transition-colors shadow-sm disabled:opacity-50"
                >
                    <Save className="w-4 h-4" />
                    {processing ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>

            {recentlySuccessful && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3 text-green-700 animate-in fade-in slide-in-from-top-4">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="font-bold">¡Configuración guardada exitosamente!</span>
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-8">
                {/* Tabs Navigation */}
                <div className="w-full md:w-64 shrink-0 space-y-1">
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

                {/* Form Content */}
                <div className="flex-1">
                    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        
                        {/* Tab: General */}
                        {activeTab === 'general' && (
                            <div className="space-y-6 animate-in fade-in">
                                <div>
                                    <h3 className="text-lg font-bold text-[#1C1612] mb-1">Información de la Tienda</h3>
                                    <p className="text-sm text-gray-500 mb-6">Estos detalles se mostrarán públicamente en tu tienda y correos.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Nombre de la Tienda</label>
                                        <input 
                                            type="text" 
                                            value={data.nombre_tienda}
                                            onChange={e => setData('nombre_tienda', e.target.value)}
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]" 
                                        />
                                        {errors.nombre_tienda && <p className="text-red-500 text-xs mt-1">{errors.nombre_tienda}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Correo de Contacto</label>
                                        <input 
                                            type="email" 
                                            value={data.correo_contacto}
                                            onChange={e => setData('correo_contacto', e.target.value)}
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]" 
                                        />
                                        {errors.correo_contacto && <p className="text-red-500 text-xs mt-1">{errors.correo_contacto}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Teléfono de Soporte</label>
                                        <input 
                                            type="text" 
                                            value={data.telefono_contacto}
                                            onChange={e => setData('telefono_contacto', e.target.value)}
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]" 
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Dirección Física (Envíos/Devoluciones)</label>
                                        <input 
                                            type="text" 
                                            value={data.direccion_fisica}
                                            onChange={e => setData('direccion_fisica', e.target.value)}
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]" 
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab: Logística */}
                        {activeTab === 'logistica' && (
                            <div className="space-y-6 animate-in fade-in">
                                <div>
                                    <h3 className="text-lg font-bold text-[#1C1612] mb-1">Configuración de Envíos</h3>
                                    <p className="text-sm text-gray-500 mb-6">Define los costos base que se cobrarán en el checkout.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Costo Envío Estándar (S/.)</label>
                                        <input 
                                            type="number" step="0.10"
                                            value={data.costo_envio_estandar}
                                            onChange={e => setData('costo_envio_estandar', parseFloat(e.target.value))}
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Costo Envío Express (S/.)</label>
                                        <input 
                                            type="number" step="0.10"
                                            value={data.costo_envio_express}
                                            onChange={e => setData('costo_envio_express', parseFloat(e.target.value))}
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]" 
                                        />
                                    </div>
                                    <div className="md:col-span-2 p-4 bg-orange-50 border border-orange-100 rounded-lg mt-2">
                                        <div className="flex gap-3">
                                            <AlertCircle className="w-5 h-5 text-[#ff5500] shrink-0" />
                                            <div>
                                                <label className="block text-sm font-bold text-orange-900 mb-1">Umbral para Envío Gratis (S/.)</label>
                                                <p className="text-xs text-orange-700 mb-3">Los clientes que superen este monto en su carrito tendrán envío gratuito.</p>
                                                <input 
                                                    type="number" step="0.10"
                                                    value={data.umbral_envio_gratis}
                                                    onChange={e => setData('umbral_envio_gratis', parseFloat(e.target.value))}
                                                    className="w-full md:w-1/2 rounded-lg border-orange-200 bg-white p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab: Redes Sociales */}
                        {activeTab === 'social' && (
                            <div className="space-y-6 animate-in fade-in">
                                <div>
                                    <h3 className="text-lg font-bold text-[#1C1612] mb-1">Redes Sociales</h3>
                                    <p className="text-sm text-gray-500 mb-6">Actualiza los enlaces que aparecen en el pie de página de la tienda.</p>
                                </div>
                                <div className="space-y-4 max-w-xl">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Instagram URL</label>
                                        <input 
                                            type="url" 
                                            value={data.instagram_url}
                                            onChange={e => setData('instagram_url', e.target.value)}
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]" placeholder="https://instagram.com/..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">TikTok URL</label>
                                        <input 
                                            type="url" 
                                            value={data.tiktok_url}
                                            onChange={e => setData('tiktok_url', e.target.value)}
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]" placeholder="https://tiktok.com/@..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Facebook URL</label>
                                        <input 
                                            type="url" 
                                            value={data.facebook_url}
                                            onChange={e => setData('facebook_url', e.target.value)}
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]" 
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab: Avanzado */}
                        {activeTab === 'avanzado' && (
                            <div className="space-y-6 animate-in fade-in">
                                <div>
                                    <h3 className="text-lg font-bold text-[#1C1612] mb-1">Configuración Avanzada</h3>
                                    <p className="text-sm text-gray-500 mb-6">Ajustes del comportamiento del sistema.</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                        <div>
                                            <h4 className="font-bold text-gray-900">Modo Mantenimiento</h4>
                                            <p className="text-xs text-gray-500 mt-1">Cierra la tienda temporalmente para actualizaciones.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input 
                                                type="checkbox" 
                                                className="sr-only peer"
                                                checked={data.modo_mantenimiento}
                                                onChange={e => setData('modo_mantenimiento', e.target.checked)}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#ff5500]/20 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ff5500]"></div>
                                        </label>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Moneda Principal</label>
                                        <select 
                                            value={data.moneda_base}
                                            onChange={e => setData('moneda_base', e.target.value)}
                                            className="w-full md:w-1/3 rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]"
                                        >
                                            <option value="PEN">Soles (PEN)</option>
                                            <option value="MXN">Pesos (MXN)</option>
                                            <option value="USD">Dólares (USD)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Mensaje de Anuncio (Cinta superior)</label>
                                        <input 
                                            type="text" 
                                            value={data.mensaje_anuncio}
                                            onChange={e => setData('mensaje_anuncio', e.target.value)}
                                            className="w-full rounded-lg border-gray-200 bg-gray-50 p-2.5 text-sm focus:border-[#ff5500] focus:ring-[#ff5500]" placeholder="Ej. ¡Envíos gratis este fin de semana!"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
