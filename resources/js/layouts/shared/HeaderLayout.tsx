import { CustomHeader } from '@/components/custom/CustomHeader';
import { type BreadcrumbItem, type NavItem } from '@/types';
import type { PropsWithChildren } from 'react';

interface SharedHeaderLayoutProps extends PropsWithChildren {
    breadcrumbs?: BreadcrumbItem[];
    mainNavItems?: NavItem[];
    rightNavItems?: NavItem[];
}

export default function SharedHeaderLayout({ breadcrumbs = [], mainNavItems = [], rightNavItems = [] }: SharedHeaderLayoutProps) {
    return <CustomHeader breadcrumbs={breadcrumbs} mainNavItems={mainNavItems} rightNavItems={rightNavItems} />;
}
