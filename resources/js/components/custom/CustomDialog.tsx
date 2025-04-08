import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { HtmlHTMLAttributes } from 'react';

interface CustomDialogProps {
    title: string;
    subtitle?: string;
    button?: React.ReactNode;
    children: React.ReactNode;
    trigger: React.ReactNode;
    width?: string;
    height?: string;
    contentClassName?: string
    subTitleClassName?: string
}

const CustomDialog = ({ title, subtitle, children, trigger, button, width = 'w-5xl', contentClassName, subTitleClassName, height = 'max-h-130' }: CustomDialogProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className={`${width}`}>
                <DialogHeader className="flex-row items-center justify-start rounded-t-md bg-s3 p-2 -m-6.5">
                    <DialogTitle className=" text-white pl-4">{title}</DialogTitle>
                </DialogHeader>
                <div className={`scroll-invisible overflow-y-auto ${height} ${contentClassName}`}>
                    <h1 className={subTitleClassName}>{subtitle}</h1>
                    {children}
                </div>
                <DialogFooter className='w-full'>
                    {button}
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
};

export default CustomDialog;
