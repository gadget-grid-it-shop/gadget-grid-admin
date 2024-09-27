'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TCategory, TProductCategory } from '@/interface/category'
import { TProductAttribute } from '@/interface/product.interface'
import { useGetAllCategoriesQuery } from '@/redux/api/categories'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setSelectedCategoryName, updateProduct } from '@/redux/products/productSlice'
import React, { useEffect } from 'react'

const AddSpecifications = () => {

    const { data: categoryData, error: cateoryError, isLoading: categoryLoading } = useGetAllCategoriesQuery(false)
    const { product, selectedCategoryName } = useAppSelector(state => state.products)
    const { attributes } = product
    const dispatch = useAppDispatch()

    useEffect(() => {

        if (selectedCategoryName) {
            const category: TCategory = categoryData.data.find((cat: TCategory) => cat.name === selectedCategoryName)
            if (category) {
                const attributes = category.product_details_categories.map((item: TProductCategory) => {
                    return {
                        name: item.name,
                        fields: item.fields.map((field: string) => {
                            return {
                                [field]: ""
                            }
                        })
                    }
                })
                dispatch(updateProduct({ key: 'attributes', value: attributes }))
            }
        }

        else {
            dispatch(updateProduct({ key: 'attributes', value: [] }))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategoryName])

    return (
        <div className='flex flex-col gap-6 w-1/2'>
            {
                !categoryLoading && !cateoryError && <div className='text-gray flex flex-col gap-2'>
                    <label className='text-black font-semibold text-lg'>Select Category *</label>
                    <Select value={selectedCategoryName} onValueChange={(val: string) => dispatch(setSelectedCategoryName(val))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                categoryData?.data?.map((cat: TCategory) => <SelectItem className='text-gray' value={cat.name} key={cat._id}>{cat.name}</SelectItem>)
                            }
                        </SelectContent>
                    </Select>
                </div>
            }


            {
                attributes && attributes.length !== 0 && <div>
                    <label className='text-black font-semibold text-lg'>Attributes *</label>
                    <p className='text-gray text-sm pb-5'>Please fill up all the attribute informations</p>
                    <div className='flex flex-col gap-3'>
                        {
                            attributes.map((attr: TProductAttribute) => <div key={attr.name}>
                                <h1 className='text-black font-semibold text-md'>{attr.name} *</h1>
                                {
                                    attr.fields.map((field: Record<string, string>, i) => <div key={i} className='grid my-2 ps-3 border border-border-color grid-cols-8 gap-3 items-center'>
                                        <label className='text-gray text-sm col-span-2 font-semibold'>{Object.entries(field)[0]}</label>
                                        <Input placeholder={`Enter ${Object.entries(field)[0]}`} className='bg-background-foreground rounded-none col-span-6' />
                                    </div>)
                                }
                            </div>)
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default AddSpecifications