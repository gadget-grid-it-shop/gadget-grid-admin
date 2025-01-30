'use client';

import { MarkdownEditor } from '@/components/common/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateProduct } from '@/redux/reducers/products/productSlice';
import React, { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Image from 'next/image';
import ImageGallery from '../ImageGallery';
import { useGetAllCategoriesQuery } from '@/redux/api/categories';
import TreeDropdown from '@/components/custom/TreeDropdown';
import Select from '@/components/ui/select';
import { useGetAllBrandsQuery } from '@/redux/api/brandApi';
import { TSelectOptions } from '@/components/categories/interface';
import { TBrand } from '@/interface/brand.interface';
import { Checkbox } from '@/components/ui/checkbox';
import { MDXEditorMethods } from '@mdxeditor/editor';
import { cn, handleProductChange, isValidUrl } from '@/lib/utils';
import MultipleSelector, { Option } from '@/components/ui/multiselect';
import {
    TCreateProductFilter,
    useGetAllProductFiltersQuery,
} from '@/redux/api/filtersApi';
import { TProductFilter } from '@/interface/product.interface';
import { generateCategoryTree } from '@/components/utilities/category/categoryUtils';

const AddBasicData = ({ edit }: { edit: boolean }) => {
    const dispatch = useAppDispatch();
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [thumbOpen, setThumbOpen] = useState(false);
    const { product, editProduct } = useAppSelector((state) => state.products);
    const { data: categoryData } = useGetAllCategoriesQuery(undefined);
    const { data: brandData } = useGetAllBrandsQuery(undefined);
    const keyFeaturesRef = useRef<MDXEditorMethods>(null);

    const {
        gallery,
        key_features,
        name,
        brand,
        model,
        warranty,
        price,
        quantity,
        category,
        shipping,
        thumbnail,
        filters,
        sku,
    } = edit ? editProduct : product;

    const { data: filtersData } = useGetAllProductFiltersQuery(undefined);

    const handleRemoveFromGallery = (img: string) => {
        const filteredGallery = gallery?.filter((image) => image !== img) || [];

        dispatch(updateProduct({ key: 'gallery', value: filteredGallery }));
    };
    const [selectedFilters, setSelectedFilters] = useState<Option[]>([]);

    const brandDropdownData: TSelectOptions[] = brandData?.data?.map(
        (brand: TBrand) => {
            return {
                label: brand.name,
                value: brand._id,
            };
        },
    );

    const filtersDropdownData: Option[] = filtersData?.data?.map(
        (filter: TCreateProductFilter) => {
            return {
                label: filter.title,
                value: filter?._id,
            };
        },
    );

    useEffect(() => {
        if (keyFeaturesRef.current && key_features === '') {
            keyFeaturesRef.current.setMarkdown('');
        }
    }, [key_features]);

    const handleKeyFeatureChange = () => {
        const val: string = keyFeaturesRef.current
            ? keyFeaturesRef.current.getMarkdown()
            : '';
        handleProductChange('key_features', val, edit);
    };

    const handleFilterSelect = (val: Option[]) => {
        setSelectedFilters(val);
    };

    const handleFilterChange = (
        value: string | null,
        filter: string,
        key: string,
    ) => {
        const exist = filters?.find((f) => f.filter === filter);

        let newfilters: TProductFilter[] = [...(filters || [])];

        if (!exist) {
            newfilters.push({
                filter,
                key,
                value: value || '',
            });
        }

        newfilters =
            (newfilters?.map((f) => {
                if (f.filter === filter) {
                    return {
                        ...f,
                        value,
                    };
                } else {
                    return f;
                }
            }) as TProductFilter[]) || [];

        handleProductChange('filters', newfilters, edit);
    };

    const treeCategory = generateCategoryTree(categoryData?.data || []);

    return (
        <>
            <h2 className='pb-5 text-lg font-semibold text-black'>
                General Information
            </h2>

            <div className='flex w-full grid-rows-1 flex-col gap-x-4'>
                <div className='mb-3 flex flex-col gap-2'>
                    <label className='text-sm'>Name *</label>
                    <Input
                        value={name}
                        onChange={(e) =>
                            handleProductChange('name', e.target.value, edit)
                        }
                        className='bg-background-foreground'
                        placeholder='Enter Product Name'
                    />
                </div>

                <div className='mb-3 flex flex-col gap-2'>
                    <label className='text-sm'>Category *</label>
                    <TreeDropdown
                        value={category}
                        categories={treeCategory}
                        onSelect={(val) =>
                            handleProductChange('category', val, edit)
                        }
                    />
                </div>

                <div className='mb-3 flex flex-col gap-2'>
                    <label className='text-sm'>Brand *</label>
                    <Select
                        value={brand as string}
                        onChange={(val) =>
                            handleProductChange('brand', val as string, edit)
                        }
                        data={brandDropdownData}
                        placeholder='Select brand'
                    />
                </div>
                <div className='mb-3 flex flex-col gap-2'>
                    <label className='text-sm'>Model *</label>
                    <Input
                        value={model}
                        onChange={(e) =>
                            handleProductChange('model', e.target.value, edit)
                        }
                        className={`bg-background-foreground`}
                        placeholder='Enter Brand Name'
                    />
                </div>

                <div className='mb-3 flex flex-col gap-2'>
                    <label className='text-sm'>SKU *</label>
                    <Input
                        value={sku}
                        type='text'
                        onChange={(e) =>
                            handleProductChange('sku', e.target.value, edit)
                        }
                        className='bg-background-foreground'
                        placeholder='Enter product SKU'
                    />
                </div>

                {/* ===================filters=================== */}

                <div className='mb-3 flex flex-col gap-2'>
                    <label className='text-sm'>Filters</label>
                    <MultipleSelector
                        className='bg-background-foreground'
                        value={selectedFilters}
                        onChange={handleFilterSelect}
                        placeholder='Select filters'
                        options={filtersDropdownData}
                    />
                </div>

                {selectedFilters.map((s) => {
                    const options: TSelectOptions[] =
                        (filtersData?.data as TCreateProductFilter[])
                            ?.find((f) => f._id === s.value)
                            ?.options.map((op) => ({ label: op, value: op })) ||
                        [];

                    return (
                        <div key={s.value} className='mb-3 flex flex-col gap-2'>
                            <label className='text-sm'>{s.label} *</label>
                            <Select
                                value={
                                    filters?.find((f) => s.value === f.filter)
                                        ?.value
                                }
                                onChange={(val) =>
                                    handleFilterChange(
                                        val as string,
                                        s.value,
                                        s.label,
                                    )
                                }
                                data={options}
                                placeholder={`Select ${s.label}`}
                            />
                        </div>
                    );
                })}

                <div className='grid gap-x-4 lg:grid-cols-2'>
                    <div className='mb-3 flex flex-col gap-2'>
                        <label className='text-sm'>Thumbnail *</label>
                        <div
                            className={cn(
                                `flex h-full min-h-52 flex-col items-center justify-center gap-2 rounded-md p-3`,
                                `${thumbnail ? 'bg-lavender-mist' : 'bg-background-foreground'}`,
                            )}
                        >
                            <div className='grid w-full gap-2 p-3'>
                                <div className='relative flex h-full max-h-32 items-center justify-center'>
                                    {!isValidUrl(thumbnail) && (
                                        <Button
                                            className='w-fit'
                                            onClick={() => setThumbOpen(true)}
                                        >
                                            Select thumbnail
                                        </Button>
                                    )}
                                    {isValidUrl(thumbnail) && (
                                        <div className='relative'>
                                            <div
                                                onClick={() =>
                                                    handleProductChange(
                                                        'thumbnail',
                                                        '',
                                                        edit,
                                                    )
                                                }
                                                className='absolute left-2 top-2 z-40 cursor-pointer bg-lavender-mist text-red'
                                            >
                                                <IoMdClose />
                                            </div>
                                            <Image
                                                src={thumbnail}
                                                height={200}
                                                width={200}
                                                alt='gallery img'
                                                className='h-full object-cover'
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mb-3 flex flex-col gap-2'>
                        <label className='text-sm'>Gallery *</label>
                        <div
                            className={cn(
                                `flex h-full min-h-52 flex-col items-center gap-2 rounded-md bg-background-foreground p-3 ${gallery?.length === 0 && 'justify-center'}`,
                                `${gallery?.length !== 0 ? 'bg-lavender-mist' : 'bg-background-foreground'}`,
                            )}
                        >
                            {gallery && gallery?.length <= 5 && (
                                <Button
                                    className='w-fit'
                                    onClick={() => setGalleryOpen(true)}
                                >
                                    Select From Gallery
                                </Button>
                            )}
                            <div className='grid w-full grid-cols-5 gap-2 p-3'>
                                {gallery?.map((img: string) => {
                                    return (
                                        <div
                                            key={img}
                                            className='relative max-h-32'
                                        >
                                            <div
                                                onClick={() =>
                                                    handleRemoveFromGallery(img)
                                                }
                                                className='absolute left-2 top-2 z-40 cursor-pointer bg-lavender-mist text-red'
                                            >
                                                <IoMdClose />
                                            </div>
                                            <Image
                                                src={img}
                                                height={200}
                                                width={200}
                                                alt='gallery img'
                                                className='h-full w-full object-cover'
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mb-3 flex w-full flex-col gap-2'>
                    <label className='text-sm'>Key Features *</label>
                    <MarkdownEditor
                        ref={keyFeaturesRef}
                        className='h-56 overflow-y-auto overflow-x-hidden scrollbar-thin'
                        markdown={key_features}
                        onChange={handleKeyFeatureChange}
                    />
                </div>
            </div>

            <h2 className='py-5 text-lg font-semibold text-black'>
                Product price and stock
            </h2>
            <div className='flex w-full flex-col gap-x-4'>
                <div className='mb-3 flex flex-col gap-2'>
                    <label className='text-sm'>Price *</label>
                    <Input
                        value={price}
                        type='number'
                        onChange={(e) => {
                            const value = e.target.value;
                            const price =
                                value === '' ? 0 : Math.ceil(Number(value));
                            handleProductChange('price', Number(price), edit);
                        }}
                        className='bg-background-foreground'
                        placeholder='Enter Price'
                    />
                </div>

                <div className='mb-3 flex flex-col gap-2'>
                    <label className='text-sm'>Stock *</label>
                    <Input
                        value={quantity}
                        type='number'
                        onChange={(e) =>
                            handleProductChange(
                                'quantity',
                                parseInt(e.target.value),
                                edit,
                            )
                        }
                        className='bg-background-foreground'
                        placeholder='Enter stock'
                    />
                </div>

                <div className='mb-3 flex flex-col gap-2'>
                    <div className='flex items-center justify-between text-sm'>
                        <p> Shipping *</p>
                        <div className='flex items-center gap-2 text-gray'>
                            <Checkbox
                                checked={shipping?.free}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleProductChange(
                                        'shipping',
                                        {
                                            cost: 0,
                                            free: !shipping.free,
                                        },
                                        edit,
                                    );
                                }}
                            />
                            free
                        </div>
                    </div>

                    <Input
                        value={shipping?.cost || ''}
                        type='number'
                        min={0}
                        onChange={(e) => {
                            const value = e.target.value;
                            const cost =
                                value === '' ? 0 : Math.ceil(Number(value)); // Prevent leading 0
                            handleProductChange(
                                'shipping',
                                {
                                    cost,
                                    free: false,
                                },
                                edit,
                            );
                        }}
                        className='bg-background-foreground'
                        placeholder='Enter warranty'
                    />
                </div>
                <div className='mb-3 flex flex-col gap-2'>
                    <div className='flex items-center justify-between text-sm'>
                        <p> Warranty (days) *</p>
                        <div className='flex items-center gap-2 text-gray'>
                            <Checkbox
                                checked={warranty.lifetime}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleProductChange(
                                        'warranty',
                                        {
                                            days: 0,
                                            lifetime: !warranty.lifetime,
                                        },
                                        edit,
                                    );
                                }}
                            />
                            lifetime
                        </div>
                    </div>

                    <Input
                        value={warranty.days || ''}
                        type='number'
                        min={0}
                        onChange={(e) => {
                            const value = e.target.value;
                            const days =
                                value === '' ? 0 : Math.ceil(Number(value)); // Prevent leading 0
                            handleProductChange(
                                'warranty',
                                {
                                    days,
                                    lifetime: false,
                                },
                                edit,
                            );
                        }}
                        className='bg-background-foreground'
                        placeholder='Enter warranty'
                    />
                </div>
            </div>

            <ImageGallery
                open={thumbOpen}
                multiselect={false}
                setOpen={setThumbOpen}
                onChange={(val) =>
                    handleProductChange('thumbnail', val as string, edit)
                }
            />
            <ImageGallery
                open={galleryOpen}
                multiselect={true}
                setOpen={setGalleryOpen}
                onChange={(val) =>
                    handleProductChange('gallery', val as string[], edit)
                }
            />
        </>
    );
};

export default React.memo(AddBasicData);
