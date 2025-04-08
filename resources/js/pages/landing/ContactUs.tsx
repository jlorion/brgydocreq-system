import InputError from '@/components/custom/InputError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AuthSplitLayout from '@/layouts/shared/AuthSplitLayout';
import MainLayout from '@/layouts/shared/MainLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useEffect } from 'react';
import Contact from '../../../assets/contact-us.svg';

type ContactUsForm = {
    full_name: string;
    email: string;
    phone_number: string;
    message: string;
};


const ContactUs = () => {
    const { data, setData, post, processing, errors, reset } = useForm<Required<ContactUsForm>>({
        full_name: '',
        email: '',
        phone_number: '',
        message: '',
    });

    return (
        <>
            <Head title="Contact us" />
            <MainLayout>
                <AuthSplitLayout
                    title="Let's get in Touch"
                    description="Have a question or need assistance? Fill the form and we’ll call you as soon as possible."
                    image={Contact}
                    background="bg-none"
                >
                    <form className="mt-4 flex flex-col gap-6">
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="fullname">Full name</Label>
                                <Input
                                    id="fullname"
                                    type="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="full_name"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    placeholder="Juan Dela Cruz"
                                />
                                <InputError message={errors.full_name} />
                            </div>
                            <div className="grid grid-cols-2 gap-x-5">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="email@example.com"
                                    />

                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phonenum">Phone number</Label>
                                    <Input
                                        id="phonenum"
                                        type="email"
                                        required
                                        tabIndex={3}
                                        autoComplete="phone_number"
                                        value={data.phone_number}
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        placeholder="09074245108"
                                    />
                                    <InputError message={errors.phone_number} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="textarea">Message</Label>
                                <Textarea id="textarea" className="h-32" required tabIndex={4} placeholder="Type your message..." />
                                <InputError message={errors.message} />
                            </div>

                            <Button type="submit" variant="primary" className="mt-3 w-full" tabIndex={5} disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Send
                            </Button>
                        </div>
                    </form>

                    {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
                </AuthSplitLayout>
            </MainLayout>
        </>
    );
};

export default ContactUs;
