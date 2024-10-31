import React from 'react';

const VStackComponent = ({children, className}: {children: React.ReactNode, className?: string}) => {
    return (
        <div className={`flex gap-4 items-center justify-center w-full flex-col ${className ? className : ""}`}>
            {children}
        </div>
    );
};

export default VStackComponent;
