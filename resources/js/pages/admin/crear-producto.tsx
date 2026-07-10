import React, { useRef, useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Minus, Plus, UploadCloud } from 'lucide-react';

interface Categoria {
    id_categoria: number;
    nombre: string;
}

interface Props {
    categorias: Categoria[];
}

export default function CrearProducto({ categorias }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        id_categoria: categorias.length > 0 ? categorias[0].id_categoria : '',
        fabricante: '',
        descripcion: '',
        precio: '',
        stock: 0,
        activo: true,
        imagen: null as File | null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/productos');
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('imagen', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <AdminLayout title="Nuevo Producto">
            <form onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-6 pb-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-4 gap-4">
                    <h2 className="text-[32px] font-black text-[#111] tracking-tighter uppercase relative inline-block">
                        <span className="text-[#ff5500] mr-3">+</span>NUEVO PRODUCTO
                    </h2>
                    <div className="flex items-center gap-3">
                        <Link href="/admin/productos" className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 text-xs font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors shadow-sm rounded-sm">
                            CANCELAR
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 bg-[#ff5500] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#e04a00] transition-colors shadow-sm rounded-sm disabled:opacity-50"
                        >
                            {processing ? 'GUARDANDO...' : 'GUARDAR PRODUCTO'}
                        </button>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* GENERAL INFO CARD */}
                        <div className="bg-white border border-gray-200 shadow-sm p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-6 bg-[#111]"></div>
                                <h3 className="text-[#111] text-lg font-bold tracking-tight">INFORMACIÓN GENERAL</h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">NOMBRE DEL PRODUCTO</label>
                                    <input
                                        type="text"
                                        value={data.nombre}
                                        onChange={e => setData('nombre', e.target.value)}
                                        placeholder="Ej. Figura Guts Berserker Armor"
                                        className="w-full bg-[#fcfcfc] border border-gray-200 text-sm py-3 px-4 focus:ring-2 focus:ring-[#ff5500] focus:border-[#ff5500] text-gray-800 outline-none rounded-sm transition-all"
                                    />
                                    {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">CATEGORÍA</label>
                                        <select
                                            value={data.id_categoria}
                                            onChange={e => setData('id_categoria', e.target.value)}
                                            className="w-full bg-[#fcfcfc] border border-gray-200 text-sm py-3 px-4 focus:ring-2 focus:ring-[#ff5500] focus:border-[#ff5500] text-gray-800 outline-none rounded-sm transition-all appearance-none"
                                        >
                                            <option value="">Seleccione una categoría</option>
                                            {categorias.map(cat => (
                                                <option key={cat.id_categoria} value={cat.id_categoria}>
                                                    {cat.nombre}
                                                </option>
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
                                            placeholder="Ej. Prime 1 Studio"
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
                                        placeholder="Describe los detalles, escala, materiales..."
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
                        <div className="bg-white border border-gray-200 shadow-sm p-8">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-6 bg-[#111]"></div>
                                <h3 className="text-[#111] text-lg font-bold tracking-tight">PRECIOS E INVENTARIO</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">PRECIO DE VENTA</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">S/.</span>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={data.precio}
                                            onChange={e => setData('precio', e.target.value)}
                                            placeholder="0.00"
                                            className="w-full bg-[#fcfcfc] border border-gray-200 text-[15px] text-gray-800 py-3 pl-10 pr-4 focus:ring-2 focus:ring-[#ff5500] focus:border-[#ff5500] outline-none rounded-sm transition-all"
                                        />
                                    </div>
                                    {errors.precio && <p className="text-red-500 text-xs mt-1">{errors.precio}</p>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">STOCK DISPONIBLE</label>
                                    <div className="flex">
                                        <button
                                            type="button"
                                            onClick={() => setData('stock', Math.max(0, data.stock - 1))}
                                            className="w-10 h-12 border border-r-0 border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors rounded-l-sm"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <input
                                            type="number"
                                            value={data.stock}
                                            onChange={e => setData('stock', parseInt(e.target.value) || 0)}
                                            className="flex-1 bg-[#fcfcfc] border-y border-gray-200 text-[15px] text-center text-gray-800 h-12 focus:outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setData('stock', data.stock + 1)}
                                            className="w-10 h-12 border border-l-0 border-gray-200 bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors rounded-r-sm"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* PRODUCT IMAGE */}
                        <div className="bg-white border border-gray-200 shadow-sm p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1.5 h-6 bg-[#111]"></div>
                                <h3 className="text-[#111] text-lg font-bold tracking-tight">IMAGEN PRINCIPAL</h3>
                            </div>

                            <div
                                className="border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center aspect-square mb-4 relative"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover p-1" />
                                ) : (
                                    <>
                                        <UploadCloud className="w-8 h-8 text-gray-400 mb-2" />
                                        <span className="text-xs font-bold text-gray-500">SUBIR IMAGEN</span>
                                    </>
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

                    </div>

                </div>
            </form>
        </AdminLayout>
    );
}
