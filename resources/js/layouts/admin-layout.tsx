import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    LayoutGrid, Package, Archive, ShoppingCart, 
    CreditCard, CalendarClock, ClipboardList, 
    Users, Truck, BarChart2, Settings,
    Search, Bell, HelpCircle, UserCircle, ChevronRight, LogOut
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const { url, props } = usePage();
    const { auth } = props as any;

    const menuItems = [
        { name: 'Panel de Control', icon: LayoutGrid, href: '/admin' },
        { name: 'Productos', icon: Package, href: '/admin/productos' },
        { name: 'Inventario', icon: Archive, href: '/admin/inventario' },
        { name: 'Pedidos', icon: ShoppingCart, href: '/admin/pedidos' },
        { name: 'Pagos', icon: CreditCard, href: '/admin/pagos' },
        { name: 'Preventas', icon: CalendarClock, href: '#' },
        { name: 'Solicitudes Proxy', icon: ClipboardList, href: '#' },
        { name: 'Usuarios', icon: Users, href: '#' },
        { name: 'Envíos', icon: Truck, href: '#' },
        { name: 'Reportes', icon: BarChart2, href: '#' },
    ];

    return (
        <div className="min-h-screen bg-[#F5F7FA] font-sans text-sm flex">
            {title && <Head title={title} />}

            {/* Sidebar */}
            <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
                {/* Logo */}
                <div className="p-6 border-b border-gray-100 mb-2">
                    <h1 className="text-3xl font-black text-[#ff5500] tracking-tighter leading-none">MOTNEKI</h1>
                    <p className="text-xs font-semibold text-gray-400 mt-1 uppercase tracking-widest">Coleccionables Premium</p>
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
                                        className={`flex items-center gap-4 px-6 py-3.5 transition-colors relative font-semibold ${
                                            isActive 
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
                    <Link href="#" className="flex items-center gap-4 px-2 py-2 text-gray-500 hover:text-gray-700 font-semibold transition-colors">
                        <Settings className="w-5 h-5" />
                        <span className="tracking-wide">Configuración</span>
                    </Link>

                    <div className="bg-[#f0f2f5] rounded-lg p-3 flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1c1b1b] rounded-md flex items-center justify-center shrink-0">
                            {/* Placeholder for user avatar */}
                            <div className="w-6 h-6 rounded-full border border-gray-600 bg-gray-800"></div>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-gray-900 truncate uppercase tracking-wider">
                                {auth?.user?.nombre || 'ADMINISTRADOR RAÍZ'}
                            </p>
                            <p className="text-[10px] text-gray-500 truncate">Nodo Seguro #429</p>
                        </div>
                    </div>

                    <Link href="/logout" method="post" as="button" className="flex items-center gap-4 px-2 py-2 w-full text-left text-gray-500 hover:text-red-500 font-semibold transition-colors mt-2">
                        <LogOut className="w-5 h-5" />
                        <span className="tracking-wide">Cerrar Sesión</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col ml-[260px]">
                {/* Topbar */}
                <header className="h-[72px] bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    {/* Breadcrumbs */}
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-400 font-medium">Raíz</span>
                        <ChevronRight className="w-4 h-4 text-gray-300" />
                        <span className="font-bold text-gray-900">{title || 'Panel de Control'}</span>
                    </div>

                    {/* Right side controls */}
                    <div className="flex items-center gap-6">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Buscar en el Baúl..." 
                                className="w-[300px] bg-[#f5f7fa] border-none text-sm py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-[#ff5500] placeholder:text-gray-400 text-gray-700 outline-none"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 text-gray-500">
                            <button className="relative hover:text-[#ff5500] transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute 0 right-0 w-2 h-2 bg-[#ff5500] rounded-full ring-2 ring-white"></span>
                            </button>
                            <button className="hover:text-[#ff5500] transition-colors">
                                <HelpCircle className="w-5 h-5" />
                            </button>
                            <button className="hover:text-[#ff5500] transition-colors">
                                <UserCircle className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
