'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setCreateProductStep } from '@/redux/products/productSlice'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import AddBasicData from '@/components/product/createProduct/AddBasicData';
import AddSpecifications from '@/components/product/createProduct/AddSpecifications'


const CreateProduct = () => {


    const dispatch = useAppDispatch()
    const { step } = useAppSelector(state => state.products)
    const searchParams = useSearchParams()

    useEffect(() => {
        const step = searchParams.get('step') || ""

        if (step) {
            dispatch(setCreateProductStep(parseInt(step)))
        }
        else {
            dispatch(setCreateProductStep(1))
        }
    }, [searchParams, dispatch])



    return (
        <>
            {
                searchParams && <div>
                    <div className="flex justify-between items-center pb-4">
                        <h4 className="page-title">Create Product</h4>
                    </div>

                    {
                        step === 1 && <AddBasicData />
                    }

                    {/* ===============step 2 specification====================== */}
                    {
                        step === 2 && <AddSpecifications />
                    }

                </div>
            }
        </>
    )
}

export default CreateProduct