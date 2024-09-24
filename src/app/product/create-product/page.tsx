'use client'

import { MarkdownEditor } from '@/components/common/MarkdownEditor'
import ImageGallery from '@/components/product/ImageGallery'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TCategory, TProductCategory } from '@/interface/category'
import { TProduct, TProductAttribute } from '@/interface/product.interface'
import { useGetAllCategoriesQuery } from '@/redux/api/categories'
import { useUploadImageMutation } from '@/redux/api/uploadFiles'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setCreateProductStep, setSelectedCategoryName, updateProduct } from '@/redux/products/productSlice'
import { useSearchParams } from 'next/navigation'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { AiOutlineCloudUpload, AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from 'sonner'

const CreateProduct = () => {

    const { data: categoryData, error: cateoryError, isLoading: categoryLoading } = useGetAllCategoriesQuery(false)
    const dispatch = useAppDispatch()
    const { product, selectedCategoryName, step } = useAppSelector(state => state.products)
    const searchParams = useSearchParams()
    const [uploadImage, { isLoading: isUploadLoading }] = useUploadImageMutation()
    const uploadImageRef = useRef<HTMLInputElement | null>(null)
    const [galleryOpen, setGalleryOpen] = useState(false)
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])


    const handleChange = <K extends keyof TProduct>(key: K, value: TProduct[K]) => {
        dispatch(updateProduct({ key, value }))
    }


    const handleUploadClick = () => {
        if (uploadImageRef && uploadImageRef.current) {
            uploadImageRef.current.click()
        }
    }


    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const formData = new FormData();
            Array.from(e.target.files).forEach((file) => {
                formData.append('photos', file);
            });

            formData.append('type', 'product');

            try {
                const res = await uploadImage(formData).unwrap()
                console.log(res)
                toast.success(res.message)
                setGalleryOpen(true)
            } catch (err) {
                console.error('Error uploading images:', err); // Handle the error
            }
        }
    };

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

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm'>Key Features *</label>
                            <MarkdownEditor markdown={description} onChange={(val) => handleChange('key_features', val)} />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-sm'>Gallery *</label>
                            <div className='flex gap-2 justify-center h-full'>
                                <div onClick={handleUploadClick} className='border-2 cursor-pointer flex-1 border-dashed w-full h-full rounded-md border-lavender-mist bg-background text-8xl flex flex-col justify-center items-center'>
                                    {
                                        isUploadLoading ? <div className='flex flex-col gap-2 justify-center items-center'>
                                            <AiOutlineLoading3Quarters className='animate-spin text-primary text-6xl' />
                                            <p className='text-base'>uploading, please wait</p>
                                        </div> : <>
                                            <AiOutlineCloudUpload className='text-lavender-mist' />
                                            <h3 className='text-base'><span className='text-primary'>Click</span> or drag and drop here</h3>
                                            <input name='photos' onChange={handleImageUpload} ref={uploadImageRef} type="file" className='hidden' multiple accept='image/*' />
                                        </>
                                    }
                                </div>
                                <div className='flex-1 flex flex-col items-center justify-center h-full border-2 border-border-color rounded-md bg-background-foreground'>
                                    <Button onClick={() => setGalleryOpen(true)}>Select From Gallery</Button>
                                </div>
                            </div>
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


            <ImageGallery open={galleryOpen} setOpen={setGalleryOpen} />

        </div>
    )
}

export default CreateProduct