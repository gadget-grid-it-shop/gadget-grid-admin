import Image from 'next/image'
import React from 'react'

const MainLayout = ({ children }) => {
    return (
        <div className='flex bg-light-gray'>
            <div className='h-screen overflow-y-auto bg-primary p-4 w-[320px] shadow-md'>
                <Image src={'/gadget-grid-logo.png'} height={100} width={200} alt='logo' />
            </div>
            <div className='min-h-screen w-full'>
                <nav className='bg-white shadow-md h-16 mb-3'>
                </nav>
                <div className='px-8'>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MainLayout