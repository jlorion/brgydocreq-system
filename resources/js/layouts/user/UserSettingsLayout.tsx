import { CustomSidebar } from '@/components/custom/CustomSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Bell, CircleUser, KeyRound, SunMoon, FileInput } from 'lucide-react';
import CustomProfilePic from '@/components/custom/CustomProfilePic';


const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: route('user.settings.profile.edit'),
        icon: CircleUser,
    },
    {
        title: 'Document Request',
        href: route('user.settings.document-request'),
        icon: FileInput,
    },
    {
        title: 'Notifications',
        href: route('user.settings.notification'),
        icon: Bell,
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


interface UserSettingsLayoutProps {
    children: React.ReactNode;
    title: string;
}

export default function UserSettingsLayout({ children, title }: UserSettingsLayoutProps) {

    return (
        <SidebarProvider>
            <CustomSidebar navItems={sidebarNavItems} navTitle={<CustomProfilePic />} />
            <SidebarInset>
                <main className="flex flex-col p-9">
                    <div className='py-3 pl-5 text-white bg-linear-to-r from-teal-500 to-green-500 rounded-t-md '>
                        <h2 className='text-lg'>
                            {title}
                        </h2>
                    </div>
                    <div className='border p-6 rounded-b-md shadow-sm'>
                        <section className="space-y-12">{children}</section>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>

    )
}