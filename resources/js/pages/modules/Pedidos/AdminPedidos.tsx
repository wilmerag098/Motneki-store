import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { ShieldCheck, Truck, Clock, CheckCircle, Settings, User, CreditCard, Sparkles, MapPin, Eye } from 'lucide-react';

interface Producto {
    id_producto: number;
    nombre: string;
}

interface Detalle {
    id_detalle: number;
    cantidad: number;
    precio_unitario: string;
    producto: Producto;
}

interface Pago {
    id_pago: number;
    metodo: string;
    estado: 'pendiente' | 'pagado' | 'fallido';
    monto: string;
}

interface Pedido {
    id_pedido: number;
    total: string;
    estado: 'pendiente' | 'pagado' | 'enviado' | 'entregado' | 'cotizacion_pendiente';
    codigo_seguimiento: string;
    fecha_creacion: string;
    usuario: {
        nombre: string;
        email: string;
    };
    direccion: {
        direccion: string;
        ciudad: string;
        pais: string;
    };
    pago: Pago | null;
    detalles: Detalle[];
}

interface Props {
    pedidos: Pedido[];
}

export default function AdminPedidos({ pedidos }: Props) {
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null);
    const [nuevoEstado, setNuevoEstado] = useState('');
    const [nuevoCodigoSeguimiento, setNuevoCodigoSeguimiento] = useState('');
    const [loading, setLoading] = useState(false);

    const abrirEdicion = (pedido: Pedido) => {
        setPedidoSeleccionado(pedido);
        setNuevoEstado(pedido.estado);
        setNuevoCodigoSeguimiento(pedido.codigo_seguimiento || '');
    };

    const cerrarEdicion = () => {
        setPedidoSeleccionado(null);
    };

    const handleActualizar = (e: React.FormEvent) => {
        e.preventDefault();
        if (!pedidoSeleccionado) return;

        setLoading(true);

        router.post(`/admin/pedidos/${pedidoSeleccionado.id_pedido}/actualizar`, {
            estado: nuevoEstado,
            codigo_seguimiento: nuevoCodigoSeguimiento
        }, {
            onSuccess: () => {
                setLoading(false);
                cerrarEdicion();
            },
            onError: () => {
                setLoading(false);
            }
        });
    };

    const formatearPrecio = (valor: string | number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(Number(valor));
    };

    const getEstadoBadge = (estado: string) => {
        switch (estado) {
            case 'pendiente':
                return <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full">Pendiente</span>;
            case 'pagado':
                return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full">Pagado</span>;
            case 'enviado':
                return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full">Enviado</span>;
            case 'entregado':
                return <span className="bg-slate-500/10 text-slate-400 border border-slate-550/20 text-[10px] font-semibold px-2 py-0.5 rounded-full">Entregado</span>;
            case 'cotizacion_pendiente':
                return <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full">Cotización</span>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 pb-16">
            <Head title="Panel de Administración de Pedidos" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400 mb-8 flex items-center gap-2.5">
                    <Settings className="w-8 h-8 text-purple-400" />
                    Panel de Administración
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Orders List Table */}
                    <div className="lg:col-span-8 bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
                        <h3 className="text-sm font-semibold text-slate-300 mb-4 border-b border-slate-850 pb-3 uppercase tracking-wider">Historial de Pedidos</h3>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs">
                                <thead>
                                    <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase">
                                        <th className="py-3 px-2">Cliente</th>
                                        <th className="py-3 px-2">Código</th>
                                        <th className="py-3 px-2">Total</th>
                                        <th className="py-3 px-2">Estado</th>
                                        <th className="py-3 px-2">Pago</th>
                                        <th className="py-3 px-2 text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedidos.map(pedido => (
                                        <tr key={pedido.id_pedido} className="border-b border-slate-850 hover:bg-slate-900/20 transition-colors">
                                            <td className="py-3 px-2">
                                                <div className="font-semibold text-slate-200">{pedido.usuario.nombre}</div>
                                                <div className="text-[10px] text-slate-500">{pedido.usuario.email}</div>
                                            </td>
                                            <td className="py-3 px-2 font-mono font-bold text-slate-400">{pedido.codigo_seguimiento}</td>
                                            <td className="py-3 px-2 font-semibold text-slate-350">{formatearPrecio(pedido.total)}</td>
                                            <td className="py-3 px-2">{getEstadoBadge(pedido.estado)}</td>
                                            <td className="py-3 px-2">
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${
                                                    pedido.pago?.estado === 'pagado'
                                                        ? 'bg-emerald-500/10 text-emerald-400'
                                                        : 'bg-amber-500/10 text-amber-400'
                                                }`}>
                                                    {pedido.pago?.estado === 'pagado' ? 'Confirmado' : 'Pendiente'}
                                                </span>
                                            </td>
                                            <td className="py-3 px-2 text-right">
                                                <button
                                                    onClick={() => abrirEdicion(pedido)}
                                                    className="inline-flex items-center gap-1 bg-slate-800 hover:bg-purple-900/30 text-slate-300 hover:text-purple-300 border border-slate-700 hover:border-purple-800/40 px-2.5 py-1.5 rounded-lg font-bold"
                                                >
                                                    Gestionar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {pedidos.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="text-center py-8 text-slate-500">Ningún pedido registrado en el sistema.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right Side: Detail / Update form */}
                    <div className="lg:col-span-4">
                        {pedidoSeleccionado ? (
                            <div className="bg-slate-900/40 border border-purple-950/40 p-6 rounded-2xl backdrop-blur-md shadow-2xl relative overflow-hidden sticky top-6">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.04),transparent_45%)]" />

                                <div className="relative space-y-6">
                                    <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                                        <div>
                                            <h3 className="font-bold text-sm text-slate-200">Gestionar Pedido</h3>
                                            <span className="text-[10px] font-mono text-purple-400">ID #{pedidoSeleccionado.codigo_seguimiento}</span>
                                        </div>
                                        <button 
                                            onClick={cerrarEdicion}
                                            className="text-slate-500 hover:text-slate-300 font-bold"
                                        >
                                            ×
                                        </button>
                                    </div>

                                    {/* Order content */}
                                    <div className="space-y-4 text-xs">
                                        <div className="space-y-1.5 bg-slate-950/60 p-3 rounded-xl border border-slate-850">
                                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                                                <User className="w-3.5 h-3.5 text-purple-400" />
                                                Cliente
                                            </div>
                                            <div className="font-bold text-slate-300">{pedidoSeleccionado.usuario.nombre}</div>
                                            <div className="text-[10px] text-slate-400">{pedidoSeleccionado.direccion.direccion}, {pedidoSeleccionado.direccion.ciudad}</div>
                                        </div>

                                        <div className="space-y-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-850">
                                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                                                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                                                Productos
                                            </div>
                                            <div className="space-y-1.5">
                                                {pedidoSeleccionado.detalles.map(det => (
                                                    <div key={det.id_detalle} className="flex justify-between text-[11px] text-slate-300">
                                                        <span className="line-clamp-1">{det.producto.nombre}</span>
                                                        <span className="font-bold ml-2">x{det.cantidad}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form to update */}
                                    <form onSubmit={handleActualizar} className="space-y-4 text-xs">
                                        <div>
                                            <label className="block text-slate-400 mb-1.5 font-medium">Estado del Pedido</label>
                                            <select
                                                value={nuevoEstado}
                                                onChange={(e) => setNuevoEstado(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 focus:outline-none focus:border-purple-500"
                                            >
                                                <option value="pendiente">Pendiente</option>
                                                <option value="pagado">Pagado (Pago Validado)</option>
                                                <option value="enviado">Enviado (Logística activa)</option>
                                                <option value="entregado">Entregado</option>
                                                <option value="cotizacion_pendiente">Cotización Pendiente (Proxy)</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-slate-400 mb-1.5 font-medium">Guía / Código de Seguimiento</label>
                                            <input 
                                                type="text" 
                                                placeholder="Ej. MTK-54321..."
                                                value={nuevoCodigoSeguimiento}
                                                onChange={(e) => setNuevoCodigoSeguimiento(e.target.value)}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-slate-200 focus:outline-none focus:border-purple-500"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-2.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50"
                                        >
                                            {loading ? 'Guardando...' : 'Guardar Cambios'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-900/40 border border-slate-850/60 p-8 rounded-2xl text-center text-slate-500 text-xs">
                                Selecciona un pedido de la tabla para ver su detalle y realizar actualizaciones de estado o registrar la guía de transporte.
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
