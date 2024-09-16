'use client'
import React from 'react'
import { FaPlus } from "react-icons/fa6";


const DetailsCategory = () => {



    return (
        <>
            <div className='pt-4'>
                <div className='flex justify-between items-center'>
                    <h4 className="text-black page-title">Product Details Category </h4>
                    <button className='primary-btn'> <FaPlus /> Create Details Category</button>
                </div>

                {/* <DetailsCategoryInfo /> */}
            </div>

        </>
    )
}

export default DetailsCategory