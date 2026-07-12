import { Head, Link, usePage } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import {
    Search,
    User,
    Heart,
    ShoppingCart,
    Menu,
    X,
    Globe,
    Share2,
    Mail,
    Camera,
    MessageSquare,
    Smartphone,
    MessageCircle,
    CreditCard,
    Banknote,
    Bitcoin,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    LogOut,
    Settings
} from 'lucide-react';
import { login, dashboard } from '@/routes';
import AppearanceDropdown from '@/components/appearance-dropdown';
import SearchModal from '@/components/SearchModal';
import SlideOverCart from '@/components/SlideOverCart';
import QuickViewModal from '@/components/QuickViewModal';
import { useStore } from '@/store/useStore';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    const { url, props } = usePage();
    const { auth } = props as any;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    
    // Global Store connections
    const { toggleCart, getCartCount, wishlist } = useStore();
    const cartCount = getCartCount();
    const wishlistCount = wishlist.length;
    return (
        <div className="min-h-screen bg-[#FAF5F0] dark:bg-[#131313] text-[#1C1612] dark:text-[#ffffff] font-sans antialiased selection:bg-[#C25910] selection:text-white flex flex-col">
            {/* BARRA DE NAVEGACIÓN */}
            <header className="sticky top-0 z-50 bg-[#FAF5F0] dark:bg-[#131313]/95 backdrop-blur-md border-b border-[#EADED5] dark:border-[#3a3939] transition-all duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    {/* Logotipo */}
                    <div className="flex items-center gap-2">
                        <Link href="/" className="font-['Outfit'] font-extrabold text-2xl tracking-tight text-[#1C1612] dark:text-[#ffffff] hover:opacity-90 transition-opacity flex items-center gap-3">
                            <img src="/logo.png" alt="Motneki Logo" className="w-8 h-8 object-contain" />
                            <div>
                                <span className="text-[#ff5500]">Motneki</span>
                                <span className="text-[#ff5500]">Store</span>
                            </div>
                        </Link>
                    </div>

                    {/* Menú Central (Escritorio) */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className={`py-2 text-sm font-semibold transition-colors ${url === '/' ? 'relative font-bold text-[#ff5500]' : 'text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500]'}`}
                        >
                            Inicio
                            {url === '/' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff5500] rounded-full"></span>}
                        </Link>
                        <Link
                            href="/catalogo"
                            className={`py-2 text-sm font-semibold transition-colors ${url.startsWith('/catalogo') ? 'relative font-bold text-[#ff5500]' : 'text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500]'}`}
                        >
                            Catálogo
                            {url.startsWith('/catalogo') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff5500] rounded-full"></span>}
                        </Link>
                        <Link
                            href="/preventas"
                            className={`py-2 text-sm font-semibold transition-colors ${url.startsWith('/preventas') ? 'relative font-bold text-[#ff5500]' : 'text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500]'}`}
                        >
                            Preventas
                            {url.startsWith('/preventas') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff5500] rounded-full"></span>}
                        </Link>
                        <Link
                            href="/exclusivos"
                            className={`py-2 text-sm font-semibold transition-colors ${url.startsWith('/exclusivos') ? 'relative font-bold text-[#ff5500]' : 'text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500]'}`}
                        >
                            Exclusivos
                            {url.startsWith('/exclusivos') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff5500] rounded-full"></span>}
                        </Link>
                        <Link
                            href="/comunidad"
                            className={`py-2 text-sm font-semibold transition-colors ${url.startsWith('/comunidad') ? 'relative font-bold text-[#ff5500]' : 'text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500]'}`}
                        >
                            Comunidad
                            {url.startsWith('/comunidad') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff5500] rounded-full"></span>}
                        </Link>
                    </nav>

                    {/* Íconos e interacciones (Derecha) */}
                    <div className="hidden md:flex items-center gap-5">
                        <button onClick={() => setSearchOpen(true)} className="text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500] transition-colors p-2 hover:bg-[#3a3939] rounded-full">
                            <Search className="w-5 h-5" />
                        </button>

                        {auth?.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button className="text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500] transition-colors p-2 hover:bg-[#3a3939] rounded-full focus:outline-none">
                                        <User className="w-5 h-5" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-[#181818] border-[#333333] text-white">
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none text-white">{auth.user.nombre}</p>
                                            <p className="text-xs leading-none text-[#888888]">{auth.user.email}</p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-[#333333]" />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem asChild className="hover:bg-[#ff5500]/20 focus:bg-[#ff5500]/20 hover:text-white focus:text-white cursor-pointer">
                                            <Link href={auth.user.rol?.nombre === 'Administrador' ? '/admin' : '/dashboard'} className="w-full flex items-center">
                                                <User className="mr-2 h-4 w-4" />
                                                <span>Mi Panel</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator className="bg-[#333333]" />
                                    <DropdownMenuItem asChild className="hover:bg-red-500/20 focus:bg-red-500/20 text-red-500 hover:text-red-500 focus:text-red-500 cursor-pointer">
                                        <Link href="/logout" method="post" as="button" className="w-full flex items-center">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Cerrar Sesión</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Link
                                href="/login"
                                className="text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500] transition-colors p-2 hover:bg-[#3a3939] rounded-full"
                                title="Iniciar Sesión"
                            >
                                <User className="w-5 h-5" />
                            </Link>
                        )}

                        <Link href="/favoritos" className={`text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500] transition-colors p-2 hover:bg-[#3a3939] rounded-full relative ${url.startsWith('/favoritos') ? 'text-[#ff5500] bg-[#3a3939]' : ''}`}>
                            <Heart className="w-5 h-5" />
                            {wishlistCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-[#ff5500] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#FAF5F0] dark:border-[#131313]">{wishlistCount}</span>
                            )}
                        </Link>
                        <button onClick={toggleCart} className={`text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500] transition-colors p-2 hover:bg-[#3a3939] rounded-full relative ${url.startsWith('/carrito') ? 'text-[#ff5500] bg-[#3a3939]' : ''}`}>
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-[#ff5500] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#FAF5F0] dark:border-[#131313]">{cartCount}</span>
                            )}
                        </button>
                        <AppearanceDropdown className="ml-2" />
                    </div>

                    {/* Botón de Menú Móvil */}
                    <div className="md:hidden flex items-center gap-4">
                        <button onClick={toggleCart} className={`p-2 rounded-full relative ${url.startsWith('/carrito') ? 'text-[#ff5500] bg-[#3a3939]' : 'text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500] hover:bg-[#3a3939]'}`}>
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-[#ff5500] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#FAF5F0] dark:border-[#131313]">{cartCount}</span>
                            )}
                        </button>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-[#1C1612] dark:text-[#ffffff] p-2 hover:bg-[#3a3939] rounded-full"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Menú Móvil Desplegable */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-[#FAF5F0] dark:bg-[#131313] border-t border-[#EADED5] dark:border-[#3a3939] py-4 px-6 space-y-4">
                        <nav className="flex flex-col gap-4">
                            <Link
                                href="/"
                                className={`text-base ${url === '/' ? 'font-bold text-[#ff5500]' : 'font-semibold text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500]'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Inicio
                            </Link>
                            <Link
                                href="/catalogo"
                                className={`text-base ${url.startsWith('/catalogo') ? 'font-bold text-[#ff5500]' : 'font-semibold text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500]'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Catálogo
                            </Link>
                            <Link
                                href="/preventas"
                                className={`text-base ${url.startsWith('/preventas') ? 'font-bold text-[#ff5500]' : 'font-semibold text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500]'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Preventas
                            </Link>
                            <Link
                                href="/exclusivos"
                                className={`text-base ${url.startsWith('/exclusivos') ? 'font-bold text-[#ff5500]' : 'font-semibold text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500]'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Exclusivos
                            </Link>
                            <Link
                                href="/comunidad"
                                className={`text-base ${url.startsWith('/comunidad') ? 'font-bold text-[#ff5500]' : 'font-semibold text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500]'}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Comunidad
                            </Link>
                        </nav>

                        <div className="border-t border-[#EADED5] dark:border-[#3a3939] pt-4 flex justify-around text-[#888888] dark:text-[#9ca3af] items-center">
                            <button onClick={() => setSearchOpen(true)} className="hover:text-[#ff5500] p-2"><Search className="w-5 h-5" /></button>
                            {auth?.user ? (
                                <Link href={auth.user.rol?.nombre === 'Administrador' ? '/admin' : dashboard()} className="hover:text-[#ff5500] p-2"><User className="w-5 h-5" /></Link>
                            ) : (
                                <Link href={login()} className="hover:text-[#ff5500] p-2"><User className="w-5 h-5" /></Link>
                            )}
                            <Link href="/favoritos" className={`p-2 ${url.startsWith('/favoritos') ? 'text-[#ff5500]' : 'hover:text-[#ff5500]'}`}><Heart className="w-5 h-5" /></Link>
                            <AppearanceDropdown className="scale-90" />
                        </div>
                    </div>
                )}
            </header>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-grow flex flex-col">
                {children}
            </main>

            {/* PIE DE PÁGINA (FOOTER) OSCURO */}
            <footer className="bg-[#111111] pt-16 pb-8 text-left mt-auto font-sans">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">

                    {/* Columna Logo & Info (4 cols on lg) */}
                    <div className="md:col-span-12 lg:col-span-4 space-y-6">
                        <Link href="/" className="font-['Outfit'] font-black text-3xl tracking-wider text-[#ff5500] hover:text-[#ff7733] transition-colors">
                            MOTNEKI
                        </Link>
                        <p className="text-[#888888] text-sm leading-relaxed max-w-sm">
                            Tu acceso directo a figuras y productos exclusivos de anime desde Japón.
                            Especialistas en importaciones, preventas y pedidos personalizados (proxy).
                            Conectamos coleccionistas con piezas únicas, auténticas y difíciles de conseguir.
                        </p>
                        <div className="flex items-center gap-4 text-white">
                            <a href="https://facebook.com/motnekistore" target="_blank" rel="noreferrer" title="Facebook">
                                <Facebook className="w-5 h-5 hover:text-[#ff5500] cursor-pointer transition-colors" />
                            </a>
                            <a href="https://instagram.com/motnekistore" target="_blank" rel="noreferrer" title="Instagram">
                                <Instagram className="w-5 h-5 hover:text-[#ff5500] cursor-pointer transition-colors" />
                            </a>
                            <a href="https://twitter.com/motnekistore" target="_blank" rel="noreferrer" title="Twitter">
                                <Twitter className="w-5 h-5 hover:text-[#ff5500] cursor-pointer transition-colors" />
                            </a>
                            <a href="https://youtube.com/motnekistore" target="_blank" rel="noreferrer" title="YouTube">
                                <Youtube className="w-5 h-5 hover:text-[#ff5500] cursor-pointer transition-colors" />
                            </a>
                            <a href="https://wa.me/123456789" target="_blank" rel="noreferrer" title="WhatsApp">
                                <MessageCircle className="w-5 h-5 hover:text-[#ff5500] cursor-pointer transition-colors" />
                            </a>
                        </div>
                    </div>

                    {/* Columna SHOP (2 cols) */}
                    <div className="md:col-span-4 lg:col-span-2 space-y-5">
                        <h4 className="text-[13px] font-bold text-white tracking-widest uppercase">TIENDA</h4>
                        <ul className="space-y-3">
                            <li><Link href="/catalogo" className="text-[13px] text-[#888888] hover:text-white transition-colors">Catálogo</Link></li>
                            <li><Link href="/preventas" className="text-[13px] text-[#888888] hover:text-white transition-colors">Preventas</Link></li>
                            <li><Link href="/exclusivos" className="text-[13px] text-[#888888] hover:text-white transition-colors">Exclusivos</Link></li>
                            <li><Link href="/comunidad" className="text-[13px] text-[#888888] hover:text-white transition-colors">Comunidad</Link></li>
                            <li><Link href="/pedidos-personalizados" className="text-[13px] text-[#888888] hover:text-white transition-colors">Pedidos Personalizados</Link></li>
                        </ul>
                    </div>

                    {/* Columna SUPPORT (2 cols) */}
                    <div className="md:col-span-4 lg:col-span-2 space-y-5">
                        <h4 className="text-[13px] font-bold text-white tracking-widest uppercase">APOYO</h4>
                        <ul className="space-y-3">
                            <li><Link href="#" className="text-[13px] text-[#888888] hover:text-white transition-colors">Centro de Ayuda</Link></li>
                            <li><Link href="#" className="text-[13px] text-[#888888] hover:text-white transition-colors">Política de Envíos</Link></li>
                            <li><Link href="#" className="text-[13px] text-[#888888] hover:text-white transition-colors">Autenticidad Garantizada</Link></li>
                            <li><Link href="#" className="text-[13px] text-[#888888] hover:text-white transition-colors">Devoluciones</Link></li>
                            <li><Link href="#" className="text-[13px] text-[#888888] hover:text-white transition-colors">Preguntas Frecuentes</Link></li>
                            <li><Link href="#" className="text-[13px] text-[#888888] hover:text-white transition-colors">Seguimiento de Pedido</Link></li>
                        </ul>
                    </div>

                    {/* Columna JOIN THE ELITE (4 cols) */}
                    <div className="md:col-span-4 lg:col-span-4 space-y-5">
                        <h4 className="text-[13px] font-bold text-white tracking-widest uppercase">ÚNETE A LA ÉLITE</h4>
                        <p className="text-[#888888] text-[13px] leading-relaxed max-w-[280px]">
                            Accede antes que nadie a preventas, drops exclusivos y productos limitados.
                            Recibe notificaciones de nuevas importaciones desde Japón.
                        </p>
                        <div className="flex w-full mt-4 max-w-[320px]">
                            <input
                                type="email"
                                placeholder="Ingresa tu correo electrónico"
                                className="flex-1 bg-[#1A1A1A] border border-[#333333] text-white px-4 py-3 text-[13px] focus:outline-none focus:border-[#ff5500] rounded-none transition-colors"
                            />
                            <button className="bg-[#ff5500] hover:bg-[#cc4400] text-[#111111] font-bold px-5 py-3 text-[11px] transition-colors uppercase tracking-widest">
                                UNIRME
                            </button>
                        </div>
                    </div>
                </div>

                {/* Fila Inferior */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#333333] mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-[#888888] text-[10px] tracking-[0.15em] uppercase font-['Outfit'] font-bold">
                        © 2026 Motneki Store. Todos los derechos reservados.
                        RUC: 20620762890
                        Términos y Condiciones | Política de Privacidad
                    </p>

                    <div className="flex items-center gap-8 text-white">
                        <div className="flex items-center gap-2 cursor-pointer hover:text-[#ff5500] transition-colors">
                            <Globe className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold tracking-widest uppercase">ES / PEN</span>
                        </div>
                        <div className="flex items-center gap-4 text-[#888888]">
                            <CreditCard className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                            <Banknote className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                            <Bitcoin className="w-5 h-5 hover:text-white transition-colors cursor-pointer" />
                        </div>
                    </div>
                </div>
            </footer>

            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
            <SlideOverCart />
            <QuickViewModal />
        </div>
    );
}
