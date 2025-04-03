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

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
    navItems: NavItem[];
    navTitle?: string;
}

export function AppSidebar({ navItems, navTitle, ...props }: AppSidebarProps) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <div className="flex w-full flex-col items-center justify-center">
                                <h1 className="text-xl font-bold text-[#237D31]">{navTitle}</h1>
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
                                    <a href={item.href} className="flex items-center gap-5 font-medium">
                                        {item.icon && <item.icon className="ml-5 h-5 w-5" />}
                                        {item.title}
                                    </a>
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
