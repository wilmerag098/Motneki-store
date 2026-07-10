import React, { useRef, useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Minus, Plus, UploadCloud } from 'lucide-react';

interface Categoria {
    id_categoria: number;
    nombre: string;
}

interface Producto {
    id_producto: number;
    id_categoria: number;
    nombre: string;
    fabricante: string | null;
    descripcion: string | null;
    precio: number;
    stock: number;
    activo: boolean;
    imagen_url: string | null;
    disponibilidad: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
}

interface Props {
    producto: Producto;
    categorias: Categoria[];
}

export default function EditarProducto({ producto, categorias }: Props) {
    const { data, setData, post, processing, errors, transform } = useForm({
        nombre: producto.nombre,
        id_categoria: producto.id_categoria,
        fabricante: producto.fabricante || '',
        descripcion: producto.descripcion || '',
        precio: producto.precio,
        stock: producto.stock,
        activo: producto.activo,
        imagen: null as File | null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(producto.imagen_url);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            _method: 'put',
        }));

        post(`/admin/productos/editar/${producto.id_producto}`);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('imagen', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return '';
        const d = new Date(dateString);
        return d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    return (
        <AdminLayout title="Editar Producto">
            <form onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-6 pb-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-200 pb-4 gap-4">
                    <div>
                        <h2 className="text-[32px] font-black text-[#111] tracking-tighter uppercase relative inline-block">
                            EDITAR PRODUCTO
                        </h2>
                        <p className="text-[#ff5500] font-mono text-sm tracking-wide mt-1">{producto.nombre}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/admin/productos" className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors shadow-sm rounded-sm">
                            CANCELAR
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 bg-[#ff5500] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#e04a00] transition-colors shadow-sm rounded-sm disabled:opacity-50"
                        >
                            {processing ? 'GUARDANDO...' : 'GUARDAR CAMBIOS'}
                        </button>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* GENERAL INFO CARD */}
                        <div className="bg-white border border-gray-200 shadow-sm p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-6 bg-[#ff5500]"></div>
                                <h3 className="text-[#111] text-lg font-bold tracking-tight">INFORMACIÓN GENERAL</h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">NOMBRE DEL PRODUCTO</label>
                                    <input
                                        type="text"
                                        value={data.nombre}
                                        onChange={e => setData('nombre', e.target.value)}
                                        className="w-full bg-[#fcfcfc] border border-gray-200 text-sm py-3 px-4 focus:ring-2 focus:ring-[#ff5500] focus:border-[#ff5500] text-gray-800 outline-none rounded-sm transition-all"
                                    />
                                    {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">CATEGORÍA</label>
                                        <select
                                            value={data.id_categoria}
                                            onChange={e => setData('id_categoria', parseInt(e.target.value))}
                                            className="w-full bg-[#fcfcfc] border border-gray-200 text-sm py-3 px-4 focus:ring-2 focus:ring-[#ff5500] focus:border-[#ff5500] text-gray-800 outline-none rounded-sm transition-all appearance-none"
                                        >
                                            <option value="">Seleccione categoría</option>
                                            {categorias.map(cat => (
                                                <option key={cat.id_categoria} value={cat.id_categoria}>{cat.nombre}</option>
                                            ))}
                                        </select>
                                        {errors.id_categoria && <p className="text-red-500 text-xs mt-1">{errors.id_categoria}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">FABRICANTE</label>
                                        <input
                                            type="text"
                                            value={data.fabricante}
                                            onChange={e => setData('fabricante', e.target.value)}
                                            className="w-full bg-[#fcfcfc] border border-gray-200 text-sm py-3 px-4 focus:ring-2 focus:ring-[#ff5500] focus:border-[#ff5500] text-gray-800 outline-none rounded-sm transition-all"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">DESCRIPCIÓN</label>
                                    <textarea
                                        rows={4}
                                        value={data.descripcion}
                                        onChange={e => setData('descripcion', e.target.value)}
                                        className="w-full bg-[#fcfcfc] border border-gray-200 text-sm py-3 px-4 focus:ring-2 focus:ring-[#ff5500] focus:border-[#ff5500] text-gray-800 outline-none rounded-sm transition-all resize-none"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">ESTADO</label>
                                    <div className="bg-[#fcfcfc] border border-gray-200 rounded-sm py-3 px-5 flex items-center justify-between">
                                        <span className="text-sm text-gray-800">Producto Activo en Tienda</span>
                                        <button
                                            type="button"
                                            onClick={() => setData('activo', !data.activo)}
                                            className={`w-12 h-6 rounded-full p-1 transition-colors relative focus:outline-none ${data.activo ? 'bg-[#ff5500]' : 'bg-gray-300'}`}
                                        >
                                            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${data.activo ? 'translate-x-6' : 'translate-x-0'}`}></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* PRICING & INVENTORY CARD */}
                        <div className="bg-white border border-gray-200 shadow-sm">
                            <div className="border-b border-gray-100 px-8 py-5">
                                <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                                    <span className="w-1.5 h-4 bg-[#ff5500] inline-block"></span>
                                    PRECIO E INVENTARIO
                                </h3>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">PRECIO (S/.)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-bold">S/.</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.precio}
                                            onChange={e => setData('precio', e.target.value as unknown as number)}
                                            className="w-full bg-[#fcfcfc] border border-gray-200 text-sm py-3 pl-10 pr-4 focus:ring-2 focus:ring-[#ff5500] focus:border-[#ff5500] text-gray-800 outline-none rounded-sm transition-all"
                                        />
                                    </div>
                                    {errors.precio && <p className="text-red-500 text-xs mt-1">{errors.precio}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">CANTIDAD EN STOCK</label>
                                    <div className="flex border border-gray-200 rounded-sm overflow-hidden w-full h-[46px] bg-[#fcfcfc]">
                                        <button
                                            type="button"
                                            onClick={() => setData('stock', Math.max(0, data.stock - 1))}
                                            className="w-12 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors border-r border-gray-200"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={data.stock}
                                            onChange={e => setData('stock', parseInt(e.target.value) || 0)}
                                            className="w-full text-center text-sm font-bold text-gray-800 focus:outline-none bg-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setData('stock', data.stock + 1)}
                                            className="w-12 h-full flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors border-l border-gray-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                    {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock}</p>}
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* PRODUCT IMAGE */}
                        <div className="bg-white border border-gray-200 shadow-sm p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1.5 h-6 bg-[#ff5500]"></div>
                                <h3 className="text-[#111] text-lg font-bold tracking-tight">IMAGEN DEL PRODUCTO</h3>
                            </div>

                            <div
                                className="border border-dashed border-gray-300 p-1 mb-4 cursor-pointer hover:bg-gray-50 transition-colors relative aspect-square flex items-center justify-center"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Product"
                                        className="w-full h-full object-cover bg-white"
                                    />
                                ) : (
                                    <div className="text-center text-gray-400">
                                        <UploadCloud className="w-8 h-8 mx-auto mb-2" />
                                        <span className="text-xs font-bold">SUBIR NUEVA IMAGEN</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleImageChange}
                                    accept="image/*"
                                />
                            </div>
                            <p className="text-center text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                RECOMENDADO: 1000X1000PX JPG/PNG
                            </p>
                            {errors.imagen && <p className="text-red-500 text-xs mt-2 text-center">{errors.imagen}</p>}
                        </div>

                        {/* PREORDER STATUS (If applicable, showing statically as per design) */}
                        {producto.disponibilidad === 'preventa' && (
                            <div className="bg-[#111111] shadow-sm p-6 text-white text-center rounded-sm">
                                <div className="flex items-center justify-center gap-2 mb-6">
                                    <div className="w-2 h-2 rounded-full bg-[#ff5500]"></div>
                                    <h3 className="text-[#ff5500] text-[10px] font-bold uppercase tracking-widest">ESTADO DE PREVENTA</h3>
                                </div>

                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex flex-col items-center">
                                        <span className="text-3xl font-normal tracking-tight">08</span>
                                        <span className="text-[8px] text-gray-500 uppercase tracking-widest mt-1">DÍAS</span>
                                    </div>
                                    <span className="text-xl text-gray-600 pb-4">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-3xl font-normal tracking-tight">14</span>
                                        <span className="text-[8px] text-gray-500 uppercase tracking-widest mt-1">HORAS</span>
                                    </div>
                                    <span className="text-xl text-gray-600 pb-4">:</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-3xl font-normal tracking-tight">32</span>
                                        <span className="text-[8px] text-gray-500 uppercase tracking-widest mt-1">MIN</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* AUDIT INFO */}
                        <div className="bg-[#fdfdfd] border border-gray-200 shadow-sm p-6">
                            <h3 className="text-gray-500 text-[11px] font-bold uppercase tracking-widest mb-6">INFORMACIÓN DE AUDITORÍA</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Creado el:</span>
                                    <span className="font-bold text-gray-900">{formatDate(producto.fecha_creacion)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">Última edición:</span>
                                    <span className="font-bold text-gray-900">{formatDate(producto.fecha_actualizacion)}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">ID de Producto:</span>
                                    <span className="font-bold text-gray-900">#{producto.id_producto}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </form>
        </AdminLayout>
    );
}
