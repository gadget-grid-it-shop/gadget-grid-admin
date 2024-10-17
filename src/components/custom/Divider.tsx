import { cn } from '@/lib/utils'
import React from 'react'

const Divider = ({ text, className }: { text?: string, className?: string }) => {
    return (
        <div className={cn('min-h-4 flex items-center my-2', className)}>
            <div className='relative h-[1px] bg-border-color w-full'>
                {text && <p className='absolute -top-[.8rem] left-1/2 -translate-x-1/2'>{text}</p>}
            </div>
        </div>
    )
}

export default Divider