import React from 'react'
import { Skeleton } from '../ui/skeleton'

const DetailsCategorySkeleton = () => {
    return (
        <div className='bg-background-foreground flex flex-col gap-2 p-4'>
            <Skeleton className='h-8 mb-3' />
            <Skeleton className='h-9' />
            <Skeleton className='h-9' />
            <Skeleton className='h-9' />
            <Skeleton className='h-9' />
            <Skeleton className='h-9' />
            <Skeleton className='h-9' />
            <div className='flex gap-3 mt-3'>
                <Skeleton className='h-10 w-10' />
                <Skeleton className='h-10 w-10' />
            </div>
        </div>
    )
}

export default DetailsCategorySkeleton