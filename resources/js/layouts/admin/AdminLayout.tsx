import { CustomHeader } from '@/components/custom/CustomHeader';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react'
import { Home } from 'lucide-react';
import { CustomSidebar } from '@/components/custom/CustomSidebar';
import WebLogo from '../../../assets/web-logo.svg';



interface AdminLayoutProps {
	children: React.ReactNode;
	className?: string;
}


const navItems = [
	{ icon: Home, title: 'Dashboard', href: route('admin.dashboard') },
	{ icon: Home, title: 'Documents', href: route('admin.documents') },
	{ icon: Home, title: 'On Process', href: route('admin.on-process') },
	{ icon: Home, title: 'Archives', href: route('admin.archives') },
	{ icon: Home, title: 'Residents', href: route('admin.residents') },
	{ icon: Home, title: 'Admins', href: route('admin.admins') },
	{ icon: Home, title: 'Document Request', href: route('admin.document-request') },
];


const AdminLayout = ({ children, className }: AdminLayoutProps) => {
	return (
		<div className='box-border h-full w-full'>
			<SidebarProvider>
				<CustomSidebar navItems={navItems} navTitle={WebLogo} />
				<SidebarInset>
					<CustomHeader className='px-5' leftNavItems={
						<> <SidebarTrigger />
							<h1>Dashboard</h1>
						</>}
					/>
					<main className={`z-0 flex flex-grow flex-col ${className}`}>
						{children}
					</main>
				</SidebarInset>
			</SidebarProvider>
		</div>
	)
}

export default AdminLayout