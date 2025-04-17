import { CustomSidebar } from '@/components/custom/CustomSidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { CircleUser, KeyRound, SunMoon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import HeadingSmall from '@/components/custom/heading-small';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: route('user.settings.profile.edit'),
        icon: CircleUser,
    },
    {
        title: 'Password',
        href: route('user.settings.password.edit'),
        icon: KeyRound,
    },
    {
        title: 'Appearance',
        href: route('user.settings.appearance'),
        icon: SunMoon,
    },
];

const temp =
    <div>
        <Avatar className="size-30">
            <AvatarImage src="/images/avatars/1.png" alt="Avatar" />
            <AvatarFallback>Profile</AvatarFallback>
        </Avatar>
    </div>

interface SettingsLayoutProps {
    children: React.ReactNode;
    title: string;
}

export default function SettingsLayout({ children, title }: SettingsLayoutProps) {

    return (
        <SidebarProvider>
            <CustomSidebar navItems={sidebarNavItems} navTitle={temp} />
            <SidebarInset>
                <main className="flex flex-col p-9">
                    <div className='py-3 pl-5 text-white bg-linear-to-r from-teal-500 to-green-500 rounded-t-md '>
                        <h2 className='text-lg'>
                            {title}
                        </h2>
                    </div>
                    <div className='border p-5 rounded-b-md shadow-sm'>
                        <section className="max-w-xl space-y-12">{children}</section>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>

    )
}