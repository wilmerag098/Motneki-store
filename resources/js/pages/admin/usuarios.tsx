import React, { useState } from 'react';
import { Head, router, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Search, Edit2, Ban, Trash2, Plus, User, Mail, Lock, Eye, EyeOff, UserPlus, RotateCcw, X, AlertTriangle, Key } from 'lucide-react';

interface Rol {
    id_rol: number;
    nombre: string;
}

interface User {
    id_usuario: number;
    nombre: string;
    email: string;
    activo: boolean;
    fecha_creacion: string;
    rol: Rol;
}

interface UsuariosProps {
    usuarios: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: any[];
    };
    roles: Rol[];
    filters: {
        search?: string;
        rol?: string;
    };
}

export default function Usuarios({ usuarios, roles, filters }: UsuariosProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [rolFilter, setRolFilter] = useState(filters.rol || 'Todos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Edit Modal State
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<User | null>(null);

    // Status Modal State
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [userToChangeStatus, setUserToChangeStatus] = useState<User | null>(null);
    const [newStatus, setNewStatus] = useState(true);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        email: '',
        password: '',
        password_confirmation: '',
        activo: true
    });

    const editForm = useForm({
        nombre: '',
        email: '',
        id_rol: '',
        activo: true
    });

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/usuarios', {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const openEditModal = (usuario: User) => {
        setUserToEdit(usuario);
        editForm.setData({
            nombre: usuario.nombre || '',
            email: usuario.email || '',
            id_rol: usuario.rol?.id_rol?.toString() || (roles[0]?.id_rol?.toString() || ''),
            activo: usuario.activo
        });
        setIsEditModalOpen(true);
    };

    const handleUpdateUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userToEdit) return;
        editForm.put(`/admin/usuarios/${userToEdit.id_usuario}`, {
            onSuccess: () => setIsEditModalOpen(false),
        });
    };

    const openStatusModal = (usuario: User) => {
        setUserToChangeStatus(usuario);
        setNewStatus(usuario.activo);
        setIsStatusModalOpen(true);
    };

    const handleUpdateStatus = () => {
        if (!userToChangeStatus) return;
        setIsUpdatingStatus(true);
        router.put(`/admin/usuarios/${userToChangeStatus.id_usuario}`, { activo: newStatus }, {
            preserveScroll: true,
            onSuccess: () => {
                setIsStatusModalOpen(false);
                setUserToChangeStatus(null);
                setIsUpdatingStatus(false);
            },
            onError: () => setIsUpdatingStatus(false)
        });
    };

    const confirmDelete = (usuario: User) => {
        setUserToDelete(usuario);
        setIsDeleteModalOpen(true);
    };

    const handleDelete = () => {
        if (!userToDelete) return;
        setIsDeleting(true);
        router.delete(`/admin/usuarios/${userToDelete.id_usuario}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsDeleteModalOpen(false);
                setUserToDelete(null);
                setIsDeleting(false);
            },
            onError: () => setIsDeleting(false)
        });
    };

    const applyFilters = () => {
        router.get('/admin/usuarios', { search, rol: rolFilter }, { preserveState: true });
    };

    const handleFilterKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            applyFilters();
        }
    };

    const handleRolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRolFilter(e.target.value);
        router.get('/admin/usuarios', { search, rol: e.target.value }, { preserveState: true });
    };

    // Helper to get initials
    const getInitials = (name: string) => {
        if (!name) return 'U';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const getBadgeStyle = (rolNombre: string) => {
        const lower = rolNombre?.toLowerCase() || '';
        if (lower === 'administrador' || lower === 'admin') {
            return 'bg-[#ff5500]/10 text-[#ff5500] font-bold';
        }
        return 'bg-gray-100 text-gray-600 font-bold';
    };

    return (
        <AdminLayout title="Administradores">
            <Head title="Administradores - MotnekiStore" />

            {/* Encabezado */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Administradores</h1>
                    <p className="text-gray-500 mt-1">Gestión y control de accesos del personal administrativo.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#ff5500] text-white font-bold rounded-lg hover:bg-[#e64a00] transition-colors shadow-sm text-sm"
                >
                    <Plus className="w-4 h-4" />
                    Nuevo Administrador
                </button>
            </div>

            {/* Panel de Filtros */}
            <div className="bg-white rounded-t-xl border-x border-t border-gray-200 p-5 mt-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    
                    <div className="relative w-full sm:w-[400px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Buscar por nombre, email o cliente..." 
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff5500] focus:border-[#ff5500] outline-none text-sm transition-shadow bg-gray-50/50"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyDown={handleFilterKeyPress}
                        />
                    </div>
                    
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <span className="text-sm font-semibold text-gray-700">Rol:</span>
                        <select 
                            className="w-[160px] px-3 py-2 border border-[#ff5500] text-gray-800 rounded-lg outline-none text-sm appearance-none bg-white font-medium"
                            value={rolFilter}
                            onChange={handleRolChange}
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ff5500'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                        >
                            <option value="Todos">Todos</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Cliente">Cliente</option>
                        </select>
                    </div>

                </div>
            </div>

            {/* Tabla de Resultados */}
            <div className="bg-white rounded-b-xl border border-gray-200 shadow-sm overflow-hidden mb-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-[#f8f9fa] border-b border-gray-200">
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider w-[300px]">NOMBRE</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">EMAIL</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">ROL</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">ESTADO</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider">FECHA DE CREACIÓN</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase tracking-wider text-right pr-10">ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {usuarios.data.length > 0 ? (
                                usuarios.data.map((usuario) => (
                                    <tr key={usuario.id_usuario} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 shrink-0">
                                                    {getInitials(usuario.nombre)}
                                                </div>
                                                <span className="text-sm font-bold text-gray-900">{usuario.nombre}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600">{usuario.email}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 text-[10px] uppercase rounded-md tracking-widest ${getBadgeStyle(usuario.rol?.nombre)}`}>
                                                {usuario.rol?.nombre || 'SIN ROL'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] uppercase font-bold rounded-full border ${usuario.activo ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${usuario.activo ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                {usuario.activo ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(usuario.fecha_creacion))}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-3 pr-4">
                                                <button 
                                                    onClick={() => openEditModal(usuario)}
                                                    className="p-1.5 text-gray-400 hover:text-[#ff5500] hover:bg-[#ff5500]/10 rounded transition-colors" 
                                                    title="Editar"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => openStatusModal(usuario)}
                                                    className="p-1.5 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded transition-colors" 
                                                    title={usuario.activo ? "Desactivar" : "Activar"}
                                                >
                                                    <Ban className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => confirmDelete(usuario)}
                                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" 
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 text-sm">
                                        No se encontraron usuarios.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Paginación */}
                {usuarios.total > 0 && (
                    <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-[#f8f9fa]">
                        <div className="text-sm text-gray-500">
                            Mostrando {(usuarios.current_page - 1) * usuarios.per_page + 1} a {Math.min(usuarios.current_page * usuarios.per_page, usuarios.total)} de {usuarios.total}
                        </div>
                        
                        <div className="flex items-center gap-1">
                            {usuarios.links.map((link, index) => {
                                const isPrev = link.label.includes('Previous');
                                const isNext = link.label.includes('Next');
                                
                                if (isPrev || isNext) {
                                    return null; // Ocultamos los prev/next de texto default de inertia y usamos flechas manuales si queremos
                                }

                                return (
                                    <button 
                                        key={index}
                                        onClick={() => link.url && router.get(link.url, { search, rol: rolFilter }, { preserveState: true })}
                                        disabled={!link.url}
                                        className={`w-8 h-8 flex items-center justify-center rounded border font-medium text-sm transition-colors ${
                                            link.active 
                                                ? 'bg-[#ff5500] border-[#ff5500] text-white' 
                                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal Nuevo Administrador */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
                        
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white">
                            <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">Nuevo Administrador</h2>
                            <button 
                                onClick={closeModal}
                                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateUser} className="p-6" autoComplete="off">
                            <div className="space-y-4">
                                
                                <div>
                                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Nombre completo <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="text" 
                                            required
                                            autoComplete="off"
                                            value={data.nombre}
                                            onChange={e => setData('nombre', e.target.value)}
                                            placeholder="Ej. Juan Pérez"
                                            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff5500] outline-none text-sm font-medium text-gray-800"
                                        />
                                    </div>
                                    {errors.nombre && <p className="text-xs text-red-500 mt-1">{errors.nombre}</p>}
                                </div>

                                <div>
                                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Correo electrónico <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input 
                                            type="email" 
                                            required
                                            autoComplete="off"
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                            placeholder="juan.perez@empresa.com"
                                            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff5500] outline-none text-sm font-medium text-gray-800"
                                        />
                                    </div>
                                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Contraseña <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input 
                                                type={showPassword ? "text" : "password"} 
                                                required
                                                autoComplete="new-password"
                                                value={data.password}
                                                onChange={e => setData('password', e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full pl-9 pr-9 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff5500] outline-none text-sm font-medium text-gray-800"
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                                    </div>
                                    
                                    <div>
                                        <label className="block text-[13px] font-bold text-gray-700 mb-1.5">Confirmar Contraseña <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <RotateCcw className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                            <input 
                                                type={showConfirmPassword ? "text" : "password"} 
                                                required
                                                autoComplete="new-password"
                                                value={data.password_confirmation}
                                                onChange={e => setData('password_confirmation', e.target.value)}
                                                placeholder="••••••••"
                                                className="w-full pl-9 pr-9 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff5500] outline-none text-sm font-medium text-gray-800"
                                            />
                                            <button 
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">Estado: Activo</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">El usuario podrá acceder inmediatamente.</p>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => setData('activo', !data.activo)}
                                        className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out focus:outline-none ${data.activo ? 'bg-[#c64600]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out shadow-sm ${data.activo ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                    </button>
                                </div>

                            </div>

                            <div className="mt-8 flex justify-center gap-3">
                                <button 
                                    type="button"
                                    onClick={closeModal}
                                    className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="flex items-center gap-2 px-6 py-2.5 bg-[#ff5500] text-white font-bold rounded-lg hover:bg-[#e64a00] transition-colors shadow-md text-sm disabled:opacity-50"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    {processing ? 'Creando...' : 'Crear Administrador'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Confirmar Eliminación */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                    <div className="bg-[#f8f9fa] rounded-2xl shadow-xl w-full max-w-sm overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-8 flex flex-col items-center text-center">
                            
                            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                <AlertTriangle className="w-6 h-6 text-red-500" />
                            </div>

                            <h2 className="text-xl font-bold text-gray-900 mb-2">Eliminar Administrador</h2>
                            <p className="text-[13px] text-gray-500 mb-8 leading-relaxed px-2">
                                ¿Seguro que deseas eliminar este administrador? Esta acción no se puede deshacer y revocará todo el acceso.
                            </p>

                            <div className="flex items-center justify-center gap-3 w-full px-2">
                                <button 
                                    onClick={() => {
                                        setIsDeleteModalOpen(false);
                                        setUserToDelete(null);
                                    }}
                                    disabled={isDeleting}
                                    className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="flex-1 px-4 py-2.5 bg-[#c81e1e] text-white font-bold rounded-lg hover:bg-[#a51818] transition-colors text-sm disabled:opacity-50 flex justify-center items-center gap-2"
                                >
                                    {isDeleting ? 'Eliminando...' : 'Eliminar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Editar Administrador */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                    <div className="bg-[#fcfaf9] rounded-xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
                        
                        <div className="px-6 py-4 border-b border-[#f3e6e0] flex justify-between items-center bg-white">
                            <h2 className="text-lg font-bold text-[#1a1a1a] tracking-tight">Editar Administrador</h2>
                            <button 
                                onClick={() => setIsEditModalOpen(false)}
                                className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdateUser} className="px-6 py-5 bg-white">
                            <div className="space-y-4">
                                
                                <div>
                                    <label className="block text-[11px] font-bold text-[#8c7365] mb-1">Nombre Completo</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={editForm.data.nombre}
                                        onChange={e => editForm.setData('nombre', e.target.value)}
                                        className="w-full px-3 py-2 border border-[#f3e6e0] rounded-lg focus:ring-1 focus:ring-[#ff5500] focus:border-[#ff5500] outline-none text-[13px] font-medium text-gray-800 bg-white"
                                    />
                                    {editForm.errors.nombre && <p className="text-xs text-red-500 mt-1">{editForm.errors.nombre}</p>}
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold text-[#8c7365] mb-1">Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={editForm.data.email}
                                        onChange={e => editForm.setData('email', e.target.value)}
                                        className="w-full px-3 py-2 border border-[#f3e6e0] rounded-lg focus:ring-1 focus:ring-[#ff5500] focus:border-[#ff5500] outline-none text-[13px] font-medium text-gray-800 bg-white"
                                    />
                                    {editForm.errors.email && <p className="text-xs text-red-500 mt-1">{editForm.errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold text-[#8c7365] mb-1">Rol</label>
                                    <select 
                                        value={editForm.data.id_rol}
                                        onChange={e => editForm.setData('id_rol', e.target.value)}
                                        className="w-full px-3 py-2 border border-[#f3e6e0] rounded-lg focus:ring-1 focus:ring-[#ff5500] focus:border-[#ff5500] outline-none text-[13px] font-medium text-gray-800 bg-white appearance-none"
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem' }}
                                    >
                                        {roles?.map(rol => (
                                            <option key={rol.id_rol} value={rol.id_rol}>{rol.nombre}</option>
                                        ))}
                                    </select>
                                    {editForm.errors.id_rol && <p className="text-xs text-red-500 mt-1">{editForm.errors.id_rol}</p>}
                                </div>

                                <div className="border border-[#f3e6e0] rounded-lg p-3 flex items-center justify-between bg-[#fcfaf9]">
                                    <div>
                                        <h4 className="text-[12px] font-bold text-gray-900">Estado de Cuenta</h4>
                                        <p className="text-[11px] text-[#8c7365]">{editForm.data.activo ? 'Activo' : 'Inactivo'}</p>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => editForm.setData('activo', !editForm.data.activo)}
                                        className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out focus:outline-none ${editForm.data.activo ? 'bg-[#c64600]' : 'bg-gray-200'}`}
                                    >
                                        <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out shadow-sm ${editForm.data.activo ? 'translate-x-5' : 'translate-x-0'}`}></span>
                                    </button>
                                </div>

                                <div className="pt-2">
                                    <button 
                                        type="button"
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-[#f3e6e0] text-[#555] font-bold rounded-lg hover:bg-gray-50 transition-colors text-[13px] shadow-sm"
                                    >
                                        <Key className="w-4 h-4 text-gray-500" />
                                        Resetear Contraseña
                                    </button>
                                    <p className="text-[10px] text-center text-[#8c7365] mt-2">Se enviará un correo con instrucciones.</p>
                                </div>

                            </div>
                        </form>
                        
                        <div className="px-6 py-4 border-t border-[#f3e6e0] bg-white flex justify-center gap-3">
                            <button 
                                type="button"
                                onClick={() => setIsEditModalOpen(false)}
                                className="px-5 py-2 bg-white border border-[#e5d9d3] text-gray-800 font-bold rounded-lg hover:bg-gray-50 transition-colors text-sm shadow-sm"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleUpdateUser}
                                disabled={editForm.processing}
                                className="px-5 py-2 bg-[#ff5500] text-white font-bold rounded-lg hover:bg-[#e64a00] transition-colors shadow-md text-sm disabled:opacity-50"
                            >
                                {editForm.processing ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Cambiar Estado */}
            {isStatusModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
                        
                        <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-white">
                            <h2 className="text-[15px] font-bold text-gray-900 tracking-tight">Cambiar Estado de Cuenta</h2>
                            <button 
                                onClick={() => setIsStatusModalOpen(false)}
                                className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 bg-white">
                            <p className="text-[12px] text-gray-600 leading-relaxed mb-6 font-medium">
                                Al desactivar esta cuenta, el usuario perderá el acceso a la plataforma de forma inmediata.
                            </p>

                            <div className="bg-[#f5f7fa] border border-gray-100 rounded-xl p-4 flex items-center justify-between">
                                <div>
                                    <h4 className="text-[13px] font-bold text-gray-800">Estado de la cuenta</h4>
                                    <p className="text-[11px] text-gray-500 mt-0.5">Actualmente: {newStatus ? 'Activo' : 'Inactivo'}</p>
                                </div>
                                <button 
                                    type="button"
                                    onClick={() => setNewStatus(!newStatus)}
                                    className={`w-12 h-6 rounded-full relative transition-colors duration-200 ease-in-out focus:outline-none shadow-inner ${newStatus ? 'bg-[#ff5500]' : 'bg-gray-300'}`}
                                >
                                    <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out shadow-sm ${newStatus ? 'translate-x-6' : 'translate-x-0'}`}></span>
                                </button>
                            </div>
                        </div>
                        
                        <div className="px-6 py-4 border-t border-gray-50 bg-[#f8f9fa] flex justify-center gap-3">
                            <button 
                                type="button"
                                onClick={() => setIsStatusModalOpen(false)}
                                className="px-5 py-2.5 bg-transparent text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-colors text-sm"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleUpdateStatus}
                                disabled={isUpdatingStatus}
                                className="px-5 py-2.5 bg-[#ff5500] text-white font-bold rounded-lg hover:bg-[#e64a00] transition-colors shadow-md text-sm disabled:opacity-50"
                            >
                                {isUpdatingStatus ? 'Actualizando...' : 'Actualizar Estado'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </AdminLayout>
    );
}
