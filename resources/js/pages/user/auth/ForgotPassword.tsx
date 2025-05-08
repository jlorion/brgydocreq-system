// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/custom/CustomTextLink';
import InputError from '@/components/custom/InputError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthSplitLayout from '@/layouts/shared/AuthSplitLayout';
import ForgotPass from '../../../../assets/forgot-password.svg';
import { toast, Toaster } from 'sonner';

export default function ForgotPassword() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('user.password.email'), {
            onSuccess: () => {
                toast.success('Password reset link sent to your email address.');
                reset()
            },
            onError: (errors) => {
                console.error('Form submission failed. Validation errors:');
                Object.entries(errors).forEach(([field, message]) => {
                    console.error(`Field: ${field}, Error: ${message}`);
                });
            },
        });
    };

    return (
        <AuthSplitLayout title="Forgot password" description="Enter your email to receive a password reset link" image={ForgotPass}>
            <Head title="Forgot password" />
            <Toaster richColors position='top-right' />
            <div className="space-y-6">
                <form onSubmit={submit}>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="off"
                            required
                            tabIndex={1}
                            value={data.email}
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />

                        <InputError message={errors.email} />
                    </div>

                    <div className="my-6 flex items-center justify-start">
                        <Button className="w-full" variant="primary" tabIndex={2} disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Email password reset link
                        </Button>
                    </div>
                </form>

                <div className="text-muted-foreground space-x-1 text-center text-sm">
                    <span>Or, return to</span>
                    <TextLink tabIndex={3} href={route('user.login')}>
                        log in
                    </TextLink>
                </div>
            </div>
        </AuthSplitLayout>
    );
}
