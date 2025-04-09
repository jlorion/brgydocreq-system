import { CustomFormField } from '@/components/custom/CustomForm';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';

import { Button } from '../ui/button';
import CustomForm from './CustomForm';

interface CustomSheetProps {
    image?: string;
    button?: React.ReactNode;
    trigger: React.ReactNode;
    className?: string;
    title?: string;
    formFields: CustomFormField[];
}

const CustomSheet = ({ image, trigger, title, formFields }: CustomSheetProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent side="right" className="flex w-120 flex-col p-4">
                <SheetHeader className="gap-1">
                    <SheetTitle>{title}</SheetTitle>
                    <div className="flex w-full justify-center">
                        <div
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                height: '150px',
                                width: '150px',
                                borderRadius: '100%',
                            }}
                        ></div>
                    </div>
                </SheetHeader>
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-4 text-sm">
                    <CustomForm fields={formFields} />
                </div>
                <SheetFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
                    <Button className="w-full">Save</Button>
                    <SheetClose asChild>
                        <Button variant="outline" className="w-full">
                            Close
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default CustomSheet;
