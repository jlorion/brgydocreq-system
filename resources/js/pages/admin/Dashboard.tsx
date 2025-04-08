import { CustomSidebar } from '@/components/custom/CustomSidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { CustomDataTable } from '@/components/custom/CustomDataTable';
import { AdminDataSample } from '@/data/AdminDataSample'
import { CustomChart } from '@/components/custom/CustomChart';
import { CustomDataCard } from '@/components/custom/CustomDataCard';

export default function Dashboard() {
    return (
        <AdminLayout className='p-5'>
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                        <CustomDataCard />
                        <div className="px-4 lg:px-6">
                            <CustomChart />

                        </div>
                        <CustomDataTable data={AdminDataSample} />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
