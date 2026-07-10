import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { RefreshCcw, Plus, SlidersHorizontal, AlertTriangle, ArrowDownToLine, Wallet, Edit3, PlusSquare } from 'lucide-react';

interface Categoria {
    id_categoria: number;
    nombre: string;
}

interface Producto {
    id_producto: number;
    id_categoria: number;
    nombre: string;
    fabricante: string | null;
    precio: number;
    stock: number;
    activo: boolean;
    imagen_url: string | null;
    categoria: Categoria;
}

interface KPIs {
    totalSKU: number;
    valorInventario: number;
    stockBajo: number;
    entradasMes: number;
}

interface Props {
    productos: Producto[];
    categorias: Categoria[];
    kpis: KPIs;
}

export default function Inventario({ productos, categorias, kpis }: Props) {
    const [categoriaFilter, setCategoriaFilter] = useState('');
    const [estadoFilter, setEstadoFilter] = useState('');

    const formatCurrency = (value: number) => {
        if (value >= 1000) {
            return `€${(value / 1000).toFixed(0)}k`;
        }
        return `€${value.toFixed(0)}`;
    };

    const getEstadoInfo = (stock: number) => {
        if (stock === 0) {
            return {
                label: ['SIN', 'STOCK'],
                wrapperClass: 'bg-gray-200 rounded-sm py-1 px-2 w-[52px]',
                textClass: 'text-gray-500',
                barColor: 'bg-gray-200',
                textColor: 'text-gray-900',
                barWidth: '0%',
                actionIconColor: 'text-[#ff5500]'
            };
        } else if (stock <= 5) {
            return {
                label: ['STOCK', 'BAJO'],
                wrapperClass: 'border border-[#ff5500] rounded-sm py-1 px-2 w-[52px]',
                textClass: 'text-[#ff5500]',
                barColor: 'bg-[#ff5500]',
                textColor: 'text-[#ff5500]',
                barWidth: `${Math.min(stock * 10, 100)}%`,
                actionIconColor: 'text-gray-600'
            };
        } else {
            return {
                label: ['NORMAL'],
                wrapperClass: 'border border-gray-200 rounded-sm py-1 px-2 w-[52px]',
                textClass: 'text-gray-400',
                barColor: 'bg-gray-800',
                textColor: 'text-gray-900',
                barWidth: `${Math.min(stock * 2, 100)}%`,
                actionIconColor: 'text-gray-600'
            };
        }
    };

    const filteredProductos = productos.filter(p => {
        if (categoriaFilter && p.id_categoria.toString() !== categoriaFilter) return false;
        
        if (estadoFilter) {
            if (estadoFilter === 'bajo' && p.stock > 5) return false;
            if (estadoFilter === 'sin' && p.stock !== 0) return false;
            if (estadoFilter === 'normal' && p.stock <= 5) return false;
        }
        return true;
    });

    const addStock = (id: number, currentStock: number) => {
        router.put(`/admin/inventario/stock/${id}`, {
            stock: currentStock + 1
        }, {
            preserveScroll: true
        });
    };

    return (
        <AdminLayout title="Gestión de Inventario">
            <div className="max-w-7xl mx-auto space-y-8 pb-12">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-[32px] font-black text-[#111] tracking-tighter">Gestión de Inventario</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <RefreshCcw className="w-3 h-3 text-[#ff5500]" />
                            <span className="text-[#ff5500] text-xs font-mono tracking-tight">Actualización automática del stock activa</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-xs font-bold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm rounded-sm">
                            <Plus className="w-4 h-4" />
                            Registrar Entradas
                        </button>
                        <button className="px-5 py-2.5 bg-[#ff5500] text-white text-xs font-bold flex items-center gap-2 hover:bg-[#e04a00] transition-colors shadow-sm rounded-sm">
                            <SlidersHorizontal className="w-4 h-4" />
                            Ajuste Global
                        </button>
                    </div>
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Total SKU */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-sm">
                        <p className="text-gray-500 text-xs tracking-wide font-medium mb-2">Total de SKU</p>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-black tracking-tighter text-[#111]">{kpis.totalSKU.toLocaleString()}</span>
                            <span className="text-[#ff5500] text-[10px] font-bold mb-1 leading-none">+12 esta<br/>semana</span>
                        </div>
                    </div>

                    {/* Valor Inventario */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-sm relative">
                        <p className="text-gray-500 text-xs tracking-wide font-medium mb-2">Valor Inventario</p>
                        <span className="text-4xl font-black tracking-tighter text-[#111]">{formatCurrency(kpis.valorInventario)}</span>
                        <div className="absolute right-6 bottom-6 text-[#ff5500]">
                            <Wallet className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Alerta Stock Bajo */}
                    <div className="bg-white p-6 shadow-sm border-2 border-[#ff5500] rounded-sm relative overflow-hidden">
                        <div className="absolute -right-12 -top-12 w-32 h-32 bg-[#ff5500]/5 rotate-45"></div>
                        <p className="text-[#ff5500] text-sm italic font-bold tracking-tight mb-2">Alerta: Stock<br/>Bajo</p>
                        <span className="text-4xl font-black tracking-tighter text-[#ff5500]">{kpis.stockBajo}</span>
                        <div className="absolute right-6 bottom-6 text-[#ff5500]">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Entradas del Mes */}
                    <div className="bg-white p-6 shadow-sm border border-gray-200 rounded-sm relative">
                        <p className="text-gray-500 text-xs tracking-wide font-medium mb-2">Entradas del Mes</p>
                        <span className="text-4xl font-black tracking-tighter text-[#111]">{kpis.entradasMes}</span>
                        <div className="absolute right-6 bottom-6 text-gray-400 border border-gray-300 rounded-sm p-1">
                            <ArrowDownToLine className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Table Container */}
                <div className="bg-[#fcfcfc] border border-gray-200 rounded-sm">
                    {/* Filters bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b border-gray-200 bg-[#f8f9fa]">
                        <div className="flex items-center gap-4">
                            <select 
                                value={categoriaFilter}
                                onChange={(e) => setCategoriaFilter(e.target.value)}
                                className="bg-white border border-gray-300 text-gray-600 text-xs font-medium py-2 px-3 rounded-sm outline-none focus:border-[#ff5500] min-w-[180px]"
                            >
                                <option value="">Todas las Categorías</option>
                                {categorias.map(c => (
                                    <option key={c.id_categoria} value={c.id_categoria}>{c.nombre}</option>
                                ))}
                            </select>

                            <select 
                                value={estadoFilter}
                                onChange={(e) => setEstadoFilter(e.target.value)}
                                className="bg-white border border-gray-300 text-gray-600 text-xs font-medium py-2 px-3 rounded-sm outline-none focus:border-[#ff5500] min-w-[160px]"
                            >
                                <option value="">Todos los Estados</option>
                                <option value="normal">Normal</option>
                                <option value="bajo">Stock Bajo</option>
                                <option value="sin">Sin Stock</option>
                            </select>
                        </div>
                        <div className="text-gray-500 text-xs font-mono tracking-tight mt-4 md:mt-0">
                            Mostrando {filteredProductos.length > 0 ? 1 : 0}-{Math.min(10, filteredProductos.length)} de {productos.length.toLocaleString()} productos
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-500 text-[11px] font-mono tracking-wide">
                                    <th className="font-normal px-6 py-4">Imagen</th>
                                    <th className="font-normal px-6 py-4">Nombre del Producto</th>
                                    <th className="font-normal px-6 py-4">Categoría</th>
                                    <th className="font-normal px-6 py-4">Stock Actual</th>
                                    <th className="font-normal px-6 py-4">Estado</th>
                                    <th className="font-normal px-6 py-4 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {filteredProductos.map((producto, index) => {
                                    const estado = getEstadoInfo(producto.stock);
                                    
                                    // Simulating SKU MK-XX-000 format
                                    const prefix = producto.categoria?.nombre?.substring(0, 2).toUpperCase() || 'XX';
                                    const sku = `MK-${prefix}-${producto.id_producto.toString().padStart(3, '0')}`;

                                    return (
                                        <tr key={producto.id_producto} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                            <td className="px-6 py-4 w-[100px]">
                                                <div className="w-16 h-16 bg-black flex items-center justify-center shrink-0">
                                                    {producto.imagen_url ? (
                                                        <img src={producto.imagen_url} alt={producto.nombre} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="text-white text-[10px]">No img</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-[#111] font-bold text-sm tracking-tight">{producto.nombre}</span>
                                                    <span className="text-gray-400 text-[10px] font-mono tracking-wider mt-1">SKU: {sku}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 text-sm">
                                                <div className="flex flex-col w-24">
                                                    {producto.categoria?.nombre.split(' ').map((word, i) => (
                                                        <span key={i}>{word}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className={`text-lg font-black tracking-tighter w-6 ${estado.textColor}`}>
                                                        {producto.stock.toString().padStart(2, '0')}
                                                    </span>
                                                    <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                                                        <div 
                                                            className={`h-full ${estado.barColor} transition-all`} 
                                                            style={{ width: estado.barWidth }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className={`flex flex-col items-center justify-center ${estado.wrapperClass}`}>
                                                    {estado.label.map((word, i) => (
                                                        <span key={i} className={`text-[9px] font-black tracking-widest uppercase leading-[1.2] ${estado.textClass}`}>
                                                            {word}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-4">
                                                    <Link 
                                                        href={`/admin/productos/editar/${producto.id_producto}`}
                                                        className={`${estado.actionIconColor} hover:text-[#ff5500] transition-colors`}
                                                    >
                                                        <Edit3 className="w-5 h-5" strokeWidth={1.5} />
                                                    </Link>
                                                    <button 
                                                        onClick={() => addStock(producto.id_producto, producto.stock)}
                                                        className="text-gray-600 hover:text-[#111] transition-colors"
                                                        title="Añadir stock"
                                                    >
                                                        <PlusSquare className="w-5 h-5" strokeWidth={1.5} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filteredProductos.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                            No se encontraron productos con los filtros actuales.
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
