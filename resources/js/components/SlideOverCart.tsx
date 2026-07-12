import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Link } from '@inertiajs/react';

export default function SlideOverCart() {
    const { isCartOpen, toggleCart, cart, updateQuantity, removeFromCart, getCartTotal } = useStore();

    // Prevent scrolling when cart is open
    React.useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    if (!isCartOpen) return null;

    return (
        <div className="relative z-50">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                onClick={toggleCart}
            />

            {/* Slide-over panel */}
            <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-[#1c1b1b] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                
                {/* Header */}
                <div className="px-6 py-5 border-b border-[#EADED5] dark:border-[#3a3939] flex items-center justify-between bg-[#FFF6F0] dark:bg-[#131313]">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="w-5 h-5 text-[#ff5500]" />
                        <h2 className="font-['Outfit'] text-xl font-bold text-[#1C1612] dark:text-[#ffffff]">
                            Tu Carrito
                        </h2>
                    </div>
                    <button 
                        onClick={toggleCart}
                        className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-white dark:hover:bg-[#2A2A2A] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body / Items */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                    {cart.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                            <div className="w-20 h-20 bg-[#FFF6F0] dark:bg-[#131313] rounded-full flex items-center justify-center border border-[#EADED5] dark:border-[#3a3939]">
                                <ShoppingBag className="w-8 h-8 text-neutral-300 dark:text-neutral-600" />
                            </div>
                            <h3 className="text-lg font-bold text-[#1C1612] dark:text-white">Tu carrito está vacío</h3>
                            <p className="text-sm text-[#888888] max-w-[250px]">Parece que aún no has agregado figuras a tu colección. ¡Explora nuestro catálogo!</p>
                            <button onClick={toggleCart} className="mt-4 px-6 py-2.5 bg-[#ff5500] text-white rounded-full font-bold text-sm hover:bg-[#e04a00] transition-colors">
                                Explorar Catálogo
                            </button>
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className="flex gap-4 border-b border-[#EADED5] dark:border-[#3a3939] pb-6 last:border-0 last:pb-0">
                                {/* Image */}
                                <div className="w-24 h-24 rounded-xl bg-[#FFF6F0] dark:bg-[#131313] border border-[#EADED5] dark:border-[#3a3939] p-2 flex-shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-lg" />
                                </div>

                                {/* Details */}
                                <div className="flex flex-col flex-1">
                                    <div className="flex justify-between items-start gap-2">
                                        <div>
                                            <span className="text-[10px] font-bold text-[#888888] uppercase tracking-wider">{item.brand}</span>
                                            <h4 className="text-sm font-bold text-[#1C1612] dark:text-white leading-tight mt-1 line-clamp-2">
                                                {item.title}
                                            </h4>
                                        </div>
                                        <button 
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="mt-auto flex items-end justify-between">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3 bg-neutral-100 dark:bg-[#131313] rounded-lg px-2 py-1 border border-[#EADED5] dark:border-[#3a3939]">
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-xs font-bold text-[#1C1612] dark:text-white min-w-[1ch] text-center">
                                                {item.quantity}
                                            </span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        
                                        {/* Price */}
                                        <span className="text-base font-extrabold text-[#ff5500]">
                                            S/. {(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {cart.length > 0 && (
                    <div className="p-6 border-t border-[#EADED5] dark:border-[#3a3939] bg-white dark:bg-[#1c1b1b]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subtotal</span>
                            <span className="text-2xl font-black text-[#1C1612] dark:text-white">
                                S/. {getCartTotal().toFixed(2)}
                            </span>
                        </div>
                        <p className="text-[11px] text-[#888888] mb-6 text-center">
                            Impuestos y gastos de envío calculados en el checkout.
                        </p>
                        
                        <Link 
                            href="/carrito"
                            onClick={toggleCart}
                            className="w-full flex items-center justify-center gap-2 bg-[#ff5500] hover:bg-[#e04a00] text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-[#ff5500]/30 group"
                        >
                            Proceder al Pago
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
