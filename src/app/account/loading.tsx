import BlackAnimation from '@/components/black-animation'
import React from 'react'

const loading = () => {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-536px)]">
            <BlackAnimation />
        </div>
    )
}

export default loading