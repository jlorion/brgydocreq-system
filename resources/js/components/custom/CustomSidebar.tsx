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
import { Separator } from '../ui/separator';
import { Link } from '@inertiajs/react';

interface CustomSidebarProps extends React.ComponentProps<typeof Sidebar> {
    navItems: NavItem[];
    navTitle?: string;
}

export function CustomSidebar({ navItems, navTitle, ...props }: CustomSidebarProps) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <div className="flex w-full flex-col items-center justify-center">
                                <CustomIcon imgSrc={navTitle} />
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="gap-5">
                        {navItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link prefetch href={item.href} className="flex items-center gap-5 font-medium">
                                        {item.icon && <item.icon className="ml-5 h-5 w-5" />}
                                        {item.title}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
