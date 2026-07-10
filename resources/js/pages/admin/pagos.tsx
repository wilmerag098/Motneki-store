import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Download, Plus, Banknote, ClipboardCheck, CheckCircle2, XCircle, Search, Filter, Landmark, CreditCard, Wallet, FileText } from 'lucide-react';

interface Usuario {
    nombre: string;
    email: string;
}

interface Pedido {
    usuario?: Usuario;
}

interface Pago {
    id_pago: number;
    monto: number;
    metodo: string;
    estado: string;
    fecha_pago: string;
    pedido?: Pedido;
}

interface PaginationData {
    data: Pago[];
    links: { url: string | null; label: string; active: boolean }[];
    total: number;
    from: number;
    to: number;
}

interface KPIs {
    totalRecaudado: number;
    pendientesConfirmar: number;
    tasaAprobacion: number;
    pagosRechazados: number;
}

interface Props {
    pagos: PaginationData;
    kpis: KPIs;
}

export default function Pagos({ pagos, kpis }: Props) {
    const [estadoFilter, setEstadoFilter] = useState('todos');

    const getMetodoIcon = (metodo: string) => {
        const met = metodo.toLowerCase();
        if (met.includes('visa') || met.includes('tarjeta') || met.includes('mastercard')) {
            return <><CreditCard className="w-4 h-4 text-gray-500" /> Visa **** {Math.floor(Math.random() * 9000) + 1000}</>;
        }
        if (met.includes('transf') || met.includes('banco')) {
            return <><Landmark className="w-4 h-4 text-gray-500" /> Transferencia</>;
        }
        if (met.includes('paypal')) {
            return <><Wallet className="w-4 h-4 text-gray-500" /> PayPal</>;
        }
        return <><CreditCard className="w-4 h-4 text-gray-500" /> {metodo}</>;
    };

    const getEstadoBadge = (estado: string) => {
        const est = estado.toLowerCase();
        if (est === 'pagado' || est === 'aprobado') {
            return <span className="bg-[#e6ffe6] text-[#00b36b] border border-[#99ffcc] text-[10px] font-black uppercase px-3 py-1 rounded-sm tracking-widest">APROBADO</span>;
        }
        if (est === 'pendiente') {
            return <span className="bg-white text-[#cc9900] border border-[#ffe680] text-[10px] font-black uppercase px-3 py-1 rounded-sm tracking-widest">PENDIENTE</span>;
        }
        if (est === 'fallido' || est === 'rechazado') {
            return <span className="bg-[#ffe6e6] text-[#ff4d4d] border border-[#ffb3b3] text-[10px] font-black uppercase px-3 py-1 rounded-sm tracking-widest">RECHAZADO</span>;
        }
        return <span className="bg-gray-100 text-gray-600 border border-gray-300 text-[10px] font-black uppercase px-3 py-1 rounded-sm">{estado}</span>;
    };

    const formatDateStac = (dateString: string) => {
        if (!dateString) return { date: 'N/A', time: '' };
        const d = new Date(dateString);
        const day = d.getDate().toString().padStart(2, '0');
        const month = d.toLocaleString('es-ES', { month: 'short' });
        const year = d.getFullYear();
        const hours = d.getHours().toString().padStart(2, '0');
        const mins = d.getMinutes().toString().padStart(2, '0');
        
        return { 
            date: `${day}\n${month.charAt(0).toUpperCase() + month.slice(1)}\n${year}`, 
            time: `${hours}:${mins} hrs` 
        };
    };

    const getAvatarColor = (name: string) => {
        const char = name.charAt(0).toUpperCase();
        if (['A','B','C','D','E'].includes(char)) return 'bg-[#ffe6e6] text-[#ff6666]';
        if (['F','G','H','I','J'].includes(char)) return 'bg-[#e6f2ff] text-[#4d94ff]';
        if (['K','L','M','N','O'].includes(char)) return 'bg-[#fff0e6] text-[#ff8c1a]';
        if (['P','Q','R','S','T'].includes(char)) return 'bg-[#e6ffe6] text-[#33cc33]';
        return 'bg-gray-100 text-gray-600';
    };

    return (
        <AdminLayout title="Gestión de Pagos">
            <div className="max-w-7xl mx-auto space-y-8 pb-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-black tracking-tighter text-[#111]">Pagos Recibidos</h1>
                        <p className="text-gray-500 mt-2 text-base">Gestiona conciliaciones, transferencias bancarias y recibos de pago manuales.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <a 
                            href="/admin/pagos/exportar" 
                            className="px-5 py-3 bg-white border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm rounded-sm"
                        >
                            <Download className="w-4 h-4" strokeWidth={2.5} />
                            EXPORTAR
                        </a>
                        <button className="px-5 py-3 bg-[#ff5500] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-[#e04a00] transition-colors shadow-sm rounded-sm">
                            <Plus className="w-4 h-4" strokeWidth={2.5} />
                            REGISTRAR PAGO
                        </button>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total Recaudado */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 border-b-4 border-b-[#ff5500] rounded-sm relative">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest w-24 leading-tight">TOTAL RECAUDADO (MES)</p>
                            <div className="bg-[#ffe6e6] p-1.5 rounded-sm">
                                <Banknote className="w-5 h-5 text-[#ff4d4d]" />
                            </div>
                        </div>
                        <span className="text-[28px] font-black tracking-tighter text-[#111]">${numberFormat(kpis.totalRecaudado)}</span>
                        <div className="mt-3 flex items-center gap-1.5">
                            <svg className="w-3 h-3 text-[#00cc66]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                            <span className="text-[#00cc66] text-xs font-medium leading-tight w-32">+12.5% vs mes<br/>anterior</span>
                        </div>
                    </div>

                    {/* Pendientes */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 border-b-4 border-b-[#ffcc00] rounded-sm relative">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest w-24 leading-tight">PENDIENTES DE CONFIRMAR</p>
                            <div className="bg-[#fff5cc] p-1.5 rounded-sm">
                                <ClipboardCheck className="w-5 h-5 text-[#ffcc00]" />
                            </div>
                        </div>
                        <span className="text-[28px] font-black tracking-tighter text-[#111]">{kpis.pendientesConfirmar}</span>
                        <div className="mt-3 text-gray-500 text-xs font-medium leading-tight w-32">
                            Req. verificación<br/>manual
                        </div>
                    </div>

                    {/* Aprobación */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 border-b-4 border-b-[#00cc66] rounded-sm relative">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest w-24 leading-tight">TASA DE APROBACIÓN</p>
                            <div className="bg-[#e6ffe6] p-1.5 rounded-sm">
                                <CheckCircle2 className="w-5 h-5 text-[#00cc66]" />
                            </div>
                        </div>
                        <span className="text-[28px] font-black tracking-tighter text-[#111]">{kpis.tasaAprobacion}%</span>
                        <div className="mt-3 text-gray-500 text-xs font-medium leading-tight w-32">
                            Promedio últimos 30<br/>días
                        </div>
                    </div>

                    {/* Rechazados */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 border-b-4 border-b-[#cc0000] rounded-sm relative">
                        <div className="flex justify-between items-start mb-4">
                            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest w-24 leading-tight">PAGOS RECHAZADOS</p>
                            <div className="bg-[#ffe6e6] p-1.5 rounded-sm">
                                <XCircle className="w-5 h-5 text-[#cc0000]" />
                            </div>
                        </div>
                        <span className="text-[28px] font-black tracking-tighter text-[#111]">{kpis.pagosRechazados}</span>
                        <div className="mt-3 flex items-center gap-1.5 text-[#cc0000] text-xs font-medium">
                            <AlertCircleIcon className="w-3.5 h-3.5" /> Requieren atención
                        </div>
                    </div>
                </div>

                {/* Filters & Table */}
                <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
                    {/* Filter Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b border-gray-200 gap-4">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Buscar por ID, Cliente o Comprobante..." 
                                className="w-full bg-white border border-gray-300 text-sm py-2 pl-10 pr-4 focus:ring-1 focus:ring-[#ff5500] focus:border-[#ff5500] placeholder:text-gray-400 text-gray-700 outline-none rounded-sm"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-colors ${estadoFilter === 'todos' ? 'bg-[#111] text-white' : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'}`} onClick={() => setEstadoFilter('todos')}>TODOS</button>
                            <button className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border transition-colors flex items-center gap-1.5 ${estadoFilter === 'pendientes' ? 'border-[#ffcc00] bg-[#fff5cc] text-[#cc9900]' : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'}`} onClick={() => setEstadoFilter('pendientes')}>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#ffcc00]"></span> PENDIENTES
                            </button>
                            <button className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border transition-colors flex items-center gap-1.5 ${estadoFilter === 'aprobados' ? 'border-[#00cc66] bg-[#e6ffe6] text-[#00994d]' : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'}`} onClick={() => setEstadoFilter('aprobados')}>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00cc66]"></span> APROBADOS
                            </button>
                            <button className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-full border transition-colors flex items-center gap-1.5 ${estadoFilter === 'rechazados' ? 'border-[#ff4d4d] bg-[#ffe6e6] text-[#cc0000]' : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'}`} onClick={() => setEstadoFilter('rechazados')}>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d4d]"></span> RECHAZADOS
                            </button>
                            <button className="p-1.5 text-gray-500 border border-gray-300 rounded-sm hover:bg-gray-50 flex items-center gap-1 text-xs">
                                <Filter className="w-4 h-4" /> Más
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#f8f9fa] border-b border-gray-200 text-gray-400 text-[11px] font-black uppercase tracking-widest">
                                    <th className="px-6 py-4 w-[100px]">ID PAGO</th>
                                    <th className="px-6 py-4">CLIENTE</th>
                                    <th className="px-6 py-4 w-[100px]">FECHA /<br/>HORA</th>
                                    <th className="px-6 py-4 text-center">MONTO</th>
                                    <th className="px-6 py-4 text-center">MÉTODO</th>
                                    <th className="px-6 py-4 text-center">COMPROBANTE</th>
                                    <th className="px-6 py-4 text-center">ESTADO</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagos.data.map((pago, idx) => {
                                    const date = formatDateStac(pago.fecha_pago);
                                    const isRejected = pago.estado.toLowerCase() === 'fallido' || pago.estado.toLowerCase() === 'rechazado';
                                    const nombre = pago.pedido?.usuario?.nombre || 'Desconocido';
                                    
                                    return (
                                        <tr key={pago.id_pago} className="border-b border-gray-100 hover:bg-gray-50 transition-colors bg-white">
                                            {/* ID */}
                                            <td className="px-6 py-6 align-middle">
                                                <span className="text-[#111] font-black text-sm tracking-tight">
                                                    #PAY-{pago.id_pago.toString().padStart(4, '0')}
                                                </span>
                                            </td>
                                            
                                            {/* CLIENTE */}
                                            <td className="px-6 py-6 align-middle">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${getAvatarColor(nombre)}`}>
                                                        {nombre.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[#111] font-bold text-[15px] leading-tight mb-0.5">{nombre}</span>
                                                        <span className="text-gray-400 text-xs font-medium tracking-tight">{pago.pedido?.usuario?.email || 'N/A'}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* FECHA / HORA */}
                                            <td className="px-6 py-6 align-middle">
                                                <div className="flex flex-col text-gray-500 text-[13px] leading-snug">
                                                    <span>{date.date.split('\n')[0]}</span>
                                                    <span>{date.date.split('\n')[1]}</span>
                                                    <span>{date.date.split('\n')[2]}</span>
                                                    <span className="text-gray-400 text-[11px] mt-1">{date.time}</span>
                                                </div>
                                            </td>

                                            {/* MONTO */}
                                            <td className="px-6 py-6 align-middle text-center">
                                                <span className={`font-medium text-[15px] tracking-tight ${isRejected ? 'text-gray-400 line-through' : 'text-[#111]'}`}>
                                                    ${numberFormat(pago.monto)}
                                                </span>
                                            </td>

                                            {/* MÉTODO */}
                                            <td className="px-6 py-6 align-middle text-center">
                                                <div className="flex items-center justify-center gap-2 text-gray-600 font-medium text-[14px]">
                                                    {getMetodoIcon(pago.metodo)}
                                                </div>
                                            </td>

                                            {/* COMPROBANTE */}
                                            <td className="px-6 py-6 align-middle text-center">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button className="w-8 h-8 border border-gray-300 rounded-sm flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors">
                                                        <FileText className="w-4 h-4" strokeWidth={1.5} />
                                                    </button>
                                                    {pago.metodo.toLowerCase() !== 'transferencia' && (
                                                        <span className="text-gray-400 italic text-xs">Automático</span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* ESTADO */}
                                            <td className="px-6 py-6 align-middle text-center">
                                                {getEstadoBadge(pago.estado)}
                                            </td>
                                        </tr>
                                    );
                                })}
                                {pagos.data.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500 font-medium">
                                            No se encontraron pagos.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

// Icon helper since lucide-react might not have AlertCircleIcon
function AlertCircleIcon(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
    );
}

// Helper para formato de número
function numberFormat(num: number): string {
    return Number(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
