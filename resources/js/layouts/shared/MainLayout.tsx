import CustomFooter from '@/components/custom/CustomFooter';
import { CustomUserHeader } from '@/components/custom/CustomUserHeader';
import CustomIcon from '@/components/custom/CustomIcon';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import WebLogo from '../../../assets/web-logo.svg';



interface MainLayoutProps {
    children: React.ReactNode;
    className?: string;
}


const landingRightNavItems: NavItem[] = [
    { title: 'Sign up', href: route('user.register') },
    { title: 'Login', href: route('user.login') },
];


const MainLayout = ({ children, className }: MainLayoutProps) => {
    const { auth } = usePage<SharedData>().props;

    const isAuthenticated = !!auth?.user;

    const landingMainNavItems: NavItem[] =
        isAuthenticated ? [
            { title: 'Home', href: '/user' },
            { title: 'Services', href: '/user#services' },
            { title: 'About', href: '/user#about' },
            { title: 'Contact', href: '/user/contact-us' },
        ] : [
            { title: 'Home', href: '/' },
            { title: 'Services', href: '/#services' },
            { title: 'About', href: '/#about' },
            { title: 'Contact', href: '/contact-us' },
        ];

    const leftNavItems = () => {
        return (
            <Link href={isAuthenticated ? "/user" : "/"} prefetch>
                <CustomIcon imgSrc={WebLogo} className="h-9 px-5" />
            </Link>
        );
    }
    return (
        <>
            <div className="box-border h-full w-full">
                <CustomUserHeader className='px-20' mainNavItems={landingMainNavItems} rightNavItems={landingRightNavItems} leftNavItems={leftNavItems()} />
                <main className={`z-0 flex flex-grow flex-col ${className}`}>{children}</main>
                <footer>
                    <CustomFooter />
                </footer>
            </div>
        </>
    );
};

export default MainLayout;
