import CustomFooter from '@/components/custom/CustomFooter';
import { CustomHeader } from '@/components/custom/CustomHeader';
import { type NavItem } from '@/types';
import React from 'react';

interface MainLayoutProps {
    children: React.ReactNode;
    className?: string;
}

const landingMainNavItems: NavItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Services', href: 'services' },
    { title: 'About', href: 'about' },
    { title: 'Contact', href: '/contact' },
];

const landingRightNavItems: NavItem[] = [
    { title: 'Login', href: '/login' },
    { title: 'Register', href: '/register' },
];

const MainLayout = ({ children, className }: MainLayoutProps) => {
    return (
        <>
            <CustomHeader mainNavItems={landingMainNavItems} rightNavItems={landingRightNavItems} />
            <div className="box-border h-full w-full">
                <main className={`flex flex-col flex-grow z-0 ${className}`}>{children}</main>
                <footer>
                    <CustomFooter />
                </footer>
            </div>
        </>
    );
};

export default MainLayout;
