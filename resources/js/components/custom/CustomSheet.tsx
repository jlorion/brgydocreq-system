import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { getStatusColors } from '@/lib/utils';

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
    onSubmit?: React.FormEventHandler<HTMLFormElement>
}

const CustomSheet = ({
    trigger,
    plainTitle,
    statusTitle,
    form,
    firstButton,
    secondButton,
    onSubmit
}: CustomSheetProps) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{trigger}</SheetTrigger>
            <SheetContent side="right" className="flex w-120 flex-col p-4">
                <form onSubmit={onSubmit} className='flex flex-col h-full'>
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
                    <div className="flex flex-col overflow-y-auto ">{form}</div>
                    <SheetFooter className="mt-auto flex gap-x-3 flex-row">
                        {firstButton}
                        {secondButton}
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default CustomSheet;
