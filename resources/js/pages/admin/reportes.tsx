import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { 
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
    Download, FileText, Calendar, Filter, DollarSign, 
    ShoppingCart, Users, Package, TrendingUp
} from 'lucide-react';

interface ReportesProps {
    filtros: {
        fecha_desde: string;
        fecha_hasta: string;
        tipo_reporte: string;
    };
    kpis: {
        ventas_totales: number;
        pedidos_realizados: number;
        usuarios_registrados: number;
        productos_vendidos: number;
        ticket_promedio: number;
    };
    charts: {
        ventas_por_mes: any[];
        ingresos_vs_pedidos: any[];
        productos_mas_vendidos: any[];
        estados_envios: any[];
    };
    tables: {
        top_productos: any[];
        ultimos_pedidos: any[];
        usuarios_recientes: any[];
        envios_retrasados: any[];
    };
}

export default function Reportes({ kpis, charts, tables, filtros }: ReportesProps) {
    const [fechaDesde, setFechaDesde] = useState(filtros?.fecha_desde || '');
    const [fechaHasta, setFechaHasta] = useState(filtros?.fecha_hasta || '');
    const [tipoReporte, setTipoReporte] = useState(filtros?.tipo_reporte || 'Ventas');

    const COLORS = ['#ff5500', '#8c7365', '#fb923c', '#d6d3d1', '#44403c'];

    const formatCurrency = (value: number) => `S/. ${value.toFixed(2)}`;

    const aplicarFiltros = () => {
        router.get('/admin/reportes', {
            fecha_desde: fechaDesde,
            fecha_hasta: fechaHasta,
            tipo_reporte: tipoReporte
        }, { preserveState: true });
    };

    const exportarExcel = () => {
        window.location.href = '/admin/reportes/exportar?formato=excel&tipo_reporte=' + encodeURIComponent(tipoReporte);
    };

    const exportarPdf = () => {
        // La forma más óptima de exportar dashboards a PDF en React es mediante la ventana de impresión nativa
        window.print();
    };

    // Componente: ReportsFilters & ExportButtons
    const renderHeaderAndFilters = () => (
        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mt-4 mb-8 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div>
                <h1 className="text-2xl font-bold text-[#1C1612] tracking-tight">Reportes Generales</h1>
                <p className="text-sm text-gray-500 mt-1">Analíticas de {tipoReporte.toLowerCase()}</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-1 bg-gray-50">
                    <Calendar className="w-4 h-4 text-gray-500 ml-2" />
                    <input 
                        type="date" 
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.target.value)}
                        className="text-sm bg-transparent border-none outline-none focus:ring-0 text-gray-700" 
                    />
                    <span className="text-gray-400">-</span>
                    <input 
                        type="date" 
                        value={fechaHasta}
                        onChange={(e) => setFechaHasta(e.target.value)}
                        className="text-sm bg-transparent border-none outline-none focus:ring-0 text-gray-700 mr-2" 
                    />
                </div>
                
                <select 
                    value={tipoReporte}
                    onChange={(e) => setTipoReporte(e.target.value)}
                    className="text-sm border border-gray-200 rounded-lg px-4 py-2 bg-white focus:ring-[#ff5500] focus:border-[#ff5500] outline-none font-bold text-gray-700"
                >
                    <option value="Ventas">Ventas</option>
                    <option value="Productos">Productos</option>
                    <option value="Usuarios">Usuarios</option>
                    <option value="Envíos">Envíos</option>
                </select>
                
                <button 
                    onClick={aplicarFiltros}
                    className="flex items-center gap-2 px-4 py-2 bg-[#ff5500] text-white font-bold rounded-lg hover:bg-[#e64a00] transition-colors text-sm shadow-sm"
                >
                    <Filter className="w-4 h-4" />
                    Aplicar
                </button>
                
                <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>
                
                <button 
                    onClick={exportarExcel}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-green-700 font-bold rounded-lg hover:bg-green-50 transition-colors text-sm shadow-sm" title="Exportar Excel"
                >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">Excel</span>
                </button>
                <button 
                    onClick={exportarPdf}
                    className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors text-sm shadow-sm" title="Imprimir PDF"
                >
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">PDF</span>
                </button>
            </div>
        </div>
    );

    // Componente: Tarjetas KPI
    const renderKPIs = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#ff5500]/10 flex items-center justify-center text-[#ff5500]">
                    <DollarSign className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Ventas Totales</p>
                    <h3 className="text-2xl font-black text-[#1C1612]">{formatCurrency(kpis.ventas_totales)}</h3>
                </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <ShoppingCart className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Pedidos Realizados</p>
                    <h3 className="text-2xl font-black text-[#1C1612]">{kpis.pedidos_realizados}</h3>
                </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <Users className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Usuarios Reg.</p>
                    <h3 className="text-2xl font-black text-[#1C1612]">{kpis.usuarios_registrados}</h3>
                </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
                    <Package className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Productos Vendidos</p>
                    <h3 className="text-2xl font-black text-[#1C1612]">{kpis.productos_vendidos}</h3>
                </div>
            </div>
        </div>
    );

    // Componente: ReportsCharts
    const renderCharts = () => (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Chart 1: Ventas por mes */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-[#1C1612]">Ventas por Mes</h3>
                    <TrendingUp className="w-5 h-5 text-gray-400" />
                </div>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={charts.ventas_por_mes} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} tickFormatter={(val) => `S/. ${val}`} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Line type="monotone" dataKey="ventas" stroke="#ff5500" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Chart 2: Ingresos vs Pedidos */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-[#1C1612]">Ingresos vs Pedidos</h3>
                </div>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={charts.ingresos_vs_pedidos} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                            <YAxis yAxisId="left" orientation="left" stroke="#ff5500" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <YAxis yAxisId="right" orientation="right" stroke="#8c7365" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Legend wrapperStyle={{ fontSize: '12px' }} />
                            <Bar yAxisId="left" dataKey="ingresos" name="Ingresos (S/.)" fill="#ff5500" radius={[4, 4, 0, 0]} />
                            <Bar yAxisId="right" dataKey="pedidos" name="N° Pedidos" fill="#8c7365" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Chart 3: Productos más vendidos */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-[#1C1612]">Top Productos (Unidades)</h3>
                </div>
                <div className="h-72 w-full flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={charts.productos_mas_vendidos}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {charts.productos_mas_vendidos.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Legend wrapperStyle={{ fontSize: '11px' }} layout="horizontal" verticalAlign="bottom" align="center" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Chart 4: Estados de Envíos */}
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-[#1C1612]">Estado General de Envíos</h3>
                </div>
                <div className="h-72 w-full flex justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={charts.estados_envios}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={100}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {charts.estados_envios.map((entry, index) => {
                                    // Custom colors for status
                                    let color = '#22c55e'; // default green for Entregados
                                    if (entry.name === 'Enviados') color = '#3b82f6'; // blue
                                    if (entry.name === 'Preparando') color = '#eab308'; // yellow
                                    if (entry.name === 'Retrasados') color = '#ef4444'; // red
                                    return <Cell key={`cell-${index}`} fill={color} />;
                                })}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Legend wrapperStyle={{ fontSize: '12px' }} layout="vertical" verticalAlign="middle" align="right" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );

    // Componente: ReportsTable
    const renderTable = () => {
        if (tipoReporte === 'Productos' || tipoReporte === 'Ventas') {
            return (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-[#fcfaf9]">
                        <h3 className="font-bold text-[#1C1612]">Top Productos Vendidos (Detalle)</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-bold text-[#8c7365] uppercase tracking-wider">PRODUCTO</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#8c7365] uppercase tracking-wider">CATEGORÍA</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#8c7365] uppercase tracking-wider">STOCK</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#8c7365] uppercase tracking-wider text-right">UNIDADES VENDIDAS</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {tables.top_productos.map((prod, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-800 text-sm">{prod.nombre}</td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">{prod.categoria}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-xs font-bold ${prod.stock === 0 ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700'}`}>
                                                {prod.stock === 0 ? 'Sin stock' : `${prod.stock} disp.`}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-black text-[#ff5500]">{prod.ventas}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        if (tipoReporte === 'Envíos') {
            return (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-red-50/50">
                        <h3 className="font-bold text-red-700">Envíos Retrasados</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 bg-white">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">PEDIDO</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">CLIENTE</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">TRACKING / COURIER</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">TIEMPO RETRASO</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {tables.envios_retrasados.map((envio, i) => (
                                    <tr key={i} className="hover:bg-red-50/30 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-800 text-sm">{envio.id}</td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">{envio.cliente}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold">{envio.courier}</div>
                                            <div className="text-xs font-mono text-gray-500">{envio.tracking}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                                                {envio.retraso}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }

        if (tipoReporte === 'Usuarios') {
            return (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-[#fcfaf9]">
                        <h3 className="font-bold text-[#1C1612]">Nuevos Registros (Recientes)</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    <th className="px-6 py-4 text-xs font-bold text-[#8c7365] uppercase tracking-wider">USUARIO</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#8c7365] uppercase tracking-wider">CORREO</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#8c7365] uppercase tracking-wider">FECHA REGISTRO</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#8c7365] uppercase tracking-wider text-right">ESTADO</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {tables.usuarios_recientes.map((user, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-gray-800 text-sm">{user.nombre}</td>
                                        <td className="px-6 py-4 text-gray-600 text-sm">{user.email}</td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">{user.fecha}</td>
                                        <td className="px-6 py-4 text-right">
                                            <span className={`px-2 py-1 rounded-md text-xs font-bold ${user.estado === 'Activo' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                                {user.estado}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
    };

    return (
        <AdminLayout>
            <Head title="Reportes - Motneki" />
            
            {renderHeaderAndFilters()}
            {renderKPIs()}
            {renderCharts()}
            {renderTable()}
            
        </AdminLayout>
    );
}
