import React from 'react'
import { Skeleton } from '../ui/skeleton'

const CategorySkeleton = () => {
    return (
        <div className='flex flex-col gap-3'>
            {
                Array.from({ length: 10 }, (_, i) => <Skeleton key={i} className='bg-background-foreground h-11' />)
            }
        </div>
    )
}

export default CategorySkeleton