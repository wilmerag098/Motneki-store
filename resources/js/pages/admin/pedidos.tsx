import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { ShoppingBag, ClipboardList, Wallet, Truck, Filter, Download, Eye, Edit3, CreditCard, Landmark } from 'lucide-react';

interface Pago {
    metodo: string;
    estado: string;
}

interface Usuario {
    nombre: string;
    email: string;
}

interface Pedido {
    id_pedido: number;
    total: number;
    estado: string;
    fecha_creacion: string;
    usuario?: Usuario;
    pago?: Pago;
}

interface PaginationData {
    data: Pedido[];
    links: { url: string | null; label: string; active: boolean }[];
    total: number;
    from: number;
    to: number;
}

interface KPIs {
    totalPedidos: number;
    pedidosPendientes: number;
    ingresosTotales: number;
    tasaEntrega: number;
}

interface Props {
    pedidos: PaginationData;
    kpis: KPIs;
}

export default function Pedidos({ pedidos, kpis }: Props) {

    const getMetodoIcon = (metodo?: string) => {
        const met = (metodo || '').toLowerCase();
        if (met.includes('visa') || met.includes('tarjeta') || met.includes('mastercard')) {
            return <><CreditCard className="w-4 h-4 text-gray-500" /> VISA</>;
        }
        if (met.includes('transf') || met.includes('banco')) {
            return <><Landmark className="w-4 h-4 text-gray-500" /> TRANSF.</>;
        }
        if (met.includes('paypal')) {
            // Using Wallet for Paypal
            return <><Wallet className="w-4 h-4 text-gray-500" /> PAYPAL</>;
        }
        return <><CreditCard className="w-4 h-4 text-gray-500" /> {metodo || 'N/A'}</>;
    };

    const getEstadoBadge = (estado: string) => {
        const est = estado.toLowerCase();
        if (est === 'pagado') {
            return <span className="bg-[#e6f0ff] text-[#0066cc] border border-[#b3d4ff] text-[10px] font-black uppercase px-3 py-1 rounded-sm">PAGADO</span>;
        }
        if (est === 'enviado') {
            return <span className="bg-[#fff0e6] text-[#ff5500] border border-[#ffccb3] text-[10px] font-black uppercase px-3 py-1 rounded-sm">ENVIADO</span>;
        }
        if (est === 'pendiente') {
            return <span className="bg-[#fffbe6] text-[#cc9900] border border-[#ffe680] text-[10px] font-black uppercase px-3 py-1 rounded-sm">PENDIENTE</span>;
        }
        if (est === 'entregado') {
            return <span className="bg-[#e6ffe6] text-[#009933] border border-[#99ff99] text-[10px] font-black uppercase px-3 py-1 rounded-sm">ENTREGADO</span>;
        }
        return <span className="bg-gray-100 text-gray-600 border border-gray-300 text-[10px] font-black uppercase px-3 py-1 rounded-sm">{estado}</span>;
    };

    const formatDateStac = (dateString: string) => {
        if (!dateString) return { day: '--', month: '---', year: '----' };
        const d = new Date(dateString);
        const day = d.getDate().toString().padStart(2, '0');
        const month = d.toLocaleString('es-ES', { month: 'short' }).toUpperCase();
        const year = d.getFullYear();
        return { day, month, year };
    };

    return (
        <AdminLayout title="Gestión de Pedidos">
            <div className="max-w-7xl mx-auto space-y-8 pb-12">
                
                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Pedidos */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-sm relative">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">TOTAL PEDIDOS (MES)</p>
                        <span className="text-4xl font-black tracking-tighter text-[#111]">{kpis.totalPedidos.toLocaleString()}</span>
                        <div className="mt-4 flex items-center gap-1.5">
                            <svg className="w-3 h-3 text-[#ff5500]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            <span className="text-[#ff5500] text-xs font-medium">+12.5% vs. mes anterior</span>
                        </div>
                        <div className="absolute right-6 top-6 text-gray-100">
                            <ShoppingBag className="w-12 h-12" strokeWidth={1} />
                        </div>
                    </div>

                    {/* Pedidos Pendientes */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-sm relative">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">PEDIDOS PENDIENTES</p>
                        <span className="text-4xl font-black tracking-tighter text-[#111]">{kpis.pedidosPendientes}</span>
                        <div className="mt-4 flex items-center gap-1.5">
                            <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-gray-500 text-xs font-medium">Promedio 4.2h de espera</span>
                        </div>
                        <div className="absolute right-6 top-6 text-gray-100">
                            <ClipboardList className="w-12 h-12" strokeWidth={1} />
                        </div>
                    </div>

                    {/* Ingresos Totales */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 border-l-4 border-l-[#ff5500] rounded-sm relative">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">INGRESOS TOTALES</p>
                        <span className="text-3xl font-black tracking-tighter text-[#ff5500]">S/. {numberFormat(kpis.ingresosTotales)}</span>
                        <div className="mt-4 flex items-center gap-1.5">
                            <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-gray-600 text-xs font-medium">Pagos procesados con éxito</span>
                        </div>
                        <div className="absolute right-6 top-6 text-gray-100">
                            <Wallet className="w-12 h-12" strokeWidth={1} />
                        </div>
                    </div>

                    {/* Tasa de Entrega */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-sm relative">
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">TASA DE ENTREGA</p>
                        <span className="text-4xl font-black tracking-tighter text-[#111]">{kpis.tasaEntrega}%</span>
                        <div className="mt-4 flex items-center gap-1.5">
                            <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-green-600 text-xs font-medium">Optimizado este trimestre</span>
                        </div>
                        <div className="absolute right-6 top-6 text-gray-100">
                            <Truck className="w-12 h-12" strokeWidth={1} />
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
                    {/* Action Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-black tracking-tighter text-[#111] uppercase">GESTIÓN DE PEDIDOS</h2>
                        <div className="flex items-center gap-3 mt-4 md:mt-0">
                            <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-[11px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-50 transition-colors rounded-sm shadow-sm">
                                <Filter className="w-4 h-4" strokeWidth={2.5} />
                                FILTRAR
                            </button>
                            <a 
                                href="/admin/pedidos/exportar" 
                                className="px-5 py-2.5 bg-[#ff5500] text-white text-[11px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-[#e04a00] transition-colors rounded-sm shadow-[0_4px_14px_0_rgba(255,85,0,0.39)]"
                            >
                                <Download className="w-4 h-4" strokeWidth={2.5} />
                                EXPORTAR CSV
                            </a>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f8f9fa] border-b border-gray-200 text-gray-500 text-[11px] font-black uppercase tracking-widest">
                                    <th className="px-6 py-4 w-[120px]">ID PEDIDO</th>
                                    <th className="px-6 py-4">CLIENTE</th>
                                    <th className="px-6 py-4">FECHA</th>
                                    <th className="px-6 py-4">TOTAL</th>
                                    <th className="px-6 py-4">MÉTODO</th>
                                    <th className="px-6 py-4">ESTADO</th>
                                    <th className="px-6 py-4 text-center">ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pedidos.data.map((pedido, idx) => {
                                    const date = formatDateStac(pedido.fecha_creacion);
                                    return (
                                        <tr key={pedido.id_pedido} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${idx % 2 !== 0 ? 'bg-[#fafafa]' : 'bg-white'}`}>
                                            {/* ID */}
                                            <td className="px-6 py-4">
                                                <span className="text-[#111] font-black text-sm tracking-tight">
                                                    #MTN-{pedido.id_pedido.toString().padStart(4, '0')}
                                                </span>
                                            </td>
                                            
                                            {/* CLIENTE */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-[#111] font-bold text-[15px] leading-tight mb-0.5">{pedido.usuario?.nombre || 'Desconocido'}</span>
                                                    <span className="text-gray-400 text-xs font-mono tracking-tight">{pedido.usuario?.email || 'N/A'}</span>
                                                </div>
                                            </td>

                                            {/* FECHA */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col text-gray-500 font-mono text-[11px] tracking-widest leading-tight">
                                                    <span>{date.day}</span>
                                                    <span>{date.month},</span>
                                                    <span>{date.year}</span>
                                                </div>
                                            </td>

                                            {/* TOTAL */}
                                            <td className="px-6 py-4">
                                                <span className="text-[#ff5500] font-black text-sm tracking-tighter">
                                                    S/. {numberFormat(pedido.total)}
                                                </span>
                                            </td>

                                            {/* MÉTODO */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-700 font-bold text-xs uppercase tracking-widest">
                                                    {getMetodoIcon(pedido.pago?.metodo)}
                                                </div>
                                            </td>

                                            {/* ESTADO */}
                                            <td className="px-6 py-4">
                                                {getEstadoBadge(pedido.estado)}
                                            </td>

                                            {/* ACCIONES */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button className="w-8 h-8 border border-gray-200 rounded-sm flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-colors bg-white shadow-sm">
                                                        <Eye className="w-4 h-4" strokeWidth={2} />
                                                    </button>
                                                    <button className="w-8 h-8 border border-gray-200 rounded-sm flex items-center justify-center text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-colors bg-white shadow-sm">
                                                        <Edit3 className="w-4 h-4" strokeWidth={2} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {pedidos.data.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500 font-medium">
                                            No se encontraron pedidos.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {pedidos.data.length > 0 && (
                        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-[#fafafa]">
                            <div className="text-gray-500 text-xs font-mono tracking-tight">
                                Mostrando {pedidos.from}-{pedidos.to} de {pedidos.total.toLocaleString()} pedidos
                            </div>
                            <div className="flex items-center gap-1">
                                {pedidos.links.map((link, i) => {
                                    // Limpiar labels (Quitar Previous y Next en Laravel pagination text)
                                    let label = link.label.replace('&laquo; Previous', 'PREV').replace('Next &raquo;', 'NEXT');
                                    
                                    if (link.url === null) {
                                        return (
                                            <span key={i} className="px-3 py-1.5 border border-gray-200 text-gray-400 text-xs font-bold bg-white rounded-sm opacity-50 cursor-not-allowed">
                                                {label}
                                            </span>
                                        );
                                    }

                                    return (
                                        <Link 
                                            key={i} 
                                            href={link.url}
                                            className={`px-3 py-1.5 border text-xs font-bold rounded-sm transition-colors ${
                                                link.active 
                                                    ? 'bg-[#ff5500] border-[#ff5500] text-white shadow-sm' 
                                                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                                            }`}
                                        >
                                            {label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

// Helper para formato de número
function numberFormat(num: number): string {
    return Number(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
