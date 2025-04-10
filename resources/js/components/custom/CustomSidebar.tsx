import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import CustomIcon from './CustomIcon';
import { Link, usePage } from '@inertiajs/react';

interface CustomSidebarProps extends React.ComponentProps<typeof Sidebar> {
    navItems: NavItem[];
    navTitle?: string;
}

type UrlProps = {
    url: string;
}


export function CustomSidebar({ navItems, navTitle, ...props }: CustomSidebarProps) {
    const { url } = usePage<UrlProps>().props;

    console.log('usePage().props:', usePage().props);

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex w-full flex-col py-2 items-center justify-center">
                            <CustomIcon imgSrc={navTitle} />
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {navItems.map((item) => {
                            const isActive = url === item.href;
                            console.log('isActive:', isActive);

                            return (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={isActive}>
                                        <Link prefetch href={item.href} className="flex items-center gap-5 font-medium">
                                            {item.icon && <item.icon className="ml-5 h-5 w-5" />}
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
