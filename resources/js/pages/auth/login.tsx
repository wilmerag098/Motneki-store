import { useState } from 'react';
import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { Mail, Lock, Eye, ArrowRight } from 'lucide-react';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    const [loginType, setLoginType] = useState<'cliente' | 'admin'>('cliente');
    const [showPassword, setShowPassword] = useState(false);

    const handleGoogleLogin = () => {
        alert("Integración con Google en desarrollo.");
    };

    return (
        <>
            <Head title="Iniciar Sesión" />

            <div className="bg-[#181818] border border-[#333333] p-8 sm:p-10 flex flex-col w-full shadow-2xl relative">
                
                {/* Header text */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-3">Iniciar Sesión</h1>
                    <p className="text-[#888888] text-sm font-medium">
                        Accede a tu colección exclusiva de figuras premium.
                    </p>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-2 border border-[#333333] mb-8">
                    <button 
                        type="button" 
                        onClick={() => setLoginType('cliente')}
                        className={`py-3 text-center text-[10px] font-bold tracking-widest uppercase transition-colors ${
                            loginType === 'cliente' 
                                ? 'border border-[#ff5500] text-[#ff5500] bg-transparent' 
                                : 'border-transparent text-[#888888] hover:text-white bg-[#111111]/50 hover:bg-[#111111]'
                        }`}
                    >
                        CLIENTE
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setLoginType('admin')}
                        className={`py-3 text-center text-[10px] font-bold tracking-widest uppercase transition-colors ${
                            loginType === 'admin' 
                                ? 'border border-[#ff5500] text-[#ff5500] bg-transparent' 
                                : 'border-transparent border-l border-[#333333] text-[#888888] hover:text-white bg-[#111111]/50 hover:bg-[#111111]'
                        }`}
                    >
                        ADMINISTRADOR
                    </button>
                </div>

                <PasskeyVerify />

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">
                                {/* Email field */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-[#FFFFFF] text-[10px] font-bold tracking-widest uppercase mb-1">
                                        CORREO ELECTRÓNICO
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="off"
                                            placeholder="ejemplo@correo.com"
                                            className="pl-11 bg-[#111111] border-[#333333] text-white focus-visible:ring-[#ff5500] h-12 placeholder:text-[#444444] rounded-none"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                {/* Password field */}
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between mb-1">
                                        <Label htmlFor="password" className="text-[#FFFFFF] text-[10px] font-bold tracking-widest uppercase">
                                            CONTRASEÑA
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href="/forgot-password"
                                                className="text-[#ff5500] hover:text-[#ff7733] text-[10px] font-bold tracking-widest uppercase transition-colors"
                                                tabIndex={5}
                                            >
                                                ¿OLVIDASTE TU CONTRASEÑA?
                                            </TextLink>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            required
                                            tabIndex={2}
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                            className="pl-11 pr-11 bg-[#111111] border-[#333333] text-white focus-visible:ring-[#ff5500] h-12 placeholder:text-[#444444] rounded-none"
                                        />
                                        <Eye 
                                            onClick={() => setShowPassword(!showPassword)}
                                            className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer transition-colors ${showPassword ? 'text-[#ff5500]' : 'text-[#888888] hover:text-white'}`} 
                                        />
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                {/* Remember me */}
                                <div className="flex items-center space-x-3 mt-1">
                                    <Checkbox
                                        id="remember"
                                        name="remember"
                                        tabIndex={3}
                                        className="border-[#333333] data-[state=checked]:bg-[#ff5500] data-[state=checked]:border-[#ff5500] rounded-sm"
                                    />
                                    <Label htmlFor="remember" className="text-[#888888] text-[13px] font-normal cursor-pointer select-none">
                                        Recordarme en este dispositivo
                                    </Label>
                                </div>

                                {/* Submit button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-[#ff5500] hover:bg-[#cc4400] text-[#111111] h-[52px] font-bold text-[11px] tracking-widest uppercase mt-2 rounded-none transition-colors"
                                    tabIndex={4}
                                    disabled={processing}
                                >
                                    {processing && <Spinner className="mr-2" />}
                                    INICIAR SESIÓN COMO {loginType === 'admin' ? 'ADMINISTRADOR' : 'CLIENTE'} <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>

                            {/* Divider */}
                            <div className="relative my-2">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-[#333333]" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-[#181818] px-4 text-[#888888] text-[10px] font-bold tracking-widest">
                                        O CONTINUAR CON
                                    </span>
                                </div>
                            </div>

                            {/* Google Button */}
                            <Button 
                                type="button" 
                                onClick={handleGoogleLogin}
                                variant="outline" 
                                className="w-full bg-[#111111] border-[#333333] hover:bg-[#222222] hover:text-white text-white h-[52px] font-bold text-[11px] tracking-widest uppercase rounded-none transition-colors"
                            >
                                {/* Simulated Google colors on icon */}
                                <svg className="w-4 h-4 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
                                GOOGLE
                            </Button>

                            <div className="text-center text-xs text-[#888888] mt-2 font-medium">
                                ¿Aún no tienes una cuenta?{' '}
                                <TextLink href="/register" tabIndex={5} className="text-[#ff5500] hover:text-[#ff7733] underline underline-offset-4 decoration-[#ff5500]/40 hover:decoration-[#ff7733] transition-colors">
                                    Regístrate ahora
                                </TextLink>
                            </div>
                        </>
                    )}
                </Form>

                {status && (
                    <div className="mt-6 text-center text-[13px] font-bold tracking-widest uppercase text-[#ff5500]">
                        {status}
                    </div>
                )}
            </div>
        </>
    );
}

Login.layout = {
    title: 'Iniciar Sesión',
    description: 'Accede a tu colección exclusiva de figuras premium.',
};
