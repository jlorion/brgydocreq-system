import { Breadcrumbs } from '@/components/custom/breadcrumbs';
import CustomIcon from '@/components/custom/CustomIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useInitials } from '@/hooks/use-initials';
import { UseHeaderScroll } from '@/hooks/UseHeaderScroll';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import WebLogo from '../../../assets/web-logo.svg';
import { UserMenuContent } from './user-menu-content';

interface CustomHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
    mainNavItems: NavItem[];
    rightNavItems: NavItem[];
    className?: string;
}

export function CustomHeader({ breadcrumbs = [], mainNavItems = [], rightNavItems = [], className }: CustomHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();

    const { headerProps } = UseHeaderScroll();

    const isWelcomePage = route().current('landing.home');
    const scrollableItems = ['about', 'services'];

    return (
        <>
            <div {...headerProps} className={`${className} ${headerProps.className}`}>
                {/* Mobile Menu */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="mr-2 h-[34px] w-[34px]">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="bg-sidebar flex h-full w-64 flex-col items-stretch justify-between">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <SheetHeader className="flex justify-start text-left">
                                <CustomIcon imgSrc={WebLogo} className="h-9" />
                            </SheetHeader>
                            <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                <div className="flex h-full flex-col justify-between text-sm">
                                    <div className="flex flex-col space-y-4">
                                        {mainNavItems.map((item, index) => (
                                            <Link key={index} href={item.href} className="flex items-center space-x-2 font-medium">
                                                {item.icon && <CustomIcon icon={item.icon} className="h-5 w-5" />}
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="flex flex-col space-y-4">
                                        {rightNavItems.map((item) => (
                                            <a
                                                key={item.title}
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-2 font-medium"
                                            >
                                                {item.icon && <CustomIcon icon={item.icon} className="h-5 w-5" />}
                                                <span>{item.title}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <Link href="/" prefetch className="flex items-center space-x-2">
                    <CustomIcon imgSrc={WebLogo} className="h-9 px-5" />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden h-full flex-grow justify-center lg:flex">
                    <NavigationMenu className="flex h-full items-stretch">
                        <NavigationMenuList className="flex h-full items-stretch space-x-2">
                            {mainNavItems.map((item, index) => {
                                const isScrollable = scrollableItems.includes(item.href.split('#')[0].toLowerCase());
                                const sectionId = isScrollable ? item.href.split('#')[1] || item.href : null;

                                return (
                                    <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                        <Link
                                            href={item.href}
                                            onClick={(event) => {
                                                if (isScrollable && isWelcomePage && sectionId) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            className={cn(navigationMenuTriggerStyle(), 'h-9 cursor-pointer px-8')}
                                        >
                                            {item.icon && <CustomIcon icon={item.icon} className="mr-2 h-4 w-4" />}
                                            {item.title}
                                        </Link>
                                    </NavigationMenuItem>
                                );
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="ml-auto flex items-center">
                    {auth.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="size-10 rounded-full p-1">
                                    <Avatar className="size-8 overflow-hidden rounded-full">
                                        {auth.user.avatar ? (
                                            <AvatarImage src={auth.user.avatar} alt={auth.user.name || 'User'} />
                                        ) : (
                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(auth.user.name || 'User')}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <UserMenuContent user={auth.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="space-x-2 hidden lg:flex">
                            {rightNavItems.map((item, index) => (
                                <Link href={item.href} key={index}>
                                    <Button variant="plain">{item.title}</Button>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {breadcrumbs.length > 1 && (
                <div className="border-sidebar-border/70 flex w-full border-b">
                    <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                </div>
            )}
        </>
    );
}
