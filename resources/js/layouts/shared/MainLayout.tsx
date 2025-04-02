import CustomFooter from '@/components/custom/CustomFooter';
import { CustomHeader } from '@/components/custom/CustomHeader';
import { type NavItem } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';

interface MainLayoutProps {
    children: React.ReactNode;
    className?: string;
}

const landingMainNavItems: NavItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Services', href: '/#services' },
    { title: 'About', href: '/#about' },
    { title: 'Contact', href: '/contact-us' },
];

const landingRightNavItems: NavItem[] = [
    { title: 'Sign up', href: route('auth.register') },
    { title: 'Login', href: route('auth.login') },
];

const MainLayout = ({ children, className }: MainLayoutProps) => {
    return (
        <>
            <CustomHeader mainNavItems={landingMainNavItems} rightNavItems={landingRightNavItems} />
            <div className="box-border h-full w-full">
                <main className={`z-0 flex flex-grow flex-col ${className}`}>{children}</main>
                <footer>
                    <CustomFooter />
                </footer>
            </div>
        </>
    );
};

export default MainLayout;
