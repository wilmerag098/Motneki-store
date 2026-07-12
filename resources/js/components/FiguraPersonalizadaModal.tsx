import React, { useState, useRef } from 'react';
import { useForm } from '@inertiajs/react';
import { 
    X, 
    Upload, 
    Cloud,
    Send
} from 'lucide-react';

interface FiguraPersonalizadaModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FiguraPersonalizadaModal({ isOpen, onClose }: FiguraPersonalizadaModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data, setData, post, processing, errors, reset, transform } = useForm({
        nombre: '',
        descripcion: '',
        referencia_url: '',
        imagen: null as File | null,
        presupuesto: '',
        // Campos extra visuales
        tamano: '',
        material: '',
        urgencia: 'Normal',
        contacto_nombre: '',
        contacto_email: '',
        contacto_telefono: ''
    });

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('imagen', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setData('imagen', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    transform((data) => {
        let finalDesc = data.descripcion;
        finalDesc += `\n\n--- Detalles Extras ---`;
        if (data.tamano) finalDesc += `\nTamaño: ${data.tamano}`;
        if (data.material) finalDesc += `\nMaterial: ${data.material}`;
        if (data.urgencia) finalDesc += `\nUrgencia: ${data.urgencia}`;
        if (data.contacto_nombre) {
            finalDesc += `\nContacto: ${data.contacto_nombre} | ${data.contacto_email} | ${data.contacto_telefono}`;
        }
        
        return {
            ...data,
            descripcion: finalDesc,
        };
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/solicitudes-figuras', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setPreviewUrl(null);
                onClose();
                alert('Solicitud enviada correctamente');
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200">
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-800 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="p-8 md:p-10">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">
                        Solicitar figura personalizada
                    </h2>

                    <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        
                        {/* LEFT COLUMN */}
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">Nombre del producto deseado *</label>
                                <input 
                                    type="text" 
                                    className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#ff5500] focus:border-[#ff5500] outline-none transition-shadow"
                                    placeholder="Ej: Figura Goku Ultra Instinto - Ichibansho"
                                    value={data.nombre}
                                    onChange={e => setData('nombre', e.target.value)}
                                    required
                                />
                                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">Descripción detallada *</label>
                                <textarea 
                                    className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#ff5500] focus:border-[#ff5500] outline-none transition-shadow min-h-[140px] resize-y"
                                    placeholder="Describe el producto que deseas, versión, serie, características, etc."
                                    value={data.descripcion}
                                    onChange={e => setData('descripcion', e.target.value)}
                                    required
                                ></textarea>
                                {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Dropzone */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-2">Imagen de referencia *</label>
                                    <div 
                                        className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer min-h-[160px] relative"
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={handleDrop}
                                    >
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            ref={fileInputRef} 
                                            onChange={handleFileChange} 
                                            accept="image/png, image/jpeg, image/webp"
                                        />
                                        {previewUrl ? (
                                            <div className="absolute inset-2">
                                                <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                                            </div>
                                        ) : (
                                            <>
                                                <Cloud className="w-10 h-10 text-gray-400 mb-2" strokeWidth={1.5} />
                                                <p className="text-xs text-gray-600 leading-relaxed mb-1">
                                                    Arrastra tu imagen aquí<br />o haz clic para seleccionar
                                                </p>
                                                <p className="text-[10px] text-gray-400">
                                                    (JPG, PNG, WEBP - Máx. 5MB)
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    {errors.imagen && <p className="text-red-500 text-xs mt-1">{errors.imagen}</p>}
                                </div>

                                {/* Right Side of Row */}
                                <div className="flex flex-col justify-between h-[160px] mt-7">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-800 mb-2">Link de referencia (opcional)</label>
                                        <input 
                                            type="url" 
                                            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#ff5500] outline-none"
                                            placeholder="https://ejemplo.com/producto"
                                            value={data.referencia_url}
                                            onChange={e => setData('referencia_url', e.target.value)}
                                        />
                                        {errors.referencia_url && <p className="text-red-500 text-xs mt-1">{errors.referencia_url}</p>}
                                    </div>
                                    
                                    <button 
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-[#ff5500] hover:bg-[#e64d00] disabled:opacity-50 text-white font-bold rounded-lg p-3.5 flex items-center justify-center gap-2 transition-colors mt-auto shadow-md"
                                    >
                                        <Send className="w-4 h-4" />
                                        Enviar solicitud
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">Presupuesto aproximado (PEN) *</label>
                                <input 
                                    type="number" 
                                    className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#ff5500] outline-none"
                                    placeholder="Ej: 250"
                                    value={data.presupuesto}
                                    onChange={e => setData('presupuesto', e.target.value)}
                                    required
                                />
                                {errors.presupuesto && <p className="text-red-500 text-xs mt-1">{errors.presupuesto}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">Tamaño aproximado (opcional)</label>
                                <select 
                                    className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#ff5500] outline-none appearance-none bg-white"
                                    value={data.tamano}
                                    onChange={e => setData('tamano', e.target.value)}
                                >
                                    <option value="">Selecciona</option>
                                    <option value="Pequeño (10-15cm)">Pequeño (10-15cm)</option>
                                    <option value="Mediano (15-25cm)">Mediano (15-25cm)</option>
                                    <option value="Grande (+25cm)">Grande (+25cm)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">Material (opcional)</label>
                                <select 
                                    className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#ff5500] outline-none appearance-none bg-white"
                                    value={data.material}
                                    onChange={e => setData('material', e.target.value)}
                                >
                                    <option value="">Selecciona</option>
                                    <option value="PVC / Plástico">PVC / Plástico</option>
                                    <option value="Resina">Resina</option>
                                    <option value="Metal / Diecast">Metal / Diecast</option>
                                    <option value="Indiferente">Indiferente</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-800 mb-2">Urgencia</label>
                                <select 
                                    className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#ff5500] outline-none appearance-none bg-white"
                                    value={data.urgencia}
                                    onChange={e => setData('urgencia', e.target.value)}
                                >
                                    <option value="Baja (Sin prisa)">Baja (Sin prisa)</option>
                                    <option value="Normal">Normal</option>
                                    <option value="Alta (Lo necesito pronto)">Alta (Lo necesito pronto)</option>
                                </select>
                            </div>

                            <div className="pt-2">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Información de contacto</h3>
                                
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-800 mb-2">Nombre completo *</label>
                                        <input 
                                            type="text" 
                                            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#ff5500] outline-none"
                                            placeholder="Tu nombre completo"
                                            value={data.contacto_nombre}
                                            onChange={e => setData('contacto_nombre', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-800 mb-2">Email *</label>
                                        <input 
                                            type="email" 
                                            className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#ff5500] outline-none"
                                            placeholder="tu@email.com"
                                            value={data.contacto_email}
                                            onChange={e => setData('contacto_email', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-2">Teléfono / WhatsApp</label>
                                    <input 
                                        type="tel" 
                                        className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#ff5500] outline-none"
                                        placeholder="9XXXXXXXX"
                                        value={data.contacto_telefono}
                                        onChange={e => setData('contacto_telefono', e.target.value)}
                                    />
                                </div>
                            </div>

                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}
