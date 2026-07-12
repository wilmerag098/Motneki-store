import { Monitor, Moon, Sun } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/hooks/use-appearance';

export default function AppearanceDropdown({ className = '' }: { className?: string }) {
    const { appearance, resolvedAppearance, updateAppearance } = useAppearance();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={`p-2 rounded-full text-[#888888] dark:text-[#9ca3af] hover:text-[#ff5500] hover:bg-[#3a3939] transition-colors focus:outline-none ${className}`}
                    title="Cambiar tema"
                >
                    {appearance === 'system' ? (
                        <Monitor className="w-5 h-5" />
                    ) : resolvedAppearance === 'dark' ? (
                        <Moon className="w-5 h-5" />
                    ) : (
                        <Sun className="w-5 h-5" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#FAF5F0] dark:bg-[#131313] border-[#EADED5] dark:border-[#3a3939] text-[#1C1612] dark:text-[#ffffff] shadow-lg">
                <DropdownMenuItem
                    onClick={() => updateAppearance('light')}
                    className={`cursor-pointer focus:bg-[#EADED5] dark:focus:bg-[#3a3939] focus:text-[#ff5500] ${appearance === 'light' ? 'text-[#ff5500]' : ''}`}
                >
                    <Sun className="w-4 h-4 mr-2" />
                    Claro
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => updateAppearance('dark')}
                    className={`cursor-pointer focus:bg-[#EADED5] dark:focus:bg-[#3a3939] focus:text-[#ff5500] ${appearance === 'dark' ? 'text-[#ff5500]' : ''}`}
                >
                    <Moon className="w-4 h-4 mr-2" />
                    Oscuro
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => updateAppearance('system')}
                    className={`cursor-pointer focus:bg-[#EADED5] dark:focus:bg-[#3a3939] focus:text-[#ff5500] ${appearance === 'system' ? 'text-[#ff5500]' : ''}`}
                >
                    <Monitor className="w-4 h-4 mr-2" />
                    Sistema
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
