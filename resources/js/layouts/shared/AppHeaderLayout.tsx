import { CustomHeader } from '@/components/custom/CustomHeader';
import { type BreadcrumbItem, type NavItem } from '@/types';
import type { PropsWithChildren } from 'react';

interface AppHeaderLayoutProps extends PropsWithChildren {
    breadcrumbs?: BreadcrumbItem[];
    mainNavItems?: NavItem[];
    rightNavItems?: NavItem[];
}

export default function AppHeaderLayout({ breadcrumbs = [], mainNavItems = [], rightNavItems = [] }: AppHeaderLayoutProps) {
    return <CustomHeader breadcrumbs={breadcrumbs} mainNavItems={mainNavItems} rightNavItems={rightNavItems} />;
}
