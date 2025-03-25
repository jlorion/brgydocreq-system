import React from 'react';

interface MainLayoutProps {
    children: React.ReactNode;
    
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <>
            <div className=" box-border h-screen w-full p-4 bg-gray-100">{children}</div>
        </>
    );
};

export default MainLayout;
