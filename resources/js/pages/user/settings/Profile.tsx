import { UserForm, type SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import DeleteUser from '@/components/custom/delete-user';
import { AccountInfo } from '@/data/user/FetchUpdateProfileFields';
import { ResidentInfo } from '@/data/user/FetchUpdateProfileFields';
import UserSettingsLayout from '@/layouts/user/UserSettingsLayout';
import CustomForm from '@/components/custom/CustomFormFields';
import { Button } from '@/components/ui/button';




export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<UserForm>>({
        user_id: auth.user.user_id,
        username: auth.user.username,
        user_email: auth.user.user_email,
        user_phonenum: auth.user.user_phonenum,
        user_photopath: auth.user.user_photopath,
        resident_firstname: auth.user.resident_firstname,
        resident_middlename: auth.user.resident_middlename,
        resident_lastname: auth.user.resident_lastname,
        resident_suffix: auth.user.resident_suffix,
        resident_birthdate: auth.user.resident_birthdate,
        resident_gender: auth.user.resident_gender,
        resident_precinct: auth.user.resident_precinct,
        resident_householdnum: auth.user.resident_householdnum,
        resident_purok: auth.user.resident_purok,
    });

    console.log(data)

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('user.settings.profile.update'), {
            preserveScroll: true,
            onError: (errors) => {
                console.error('Form submission failed. Validation errors:');
                Object.entries(errors).forEach(([field, message]) => {
                    console.error(`Field: ${field}, Error: ${message}`);
                });
            },
        });
    };

    return (
        <>
            <Head title="Profile settings" />
            <UserSettingsLayout title='Profile information'>
                <form onSubmit={submit} className='space-y-6'>
                    <CustomForm className='grid grid-cols-3 gap-x-5' fields={AccountInfo(data, setData, errors)} />
                    <CustomForm className='grid grid-cols-3 gap-x-5' fields={ResidentInfo(data, setData, errors)} />
                    <div className='flex justify-end'>
                        <Button className='w-1/8' disabled={processing}>Save</Button>
                    </div>
                </form>
                <DeleteUser />
            </UserSettingsLayout>
        </>
    );
}
