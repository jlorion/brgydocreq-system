import CustomFooter from '@/components/custom/CustomFooter';
import { CustomHeader } from '@/components/custom/CustomHeader';
import CustomIcon from '@/components/custom/CustomIcon';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import React, { useEffect } from 'react';
import WebLogo from '../../../assets/web-logo.svg';


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
    { title: 'Sign up', href: route('user.register') },
    { title: 'Login', href: route('user.login') },
];

const leftNavItems = () => {
    return (
        <Link href="/" prefetch>
            <CustomIcon imgSrc={WebLogo} className="h-9 px-5" />
        </Link>
    );
}

const MainLayout = ({ children, className }: MainLayoutProps) => {
    return (
        <>
            <div className="box-border h-full w-full">
                <CustomHeader className='px-20' mainNavItems={landingMainNavItems} rightNavItems={landingRightNavItems} leftNavItems={leftNavItems()} />
                <main className={`z-0 flex flex-grow flex-col ${className}`}>{children}</main>
                <footer>
                    <CustomFooter />
                </footer>
            </div>
        </>
    );
};

export default MainLayout;
