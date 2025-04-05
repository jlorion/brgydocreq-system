import { AppSidebar } from '@/components/custom/AppSidebar';
import { CustomHeader } from '@/components/custom/CustomHeader';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
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
                <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                    <div className="flex w-full flex-row items-center justify-between gap-2 px-3 pr-5">
                        <div className="flex flex-row items-center gap-2">
                            <SidebarTrigger />
                            <h1>Dashboard tentative</h1>
                        </div>

                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <CustomHeader/>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-4">
                        <div className="bg-muted/50 aspect-video rounded-xl">Helo</div>
                        <div className="bg-muted/50 aspect-video rounded-xl">Helo</div>
                        <div className="bg-muted/50 aspect-video rounded-xl">Helo</div>
                        <div className="bg-muted/50 aspect-video rounded-xl">Helo</div>
                    </div>
                    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
