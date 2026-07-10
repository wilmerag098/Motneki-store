import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { 
    TrendingUp, Calendar, ShoppingBag, 
    AlertTriangle, ClipboardList, ShieldCheck
} from 'lucide-react';

export default function AdminDashboard() {
    return (
        <AdminLayout title="Panel Ejecutivo">
            <div className="max-w-7xl mx-auto space-y-8 pb-12">
                
                {/* Header Section */}
                <div className="flex justify-between items-end border-b border-gray-200 pb-6">
                    <div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight uppercase">VISTA EJECUTIVA PROFESIONAL</h2>
                        <p className="text-xs font-semibold text-gray-400 mt-2 uppercase tracking-widest">LOGÍSTICA Y FLUJOS DE INGRESOS EN TIEMPO REAL</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors shadow-sm">
                            DESCARGAR REPORTE
                        </button>
                        <button className="px-6 py-2.5 bg-[#ff5500] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#e04a00] transition-colors shadow-sm">
                            NUEVA OPERACIÓN
                        </button>
                    </div>
                </div>

                {/* Metrics Cards (Row 1) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: Ventas del día */}
                    <div className="bg-white p-6 border border-gray-200 shadow-sm relative hover:border-[#ff5500] transition-colors">
                        <div className="flex justify-between items-start mb-6">
                            <div className="text-[#ff5500]">
                                <TrendingUp className="w-6 h-6" strokeWidth={2} />
                            </div>
                            <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                                +14.2%
                            </span>
                        </div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">VENTAS DEL DÍA</p>
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                            $42,850 <span className="text-base text-gray-400 font-bold">MXN</span>
                        </h3>
                    </div>

                    {/* Card 2: Ventas del mes */}
                    <div className="bg-white p-6 border border-gray-200 shadow-sm relative hover:border-[#ff5500] transition-colors">
                        <div className="flex justify-between items-start mb-6">
                            <div className="text-[#ff5500]">
                                <Calendar className="w-6 h-6" strokeWidth={2} />
                            </div>
                            <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded">
                                MES ACTUAL
                            </span>
                        </div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">VENTAS DEL MES</p>
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                            $1,284,090 <span className="text-base text-gray-400 font-bold">MXN</span>
                        </h3>
                    </div>

                    {/* Card 3: Total de pedidos */}
                    <div className="bg-white p-6 border border-gray-200 shadow-sm relative hover:border-[#ff5500] transition-colors">
                        <div className="flex justify-between items-start mb-6">
                            <div className="text-[#ff5500]">
                                <ShoppingBag className="w-6 h-6" strokeWidth={2} />
                            </div>
                            <span className="text-[10px] font-bold text-[#ff5500] bg-[#fff0e6] px-2 py-1 rounded">
                                342 ACTIVOS
                            </span>
                        </div>
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">TOTAL DE PEDIDOS</p>
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                            1,029 <span className="text-base text-gray-400 font-bold">UNIDADES</span>
                        </h3>
                    </div>
                </div>

                {/* Operations Cards (Row 2) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stock Crítico */}
                    <div className="bg-white p-6 border border-gray-200 shadow-sm flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2 text-red-600 font-bold tracking-widest uppercase">
                                <AlertTriangle className="w-5 h-5" />
                                <span>STOCK CRÍTICO</span>
                            </div>
                            <span className="text-[10px] font-bold text-red-500 uppercase">
                                5 ITEMS
                            </span>
                        </div>
                        <div className="space-y-3 mb-6 flex-1">
                            <div className="flex justify-between items-center p-3 bg-red-50/50 border border-red-100 rounded text-sm">
                                <span className="text-gray-700 font-medium">Figuarts Goku 2.0</span>
                                <span className="text-red-600 font-bold text-xs uppercase">1 UNID.</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-red-50/50 border border-red-100 rounded text-sm">
                                <span className="text-gray-700 font-medium">Statue 1/4 Tifa</span>
                                <span className="text-red-600 font-bold text-xs uppercase">0 UNID.</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-red-50/50 border border-red-100 rounded text-sm">
                                <span className="text-gray-700 font-medium">Kit MG Barbatos</span>
                                <span className="text-red-600 font-bold text-xs uppercase">2 UNID.</span>
                            </div>
                        </div>
                        <button className="w-full py-2.5 bg-white border border-gray-200 text-gray-500 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
                            VER INVENTARIO COMPLETO
                        </button>
                    </div>

                    {/* Por Procesar */}
                    <div className="bg-white p-6 border border-gray-200 shadow-sm flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2 text-gray-900 font-bold tracking-widest uppercase">
                                <ClipboardList className="w-5 h-5 text-[#ff5500]" />
                                <span>POR PROCESAR</span>
                            </div>
                            <span className="text-[10px] font-bold text-[#ff5500] uppercase">
                                12 PENDIENTES
                            </span>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-100 mb-6 bg-gray-50/50">
                            <span className="text-5xl font-black text-gray-900 tracking-tighter mb-2">12</span>
                            <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase text-center">
                                ÓRDENES ESPERANDO LOGÍSTICA
                            </span>
                        </div>
                        <button className="w-full py-2.5 bg-[#ff5500] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-[#e04a00] transition-colors shadow-sm">
                            ATENDER PEDIDOS
                        </button>
                    </div>

                    {/* Verificación Pagos */}
                    <div className="bg-white p-6 border border-gray-200 shadow-sm flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2 text-gray-900 font-bold tracking-widest uppercase">
                                <ShieldCheck className="w-5 h-5 text-blue-500" />
                                <span>VERIFICACIÓN PAGOS</span>
                            </div>
                            <span className="text-[10px] font-bold text-blue-500 uppercase">
                                8 ALERTAS
                            </span>
                        </div>
                        <div className="space-y-4 mb-6 flex-1">
                            <div className="flex justify-between items-center p-3 text-sm border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span className="text-gray-700 font-medium">Transferencia SPEI - #8821</span>
                                </div>
                                <span className="text-gray-900 font-bold text-xs">$890</span>
                            </div>
                            <div className="flex justify-between items-center p-3 text-sm border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span className="text-gray-700 font-medium">Depósito OXXO - #8794</span>
                                </div>
                                <span className="text-gray-900 font-bold text-xs">$245</span>
                            </div>
                        </div>
                        <button className="w-full py-2.5 bg-white border border-gray-200 text-gray-500 text-[11px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors">
                            IR A TESORERÍA
                        </button>
                    </div>
                </div>

                {/* Main Content Grid (Row 3) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Pedidos Recientes (2 Cols) */}
                    <div className="lg:col-span-2 bg-white border border-gray-200 shadow-sm flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-900 tracking-tight uppercase">PEDIDOS RECIENTES</h3>
                            <button className="text-[11px] font-bold text-[#ff5500] hover:text-[#e04a00] uppercase tracking-widest transition-colors">
                                VER HISTORIAL
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-[#fcfcfc] text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">ID PEDIDO</th>
                                        <th className="px-6 py-4 font-bold">CLIENTE</th>
                                        <th className="px-6 py-4 font-bold">ESTADO</th>
                                        <th className="px-6 py-4 font-bold text-right">MONTO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-gray-50 transition-colors border-b border-gray-100">
                                        <td className="px-6 py-6 font-bold text-[#ff5500]">#MTN-8821</td>
                                        <td className="px-6 py-6 font-medium text-gray-900">Arisaka.K</td>
                                        <td className="px-6 py-6">
                                            <span className="text-[10px] font-bold text-[#ff5500] border border-[#ff5500]/30 bg-[#fff0e6] px-2.5 py-1 rounded">PROCESANDO</span>
                                        </td>
                                        <td className="px-6 py-6 font-bold text-gray-900 text-right">$890.00</td>
                                    </tr>
                                    <tr className="hover:bg-gray-50 transition-colors border-b-transparent">
                                        <td className="px-6 py-6 font-bold text-[#ff5500]">#MTN-8794</td>
                                        <td className="px-6 py-6 font-medium text-gray-900">Saito_V</td>
                                        <td className="px-6 py-6">
                                            <span className="text-[10px] font-bold text-gray-500 border border-gray-300 bg-gray-50 px-2.5 py-1 rounded">ENVIADO</span>
                                        </td>
                                        <td className="px-6 py-6 font-bold text-gray-900 text-right">$245.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Más Vendidos (1 Col) */}
                    <div className="bg-white border border-gray-200 shadow-sm flex flex-col p-6">
                        <h3 className="text-lg font-bold text-gray-900 tracking-tight uppercase mb-6 border-b border-gray-100 pb-6">MÁS VENDIDOS</h3>
                        
                        <div className="space-y-6 flex-1">
                            {/* Product 1 */}
                            <div className="flex gap-4 items-center">
                                <div className="w-16 h-16 bg-[#111] rounded overflow-hidden flex-shrink-0 relative border border-gray-200">
                                    <img src="https://images.unsplash.com/photo-1608248593845-a4f66d499fc2?w=100&auto=format&fit=crop&q=80" alt="Cyberpunk" className="w-full h-full object-cover opacity-80" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-gray-900 truncate">Estatua Cyberpunk 2077</h4>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">ESC. 1/6 PREMIUM</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-base font-black text-[#ff5500]">42</p>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">VEND.</p>
                                </div>
                            </div>
                            
                            {/* Product 2 */}
                            <div className="flex gap-4 items-center">
                                <div className="w-16 h-16 bg-[#111] rounded overflow-hidden flex-shrink-0 relative border border-gray-200">
                                    <img src="https://images.unsplash.com/photo-1580436541355-6679549f29c4?w=100&auto=format&fit=crop&q=80" alt="Gundam" className="w-full h-full object-cover opacity-80" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-gray-900 truncate">Gundam Aerial Full Mech</h4>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">BANDAI NAMCO</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                    <p className="text-base font-black text-[#ff5500]">38</p>
                                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">VEND.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}
