import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle, Truck, Package, Clock, ShieldCheck, CreditCard, Copy, ArrowLeft } from 'lucide-react';

interface Producto {
    id_producto: number;
    nombre: string;
    precio: string;
}

interface Detalle {
    id_detalle: number;
    id_producto: number;
    cantidad: number;
    precio_unitario: string;
    producto: Producto;
}

interface Direccion {
    id_direccion: number;
    direccion: string;
    ciudad: string;
    pais: string;
    codigo_postal: string;
}

interface Pago {
    id_pago: number;
    metodo: string;
    estado: 'pendiente' | 'pagado' | 'fallido';
    monto: string;
    fecha_pago: string | null;
}

interface Pedido {
    id_pedido: number;
    id_usuario: number;
    id_direccion: number;
    total: string;
    estado: 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cotizacion_pendiente';
    codigo_seguimiento: string;
    fecha_creacion: string;
    detalles: Detalle[];
    direccion: Direccion;
    pago: Pago | null;
    usuario: {
        nombre: string;
        email: string;
    };
}

interface Props {
    pedido: Pedido;
}

export default function Seguimiento({ pedido }: Props) {
    const steps = [
        { label: 'Pendiente', desc: 'Pedido registrado y en espera', key: 'pendiente', icon: Clock },
        { label: 'Pagado', desc: 'Pago validado y confirmado', key: 'pagado', icon: ShieldCheck },
        { label: 'Enviado', desc: 'En camino con guía de rastreo', key: 'enviado', icon: Truck },
        { label: 'Entregado', desc: 'Entregado en tu dirección', key: 'entregado', icon: CheckCircle },
    ];

    const getStepIndex = (estado: string) => {
        switch (estado) {
            case 'pendiente': return 0;
            case 'pagado': return 1;
            case 'enviado': return 2;
            case 'entregado': return 3;
            default: return 0;
        }
    };

    const activeIndex = getStepIndex(pedido.estado);

    const copiarSeguimiento = () => {
        navigator.clipboard.writeText(pedido.codigo_seguimiento);
        alert('Código de seguimiento copiado al portapapeles.');
    };

    const formatearPrecio = (valor: string | number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(Number(valor));
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
            <Head title={`Seguimiento de Pedido #${pedido.codigo_seguimiento}`} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
                
                <Link 
                    href="/catalogo" 
                    className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-purple-400 transition-colors mb-8"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Volver al Catálogo
                </Link>

                <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.05),transparent_40%)]" />

                    {/* Order header */}
                    <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
                        <div>
                            <span className="text-xs text-purple-400 font-bold uppercase tracking-wider">Trazabilidad de Compra</span>
                            <h2 className="text-xl md:text-2xl font-extrabold text-slate-100 mt-1 flex items-center gap-2">
                                Pedido #{pedido.codigo_seguimiento}
                                <button 
                                    onClick={copiarSeguimiento} 
                                    className="p-1 hover:bg-slate-850 rounded-lg text-slate-400 hover:text-slate-200 transition-all active:scale-95"
                                >
                                    <Copy className="w-4 h-4" />
                                </button>
                            </h2>
                            <p className="text-xs text-slate-400 mt-1">Registrado el {new Date(pedido.fecha_creacion).toLocaleDateString('es-CO', { dateStyle: 'long' })}</p>
                        </div>
                        
                        <div className="text-right">
                            <span className="text-xs text-slate-500 uppercase tracking-wider block">Monto Total</span>
                            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
                                {formatearPrecio(pedido.total)}
                            </span>
                        </div>
                    </div>

                    {/* Status Tracker visual timeline */}
                    {pedido.estado === 'cotizacion_pendiente' ? (
                        <div className="bg-sky-950/20 border border-sky-900/30 p-6 rounded-2xl space-y-3">
                            <h3 className="font-bold text-sky-400 flex items-center gap-2">
                                <Clock className="w-5 h-5 animate-pulse" />
                                Cotización Pendiente (Proxy)
                            </h3>
                            <p className="text-slate-400 text-xs leading-relaxed">
                                Este pedido contiene artículos importados bajo demanda (Proxy). El administrador está evaluando los costos logísticos y de aduana para generar una cotización. En breve recibirás un correo o notificación con la cotización final para tu aprobación.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estado del Envío</h3>
                            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
                                {/* Desktop connecting line */}
                                <div className="absolute top-5 left-8 right-8 h-0.5 bg-slate-850 hidden md:block z-0" />
                                <div 
                                    className="absolute top-5 left-8 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 hidden md:block z-0 transition-all duration-500" 
                                    style={{ width: `${(activeIndex / (steps.length - 1)) * 90}%` }}
                                />

                                {steps.map((step, idx) => {
                                    const Icon = step.icon;
                                    const isCompleted = idx <= activeIndex;
                                    const isActive = idx === activeIndex;

                                    return (
                                        <div key={step.key} className="relative z-10 flex md:flex-col items-center gap-4 md:gap-3 text-left md:text-center">
                                            <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                                                isCompleted 
                                                    ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-900/20' 
                                                    : 'bg-slate-950 border-slate-800 text-slate-550'
                                            } ${isActive ? 'ring-4 ring-purple-500/20 scale-105' : ''}`}>
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <h4 className={`text-xs font-bold ${isCompleted ? 'text-slate-100' : 'text-slate-500'}`}>{step.label}</h4>
                                                <p className="text-[10px] text-slate-400 mt-0.5 hidden md:block">{step.desc}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Notification Alerts */}
                    {pedido.estado === 'pendiente' && (
                        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-4 rounded-xl text-xs space-y-1">
                            <span className="font-bold block">Validación del Pago en Proceso</span>
                            <p className="text-slate-400">Su pedido se encuentra registrado. No se confirmará de forma definitiva ni pasará a preparación hasta que el administrador valide la recepción del pago.</p>
                        </div>
                    )}

                    {/* Order Details & Logistics Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-800">
                        {/* Address and Payments */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Destino de Envío</h4>
                                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-850 space-y-1 text-xs">
                                    <span className="font-bold text-slate-200 block">{pedido.usuario.nombre}</span>
                                    <span className="text-slate-400 block">{pedido.direccion.direccion}</span>
                                    <span className="text-slate-400 block">{pedido.direccion.ciudad}, {pedido.direccion.pais}</span>
                                    <span className="text-slate-500 block">C.P. {pedido.direccion.codigo_postal}</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Estado del Pago</h4>
                                <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-850 flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="w-4 h-4 text-purple-400" />
                                        <div>
                                            <span className="font-bold text-slate-200 block capitalize">{pedido.pago?.metodo || 'No registrado'}</span>
                                            <span className="text-slate-400 text-[10px]">Monto pagado: {pedido.pago ? formatearPrecio(pedido.pago.monto) : '$0'}</span>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] border ${
                                        pedido.pago?.estado === 'pagado'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                    }`}>
                                        {pedido.pago?.estado === 'pagado' ? 'Validado' : 'Pendiente Validación'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Order Items list */}
                        <div>
                            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Detalles del Carrito</h4>
                            <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-850 space-y-3.5">
                                {pedido.detalles.map(det => (
                                    <div key={det.id_detalle} className="flex justify-between items-center text-xs">
                                        <div>
                                            <span className="font-semibold text-slate-300 block line-clamp-1">{det.producto.nombre}</span>
                                            <span className="text-[10px] text-slate-400">Cantidad: {det.cantidad} x {formatearPrecio(det.precio_unitario)}</span>
                                        </div>
                                        <span className="font-bold text-slate-200">
                                            {formatearPrecio(Number(det.precio_unitario) * det.cantidad)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
