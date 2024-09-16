'use client'
import { TCategory } from '@/interface/category'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const DetailsCategoryInfo = () => {

    const [data, setData] = useState([])

    const fetchProductCategories = () => {
        axios.get(`${process.env.NEXT_PUBLIC_URL}/product-details-category/get-all`)
            .then(res => {
                console.log(res)
                setData(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchProductCategories()
    }, [])

    return (
        <div className='grid grid-cols-4 gap-4'>
            {
                data.length !== 0 && data?.map((cat: TCategory) => <div className='bg-light-gray p-4 rounded-md' key={cat._id}>
                    <h3 className='text-black text-lg font-semibold'>{cat.name}</h3>
                    <div className='flex flex-col gap-2 pt-3'>
                        {
                            cat.fields?.map(field => <div className='text-gray bg-white px-3 py-[6px] rounded-[5px]' key={field}>{field}</div>)
                        }
                    </div>
                </div>)
            }
        </div>

    )
}

export default DetailsCategoryInfo