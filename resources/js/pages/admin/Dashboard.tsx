import { AppSidebar } from '@/components/custom/AppSidebar';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { Home } from 'lucide-react';


const navItems = [
    { icon: Home, title: 'Dashboard', href: '/docs/getting-started' },
    { icon: Home, title: 'Documents', href: '/docs/data-fetching' },
    { icon: Home, title: 'On Process', href: '/docs/routing' },
    { icon: Home, title: 'Archives', href: '/docs/layouts' },
    { icon: Home, title: 'Residents', href: '/docs/authentication' },
    { icon: Home, title: 'Admins', href: '/docs/api-routes' },
    { icon: Home, title: 'Document Request', href: '/docs/deployment' },
];
const navTitle = 'Barangay Balagunan';

export default function Dashboard() {
    return (
        <SidebarProvider>
            <AppSidebar navItems={navItems} navTitle={navTitle} />
            <SidebarInset>
                <AdminLayout className='p-5'>
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                            <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </AdminLayout>
            </SidebarInset>
        </SidebarProvider>
    );
}
