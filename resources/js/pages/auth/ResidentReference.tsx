import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import TextLink from '@/components/custom/CustomTextLink';
import InputError from '@/components/custom/InputError';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthSplitLayout from '@/layouts/auth/AuthSplitLayout';
import ResidentVerification from '../../../assets/verification-side-image.svg';
import { FormEventHandler, useEffect } from 'react';
import { useState } from 'react';
import { format } from 'date-fns';

type ResidentVerificationForm = {
    resident_firstname: string;
    resident_middlename: string;
    resident_lastname: string;
    resident_suffix: string;
    resident_birthdate: string;
    email: string;
    phone_number: string;
    resident_address: string;
};

const ResidentReference = () => {
    const { data, setData, post, processing, errors } = useForm<Required<ResidentVerificationForm>>({
        resident_firstname: '',
        resident_middlename: '',
        resident_lastname: '',
        resident_birthdate: '',
        resident_suffix: '',
        email: '',
        phone_number: '',
        resident_address: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('auth.resident-reference.store'), {
            onSuccess: () => {
                console.log('success');
            },
            onError: (errors) => {
                console.error('Form submission failed. Validation errors:');
                Object.entries(errors).forEach(([field, message]) => {
                    console.error(`Field: ${field}, Error: ${message}`);
                });
            },
        })
    }

    const [birthDate, setBirthDate] = useState<Date | null>(null)

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
                                autoComplete="firstname"
                                value={data.resident_firstname}
                                onChange={(e) => setData('resident_firstname', e.target.value)}
                                placeholder="Juan"
                            />
                            <InputError message={errors.resident_firstname} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="middlename">Middle name</Label>
                            <Input
                                id="middlename"
                                type="text"
                                required
                                tabIndex={2}
                                autoComplete="middlename"
                                value={data.resident_middlename}
                                onChange={(e) => setData('resident_middlename', e.target.value)}
                                placeholder="Reyes"
                            />
                            <InputError message={errors.resident_middlename} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-5">
                        <div className="grid gap-2">
                            <Label htmlFor="lastname">Last name</Label>
                            <Input
                                id="lastname"
                                type="text"
                                required
                                tabIndex={3}
                                autoComplete="lastname"
                                value={data.resident_lastname}
                                onChange={(e) => setData('resident_lastname', e.target.value)}
                                placeholder="Dela Cruz"
                            />
                            <InputError message={errors.resident_lastname} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="birthdate">Birthdate</Label>
                            <DatePicker tabIndex={4} aria-required value={birthDate} onChange={(date) => {
                                setBirthDate(date);
                                setData('resident_birthdate', date ? format(date, 'yyyy-MM-dd') : '');
                            }} />

                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={5}
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
                                type="text"
                                required
                                tabIndex={6}
                                autoComplete="phone_number"
                                value={data.phone_number}
                                onChange={(e) => setData('phone_number', e.target.value)}
                                placeholder="09074245108"
                            />
                            <InputError message={errors.phone_number} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="address">Purok</Label>
                            <Input
                                id="address"
                                type="text"
                                required
                                tabIndex={7}
                                autoComplete="address"
                                value={data.resident_address}
                                onChange={(e) => setData('resident_address', e.target.value)}
                                placeholder="Purok 1"
                            />
                            <InputError message={errors.resident_address} />
                        </div>
                    </div>

                    <Button type="submit" variant="primary" className="mt-5 w-full" tabIndex={8} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Request Reference Number
                    </Button>
                </div>

                <div className="text-muted-foreground text-center text-sm">
                    Already have a reference number?{' '}
                    <TextLink href={route('auth.register')} tabIndex={9} >
                        Sign up
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthSplitLayout>
    );
};

export default ResidentReference;
