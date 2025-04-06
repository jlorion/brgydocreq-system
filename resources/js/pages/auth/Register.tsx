import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { useState } from 'react';

import TextLink from '@/components/custom/CustomTextLink';
import InputError from '@/components/custom/InputError';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthSplitLayout from '@/layouts/auth/AuthSplitLayout';
import RegisterImage from '../../../assets/register-side-image.svg';
import TermsModal from '@/components/ui/termModal';

type RegisterForm = {
    username: string;
    password: string;
    password_confirmation: string;
    reference_number: string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        username: '',
        password: '',
        password_confirmation: '',
        reference_number: '',
    });

    const [isTermsModalOpen, setTermsModalOpen] = useState(false);

    const openTermsModal = () => setTermsModalOpen(true);
    const closeTermsModal = () => setTermsModalOpen(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('auth.register.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthSplitLayout
            title="Get Started Now"
            description="Register to easily request documents and connect with your barangay!"
            image={RegisterImage}
        >
            <Head title="Register" />
            <form className="mt-4 flex flex-col gap-5" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="username"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            disabled={processing}
                            placeholder="Enter your username"
                        />
                        <InputError message={errors.username} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Enter your password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirm password</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm your password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="ref-num">Reference Number</Label>
                        <Input
                            id="ref-num"
                            type="text"
                            required
                            tabIndex={4}
                            autoComplete="ref-num"
                            value={data.reference_number}
                            onChange={(e) => setData('reference_number', e.target.value)}
                            disabled={processing}
                            placeholder="Enter your reference number"
                        />
                        <TextLink href={route('auth.resident-reference')} tabIndex={5} className="text-s3 flex justify-end text-sm hover:underline">
                            Request Reference Number
                        </TextLink>
                        <InputError message={errors.reference_number} />
                    </div>

                    <div className="mt-4 flex items-center justify-center space-x-3">
                        <Checkbox id="terms" tabIndex={6} />
                        <Label htmlFor="terms" className="text-sm">
                            I agree to the{' '}
                            <TextLink
                                href="#"
                                tabIndex={7}
                                onClick={(e) => {
                                    e.preventDefault();
                                    openTermsModal();
                                }}
                            >
                                Terms & Conditions and Privacy Policy
                            </TextLink>
                        </Label>
                    </div>

                    <Button type="submit" className="w-full" variant="primary" tabIndex={8} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Create account
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Already have an account?{' '}
                    <TextLink href={route('auth.login')} tabIndex={9}>
                        Log in
                    </TextLink>
                </div>
            </form>

            <TermsModal isOpen={isTermsModalOpen} onClose={closeTermsModal} />
        </AuthSplitLayout>
    );
}