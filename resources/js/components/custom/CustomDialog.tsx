import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

interface CustomDialogProps {
    title: string;
    description: string;
    children: React.ReactNode;
    trigger: React.ReactNode;
}

const CustomDialog = ({ title, description, children, trigger }: CustomDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className="fixed top-1/2 left-1/2 max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white shadow-lg focus:outline-none">
                <DialogHeader className="flex items-center justify-between rounded-t-md bg-[#237D31] p-2">
                    <DialogTitle className="text-lg font-semibold text-white">{title}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <Label className="text-md">{description}</Label>
                    {children}
                </div>
                <div className="flex w-full justify-end p-4">
                    <Button variant="primary">Submit</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CustomDialog;
