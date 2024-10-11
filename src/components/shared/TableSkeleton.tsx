import React from 'react'
import { Skeleton } from '../ui/skeleton'

const TableSkeleton = () => {
    return (
        <div className='flex flex-col gap-2'>
            <Skeleton className='bg-lavender-mist h-12 w-full' />

            {
                Array.from({ length: 10 }, (item: unknown, i: number) => {
                    return <Skeleton key={i} className='h-14 bg-background-foreground' />
                })
            }
        </div>
    )
}

export default TableSkeleton