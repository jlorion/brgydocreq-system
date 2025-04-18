import { AdminRegisterForm } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatText(text: string): string {
    return text
        .replace(/_/g, ' ') // Replace underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
}

export const createStringSetter = <T extends Record<string, any>>(setData: (key: keyof T, value: string) => void) => {
    return (key: keyof T) => (value: string | Date | null) => {
        if (typeof value === 'string') {
            setData(key, value);
            console.log(value);
        }
    };
};

export const createDateSetter = <T extends Record<string, any>> (setData: (key: keyof T, value: string) => void) => {
    return (key: keyof T) => (value: string | Date | null) => {
        if (value instanceof Date) {
            const formattedDate = format(value, 'yyyy-MM-dd');
            setData(key, formattedDate);
        }
    };
};
