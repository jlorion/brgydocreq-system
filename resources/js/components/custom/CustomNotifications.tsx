import { Check, FileCheck, SmileIcon, X } from 'lucide-react';
import React from 'react';
import { FaWalking } from 'react-icons/fa';
import { GrCycle } from 'react-icons/gr';

interface CustomNotificationsProps {
    Icon?: React.ReactNode;
    status?: string;
    notification?: string;
    updated_at?: string;
}

const notificationColors: Record<string, { bgFirstColor: string; bgColor: string; textColor: string; Icon: React.ReactNode }> = {
    'approved': {
        bgFirstColor: '#0C9',
        bgColor: 'bg-green-500/10',
        textColor: 'text-green-700',
        Icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-[#0C9]">
                <FileCheck className="h-8 w-8 text-amber-50" />
            </div>
        ),
    },
    'rejected': {
        bgFirstColor: '#EB5757',
        bgColor: 'bg-red-500/10',
        textColor: 'text-red-700',
        Icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-[#EB5757]">
                <X className="h-8 w-8 text-amber-50" />
            </div>
        ),
    },
    'claimed': {
        bgFirstColor: '#1591EA',
        bgColor: 'bg-blue-500/10',
        textColor: 'text-blue-500',
        Icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-[#1591EA]">
                <Check className="h-8 w-8 text-amber-50" />
            </div>
        ),
    },
    'processing': {
        bgFirstColor: '#BF8BFF',
        bgColor: 'bg-violet-500/10',
        textColor: 'text-processing-700',
        Icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-[#BF8BFF]">
                <GrCycle className="h-8 w-8 text-amber-50" />
            </div>
        ),
    },
    'for pickup': {
        bgFirstColor: '#FFA500',
        bgColor: 'bg-orange-500/10',
        textColor: 'text-orange-400',
        Icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-[#FFA500]">
                <FaWalking className="h-8 w-8 text-amber-50" />
            </div>
        ),
    },
    'default': {
        bgFirstColor: '#ccc',
        bgColor: 'bg-gray-100',
        textColor: 'text-gray-800',
        Icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-gray-400">
                <SmileIcon className="h-8 w-8 text-white" />
            </div>
        ),
    },
};

const CustomNotifications = ({ Icon, status = '', notification, updated_at, }: CustomNotificationsProps) => {
    const { bgFirstColor, bgColor, textColor, Icon: defaultIcon } = notificationColors[status.toLowerCase()] || notificationColors['default'];
    return (
        <div className="w-full">
            <div className={`flex w-full items-center gap-3 overflow-hidden rounded-r-lg border ${bgColor}`}>
                <div className="min-h-24 w-4 rounded-r-lg" style={{ backgroundColor: bgFirstColor }}></div>
                {Icon || defaultIcon}
                <div className="flex flex-col pr-3">
                    <h3 className={`text-sm font-medium ${textColor}`}>{status}</h3>
                    <p className="text-sm text-gray-700">{notification || 'No notification provided.'}</p>
                    <p className="mt-1 text-xs text-gray-500">{updated_at || 'timeless'}</p>
                </div>
            </div>
        </div>
    );
};

export default CustomNotifications;
