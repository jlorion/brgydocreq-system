import { useCallback, useEffect, useState } from 'react';

interface ScrollOptions {
    behavior: 'smooth' | 'auto';
    block: 'start' | 'center' | 'end' | 'nearest';
}

// Scroll to section utility function
const scrollToSection = (
    id: string,
    event?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    options: ScrollOptions = { behavior: 'smooth', block: 'center' },
): void => {
    event?.preventDefault();
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView(options);
    }
};

export const UseHeaderScroll = () => {
    const [isScrolling, setIsScrolling] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isAtTop, setIsAtTop] = useState(true);
    const [isInteracting, setIsInteracting] = useState(false);
    const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);

    // Debounced scroll handler
    const handleScroll = useCallback(() => {
        const scrollPosition = window.scrollY;
        const newIsAtTop = scrollPosition === 0;
        setIsAtTop(newIsAtTop);

        // Clear any existing timeout
        if (hideTimeout) clearTimeout(hideTimeout);

        // Immediate visibility logic
        if (newIsAtTop || isInteracting) {
            setIsVisible(true);
            setIsScrolling(false);
            return;
        }

        // Show header when scrolling starts
        setIsVisible(true);
        setIsScrolling(true);

        // Set timeout to hide header after scrolling stops
        const timeoutId = setTimeout(() => {
            if (!isInteracting) {
                setIsVisible(false);
                setIsScrolling(false);
            }
        }, 1000);

        setHideTimeout(timeoutId);
    }, [isInteracting, hideTimeout]);

    // Interaction handlers
    const handleInteractionStart = useCallback(() => {
        if (hideTimeout) clearTimeout(hideTimeout);
        setIsInteracting(true);
        setIsVisible(true);
        setIsScrolling(!isAtTop);
    }, [hideTimeout, isAtTop]);

    const handleInteractionEnd = useCallback(() => {
        setIsInteracting(false);
        if (!isAtTop) {
            const timeoutId = setTimeout(() => {
                setIsVisible(false);
                setIsScrolling(false);
            }, 1000);
            setHideTimeout(timeoutId);
        }
    }, [isAtTop]);

    // Effect for scroll handling
    useEffect(() => {
        // Initial position check
        setIsAtTop(window.scrollY === 0);

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (hideTimeout) clearTimeout(hideTimeout);
        };
    }, [handleScroll]); // Only re-run if handleScroll changes

    // Example usage props for header component
    const headerProps = {
        onMouseEnter: handleInteractionStart,
        onMouseLeave: handleInteractionEnd,
        onFocus: handleInteractionStart,
        onBlur: handleInteractionEnd,
        className: `
      ${isScrolling && !isAtTop && 'shadow-md'}
       ${!isVisible && !isAtTop && '-translate-y-full'}
     mx-full sticky top-0 z-50 flex h-16 items-center bg-white px-20 transition-all duration-300 ease-in-out
    `,
    };

    return {
        headerProps,
        isVisible,
        isScrolling,
        isAtTop,
        scrollToSection,
    };
};
