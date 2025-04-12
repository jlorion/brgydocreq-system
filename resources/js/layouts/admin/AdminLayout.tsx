import { CustomHeader } from '@/components/custom/CustomHeader';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react'
import { LoaderIcon, LayoutDashboard, FileUser, Archive, FileText, Users, Shield } from 'lucide-react';
import { CustomSidebar } from '@/components/custom/CustomSidebar';
import WebLogo from '../../../assets/web-logo.svg';
import CustomIcon from '@/components/custom/CustomIcon';


interface AdminLayoutProps {
	children: React.ReactNode;
	className?: string;
	title?: string;
}



const navItems = [
	{ icon: LayoutDashboard, title: 'Dashboard', href: route('admin.dashboard') },
	{ icon: FileUser, title: 'Document Request', href: route('admin.document-request') },
	{ icon: LoaderIcon, title: 'On Process', href: route('admin.on-process') },
	{ icon: Archive, title: 'Archives', href: route('admin.archives') },
	{ icon: FileText, title: 'Documents', href: route('admin.documents') },
	{ icon: Users, title: 'Residents', href: route('admin.residents') },
	{ icon: Shield, title: 'Admins', href: route('admin.admins') },
];


const AdminLayout = ({ children, className, title }: AdminLayoutProps) => {
	return (
		<div className='box-border h-full w-full'>
			<SidebarProvider>
				<CustomSidebar navItems={navItems} navTitle={<CustomIcon imgSrc={WebLogo} />
				} />
				<SidebarInset>
					<CustomHeader className='px-5' leftNavItems={
						<> <SidebarTrigger />
							<h1 className='font-semibold text-lg '>{title}</h1>
						</>}
					/>
					<main className={`z-0 flex flex-grow flex-col p-9 @container/main gap-y-9 ${className}`}>
						{children}

					</main>
				</SidebarInset>
			</SidebarProvider>
		</div>
	)
}

export default AdminLayout