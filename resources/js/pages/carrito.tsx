import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/layouts/public-layout';
import { Heart, X, Minus, Plus, ShieldCheck, Truck, ShoppingCart, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function Carrito() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount, clearCart } = useStore();

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length > 0) {
            window.location.href = '/checkout';
        }
    };

    return (
        <PublicLayout>
            <Head title="Tu Carrito - MotnekiStore" />
            
            <div className="bg-[#FAF5F0] dark:bg-[#111111] min-h-screen relative overflow-hidden">
                {/* Background Ambient Glows */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#ff5500]/5 to-transparent pointer-events-none" />
                <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#ff5500]/10 blur-[120px] pointer-events-none" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 relative z-10">
                    
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-10 border-b border-[#EADED5] dark:border-[#3a3939] pb-6 relative">
                        <div className="absolute bottom-0 left-0 w-32 h-1 bg-[#ff5500] rounded-full translate-y-[2px]" />
                        <div>
                            <h1 className="text-4xl md:text-5xl font-['Outfit'] font-black text-transparent bg-clip-text bg-gradient-to-br from-[#1C1612] to-[#4a4036] dark:from-white dark:to-[#a0a0a0] tracking-tight mb-2">
                                Tu Carrito
                            </h1>
                            <p className="text-[#888888] font-bold text-sm">
                                {getCartCount()} {getCartCount() === 1 ? 'artículo' : 'artículos'} en total
                            </p>
                        </div>
                        {cart.length > 0 && (
                            <button onClick={clearCart} className="flex items-center gap-2 text-[#888888] dark:text-[#9ca3af] hover:text-red-500 transition-colors mt-4 sm:mt-0 text-sm font-bold tracking-widest uppercase bg-white/50 dark:bg-[#181818]/50 px-4 py-2 rounded-full border border-[#EADED5] dark:border-[#3a3939]">
                                <X className="w-4 h-4" />
                                <span>Vaciar Carrito</span>
                            </button>
                        )}
                    </div>

                    {cart.length === 0 ? (
                        /* Empty Cart State */
                        <div className="flex flex-col items-center justify-center py-20 bg-white/40 dark:bg-[#181818]/40 backdrop-blur-xl rounded-[2rem] border border-white/40 dark:border-[#3a3939] shadow-lg shadow-black/5 text-center px-4">
                            <div className="w-24 h-24 bg-gradient-to-br from-[#FFF6F0] to-[#FFE8D6] dark:from-[#2a1a11] dark:to-[#131313] rounded-full flex items-center justify-center text-[#ff5500] mb-6 shadow-inner">
                                <ShoppingCart className="w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-black text-[#1C1612] dark:text-white mb-2 font-['Outfit']">Tu carrito está vacío</h2>
                            <p className="text-[#6E7B8A] dark:text-[#a0a0a0] max-w-md mb-8">Parece que aún no has añadido nada a tu carrito. Explora nuestro catálogo y encuentra tus figuras favoritas.</p>
                            <Link href="/catalogo" className="bg-gradient-to-r from-[#1C1612] to-[#2c231c] dark:from-white dark:to-[#e0e0e0] hover:scale-105 text-white dark:text-[#1C1612] px-8 py-4 rounded-[1.25rem] font-black tracking-widest uppercase text-sm shadow-xl transition-transform flex items-center gap-2">
                                Explorar Catálogo <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                            
                            {/* Left Column: Cart Items */}
                            <div className="lg:w-7/12 xl:w-2/3">
                                {/* Table Header (Hidden on mobile) */}
                                <div className="hidden md:grid grid-cols-12 gap-4 text-xs font-black text-[#888888] dark:text-[#6e6e6e] tracking-widest uppercase mb-4 px-4">
                                    <div className="col-span-6">Producto</div>
                                    <div className="col-span-3 text-center">Cantidad</div>
                                    <div className="col-span-3 text-right">Subtotal</div>
                                </div>

                                <div className="space-y-4">
                                    {cart.map((item) => (
                                        <div key={item.id} className="bg-white/60 dark:bg-[#181818]/60 backdrop-blur-xl border border-white/40 dark:border-[#3a3939] rounded-[2rem] p-4 sm:p-6 flex flex-col md:flex-row md:items-center gap-6 shadow-sm hover:shadow-md transition-shadow group">
                                            
                                            {/* Product Details */}
                                            <div className="flex gap-4 md:w-6/12 relative">
                                                <button onClick={() => removeFromCart(item.id)} className="md:hidden absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-10">
                                                    <X className="w-4 h-4" />
                                                </button>
                                                <Link href={`/producto/${item.id}`} className="w-24 h-24 sm:w-28 sm:h-28 bg-white/80 dark:bg-[#111111]/80 rounded-[1.25rem] overflow-hidden shrink-0 flex items-center justify-center p-2 shadow-inner group-hover:shadow-[0_0_15px_rgba(255,85,0,0.1)] transition-shadow">
                                                    <img src={item.image} alt={item.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                                </Link>
                                                <div className="flex flex-col justify-center py-1">
                                                    <div>
                                                        <p className="text-[10px] font-black text-[#ff5500] uppercase tracking-widest mb-1">{item.brand}</p>
                                                        <Link href={`/producto/${item.id}`} className="text-sm sm:text-base font-black text-[#1C1612] dark:text-white leading-snug hover:text-[#ff5500] dark:hover:text-[#ff5500] transition-colors line-clamp-2">
                                                            {item.title}
                                                        </Link>
                                                    </div>
                                                    <div className="mt-2 md:hidden">
                                                        <span className="text-lg font-black text-[#ff5500]">S/. {(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quantity */}
                                            <div className="md:w-3/12 flex md:justify-center items-center justify-between md:border-l md:border-r border-[#EADED5] dark:border-[#3a3939] md:px-4">
                                                <span className="md:hidden text-xs font-bold text-[#888888] uppercase tracking-widest">Cantidad</span>
                                                <div className="flex items-center bg-white dark:bg-[#111111] border border-[#EADED5] dark:border-[#3a3939] rounded-[1rem] h-10 sm:h-12 w-28 sm:w-32 shadow-inner overflow-hidden">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-10 h-full flex items-center justify-center text-[#888888] hover:text-[#ff5500] hover:bg-[#ff5500]/5 transition-colors">
                                                        <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    </button>
                                                    <span className="w-full text-center text-sm font-black text-[#1C1612] dark:text-white">
                                                        {item.quantity}
                                                    </span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-10 h-full flex items-center justify-center text-[#888888] hover:text-[#ff5500] hover:bg-[#ff5500]/5 transition-colors">
                                                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Subtotal & Actions */}
                                            <div className="hidden md:w-3/12 md:flex flex-col items-end justify-center relative">
                                                <button onClick={() => removeFromCart(item.id)} className="absolute -top-3 -right-3 text-[#888888] hover:text-red-500 bg-white dark:bg-[#181818] rounded-full p-1 border border-[#EADED5] dark:border-[#3a3939] opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-sm">
                                                    <X className="w-4 h-4" />
                                                </button>
                                                <span className="text-xs text-[#888888] mb-1 font-bold">Subtotal</span>
                                                <span className="text-xl font-black text-[#ff5500]">S/. {(item.price * item.quantity).toFixed(2)}</span>
                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column: Order Summary */}
                            <div className="lg:w-5/12 xl:w-1/3">
                                <div className="bg-white/80 dark:bg-[#181818]/80 backdrop-blur-2xl border border-white/40 dark:border-[#3a3939] rounded-[2rem] p-6 sm:p-8 sticky top-24 shadow-2xl shadow-black/5">
                                    <h2 className="text-2xl font-black text-[#1C1612] dark:text-white mb-6 font-['Outfit']">Resumen del Pedido</h2>
                                    
                                    <div className="space-y-4 text-sm text-[#1C1612] dark:text-white font-medium">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#888888]">Subtotal ({getCartCount()} artículos)</span>
                                            <span className="font-bold text-base">S/. {getCartTotal().toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#888888]">Estimación de Envío</span>
                                            <span className="text-right text-[#888888] text-xs max-w-[120px] bg-[#FAF5F0] dark:bg-[#111111] px-3 py-1 rounded-lg">Calculado al finalizar</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <span className="text-[#888888]">Puntos Collector</span>
                                            <span className="text-[#ff5500] font-black text-sm bg-[#ff5500]/10 px-3 py-1 rounded-lg">+{Math.floor(getCartTotal() * 3)} pts</span>
                                        </div>
                                    </div>

                                    <div className="border-t border-dashed border-[#EADED5] dark:border-[#3a3939] my-6"></div>

                                    <div className="flex justify-between items-end mb-8">
                                        <span className="font-black text-[#1C1612] dark:text-white uppercase tracking-widest text-xs">Total del Pedido</span>
                                        <span className="text-4xl font-black text-[#ff5500] tracking-tighter">S/. {getCartTotal().toFixed(2)}</span>
                                    </div>

                                    <button 
                                        onClick={handleCheckout}
                                        className="w-full bg-gradient-to-r from-[#ff5500] to-[#ff7733] hover:from-[#e04a00] hover:to-[#ff5500] text-white py-4.5 rounded-[1.25rem] font-black text-sm tracking-widest uppercase transition-all shadow-[0_10px_25px_rgba(255,85,0,0.3)] hover:shadow-[0_15px_30px_rgba(255,85,0,0.4)] hover:-translate-y-1 mb-8 relative overflow-hidden group">
                                        <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out skew-x-12" />
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Proceder al Pago <ArrowRight className="w-4 h-4" />
                                        </span>
                                    </button>

                                    {/* Trust Badges */}
                                    <div className="space-y-4">
                                        <div className="flex gap-4 p-3 bg-white/50 dark:bg-[#111111]/50 rounded-xl border border-white/40 dark:border-[#3a3939]">
                                            <ShieldCheck className="w-6 h-6 text-[#ff5500] shrink-0" />
                                            <div>
                                                <p className="text-xs font-black text-[#1C1612] dark:text-white">Garantía de Autenticidad</p>
                                                <p className="text-[10px] text-[#888888] font-medium mt-0.5">100% Mercancía Oficial Licenciada.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 p-3 bg-white/50 dark:bg-[#111111]/50 rounded-xl border border-white/40 dark:border-[#3a3939]">
                                            <Truck className="w-6 h-6 text-[#ff5500] shrink-0" />
                                            <div>
                                                <p className="text-xs font-black text-[#1C1612] dark:text-white">Envío Global Express</p>
                                                <p className="text-[10px] text-[#888888] font-medium mt-0.5">Envío asegurado desde Akihabara.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PublicLayout>
    );
}
