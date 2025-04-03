import { AppContent } from '@/components/custom/app-content';
import { AppShell } from '@/components/custom/app-shell';
import { AppSidebar } from '@/components/custom/AppSidebar';
import { AppSidebarHeader } from '@/components/custom/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
