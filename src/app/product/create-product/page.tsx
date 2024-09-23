'use client'

import { MarkdownEditor } from '@/components/common/MarkdownEditor'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TCategory, TProductCategory } from '@/interface/category'
import { TProduct, TProductAttribute } from '@/interface/product.interface'
import { useGetAllCategoriesQuery } from '@/redux/api/categories'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setCreateProductStep, setSelectedCategoryName, updateProduct } from '@/redux/products/productSlice'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const CreateProduct = () => {

    const { data: categoryData, error: cateoryError, isLoading: categoryLoading } = useGetAllCategoriesQuery(false)
    const dispatch = useAppDispatch()
    const { product, selectedCategoryName, step } = useAppSelector(state => state.products)
    const searchParams = useSearchParams()

    const { attributes, description } = product

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


    useEffect(() => {

        const step = searchParams.get('step')

        if (step) {
            dispatch(setCreateProductStep(parseInt(step)))
        }
        else {
            dispatch(setCreateProductStep(1))
        }
    }, [searchParams])


    const handleChange = <K extends keyof TProduct>(key: K, value: TProduct[K]) => {
        dispatch(updateProduct({ key, value }))
    }


    console.log(product)


    return (
        <div>
            <div className="flex justify-between items-center pb-4">
                <h4 className="page-title">Create Product</h4>
            </div>



            {
                step === 1 && <div>
                    <h2 className='text-black font-semibold text-lg pb-5'>General Information</h2>
                    <div className='grid grid-cols-2 gap-x-10 gap-y-4'>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm'>Name *</label>
                            <Input onChange={(e) => handleChange('name', e.target.value)} className='bg-background-foreground' placeholder='Enter Product Name' />
                        </div>


                        <div className='flex flex-col gap-2'>
                            <label className='text-sm'>Brand *</label>
                            <Input onChange={(e) => handleChange('brand', e.target.value)} className='bg-background-foreground' placeholder='Enter Brand Name' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm'>Model *</label>
                            <Input onChange={(e) => handleChange('brand', e.target.value)} className='bg-background-foreground' placeholder='Enter Brand Name' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm'>Warranty *</label>
                            <Input onChange={(e) => handleChange('warranty', e.target.value)} className='bg-background-foreground' placeholder='Enter product name' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm'>Price *</label>
                            <Input type='number' onChange={(e) => handleChange('price', parseInt(e.target.value))} className='bg-background-foreground' placeholder='Enter Price' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm'>Stock *</label>
                            <Input type='number' onChange={(e) => handleChange('quantity', parseInt(e.target.value))} className='bg-background-foreground' placeholder='Enter stock' />
                        </div>


                        <div className='flex flex-col gap-2 col-span-2'>
                            <label className='text-sm'>Key Features *</label>
                            <MarkdownEditor markdown={description} onChange={(val) => handleChange('key_features', val)} />
                        </div>



                    </div>
                </div>
            }


            {/* ===============step 2 attributes====================== */}
            {
                step === 2 && <div className='flex flex-col gap-6 w-1/2'>
                    {
                        !categoryLoading && !cateoryError && <div className='text-gray flex flex-col gap-2'>
                            <label className='text-black font-semibold text-lg'>Select Category *</label>
                            <Select value={selectedCategoryName} onValueChange={(val: string) => dispatch(setSelectedCategoryName(val))}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        categoryData.data.map((cat: TCategory) => <SelectItem className='text-gray' value={cat.name} key={cat._id}>{cat.name}</SelectItem>)
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
            }




        </div>
    )
}

export default CreateProduct