import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Heart, X, Minus, Plus, ShieldCheck, Truck, ShoppingCart } from 'lucide-react';

export default function Carrito() {
    const { data, post, processing, errors } = useForm({
        id_direccion: 1, // Dirección de prueba
        metodo_pago: 'tarjeta', // Método por defecto
        productos: [
            { id_producto: 1, cantidad: 1 } // Simulando el producto actual en el carrito
        ]
    });

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('checkout.store'));
    };

    return (
        <PublicLayout>
            <Head title="Tu Carrito" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 border-b border-[#EADED5] dark:border-[#3a3939] pb-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#1C1612] dark:text-[#ffffff] tracking-tight">
                        Tu Carrito (1 artículos)
                    </h1>
                    <button className="flex items-center gap-2 text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500] transition-colors mt-4 sm:mt-0 text-sm font-medium">
                        <Heart className="w-4 h-4" />
                        <span>Mover a Lista de Deseos</span>
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">
                    
                    {/* Left Column: Cart Items */}
                    <div className="lg:w-2/3">
                        {/* Table Header (Hidden on mobile) */}
                        <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-bold text-[#888888] dark:text-[#9ca3af] tracking-wider uppercase mb-4">
                            <div className="col-span-6">DETALLES DEL PRODUCTO</div>
                            <div className="col-span-2 text-center">CANTIDAD</div>
                            <div className="col-span-2 text-center">PRECIO UNITARIO</div>
                            <div className="col-span-2 text-right">SUBTOTAL</div>
                        </div>

                        {/* Cart Item */}
                        <div className="border-t border-b border-[#EADED5] dark:border-[#3a3939] py-6 flex flex-col md:flex-row md:items-center gap-6">
                            
                            {/* Product Details */}
                            <div className="flex gap-4 md:w-1/2 lg:w-6/12">
                                <div className="w-24 h-24 bg-[#F2E5DC] dark:bg-[#1c1b1b] rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                                    {/* Placeholder Image matching the prompt */}
                                    <img src="https://images.unsplash.com/photo-1608197171836-8e50b717bbf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Power: Blood Fiend Ver." className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col justify-between py-1">
                                    <div>
                                        <p className="text-xs font-bold text-[#888888] dark:text-[#9ca3af] uppercase tracking-wider mb-1">MAX FACTORY</p>
                                        <h3 className="text-sm md:text-base font-bold text-[#1C1612] dark:text-[#ffffff] leading-snug">Power: Blood Fiend Ver. Pop Up Parade</h3>
                                    </div>
                                    <div className="flex items-center gap-4 mt-3">
                                        <button className="flex items-center gap-1.5 text-xs text-[#888888] dark:text-[#9ca3af] hover:text-[#1C1612] dark:hover:text-[#ffffff] transition-colors">
                                            <Heart className="w-3.5 h-3.5" />
                                            <span>Mover a Lista de Deseos</span>
                                        </button>
                                        <button className="flex items-center gap-1.5 text-xs text-[#ff5500] hover:text-[#e04a00] transition-colors">
                                            <X className="w-3.5 h-3.5" />
                                            <span>Eliminar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="md:w-2/12 flex justify-center">
                                <div className="flex items-center border border-[#EADED5] dark:border-[#3a3939] rounded-md h-10 w-full max-w-[100px]">
                                    <button className="w-8 h-full flex items-center justify-center text-[#888888] dark:text-[#9ca3af] hover:text-[#1C1612] dark:hover:text-[#ffffff] transition-colors">
                                        <Minus className="w-3.5 h-3.5" />
                                    </button>
                                    <input type="text" value="1" readOnly className="w-full text-center text-sm font-bold text-[#1C1612] dark:text-[#ffffff] bg-transparent border-none p-0 focus:ring-0" />
                                    <button className="w-8 h-full flex items-center justify-center text-[#888888] dark:text-[#9ca3af] hover:text-[#1C1612] dark:hover:text-[#ffffff] transition-colors">
                                        <Plus className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Unit Price */}
                            <div className="md:w-2/12 flex md:justify-center">
                                <span className="md:hidden text-xs text-[#888888] mr-2">Precio Unitario:</span>
                                <span className="text-sm font-medium text-[#888888] dark:text-[#9ca3af]">S/. 120.00</span>
                            </div>

                            {/* Subtotal */}
                            <div className="md:w-2/12 flex md:justify-end">
                                <span className="md:hidden text-xs text-[#888888] mr-2">Subtotal:</span>
                                <span className="text-base font-bold text-[#ff5500]">S/. 120.00</span>
                            </div>

                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:w-1/3">
                        <div className="bg-[#FAF5F0] dark:bg-[#1c1b1b] border border-[#EADED5] dark:border-[#3a3939] rounded-2xl p-6 md:p-8 sticky top-24">
                            <h2 className="text-xl md:text-2xl font-bold text-[#1C1612] dark:text-[#ffffff] mb-6">Resumen del Pedido</h2>
                            
                            <div className="space-y-4 text-sm text-[#1C1612] dark:text-[#ffffff]">
                                <div className="flex justify-between">
                                    <span className="text-[#888888] dark:text-[#9ca3af]">Subtotal (1 artículos)</span>
                                    <span className="font-medium">S/. 120.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-[#888888] dark:text-[#9ca3af]">Estimación de Envío</span>
                                    <span className="text-right text-[#888888] dark:text-[#9ca3af] text-xs max-w-[120px]">Calculado al finalizar compra</span>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-[#888888] dark:text-[#9ca3af]">Puntos de Recompensa Collector</span>
                                    <span className="text-[#ff5500] font-bold text-sm">+370 pts</span>
                                </div>
                            </div>

                            <div className="border-t border-[#EADED5] dark:border-[#3a3939] my-6"></div>

                            <div className="flex justify-between items-center mb-6">
                                <span className="font-bold text-[#1C1612] dark:text-[#ffffff]">Total del Pedido</span>
                                <span className="text-2xl md:text-3xl font-black text-[#ff5500]">S/. 120.00</span>
                            </div>

                            <button 
                                onClick={handleCheckout}
                                disabled={processing}
                                className="w-full bg-[#ff5500] hover:bg-[#e04a00] text-white py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-colors shadow-md hover:shadow-lg mb-8 disabled:opacity-50">
                                {processing ? 'Procesando...' : 'Proceder al Pago'}
                            </button>
                            {errors.error && (
                                <p className="text-red-500 text-sm mb-4 text-center font-medium">{errors.error}</p>
                            )}

                            {/* Trust Badges */}
                            <div className="space-y-4 mb-8">
                                <div className="flex gap-3">
                                    <ShieldCheck className="w-5 h-5 text-[#8A4A21] dark:text-[#9ca3af] shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold text-[#1C1612] dark:text-[#ffffff]">Garantía de Autenticidad</p>
                                        <p className="text-[10px] text-[#888888] dark:text-[#9ca3af] mt-0.5 uppercase tracking-wide">CADA FIGURA ES 100% MERCANCÍA OFICIAL LICENCIADA.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Truck className="w-5 h-5 text-[#8A4A21] dark:text-[#9ca3af] shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold text-[#1C1612] dark:text-[#ffffff]">Envío Global Express</p>
                                        <p className="text-[10px] text-[#888888] dark:text-[#9ca3af] mt-0.5 uppercase tracking-wide">ENVÍO ASEGURADO A TODO EL MUNDO DESDE AKIHABARA, TOKIO.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-[#EADED5] dark:border-[#3a3939] my-6"></div>

                            {/* Promo Code */}
                            <div>
                                <p className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] mb-3">¿Tienes un código promocional?</p>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        placeholder="Ingresar código" 
                                        className="w-full bg-white dark:bg-[#131313] border border-[#EADED5] dark:border-[#3a3939] rounded-md px-4 py-2 text-sm text-[#1C1612] dark:text-[#ffffff] focus:ring-[#ff5500] focus:border-[#ff5500]"
                                    />
                                    <button className="px-4 py-2 bg-transparent border border-[#EADED5] dark:border-[#3a3939] text-[#1C1612] dark:text-[#ffffff] rounded-md text-xs font-bold tracking-wider uppercase hover:bg-[#F2E5DC] dark:hover:bg-[#3a3939] transition-colors">
                                        Aplicar
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Saved for later */}
                <div className="mt-20">
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-2xl font-bold text-[#1C1612] dark:text-[#ffffff]">Guardado para más tarde</h2>
                        <Link href="/favoritos" className="text-xs font-bold text-[#8A4A21] dark:text-[#9ca3af] hover:text-[#ff5500] dark:hover:text-[#ff5500] tracking-widest uppercase transition-colors">
                            VER LISTA DE DESEOS
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {/* Fake Card 1 */}
                        <div className="group border border-[#EADED5] dark:border-[#3a3939] rounded-xl overflow-hidden hover:border-[#ff5500] dark:hover:border-[#ff5500] transition-colors bg-[#FAF5F0] dark:bg-[#1c1b1b]">
                            <div className="relative aspect-square bg-[#F2E5DC] dark:bg-[#131313] p-4 flex items-center justify-center">
                                <img src="https://images.unsplash.com/photo-1613310023042-ad79320c00ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Ichigo Kurosaki" className="object-contain h-full w-full" />
                                <button className="absolute top-3 right-3 bg-[#ff5500] text-white p-2 rounded-full shadow-md hover:bg-[#e04a00] transition-colors opacity-100">
                                    <ShoppingCart className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-4 bg-white dark:bg-[#1c1b1b]">
                                <p className="text-[10px] font-bold text-[#888888] dark:text-[#9ca3af] uppercase tracking-wider mb-1">GOOD SMILE COMPANY</p>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] leading-tight mb-2 h-10 line-clamp-2">Figura Estatua de Resina Anime Forma Hueca Bleach Ichigo Kurosaki</h3>
                                <p className="text-base font-black text-[#ff5500]">S/. 721.96</p>
                            </div>
                        </div>

                        {/* Fake Card 2 */}
                        <div className="group border border-[#EADED5] dark:border-[#3a3939] rounded-xl overflow-hidden hover:border-[#ff5500] dark:hover:border-[#ff5500] transition-colors bg-[#FAF5F0] dark:bg-[#1c1b1b]">
                            <div className="relative aspect-square bg-[#F2E5DC] dark:bg-[#131313] p-4 flex items-center justify-center">
                                <img src="https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Naruto Might Guy" className="object-contain h-full w-full" />
                                <button className="absolute top-3 right-3 bg-[#ff5500] text-white p-2 rounded-full shadow-md hover:bg-[#e04a00] transition-colors opacity-100">
                                    <ShoppingCart className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-4 bg-white dark:bg-[#1c1b1b]">
                                <p className="text-[10px] font-bold text-[#888888] dark:text-[#9ca3af] uppercase tracking-wider mb-1">PICKSTAR STUDIO</p>
                                <h3 className="text-sm font-bold text-[#1C1612] dark:text-[#ffffff] leading-tight mb-2 h-10 line-clamp-2">Naruto Might Guy</h3>
                                <p className="text-base font-black text-[#ff5500]">S/. 80.00</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </PublicLayout>
    );
}
