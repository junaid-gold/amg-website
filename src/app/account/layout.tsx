import FooterComponent from '@/components/common/footer.component'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            {children}
            <FooterComponent />
        </div>
    )
}

export default layout