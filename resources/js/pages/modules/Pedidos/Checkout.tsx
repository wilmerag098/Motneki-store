import React, { useState, useEffect } from 'react';
import { Head, router, Link } from '@inertiajs/react';
import { CreditCard, Truck, ShoppingCart, ShieldCheck, Sparkles, MapPin, AlertTriangle } from 'lucide-react';

interface Categoria {
    id_categoria: number;
    nombre: string;
}

interface Producto {
    id_producto: number;
    nombre: string;
    descripcion: string;
    precio: string;
    stock: number;
    disponibilidad: 'stock' | 'preventa' | 'bajo demanda';
    categoria: Categoria;
}

interface CartItem {
    producto: Producto;
    cantidad: number;
}

interface Direccion {
    id_direccion: number;
    direccion: string;
    ciudad: string;
    pais: string;
    codigo_postal: string;
}

interface Props {
    direcciones: Direccion[];
    usuario: {
        id_usuario: number;
        nombre: string;
        email: string;
    };
    errors: Record<string, string>;
}

export default function Checkout({ direcciones, usuario, errors }: Props) {
    const [cart, setCart] = useState<CartItem[]>([]);
    
    // Form fields
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [pais, setPais] = useState('Colombia');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [metodoPago, setMetodoPago] = useState('tarjeta');
    const [tipoPago, setTipoPago] = useState<'total' | 'adelanto'>('total');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedCart = localStorage.getItem('motneki_cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const seleccionarDireccionPregrabada = (dir: Direccion) => {
        setDireccion(dir.direccion);
        setCiudad(dir.ciudad);
        setPais(dir.pais);
        setCodigoPostal(dir.codigo_postal);
    };

    const calcularTotal = () => {
        return cart.reduce((sum, item) => sum + (Number(item.producto.precio) * item.cantidad), 0);
    };

    const contienePreventa = cart.some(item => item.producto.disponibilidad === 'preventa');
    const contieneProxy = cart.some(item => item.producto.disponibilidad === 'bajo demanda');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) return;

        setLoading(true);

        const payload = {
            productos: cart.map(item => ({
                id_producto: item.producto.id_producto,
                cantidad: item.cantidad
            })),
            direccion,
            ciudad,
            pais,
            codigo_postal: codigoPostal,
            metodo_pago: metodoPago,
            tipo_pago: tipoPago
        };

        router.post('/pedidos/crear', payload, {
            onSuccess: () => {
                localStorage.removeItem('motneki_cart');
                setLoading(false);
            },
            onError: () => {
                setLoading(false);
            }
        });
    };

    const formatearPrecio = (valor: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(valor);
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
                <ShoppingCart className="w-16 h-16 text-slate-650 mb-4 animate-pulse" />
                <h2 className="text-xl font-bold mb-2">Tu carrito está vacío</h2>
                <p className="text-slate-400 text-sm mb-6">Agrega algunos artículos del catálogo para poder proceder al checkout.</p>
                <Link 
                    href="/catalogo" 
                    className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all"
                >
                    Volver al Catálogo
                </Link>
            </div>
        );
    }

    const total = calcularTotal();
    const adelanto = total * 0.30;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
            <Head title="Finalizar Compra" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-8">
                    Finalizar Compra
                </h1>

                {errors.checkout && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-start gap-2.5">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                            <span className="font-bold">Error de Validación:</span> {errors.checkout}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left: Checkout Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
                        
                        {/* 1. Direcciones Pregrabadas */}
                        {direcciones.length > 0 && (
                            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
                                <h3 className="text-sm font-semibold text-purple-400 flex items-center gap-2 mb-4">
                                    <MapPin className="w-4 h-4" />
                                    Direcciones Guardadas
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {direcciones.map(dir => (
                                        <button
                                            key={dir.id_direccion}
                                            type="button"
                                            onClick={() => seleccionarDireccionPregrabada(dir)}
                                            className="text-left p-3.5 bg-slate-950 border border-slate-850 hover:border-purple-900/50 rounded-xl text-xs space-y-1 transition-all"
                                        >
                                            <span className="font-bold block text-slate-300">{dir.direccion}</span>
                                            <span className="text-slate-400">{dir.ciudad}, {dir.pais}</span>
                                            <span className="text-slate-500 block">C.P. {dir.codigo_postal}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* 2. Información de Envío */}
                        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
                            <h3 className="text-sm font-semibold text-purple-400 flex items-center gap-2 border-b border-slate-800 pb-3 mb-2">
                                <Truck className="w-4.5 h-4.5" />
                                Datos de Envío
                            </h3>

                            <div>
                                <label className="block text-xs text-slate-400 mb-1.5 font-medium">Dirección Completa *</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="Calle, Avenida, Número de casa/apto..."
                                    value={direccion}
                                    onChange={(e) => setDireccion(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-purple-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Ciudad *</label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="Ej. Bogotá"
                                        value={ciudad}
                                        onChange={(e) => setCiudad(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Código Postal *</label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="Código"
                                        value={codigoPostal}
                                        onChange={(e) => setCodigoPostal(e.target.value)}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 3. Método de Pago */}
                        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4">
                            <h3 className="text-sm font-semibold text-purple-400 flex items-center gap-2 border-b border-slate-800 pb-3 mb-2">
                                <CreditCard className="w-4.5 h-4.5" />
                                Método de Pago
                            </h3>

                            <div className="grid grid-cols-3 gap-3">
                                {['tarjeta', 'transferencia', 'efectivo'].map(method => (
                                    <label 
                                        key={method}
                                        className={`flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer select-none transition-all ${
                                            metodoPago === method
                                                ? 'bg-purple-950/20 border-purple-500 text-purple-400'
                                                : 'bg-slate-950 border-slate-850 text-slate-400 hover:border-slate-800'
                                        }`}
                                    >
                                        <input 
                                            type="radio" 
                                            name="metodo_pago"
                                            value={method}
                                            checked={metodoPago === method}
                                            onChange={() => setMetodoPago(method)}
                                            className="sr-only"
                                        />
                                        <span className="text-xs font-semibold capitalize">{method}</span>
                                    </label>
                                ))}
                            </div>

                            {/* Pago parcial para preventas */}
                            {contienePreventa && (
                                <div className="mt-4 p-4 bg-purple-950/10 border border-purple-900/30 rounded-xl space-y-3">
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-400">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        Opción de Reserva Disponible (Preventa)
                                    </span>
                                    <p className="text-slate-400 text-xs leading-relaxed">
                                        Este pedido contiene productos en **Preventa**. Puedes reservar pagando el total o realizando un pago parcial/adelanto del 30% del valor total.
                                    </p>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-300">
                                            <input 
                                                type="radio" 
                                                name="tipo_pago"
                                                checked={tipoPago === 'total'}
                                                onChange={() => setTipoPago('total')}
                                                className="accent-purple-500"
                                            />
                                            Pago Total ({formatearPrecio(total)})
                                        </label>
                                        <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-slate-300">
                                            <input 
                                                type="radio" 
                                                name="tipo_pago"
                                                checked={tipoPago === 'adelanto'}
                                                onChange={() => setTipoPago('adelanto')}
                                                className="accent-purple-500"
                                            />
                                            Adelanto del 30% ({formatearPrecio(adelanto)})
                                        </label>
                                    </div>
                                </div>
                            )}

                            {contieneProxy && (
                                <div className="mt-4 p-4 bg-sky-950/10 border border-sky-900/30 rounded-xl">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 mb-1.5">
                                        <ShieldCheck className="w-4.5 h-4.5" />
                                        Pedido Bajo Demanda (Proxy)
                                    </span>
                                    <p className="text-slate-400 text-xs leading-relaxed">
                                        Este pedido contiene artículos bajo demanda. El administrador revisará la cotización. Una vez cotizado, recibirás una notificación para confirmar y aprobar el cobro.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl text-sm transition-all shadow-lg shadow-purple-900/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Procesando Pedido...' : contieneProxy ? 'Solicitar Cotización Proxy' : 'Confirmar Pedido'}
                        </button>
                    </form>

                    {/* Right: Cart Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-6 sticky top-6">
                            <h3 className="text-sm font-semibold text-slate-300 border-b border-slate-800 pb-3 flex items-center gap-2">
                                <ShoppingCart className="w-4 h-4" />
                                Resumen del Pedido
                            </h3>

                            {/* Cart List */}
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                                {cart.map(item => (
                                    <div key={item.producto.id_producto} className="flex justify-between items-start gap-4">
                                        <div>
                                            <h4 className="text-xs font-bold text-slate-200 line-clamp-1">{item.producto.nombre}</h4>
                                            <span className="text-[10px] text-purple-400 capitalize bg-purple-950/20 border border-purple-900/30 px-2 py-0.5 rounded-full mt-1 inline-block">
                                                {item.producto.disponibilidad}
                                            </span>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <span className="text-xs text-slate-400 block">x{item.cantidad}</span>
                                            <span className="text-xs font-bold text-slate-300">
                                                {formatearPrecio(Number(item.producto.precio) * item.cantidad)}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Billing breakdown */}
                            <div className="border-t border-slate-800 pt-4 space-y-2.5 text-xs text-slate-400">
                                <div className="flex justify-between">
                                    <span>Subtotal (Impuestos Inc.)</span>
                                    <span className="text-slate-300 font-medium">{formatearPrecio(total)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Envío</span>
                                    <span className="text-emerald-400 font-medium">Gratis</span>
                                </div>

                                <div className="border-t border-slate-800 pt-3 flex justify-between items-end">
                                    <span className="font-bold text-slate-300 text-sm">Total del Pedido</span>
                                    <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                                        {formatearPrecio(total)}
                                    </span>
                                </div>

                                {tipoPago === 'adelanto' && contienePreventa && (
                                    <div className="border-t border-dashed border-purple-900/30 pt-3 flex justify-between items-center text-xs bg-purple-950/10 p-2.5 rounded-lg border border-purple-800/20">
                                        <span className="text-purple-400 font-semibold">Pago Parcial Hoy (30%):</span>
                                        <span className="font-extrabold text-purple-400">
                                            {formatearPrecio(adelanto)}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="bg-slate-950/60 p-4 rounded-xl text-[10px] text-slate-500 leading-relaxed">
                                Al confirmar tu pedido, aceptas que estás comprando en **Motneki Store** bajo sus políticas de preventas y pedidos proxy. Los precios mostrados incluyen todos los impuestos aplicables.
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
