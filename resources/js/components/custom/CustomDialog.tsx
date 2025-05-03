import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CustomFormField } from '@/types';
import React, { useState } from 'react';
import { Toaster } from 'sonner';

interface CustomDialogProps {
    title: string;
    subtitle?: string;
    button?: React.ReactNode;
    children: React.ReactNode;
    trigger: React.ReactNode;
    width?: string;
    height?: string;
    subTitleClassName?: string
    onSubmit?: React.FormEventHandler<HTMLFormElement>;
    fields?: CustomFormField
    classname?: string
    toaster?: boolean;
    autoCloseOnSubmit?: boolean;

}

const CustomDialog = ({
    title,
    subtitle,
    children,
    trigger,
    button,
    width = 'w-5xl',
    subTitleClassName,
    height = 'max-h-130',
    onSubmit,
    classname,
    toaster = false,
    autoCloseOnSubmit = false
}: CustomDialogProps) => {

    const [open, setOpen] = useState(false);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        if (onSubmit) {
            onSubmit(e); // Call the provided onSubmit handler
        }
        if (autoCloseOnSubmit) {
            setOpen(false); // Close the dialog if autoCloseOnSubmit is true
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className={`${width}`}>
                <DialogHeader className="bg-s3 -m-6.5 flex-row items-center justify-start rounded-t-md p-2">
                    <DialogTitle className="pl-4 text-white">{title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-7">
                    <div className={`scroll-invisible mt-4 flex flex-col gap-3 overflow-y-auto ${height} ${classname}`}>
                        <h1 className={subTitleClassName}>{subtitle}</h1>
                        {children}
                    </div>
                    {button ? (
                        <DialogFooter>{button}</DialogFooter>
                    ) : null}
                </form>
                {toaster ? (
                    <Toaster richColors position='bottom-left' />
                ) : null}
            </DialogContent>
        </Dialog>
    );
};

export default CustomDialog;
