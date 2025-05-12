import { rankItem } from '@tanstack/match-sorter-utils';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatText(text: string): string {
    return text
        .replace(/_/g, ' ') // Replace underscores with spaces
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
}


export const getStatusColors = (status: string) => {
    const statusColors: Record<string, string> = {
        rejected: 'bg-red-300 text-red-700',
        approved: 'bg-blue-300 text-blue-700',
        active: 'bg-sky-300 text-sky-700',
        inactive: 'bg-red-300 text-red-700',
        claimed: 'bg-green-300  text-green-700',
        under_review: 'bg-yellow-300 text-yellow-700',
        processing: 'bg-fuchsia-300 text-fuchsia-700',
        for_pickup: 'bg-violet-300 text-violet-700',
        default: 'bg-gray-300 text-gray-700',
    };

    const keyStatus = status.toLowerCase().replace(/\s+/g, '_');

    return statusColors[keyStatus] || statusColors.default;
};

export function fuzzyFilter<T>(row: any, columnId: string, value: string) {
    const itemRank = rankItem(row.getValue(columnId), value);
    return itemRank.passed;
}
