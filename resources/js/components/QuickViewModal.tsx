import React from 'react';
import { X, ShoppingBag, Heart, ShieldCheck, Truck } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Link } from '@inertiajs/react';

export default function QuickViewModal() {
    const { isQuickViewOpen, quickViewProduct, closeQuickView, addToCart, toggleWishlist, isInWishlist } = useStore();
    const [quantity, setQuantity] = React.useState(1);

    React.useEffect(() => {
        if (isQuickViewOpen) {
            document.body.style.overflow = 'hidden';
            setQuantity(1); // Reset quantity when opened
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isQuickViewOpen]);

    if (!isQuickViewOpen || !quickViewProduct) return null;

    const priceNum = parseFloat(quickViewProduct.price.replace(/[^0-9.-]+/g,"")); // Handle string prices if needed
    const isWished = isInWishlist(quickViewProduct.id);

    const handleAddToCart = () => {
        addToCart({
            id: quickViewProduct.id,
            title: quickViewProduct.title,
            price: priceNum,
            quantity: quantity,
            image: quickViewProduct.image,
            brand: quickViewProduct.brand || 'MOTNEKI',
            status: quickViewProduct.status === 'PREVENTA' ? 'PREVENTA' : undefined
        });
        closeQuickView();
    };

    return (
        <div className="relative z-50">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={closeQuickView}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                <div className="w-full max-w-4xl bg-white dark:bg-[#1c1b1b] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto animate-in zoom-in-95 duration-300 relative">
                    
                    {/* Close Button */}
                    <button 
                        onClick={closeQuickView}
                        className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-black/50 backdrop-blur-md rounded-full text-gray-800 dark:text-white hover:bg-white dark:hover:bg-black transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Left: Image Gallery (Simplified for Quick View) */}
                    <div className="md:w-1/2 bg-[#FFF6F0] dark:bg-[#131313] p-8 flex items-center justify-center min-h-[300px]">
                        <img 
                            src={quickViewProduct.image} 
                            alt={quickViewProduct.title} 
                            className="max-w-full max-h-[400px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Right: Details */}
                    <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-[10px] font-black tracking-widest uppercase rounded-full">
                                {quickViewProduct.brand || 'Exclusivo'}
                            </span>
                            <span className={`px-3 py-1 text-[10px] font-black tracking-widest uppercase rounded-full ${
                                quickViewProduct.status === 'PREVENTA' 
                                    ? 'bg-purple-100 text-purple-700' 
                                    : 'bg-[#ff5500]/10 text-[#ff5500]'
                            }`}>
                                {quickViewProduct.status || 'EN STOCK'}
                            </span>
                        </div>

                        <h2 className="font-['Outfit'] text-2xl md:text-3xl font-extrabold text-[#1C1612] dark:text-white leading-tight mb-2">
                            {quickViewProduct.title}
                        </h2>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-black text-[#ff5500]">
                                {quickViewProduct.price}
                            </span>
                        </div>

                        <p className="text-[#6E7B8A] dark:text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
                            Figura coleccionable de alta calidad con detalles precisos. Fabricada en PVC/ABS, perfecta para cualquier fan de la franquicia.
                        </p>

                        {/* Actions */}
                        <div className="flex gap-4 mb-8">
                            <button 
                                onClick={handleAddToCart}
                                className="flex-1 bg-[#ff5500] hover:bg-[#e04a00] text-white flex items-center justify-center gap-3 px-6 py-4 rounded-xl shadow-lg hover:shadow-[#ff5500]/30 transition-all font-bold group"
                            >
                                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Añadir al Carrito
                            </button>
                            <button 
                                onClick={() => toggleWishlist(quickViewProduct.id)}
                                className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all ${
                                    isWished 
                                        ? 'border-red-500 bg-red-500/10 text-red-500' 
                                        : 'border-[#EADED5] dark:border-[#3a3939] text-[#6E7B8A] hover:border-red-500 hover:text-red-500 dark:hover:border-red-500'
                                }`}
                            >
                                <Heart className={`w-6 h-6 ${isWished ? 'fill-current' : ''}`} />
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#EADED5] dark:border-[#3a3939]">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#FFF6F0] dark:bg-[#131313] rounded-lg">
                                    <ShieldCheck className="w-5 h-5 text-[#ff5500]" />
                                </div>
                                <span className="text-xs font-bold text-[#1C1612] dark:text-gray-300">Garantía<br/>Original</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#FFF6F0] dark:bg-[#131313] rounded-lg">
                                    <Truck className="w-5 h-5 text-[#ff5500]" />
                                </div>
                                <span className="text-xs font-bold text-[#1C1612] dark:text-gray-300">Envío<br/>Seguro</span>
                            </div>
                        </div>

                        {/* Full Detail Link */}
                        <div className="mt-8 text-center">
                            <Link 
                                href={`/producto/${quickViewProduct.id}`}
                                onClick={closeQuickView}
                                className="text-sm font-bold text-[#6E7B8A] hover:text-[#ff5500] underline underline-offset-4 transition-colors"
                            >
                                Ver todos los detalles
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
