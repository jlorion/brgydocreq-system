import { LucideIcon } from 'lucide-react';

interface CustomIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    icon?: LucideIcon | null;
    imgSrc?: string;
    className?: string;
    title?: string;
    content?: string;
}

import React from 'react'

const CustomIcon = ({ icon: IconComponent, className, imgSrc, title, content, ...props }: CustomIconProps) => {
    if (IconComponent) {
        return <IconComponent className={className} />;
    }

    if (imgSrc) {
        if (!title || !content) {
            return <img src={imgSrc} className={className} {...props} />;
        }
        return (
            <>
                <div className="flex h-14 gap-x-4">
                    <img src={imgSrc} className={className} {...props} />
                    <div className="flex flex-col items-start justify-evenly">
                        <h1 className="font-lg font-bold text-black">{title}</h1>
                        <p className="font-light text-black">{content}</p>
                    </div>
                </div>
            </>
        );
    }

    return null;
}

export default CustomIcon
