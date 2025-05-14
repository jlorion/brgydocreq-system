import { AdminForm, type SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { AccountInfo, BarangayOfficerInfo } from '@/data/admin/ProfileFields';
import DeleteAdmin from '@/components/custom/DeleteAdmin';
import { Button } from '@/components/ui/button';
import AdminSettingsLayout from '@/layouts/admin/AdminSettingsLayout';
import CustomForm from '@/components/custom/CustomFormFields';
import { NotebookPenIcon } from 'lucide-react';
import { toast, Toaster } from 'sonner';
import { IoInformationCircle } from 'react-icons/io5';


export default function Profile() {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing } = useForm<Required<AdminForm>>({
        admin_id: auth.admin.admin_id,
        admin_username: auth.admin.admin_username,
        admin_status: auth.admin.admin_status,
        admin_email: auth.admin.admin_email,
        admin_phonenum: auth.admin.admin_phonenum,
        admin_photopath: auth.admin.admin_photopath,
        admin_roleid: auth.admin.admin_roleid,
        admin_role: auth.admin.admin_role,
        officer_firstname: auth.admin.officer_firstname,
        officer_middlename: auth.admin.officer_middlename,
        officer_lastname: auth.admin.officer_lastname,
        officer_suffix: auth.admin.officer_suffix,
        officer_gender: auth.admin.officer_gender,
        officer_birthdate: auth.admin.officer_birthdate,
        officer_position: auth.admin.officer_position,
        officer_precinct: auth.admin.officer_precinct,
        officer_householdnum: auth.admin.officer_householdnum,
        officer_purokid: auth.admin.officer_purokid,
        officer_purok: auth.admin.officer_purok,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route('admin.settings.profile.update'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Updated Successfully')
            }
        });
    };

    return (
        <>
            <Head title="Profile settings" />
            <Toaster richColors position='top-right' />
            <AdminSettingsLayout title='Profile information'>
                <form onSubmit={submit} className="space-y-6">
                    <CustomForm className='grid grid-cols-3 gap-x-5' fields={AccountInfo(data, setData, errors)} />
                    <div className='flex justify-end'>
                        <Button disabled={processing}>Save</Button>
                    </div>
                </form>
                {
                    auth.admin.admin_roleid === 1 ? (
                        <div className='bg-yellow-50 p-4 rounded-md text-amber-500 border-1 border-amber-300'>
                            <article className='flex text-justify '>
                                <span>
                                    <IoInformationCircle size={25} className='mr-2 mt-1' />
                                </span>
                                As the Superior Administrator, you are authorized to update your personal information. However, to maintain consistency and accuracy, please ensure that any modifications align with the official records provided by the Barangay. You can make changes by navigating to Admins Menu.
                            </article>
                        </div>
                    ) : (
                        <div className='bg-yellow-50 p-4 rounded-md text-amber-500 border-1 border-amber-300'>
                            <article className='flex text-justify '>
                                <span>
                                    <IoInformationCircle size={25} className='mr-2 mt-1' />
                                </span>
                                Your personal details below are based on official records provided by the Barangay and is managed by authorized personnel. For consistency and accuracy, this information cannot be edited. If you need to make corrections or updates, please contact the Superior Administrator of the system. All updates will be reflected in the system once confirmed.
                            </article>
                        </div>
                    )
                }

                <CustomForm className='grid grid-cols-3 gap-x-5' fields={BarangayOfficerInfo(data, setData, errors)} />
                <DeleteAdmin />
            </AdminSettingsLayout>
        </>
    );
}
