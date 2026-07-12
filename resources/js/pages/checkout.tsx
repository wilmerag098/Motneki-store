import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { MapPin, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function Checkout() {
    const { cart, getCartTotal } = useStore();
    const hasPreventa = cart.some(item => item.status === 'PREVENTA');

    const { data, setData, post, processing, errors } = useForm({
        direccion: '',
        ciudad: '',
        pais: 'Perú',
        codigo_postal: '',
        metodo_envio: 'estandar',
        metodo_pago: 'tarjeta',
        items: cart,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/checkout');
    };

    const subtotal = getCartTotal();
    const costoEnvio = data.metodo_envio === 'express' ? 15.00 : 0.00;
    const total = subtotal + costoEnvio;

    return (
        <PublicLayout>
            <Head title="Checkout - Finalizar Compra" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
                
                <h1 className="text-3xl md:text-4xl font-bold text-[#1C1612] dark:text-[#ffffff] tracking-tight mb-8 border-b border-[#EADED5] dark:border-[#3a3939] pb-4">
                    Finalizar Compra
                </h1>

                {hasPreventa && (
                    <div className="bg-[#ff5500]/10 border border-[#ff5500]/30 rounded-2xl p-4 mb-8 flex items-start gap-4">
                        <div className="mt-1 flex-shrink-0 text-[#ff5500]">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-[#1C1612] dark:text-white">Pedido de Preventa detectado</h3>
                            <p className="text-sm text-[#888888] dark:text-gray-400 mt-1">
                                Tu pedido contiene artículos en preventa. Todo el pedido se enviará junto una vez que el artículo en preventa esté disponible.
                            </p>
                        </div>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-10">
                    
                    {/* Left Column: Formularios */}
                    <div className="lg:w-2/3">
                        <form onSubmit={handleSubmit} id="checkout-form">
                            
                            {/* 1. Dirección de Envío */}
                            <div className="bg-white dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] rounded-2xl p-6 md:p-8 mb-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-[#ff5500]/10 flex items-center justify-center text-[#ff5500]">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-xl font-bold text-[#1C1612] dark:text-[#ffffff]">1. Dirección de Envío</h2>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-[#8c7365] dark:text-[#9ca3af] mb-1">Dirección completa</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={data.direccion}
                                            onChange={e => setData('direccion', e.target.value)}
                                            placeholder="Av. Principal 123, Dpto 4"
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-[#3a3939] bg-white dark:bg-[#2a2929] rounded-lg focus:ring-2 focus:ring-[#ff5500] outline-none text-sm text-gray-800 dark:text-white"
                                        />
                                        {errors.direccion && <p className="text-xs text-red-500 mt-1">{errors.direccion}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-bold text-[#8c7365] dark:text-[#9ca3af] mb-1">Ciudad / Distrito</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={data.ciudad}
                                            onChange={e => setData('ciudad', e.target.value)}
                                            placeholder="Lima"
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-[#3a3939] bg-white dark:bg-[#2a2929] rounded-lg focus:ring-2 focus:ring-[#ff5500] outline-none text-sm text-gray-800 dark:text-white"
                                        />
                                        {errors.ciudad && <p className="text-xs text-red-500 mt-1">{errors.ciudad}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-[#8c7365] dark:text-[#9ca3af] mb-1">Código Postal</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={data.codigo_postal}
                                            onChange={e => setData('codigo_postal', e.target.value)}
                                            placeholder="LIMA 01"
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-[#3a3939] bg-white dark:bg-[#2a2929] rounded-lg focus:ring-2 focus:ring-[#ff5500] outline-none text-sm text-gray-800 dark:text-white"
                                        />
                                        {errors.codigo_postal && <p className="text-xs text-red-500 mt-1">{errors.codigo_postal}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* 2. Método de Envío */}
                            <div className="bg-white dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] rounded-2xl p-6 md:p-8 mb-6 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-[#ff5500]/10 flex items-center justify-center text-[#ff5500]">
                                        <Truck className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-xl font-bold text-[#1C1612] dark:text-[#ffffff]">2. Método de Envío</h2>
                                </div>
                                
                                <div className="space-y-3">
                                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${data.metodo_envio === 'estandar' ? 'border-[#ff5500] bg-[#ff5500]/5' : 'border-gray-200 dark:border-[#3a3939]'}`}>
                                        <input 
                                            type="radio" 
                                            name="metodo_envio" 
                                            value="estandar"
                                            checked={data.metodo_envio === 'estandar'}
                                            onChange={e => setData('metodo_envio', e.target.value)}
                                            className="w-4 h-4 text-[#ff5500] focus:ring-[#ff5500]"
                                        />
                                        <div className="ml-4 flex-1">
                                            <p className="font-bold text-[#1C1612] dark:text-[#ffffff]">Envío Estándar</p>
                                            <p className="text-xs text-gray-500">Entrega en 3 a 5 días hábiles</p>
                                        </div>
                                        <span className="font-bold text-[#888888]">Gratis</span>
                                    </label>

                                    <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${data.metodo_envio === 'express' ? 'border-[#ff5500] bg-[#ff5500]/5' : 'border-gray-200 dark:border-[#3a3939]'}`}>
                                        <input 
                                            type="radio" 
                                            name="metodo_envio" 
                                            value="express"
                                            checked={data.metodo_envio === 'express'}
                                            onChange={e => setData('metodo_envio', e.target.value)}
                                            className="w-4 h-4 text-[#ff5500] focus:ring-[#ff5500]"
                                        />
                                        <div className="ml-4 flex-1">
                                            <p className="font-bold text-[#1C1612] dark:text-[#ffffff]">Envío Express</p>
                                            <p className="text-xs text-gray-500">Entrega en 24 a 48 horas</p>
                                        </div>
                                        <span className="font-bold text-[#1C1612] dark:text-white">S/. 15.00</span>
                                    </label>
                                </div>
                            </div>

                            {/* 3. Pago */}
                            <div className="bg-white dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] rounded-2xl p-6 md:p-8 shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-full bg-[#ff5500]/10 flex items-center justify-center text-[#ff5500]">
                                        <CreditCard className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-xl font-bold text-[#1C1612] dark:text-[#ffffff]">3. Pago</h2>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <label className={`flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-colors text-center ${data.metodo_pago === 'tarjeta' ? 'border-[#ff5500] bg-[#ff5500]/5' : 'border-gray-200 dark:border-[#3a3939]'}`}>
                                        <input 
                                            type="radio" 
                                            name="metodo_pago" 
                                            value="tarjeta"
                                            checked={data.metodo_pago === 'tarjeta'}
                                            onChange={e => setData('metodo_pago', e.target.value)}
                                            className="sr-only"
                                        />
                                        <CreditCard className={`w-8 h-8 mb-2 ${data.metodo_pago === 'tarjeta' ? 'text-[#ff5500]' : 'text-gray-400'}`} />
                                        <span className="text-sm font-bold text-[#1C1612] dark:text-white">Tarjeta Débito/Crédito</span>
                                    </label>

                                    <label className={`flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-colors text-center ${data.metodo_pago === 'transferencia' ? 'border-[#ff5500] bg-[#ff5500]/5' : 'border-gray-200 dark:border-[#3a3939]'}`}>
                                        <input 
                                            type="radio" 
                                            name="metodo_pago" 
                                            value="transferencia"
                                            checked={data.metodo_pago === 'transferencia'}
                                            onChange={e => setData('metodo_pago', e.target.value)}
                                            className="sr-only"
                                        />
                                        <div className={`text-2xl font-bold mb-2 ${data.metodo_pago === 'transferencia' ? 'text-[#ff5500]' : 'text-gray-400'}`}>S/.</div>
                                        <span className="text-sm font-bold text-[#1C1612] dark:text-white">Transferencia / Yape</span>
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-[#FAF5F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] rounded-2xl p-6 md:p-8 sticky top-24">
                            <h2 className="text-xl md:text-2xl font-bold text-[#1C1612] dark:text-[#ffffff] mb-6">Resumen del Pedido</h2>
                            
                            <div className="space-y-4 text-sm text-[#1C1612] dark:text-[#ffffff]">
                                <div className="flex justify-between">
                                    <span className="text-[#888888] dark:text-[#9ca3af]">Subtotal ({cart.length} artículos)</span>
                                    <span className="font-medium">S/. {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#888888] dark:text-[#9ca3af]">Envío</span>
                                    <span className="font-medium">{costoEnvio === 0 ? 'Gratis' : `S/. ${costoEnvio.toFixed(2)}`}</span>
                                </div>
                            </div>

                            <div className="border-t border-[#EADED5] dark:border-[#3a3939] my-6"></div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-[#1C1612] dark:text-[#ffffff]">Total del Pedido</span>
                                <span className="text-2xl md:text-3xl font-black text-[#ff5500]">
                                    S/. {total.toFixed(2)}
                                </span>
                            </div>

                            <button 
                                type="submit"
                                form="checkout-form"
                                disabled={processing}
                                className="w-full bg-[#ff5500] hover:bg-[#e04a00] text-white py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-colors shadow-md hover:shadow-lg mb-8 disabled:opacity-50 flex items-center justify-center gap-2">
                                {processing ? 'Procesando...' : 'Confirmar Compra'}
                            </button>
                            {errors && Object.keys(errors).length > 0 && (
                                <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm mb-4">
                                    {Object.values(errors)[0] || 'Por favor completa todos los campos requeridos.'}
                                </div>
                            )}

                            {/* Trust Badges */}
                            <div className="space-y-4 mb-8 mt-6">
                                <div className="flex gap-3">
                                    <ShieldCheck className="w-5 h-5 text-[#8A4A21] dark:text-[#9ca3af] shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold text-[#1C1612] dark:text-[#ffffff]">Pago Seguro</p>
                                        <p className="text-[10px] text-[#888888] dark:text-[#9ca3af] mt-0.5 uppercase tracking-wide">Tus datos están protegidos.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    );
}
