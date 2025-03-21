import { LucideIcon } from 'lucide-react';

interface IconProps {
    icon?: LucideIcon | null;
    imgSrc?: string;
    className?: string;
    title?: string;
    content?: string;
}

export function Icon({ icon: IconComponent, className, imgSrc, title, content, ...props }: IconProps) {
    if (IconComponent) {
        return <IconComponent className={className} {...props} />;
    }

    if (imgSrc) {
        return (
            <>
                <div className="flex justify-between gap-x-4 h-14">
                    <img src={imgSrc} className={className} {...props} />
                    <div className="flex flex-col items-start justify-evenly">
                        <h1 className="font-bold font-lg text-black">{title}</h1>
                        <p className="font-light text-black">{content}</p>
                    </div>
                </div>
            </>
        );
    }

    return null;
}
