import { CustomSidebar } from '@/components/custom/CustomSidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { Home } from 'lucide-react';
import WebLogo from '../../../assets/web-logo.svg';
import { CustomDataTable } from '@/components/custom/CustomDataTable';
import { AdminDataSample } from '@/data/AdminDataSample'
import { CustomChart } from '@/components/custom/CustomChart';
import { CustomDataCard } from '@/components/custom/CustomDataCard';


const navItems = [
	{ icon: Home, title: 'Dashboard', href: route('admin.dashboard') },
	{ icon: Home, title: 'Documents', href: route('admin.documents') },
	{ icon: Home, title: 'On Process', href: route('admin.on-process') },
	{ icon: Home, title: 'Archives', href: route('admin.archives') },
	{ icon: Home, title: 'Residents', href: route('admin.residents') },
	{ icon: Home, title: 'Admins', href: route('admin.admins') },
	{ icon: Home, title: 'Document Request', href: route('admin.document-request') },
];


export default function Documents() {
	return (
		<SidebarProvider>
			<CustomSidebar navItems={navItems} navTitle={WebLogo} />
			<SidebarInset>
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
			</SidebarInset>
		</SidebarProvider>
	);
}
