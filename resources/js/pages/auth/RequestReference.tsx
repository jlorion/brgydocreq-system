import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/custom/CustomTextLink';
import InputError from '@/components/custom/input-error';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datepicker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthSplitLayout from '@/layouts/auth/AuthSplitLayout';
import ResidentVerification from '../../../assets/verification-side-image.svg';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

const RequestReference = ({ status, canResetPassword }: LoginProps) => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthSplitLayout
            title="Resident Verification"
            description="Enter your personal details to verify your residency and receive your reference number"
            image={ResidentVerification}
        >
            <Head title="Resident Verification" />
            <form className="mt-4 flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-x-5">
                        <div className="grid gap-2">
                            <Label htmlFor="firstname">First name</Label>
                            <Input
                                id="firstname"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Juan"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="middlename">Middle name</Label>
                            <Input
                                id="middlename"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="middlename"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Reyes"
                            />
                            <InputError message={errors.email} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-5">
                        <div className="grid gap-2">
                            <Label htmlFor="lastname">Last name</Label>
                            <Input
                                id="lastname"
                                type="text"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="lastname"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Dela Cruz"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="middlename">Birthdate</Label>
                            <DatePicker />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>
                    <div className="grid grid-cols-2 gap-x-5">
                        <div className="grid gap-2">
                            <Label htmlFor="phonenum">Phone number</Label>
                            <Input
                                id="phonenum"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="09074245108"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="purok">Purok</Label>
                            <Input
                                id="purok"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Purok 1"
                            />
                            <InputError message={errors.email} />
                        </div>
                    </div>

                    <Button type="submit" variant="primary" className="mt-5 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Request Reference Number
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Already have a reference number?{' '}
                    <TextLink href={route('register')} tabIndex={5}>
                        Sign up
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthSplitLayout>
    );
};

export default RequestReference;
