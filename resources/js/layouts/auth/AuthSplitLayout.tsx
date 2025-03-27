import CustomIcon from '@/components/custom/CustomIcon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
    image?: string;
}

export default function AuthSplitLayout({ children, title, image, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="grid h-dvh flex-col items-center justify-center overflow-hidden px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="bg-shamrock-green hidden h-full p-24 lg:flex dark:border-r">
                <CustomIcon imgSrc={image} />
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-3/5">
                    <Link className="z-20 flex items-center justify-center lg:hidden">
                        <CustomIcon className="h-10 fill-current text-black sm:h-12" />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-s3 text-4xl font-semibold">{title}</h1>
                        <p className="text-muted-foreground text-sm text-balance">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
