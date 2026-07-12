import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { User, Mail, Phone, Lock, Eye, ArrowRight } from 'lucide-react';
import { useState } from 'react';

type Props = {
    passwordRules?: string;
};

export default function Register({ passwordRules }: Props) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    return (
        <>
            <Head title="Regístrate" />
            
            <div className="bg-[#181818] border border-[#333333] p-8 sm:p-10 flex flex-col w-full shadow-2xl relative">
                
                {/* Header text */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-3">Únete al Club</h1>
                    <p className="text-[#888888] text-sm font-medium">
                        Regístrate y asegura el acceso a piezas exclusivas y preventas de MotnekiStore.
                    </p>
                </div>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-5">
                                {/* Name field */}
                                <div className="grid gap-2">
                                    <Label htmlFor="nombre" className="text-[#FFFFFF] text-[10px] font-bold tracking-widest uppercase mb-1">
                                        NOMBRE COMPLETO
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                                        <Input
                                            id="nombre"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            name="nombre"
                                            placeholder="Tu nombre y apellido"
                                            className="pl-11 bg-[#111111] border-[#333333] text-white focus-visible:ring-[#ff5500] h-12 placeholder:text-[#444444] rounded-none"
                                        />
                                    </div>
                                    <InputError message={errors.nombre} />
                                </div>

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
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            name="email"
                                            placeholder="ejemplo@correo.com"
                                            className="pl-11 bg-[#111111] border-[#333333] text-white focus-visible:ring-[#ff5500] h-12 placeholder:text-[#444444] rounded-none"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                {/* Phone field */}
                                <div className="grid gap-2">
                                    <Label htmlFor="telefono" className="text-[#FFFFFF] text-[10px] font-bold tracking-widest uppercase mb-1">
                                        TELÉFONO (PARA ENVÍOS)
                                    </Label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                                        <Input
                                            id="telefono"
                                            type="tel"
                                            required
                                            tabIndex={3}
                                            name="telefono"
                                            placeholder="+51 999 999 999"
                                            className="pl-11 bg-[#111111] border-[#333333] text-white focus-visible:ring-[#ff5500] h-12 placeholder:text-[#444444] rounded-none"
                                        />
                                    </div>
                                    <InputError message={errors.telefono} />
                                </div>

                                {/* Password field */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-[#FFFFFF] text-[10px] font-bold tracking-widest uppercase mb-1">
                                        CONTRASEÑA
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            name="password"
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

                                {/* Password Confirmation field */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation" className="text-[#FFFFFF] text-[10px] font-bold tracking-widest uppercase mb-1">
                                        CONFIRMAR CONTRASEÑA
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888888]" />
                                        <Input
                                            id="password_confirmation"
                                            type={showPasswordConfirmation ? "text" : "password"}
                                            required
                                            tabIndex={5}
                                            autoComplete="new-password"
                                            name="password_confirmation"
                                            placeholder="••••••••"
                                            className="pl-11 pr-11 bg-[#111111] border-[#333333] text-white focus-visible:ring-[#ff5500] h-12 placeholder:text-[#444444] rounded-none"
                                        />
                                        <Eye 
                                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                            className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 cursor-pointer transition-colors ${showPasswordConfirmation ? 'text-[#ff5500]' : 'text-[#888888] hover:text-white'}`} 
                                        />
                                    </div>
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                {/* Submit button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-[#ff5500] hover:bg-[#cc4400] text-[#111111] h-[52px] font-bold text-[11px] tracking-widest uppercase mt-4 rounded-none transition-colors"
                                    tabIndex={6}
                                    disabled={processing}
                                >
                                    {processing && <Spinner className="mr-2" />}
                                    CREAR MI CUENTA EXCLUSIVA <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>

                            <div className="text-center text-xs text-[#888888] mt-2 font-medium">
                                ¿Ya tienes una cuenta?{' '}
                                <TextLink href={login()} tabIndex={7} className="text-[#ff5500] hover:text-[#ff7733] underline underline-offset-4 decoration-[#ff5500]/40 hover:decoration-[#ff7733]">
                                    Inicia sesión
                                </TextLink>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </>
    );
}

Register.layout = {
    title: 'Regístrate',
    description: 'Regístrate para asegurar acceso a preventas exclusivas.',
};
