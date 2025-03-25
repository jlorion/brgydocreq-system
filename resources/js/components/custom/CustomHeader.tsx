import { Breadcrumbs } from '@/components/custom/breadcrumbs';
import CustomIcon from '@/components/custom/CustomIcon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { type BreadcrumbItem, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';
import WebLogo from '../../../assets/web-logo.svg';
import { UserMenuContent } from './user-menu-content';

// const activeItemStyles = 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100';

interface CustomHeaderProps {
    breadcrumbs?: BreadcrumbItem[];
    mainNavItems: NavItem[];
    rightNavItems: NavItem[];
}

export function CustomHeader({ breadcrumbs = [], mainNavItems = [], rightNavItems = [] }: CustomHeaderProps) {
    const page = usePage<SharedData>();
    const { auth } = page.props;
    const getInitials = useInitials();

    const scrollToSection = (id: string, event?: React.MouseEvent) => {
        if (event) event.preventDefault(); // Prevent default navigation
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const [isScrolling, setIsScrolling] = useState(false); // Controls shadow
    const [isVisible, setIsVisible] = useState(true); // Controls visibility
    const [isAtTop, setIsAtTop] = useState(true); // Tracks if at top of page
    const [isInteracting, setIsInteracting] = useState(false); // Tracks user interaction
    // Handle interactions (e.g., mouse enter/leave, clicks)
    const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null); // Timeout for

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const handleScroll = () => {
            const atTop = window.scrollY === 0;
            setIsAtTop(atTop);

            // Always show header when at top or interacting
            if (atTop || isInteracting) {
                setIsVisible(true);
                setIsScrolling(false); // No shadow at top
                clearTimeout(timeoutId);
                return;
            }

            // Show header and set scrolling state when not at top
            setIsVisible(true);
            setIsScrolling(true);

            // Clear previous timeout
            clearTimeout(timeoutId);

            // Hide header after 1 second of no scrolling (unless interacting)
            timeoutId = setTimeout(() => {
                if (!isInteracting) {
                    setIsScrolling(false);
                    setIsVisible(false);
                }
            }, 1000); // Adjust delay as needed

            setHideTimeout(timeoutId);
        };

        // Initial check for top position
        setIsAtTop(window.scrollY === 0);

        window.addEventListener('scroll', handleScroll);

        // Cleanup
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, [isInteracting, hideTimeout]); // Re-run effect if interaction state changes

    // Interaction handlers
    const handleInteractionStart = () => {
        if (hideTimeout) clearTimeout(hideTimeout); // Clear any hide timeout
        setIsInteracting(true);
        setIsVisible(true); // Show header on interaction
        setIsScrolling(!isAtTop); // Apply shadow if not at top
    };

    const handleInteractionEnd = () => {
        setIsInteracting(false);
        if (!isAtTop) {
            // Set timeout to hide header after interaction ends, if not at top
            const timeoutId = setTimeout(() => {
                setIsVisible(false);
                setIsScrolling(false);
            }, 1000); // Match scroll timeout
            setHideTimeout(timeoutId);
        }
    };

    return (
        <>
            <div
                className={cn(
                    'mx-full sticky top-0 z-50 flex h-16 items-center bg-white px-20 transition-all duration-300 ease-in-out',
                    isScrolling && !isAtTop && 'shadow-md', // Shadow only when scrolling and not at top
                    !isVisible && !isAtTop && '-translate-y-full', // Hide only when not at top and not visible
                )}
                onMouseEnter={handleInteractionStart}
                onMouseLeave={handleInteractionEnd}
                onClick={handleInteractionStart} // Keep visible during clicks
            >
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
                            {mainNavItems.map((item, index) => (
                                <NavigationMenuItem key={index} className="relative flex h-full items-center">
                                    <Link
                                        href={`#${item.href}`}
                                        onClick={(event) => scrollToSection(item.href, event)}
                                        className={cn(navigationMenuTriggerStyle(), 'h-9 cursor-pointer px-8')}
                                    >
                                        {item.icon && <CustomIcon icon={item.icon} className="mr-2 h-4 w-4" />}
                                        {item.title}
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="ml-auto flex items-center">
                    {auth.user ? (
                        // Render Avatar Dropdown if the user is logged in
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
                        <div className="space-x-2">
                            <Link href={route('register')}>
                                <Button variant="plain">Sign up</Button>
                            </Link>
                            <Link href={route('login')}>
                                <Button variant="plain">Log in</Button>
                            </Link>
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
