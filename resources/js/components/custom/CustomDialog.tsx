import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';
import { Button } from '../ui/button';

interface CustomDialogProps {
    title: string;
    subtitle?: string;
    buttonName: string
    children: React.ReactNode;
    trigger: React.ReactNode;
}

const CustomDialog = ({ title, subtitle, children, trigger, buttonName }: CustomDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="flex-row items-center justify-start rounded-t-md bg-s3 p-2 -m-6.5">
                    <DialogTitle className="text-lg font-semibold text-white pl-4">{title}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3 mt-4">
                    <h1 className='font-medium'>{subtitle}</h1>
                    {children}
                </div>
                <DialogFooter>
                    <Button variant="primary">{buttonName}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default CustomDialog;
