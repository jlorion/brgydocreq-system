import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/custom/appearance-tabs';
import HeadingSmall from '@/components/custom/HeadingSmall';
import AdminSettingsLayout from '@/layouts/admin/AdminSettingsLayout';


export default function Appearance() {
    return (
        <>
            <Head title="Appearance settings" />
            <AdminSettingsLayout title='Appereance'>
                <div className="space-y-6">
                    <AppearanceTabs />
                </div>
            </AdminSettingsLayout>
        </>
    );
}
