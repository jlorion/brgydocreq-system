import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';
import { formatText, getStatusColors } from '@/lib/utils';

interface CustomSheetProps {
    image?: string;
    firstButton: React.ReactNode;
    secondButton?: React.ReactNode;
    firstButtonClassName?: string;
    secondButtonClassName?: string;
    firstButtonVariant?: 'search' | 'link' | 'approve' | 'reject' | 'plain' | 'primary' | 'outline' | 'secondary' | 'ghost';
    secondButtonVariant?: 'search' | 'link' | 'approve' | 'reject' | 'plain' | 'primary' | 'outline' | 'secondary' | 'ghost';
    trigger: React.ReactNode;
    className?: string;
    plainTitle?: string;
    statusTitle?: string;
    form: React.ReactNode;

}

const CustomSheet = ({
    trigger,
    plainTitle,
    statusTitle,
    form,
    firstButton,
    secondButton,

}: CustomSheetProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent side="right" className="flex w-120 flex-col p-4">
                <SheetHeader className="flex items-center justify-center">
                    {statusTitle ? (
                        <SheetTitle
                            className={`mt-3 w-1/2 rounded-md p-4 text-center text-2xl ${getStatusColors(statusTitle)}`}
                        >
                            {statusTitle}
                        </SheetTitle>
                    ) : (
                        <SheetTitle className="text-2xl">{plainTitle}</SheetTitle>
                    )}
                </SheetHeader>
                <div className="flex flex-col overflow-y-auto">{form}</div>
                <SheetFooter className="flex gap-x-3 flex-row">
                    {firstButton}
                    {secondButton}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default CustomSheet;
