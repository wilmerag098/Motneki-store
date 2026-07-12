import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid, Package, Archive, ShoppingCart,
    CreditCard, CalendarClock, ClipboardList,
    Users, Truck, BarChart2, Settings,
    Search, Bell, HelpCircle, UserCircle, ChevronRight, LogOut,
    Menu, X, Mail
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const { url, props } = usePage();
    const { auth, solicitudes_pendientes_count = 0 } = props as any;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            import('@inertiajs/react').then(({ router }) => {
                router.get('/admin/productos', { search: searchTerm });
            });
        }
    };

    // Close sidebar when navigating on mobile
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [url]);

    const menuItems = [
        { name: 'Panel de Control', icon: LayoutGrid, href: '/admin' },
        { name: 'Productos', icon: Package, href: '/admin/productos' },
        { name: 'Inventario', icon: Archive, href: '/admin/inventario' },
        { name: 'Solicitudes Figuras', icon: ClipboardList, href: '/admin/solicitudes-figuras' },
        { name: 'Pagos', icon: CreditCard, href: '/admin/pagos' },
        { name: 'Usuarios', icon: Users, href: '/admin/usuarios' },
        { name: 'Suscripciones', icon: Mail, href: '/admin/suscripciones' },
        { name: 'Envíos', icon: Truck, href: '/admin/envios' },
        { name: 'Reportes', icon: BarChart2, href: '/admin/reportes' },
    ];

    return (
        <div className="min-h-screen bg-[#F5F7FA] font-sans text-sm flex">
            {title && <Head title={title} />}

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside className={`w-[260px] bg-white border-r border-gray-200 flex flex-col fixed h-full z-50 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                {/* Logo */}
                <div className="p-6 border-b border-gray-100 mb-2 flex justify-between items-center">
                    <Link href="/admin" className="flex items-center gap-3">
                        {/* Reemplaza el src con la ruta real de tu imagen (ej. /images/tu-logo.png) */}
                        <img src="/images/motneki_admin.png" alt="Motneki Logo" className="w-10 h-10 object-contain" />
                        <div>
                            <h1 className="text-2xl font-black text-[#ff5500] tracking-tighter leading-none">ADMIN MOTNEKI</h1>
                            <p className="text-[10px] font-semibold text-gray-400 mt-1 uppercase tracking-widest">¡Bienvenido!</p>
                        </div>
                    </Link>
                    <button
                        className="lg:hidden text-gray-500 hover:text-gray-900"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Main Navigation */}
                <nav className="flex-1 overflow-y-auto py-2">
                    <ul className="space-y-1">
                        {menuItems.map((item) => {
                            const isActive = url === item.href || (url.startsWith(item.href) && item.href !== '/');
                            return (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-4 px-6 py-3.5 transition-colors relative font-semibold ${isActive
                                            ? 'bg-[#f4f4f4] text-[#ff5500]'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                                        <span className="tracking-wide">{item.name}</span>
                                        {isActive && (
                                            <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#ff5500]"></div>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer Navigation (Settings & Profile) */}
                <div className="p-4 border-t border-gray-200 space-y-4">
                    <Link
                        href="/admin/configuracion"
                        className={`flex items-center gap-4 px-2 py-2 font-semibold transition-colors ${url.startsWith('/admin/configuracion') ? 'text-[#ff5500]' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        <Settings className="w-5 h-5" />
                        <span className="tracking-wide">Configuración</span>
                    </Link>

                    <Link href="/admin/perfil" className="bg-[#f0f2f5] rounded-lg p-3 flex items-center gap-3 hover:bg-gray-200 transition-colors group">
                        <div className="w-10 h-10 bg-[#1c1b1b] rounded-md flex items-center justify-center shrink-0 border border-gray-800 group-hover:border-[#ff5500] transition-colors">
                            <span className="text-white font-black text-lg">
                                {auth?.user?.nombre?.charAt(0)?.toUpperCase() || 'A'}
                            </span>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-gray-900 truncate uppercase tracking-wider group-hover:text-[#ff5500] transition-colors">
                                {auth?.user?.nombre || 'ADMINISTRADOR'}
                            </p>
                            <p className="text-[10px] text-gray-500 truncate">Ver mi perfil</p>
                        </div>
                    </Link>

                    <button
                        onClick={() => setIsLogoutModalOpen(true)}
                        className="flex items-center gap-4 px-2 py-2 w-full text-left text-gray-500 hover:text-red-500 font-semibold transition-colors mt-2"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="tracking-wide">Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col w-full lg:ml-[260px]">
                {/* Topbar */}
                <header className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">

                    <div className="flex items-center gap-4">
                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 text-gray-500 hover:text-gray-900 bg-gray-50 rounded-lg"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        {/* Breadcrumbs */}
                        <div className="hidden sm:flex items-center gap-2 text-sm">
                            <span className="text-gray-400 font-medium">Raíz</span>
                            <ChevronRight className="w-4 h-4 text-gray-300" />
                            <span className="font-bold text-gray-900">{title || 'Panel de Control'}</span>
                        </div>
                    </div>

                    {/* Right side controls */}
                    <div className="flex items-center gap-4 lg:gap-6">
                        {/* Search (Hidden on Mobile) */}
                        <form onSubmit={handleSearch} className="relative hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar productos..."
                                className="w-[200px] lg:w-[300px] bg-[#f5f7fa] border border-transparent rounded-lg text-sm py-2 pl-10 pr-4 focus:ring-2 focus:ring-[#ff5500] placeholder:text-gray-400 text-gray-700 outline-none transition-shadow"
                            />
                        </form>

                        {/* Search Icon Mobile */}
                        <button className="md:hidden p-2 text-gray-500 hover:text-[#ff5500] transition-colors">
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Actions */}
                        <div className="flex items-center gap-3 lg:gap-4 text-gray-500 relative">
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className={`relative p-2 transition-colors rounded-full ${isNotificationsOpen ? 'bg-orange-50 text-[#ff5500]' : 'hover:text-[#ff5500] bg-gray-50'}`}
                            >
                                <Bell className="w-5 h-5" />
                                {solicitudes_pendientes_count > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ff5500] text-white text-[9px] font-black flex items-center justify-center rounded-full ring-2 ring-white">
                                        {solicitudes_pendientes_count}
                                    </span>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {isNotificationsOpen && (
                                <div className="absolute top-12 right-0 w-80 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-in slide-in-from-top-2 fade-in">
                                    <div className="p-4 border-b border-gray-100 bg-[#fcfaf9]">
                                        <h4 className="font-black text-gray-900 text-sm">Notificaciones</h4>
                                    </div>
                                    <div className="p-4 bg-white">
                                        <div className="flex gap-3">
                                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                                <Bell className="w-4 h-4 text-[#ff5500]" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-800">
                                                    Bienvenido <strong className="font-black">{auth?.user?.nombre}</strong>, tienes
                                                    <strong className="font-black text-[#ff5500]"> {solicitudes_pendientes_count} solicitud{solicitudes_pendientes_count !== 1 ? 'es' : ''} de figuras</strong> que confirmar.
                                                </p>
                                                <Link
                                                    href="/admin/solicitudes-figuras"
                                                    className="inline-block mt-2 text-xs font-bold text-[#ff5500] hover:underline"
                                                    onClick={() => setIsNotificationsOpen(false)}
                                                >
                                                    Ver Solicitudes →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => setIsHelpModalOpen(true)}
                                className="hidden sm:block p-2 hover:text-[#ff5500] transition-colors bg-gray-50 rounded-full"
                            >
                                <HelpCircle className="w-5 h-5" />
                            </button>
                            <Link href="/admin/perfil" className="p-2 hover:text-[#ff5500] transition-colors bg-gray-50 rounded-full text-gray-500 flex items-center justify-center">
                                {auth?.user?.nombre ? (
                                    <div className="w-5 h-5 bg-[#1c1b1b] rounded-full flex items-center justify-center border border-gray-800">
                                        <span className="text-white font-black text-[10px]">
                                            {auth?.user?.nombre?.charAt(0)?.toUpperCase()}
                                        </span>
                                    </div>
                                ) : (
                                    <UserCircle className="w-5 h-5" />
                                )}
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 sm:p-6 lg:p-8 flex-1 overflow-x-hidden">
                    {children}
                </main>
            </div>

            {/* Modal de Cerrar Sesión */}
            {isLogoutModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 shadow-sm border border-red-100">
                                <LogOut className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-2">¿Cerrar Sesión?</h3>
                            <p className="text-sm text-gray-500">
                                Estás a punto de salir del panel de administración. Tendrás que volver a ingresar tus credenciales para acceder.
                            </p>
                        </div>
                        <div className="flex border-t border-gray-100 bg-gray-50">
                            <button
                                onClick={() => setIsLogoutModalOpen(false)}
                                className="flex-1 py-4 text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                Cancelar
                            </button>
                            <div className="w-px bg-gray-200"></div>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="flex-1 py-4 text-sm font-black text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                            >
                                Sí, salir
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Ayuda */}
            {isHelpModalOpen && (
                <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 relative">
                        <button
                            onClick={() => setIsHelpModalOpen(false)}
                            className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-6 border-b border-gray-100 bg-[#fcfaf9]">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-[#ff5500]">
                                <HelpCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-black text-[#1C1612]">Centro de Ayuda</h3>
                            <p className="text-sm text-gray-500">Soporte y accesos rápidos para el panel de Motneki.</p>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-1 text-sm">Soporte Técnico</h4>
                                <p className="text-xs text-gray-500 mb-2">¿Problemas con el sistema? Escríbenos directamente.</p>
                                <a href="mailto:soporte@motneki.com" className="text-sm font-bold text-[#ff5500] hover:underline">soporte@motneki.com</a>
                            </div>

                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-1 text-sm">Atajos Rápidos</h4>
                                <ul className="text-xs text-gray-500 space-y-2 mt-2">
                                    <li className="flex justify-between"><span>Buscar producto:</span> <span className="font-mono bg-white px-1.5 border rounded">Barra de búsqueda superior</span></li>
                                    <li className="flex justify-between"><span>Ver figuras pendientes:</span> <span className="font-mono bg-white px-1.5 border rounded">Campana de notificaciones</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
