import { Check, Clock, FileCheck, FileX, Loader, ShoppingCart, X } from 'lucide-react';
import React from 'react';

interface CustomNotificationsProps {
    Icon?: React.ReactNode;
    title?: string;
    description?: string;
    time?: string;
    type?: 'rejected' | 'claimed' | 'under review' | 'processing' | 'For pickup' | 'approved' | 'cancelled';
}

const notificationColors: Record<string, { bgFirstColor: string; bgColor: string; textColor: string; Icon: React.ReactNode }> = {
    approved: {
        bgFirstColor: '#0C9',
        bgColor: 'bg-green-500/10',
        textColor: 'text-green-700',
        Icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-[#0C9]">
                <Check className="h-6 w-6 text-amber-50" />
            </div>
        ),
    },
    rejected: {
        bgFirstColor: '#EB5757',
        bgColor: 'bg-red-500/10',
        textColor: 'text-red-700',
        Icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-[#EB5757]">
                <X className="h-6 w-6 text-amber-50" />
            </div>
        ),
    },
    claimed: {
        bgFirstColor: '#1591EA',
        bgColor: 'bg-blue-500/10',
        textColor: 'text-blue-500',
        Icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-[#1591EA]">
                <FileCheck className="h-6 w-6 text-amber-50" />
            </div>
        ),
    },
    'under review': {
        bgFirstColor: '#FFD700',
        bgColor: 'bg-yellow-500/10',
        textColor: 'text-yellow-400',
        Icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-[#FFD700]">
                <Clock className="h-6 w-6 text-amber-50" />
            </div>
        ),
    },
    processing: {
        bgFirstColor: '#BF8BFF',
        bgColor: 'bg-violet-500/10',
        textColor: 'text-processing-700',
        Icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-[#BF8BFF]">
                <Loader className="h-6 w-6 text-amber-50" />
            </div>
        ),
    },
    'for pickup': {
        bgFirstColor: '#FFA500',
        bgColor: 'bg-orange-500/10',
        textColor: 'text-orange-400',
        Icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-[#FFA500]">
                <ShoppingCart className="h-6 w-6 text-amber-50" />
            </div>
        ),
    },
    cancelled: {
        bgFirstColor: '#808080',
        bgColor: 'bg-gray-500/10',
        textColor: 'text-gray-700',
        Icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-[#808080]">
                <FileX className="h-6 w-6 text-amber-50" />
            </div>
        ),
    },
};

const CustomNotifications = ({ Icon, title, description, time, type = 'approved' }: CustomNotificationsProps) => {
    const { bgFirstColor, bgColor, textColor, Icon: defaultIcon } = notificationColors[type] || {};
    return (
        <div className="w-full">
            <div className={`flex w-full items-center gap-3 overflow-hidden rounded-r-lg border ${bgColor}`}>
                <div className="min-h-24 w-4 rounded-r-lg" style={{ backgroundColor: bgFirstColor }}></div>
                {Icon || defaultIcon}
                <div className="flex flex-col">
                    <h3 className={`text-sm font-semibold ${textColor}`}>{title || type.charAt(0).toUpperCase() + type.slice(1)}</h3>
                    <p className="text-sm text-gray-700">{description || 'No description provided.'}</p>
                    <p className="mt-1 text-xs text-gray-500">{time || 'Just now'}</p>
                </div>
            </div>
        </div>
    );
};

export default CustomNotifications;
