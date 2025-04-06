import { CustomHeader } from '@/components/custom/CustomHeader';
import { SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react'

interface AdminLayoutProps {
	children: React.ReactNode;
	className?: string;
}

const AdminLayout = ({ children, className }: AdminLayoutProps) => {
	return (
		<div className='box-border h-full w-full'>
			<CustomHeader className='px-5' leftNavItems={
				<> <SidebarTrigger />
					<h1>Dashboard tentative</h1>
				</>}
			/>
			<main className={`z-0 flex flex-grow flex-col ${className}`}>
				{children}
			</main>
		</div>
	)
}

export default AdminLayout