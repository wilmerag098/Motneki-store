import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import {
    TrendingUp, Calendar, ShoppingBag,
    AlertTriangle, ClipboardList, Truck, Package, ArrowRight
} from 'lucide-react';

interface DashboardProps {
    metrics: {
        ventas_dia: number;
        variacion_dia: string;
        ventas_mes: number;
        pedidos_activos: number;
        pedidos_pendientes: number;
        envios_activos: number;
        envios_retrasados: number;
    };
    stockCritico: any[];
    pedidosRecientes: any[];
    masVendidos: any[];
}

export default function AdminDashboard({ metrics, stockCritico, pedidosRecientes, masVendidos }: DashboardProps) {
    const formatCurrency = (value: number) => `S/. ${value.toFixed(2)}`;

    return (
        <AdminLayout>
            <Head title="Panel de Control - Motneki" />

            {/* Header Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mt-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1C1612] tracking-tight">Panel de Control</h1>
                    <p className="text-sm text-gray-500 mt-1">Resumen en tiempo real de logística y ventas.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/reportes" className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm">
                        Ver Reportes
                    </Link>
                    <Link href="/admin/envios" className="px-6 py-2.5 bg-[#ff5500] text-white font-bold rounded-lg hover:bg-[#e64a00] transition-colors shadow-sm text-sm">
                        Gestionar Envíos
                    </Link>
                </div>
            </div>

            {/* Metrics Cards (Row 1) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Card 1: Ventas del día */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-[#ff5500]/50 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-[#ff5500]/10 flex items-center justify-center text-[#ff5500] shrink-0">
                        <TrendingUp className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Ventas de Hoy</p>
                            <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-md">
                                {metrics.variacion_dia}
                            </span>
                        </div>
                        <h3 className="text-2xl font-black text-[#1C1612] tracking-tight">
                            {formatCurrency(metrics.ventas_dia)}
                        </h3>
                    </div>
                </div>

                {/* Card 2: Ventas del mes */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-[#ff5500]/50 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <Calendar className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Ventas del Mes</p>
                        <h3 className="text-2xl font-black text-[#1C1612] tracking-tight">
                            {formatCurrency(metrics.ventas_mes)}
                        </h3>
                    </div>
                </div>

                {/* Card 3: Total de pedidos */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 hover:border-[#ff5500]/50 transition-colors">
                    <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                        <ShoppingBag className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Pedidos Activos</p>
                        <h3 className="text-2xl font-black text-[#1C1612] tracking-tight">
                            {metrics.pedidos_activos} <span className="text-sm font-medium text-gray-400">en proceso</span>
                        </h3>
                    </div>
                </div>
            </div>

            {/* Operations Cards (Row 2) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Por Procesar */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-[#fcfaf9] flex justify-between items-center">
                        <div className="flex items-center gap-2 text-[#1C1612] font-bold">
                            <ClipboardList className="w-5 h-5 text-[#ff5500]" />
                            <span>POR PROCESAR</span>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white">
                        <span className="text-5xl font-black text-[#1C1612] mb-2">{metrics.pedidos_pendientes}</span>
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider text-center">
                            Órdenes esperando empaquetado
                        </span>
                    </div>
                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <Link href="/admin/solicitudes-figuras" className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1C1612] text-white text-sm font-bold rounded-lg hover:bg-black transition-colors">
                            Atender Solicitud de Figuras
                        </Link>
                    </div>
                </div>

                {/* Monitor de Envíos */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-[#fcfaf9] flex justify-between items-center">
                        <div className="flex items-center gap-2 text-[#1C1612] font-bold">
                            <Truck className="w-5 h-5 text-blue-600" />
                            <span>MONITOR DE ENVÍOS</span>
                        </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-center space-y-4">
                        <div className="flex justify-between items-center p-3 rounded-lg border border-gray-100 bg-white shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <span className="text-gray-700 font-bold text-sm">Envíos Activos (En ruta)</span>
                            </div>
                            <span className="text-[#1C1612] font-black text-lg">{metrics.envios_activos}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg border border-red-100 bg-red-50/50 shadow-sm">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                <span className="text-red-700 font-bold text-sm">Retrasados</span>
                            </div>
                            <span className="text-red-700 font-black text-lg">{metrics.envios_retrasados}</span>
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <Link href="/admin/envios" className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-sm">
                            Ver Tracking <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Stock Crítico */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                    <div className="px-6 py-5 border-b border-red-100 bg-red-50/50 flex justify-between items-center">
                        <div className="flex items-center gap-2 text-red-700 font-bold">
                            <AlertTriangle className="w-5 h-5" />
                            <span>STOCK CRÍTICO</span>
                        </div>
                        <span className="text-xs font-bold text-red-600 bg-white px-2 py-1 rounded-md border border-red-200 shadow-sm">
                            {stockCritico.length} ITEMS
                        </span>
                    </div>
                    <div className="p-4 flex-1">
                        <div className="space-y-2">
                            {stockCritico.map((item, i) => (
                                <div key={i} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg text-sm bg-white hover:border-red-200 transition-colors">
                                    <span className="text-gray-800 font-bold truncate max-w-[150px]">{item.nombre}</span>
                                    <span className={`font-black text-xs px-2 py-1 rounded ${item.stock === 0 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                                        {item.stock} DISP.
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <Link href="/admin/productos" className="w-full flex items-center justify-center gap-2 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-sm">
                            Reabastecer
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content Grid (Row 3) */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Pedidos Recientes (2 Cols) */}
                <div className="xl:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#fcfaf9]">
                        <h3 className="font-bold text-[#1C1612]">Últimos Pedidos</h3>
                        <Link href="/admin/reportes" className="text-sm font-bold text-[#ff5500] hover:underline">
                            Ver historial completo
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead className="bg-white text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">ID Pedido</th>
                                    <th className="px-6 py-4">Cliente</th>
                                    <th className="px-6 py-4">Estado</th>
                                    <th className="px-6 py-4 text-right">Monto</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {pedidosRecientes.map((pedido, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-black text-gray-800">{pedido.id}</td>
                                        <td className="px-6 py-4 font-medium text-gray-600">{pedido.cliente}</td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${pedido.estado === 'PROCESANDO' ? 'text-blue-700 bg-blue-100 border border-blue-200' :
                                                    pedido.estado === 'ENVIADO' ? 'text-purple-700 bg-purple-100 border border-purple-200' :
                                                        pedido.estado === 'ENTREGADO' ? 'text-green-700 bg-green-100 border border-green-200' :
                                                            'text-gray-700 bg-gray-100 border border-gray-200'
                                                }`}>
                                                {pedido.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-black text-[#ff5500] text-right">{formatCurrency(pedido.monto)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Más Vendidos (1 Col) */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-[#fcfaf9]">
                        <h3 className="font-bold text-[#1C1612]">Productos Populares</h3>
                    </div>
                    <div className="p-6 flex-1 space-y-4">
                        {masVendidos.map((prod, i) => (
                            <div key={i} className="flex gap-4 items-center p-3 rounded-lg border border-gray-100 bg-white hover:border-[#ff5500]/30 transition-colors shadow-sm">
                                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 relative border border-gray-200">
                                    <img src={prod.img} alt={prod.nombre} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-[#1C1612] truncate" title={prod.nombre}>{prod.nombre}</h4>
                                    <p className="text-xs text-gray-500 font-medium mt-0.5 truncate">{prod.marca}</p>
                                </div>
                                <div className="text-right flex-shrink-0 bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-100">
                                    <p className="text-lg font-black text-[#ff5500] leading-none">{prod.vendidos}</p>
                                    <p className="text-[10px] text-orange-800 font-bold uppercase tracking-widest mt-1">Vend.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
