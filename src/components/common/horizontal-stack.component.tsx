import React from 'react';

const HStackComponent = ({children, className}: {children: React.ReactNode, className?: string}) => {
    return (
        <div className={`flex gap-4 flex-col items-center justify-center w-full lg:flex-row ${className ? className : ""}`}>
            {children}
        </div>
    );
};

export default HStackComponent;
