'use client';

import { MarkdownEditor } from '@/components/common/MarkdownEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TProduct } from '@/interface/product.interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateProduct } from '@/redux/reducers/products/productSlice';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
// import debounce from 'lodash.debounce';

const AddBasicData = () => {
  const dispatch = useAppDispatch();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const { product } = useAppSelector((state) => state.products);
  const { data: categoryData } = useGetAllCategoriesQuery(true);
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
    sku,
  } = product;

  // const handleMarkdownChange = useCallback(
  //   debounce(<K extends keyof TProduct>(
  //     key: K,
  //     value: TProduct[K],
  //   ) => {
  //     dispatch(updateProduct({ key, value }));
  //   },
  //     300),
  //   [])

  const handleChange = useCallback(
    <K extends keyof TProduct>(key: K, value: TProduct[K]) => {
      dispatch(updateProduct({ key, value }));
    },
    [dispatch],
  );

  const handleRemoveFromGallery = (img: string) => {
    const filteredGallery = gallery?.filter((image) => image !== img) || [];

    dispatch(updateProduct({ key: 'gallery', value: filteredGallery }));
  };

  const brandDropdownData: TSelectOptions[] = brandData?.data?.map(
    (brand: TBrand) => {
      return {
        label: brand.name,
        value: brand._id,
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
    handleChange('key_features', val);
  };

  return (
    <>
      <h2 className="pb-5 text-lg font-semibold text-black">
        General Information
      </h2>
      <div className="grid w-full gap-x-4 lg:grid-cols-2">
        <div className="mb-3 flex flex-col gap-2">
          <label className="text-sm">Name *</label>
          <Input
            value={name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="bg-background-foreground"
            placeholder="Enter Product Name"
          />
        </div>

        {/* <div className="flex flex-col gap-2">
          <label className="text-sm">Category *</label>
          <Select
            data={categorySelectData}
            onChange={(value) => handleChange('category', value as string)}
            placeholder="Select category"
            value={category}
          />
        </div> */}

        <div className="mb-3 flex flex-col gap-2">
          <label className="text-sm">Category *</label>
          <TreeDropdown
            value={category}
            categories={categoryData?.data}
            onSelect={(val) => handleChange('category', val)}
          />
        </div>

        <div className="mb-3 flex flex-col gap-2">
          <label className="text-sm">Brand *</label>
          <Select
            value={brand}
            onChange={(val) => handleChange('brand', val as string)}
            data={brandDropdownData}
            placeholder="Select brand"
          />
          {/* <Input
            value={brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            className="bg-background-foreground"
            placeholder="Enter Brand Name"
          /> */}
        </div>
        <div className="mb-3 flex flex-col gap-2">
          <label className="text-sm">Model *</label>
          <Input
            value={model}
            onChange={(e) => handleChange('model', e.target.value)}
            className={`bg-background-foreground`}
            placeholder="Enter Brand Name"
          />
        </div>

        <div className="mb-3 flex flex-col gap-2">
          <label className="flex items-center justify-between text-sm">
            Warranty (days) *
            <div className="flex items-center gap-2">
              <Checkbox
                checked={warranty.lifetime}
                onClick={() =>
                  handleChange('warranty', {
                    days: 0,
                    lifetime: !warranty.lifetime,
                  })
                }
              />{' '}
              lifetime
            </div>
          </label>

          <Input
            value={warranty.days || ''}
            type="number"
            min={0}
            onChange={(e) => {
              const value = e.target.value;
              const days = value === '' ? 0 : Math.ceil(Number(value)); // Prevent leading 0
              handleChange('warranty', { days, lifetime: false });
            }}
            className="bg-background-foreground"
            placeholder="Enter warranty"
          />
        </div>

        <div className="mb-3 flex flex-col gap-2">
          <label className="text-sm">Price *</label>
          <Input
            value={price}
            type="number"
            onChange={(e) => {
              const value = e.target.value;
              const price = value === '' ? 0 : Math.ceil(Number(value));
              handleChange('price', Number(price));
            }}
            className="bg-background-foreground"
            placeholder="Enter Price"
          />
        </div>

        <div className="mb-3 flex flex-col gap-2">
          <label className="text-sm">Stock *</label>
          <Input
            value={quantity}
            type="number"
            onChange={(e) => handleChange('quantity', parseInt(e.target.value))}
            className="bg-background-foreground"
            placeholder="Enter stock"
          />
        </div>

        <div className="mb-3 flex flex-col gap-2">
          <label className="text-sm">SKU *</label>
          <Input
            value={sku}
            type="text"
            onChange={(e) => handleChange('sku', e.target.value)}
            className="bg-background-foreground"
            placeholder="Enter product SKU"
          />
        </div>

        <div className="mb-3 flex w-full flex-col gap-2">
          <label className="text-sm">Key Features *</label>
          <MarkdownEditor
            ref={keyFeaturesRef}
            className="h-56 overflow-y-auto overflow-x-hidden scrollbar-thin"
            markdown={key_features}
            onChange={handleKeyFeatureChange}
          />
        </div>

        <div className="mb-3 flex flex-col gap-2">
          <label className="text-sm">Gallery *</label>
          <div
            className={`flex h-full min-h-52 flex-col items-center gap-2 rounded-md bg-background-foreground p-3 ${gallery?.length === 0 && 'justify-center'}`}
          >
            {gallery && gallery?.length <= 5 && (
              <Button className="w-fit" onClick={() => setGalleryOpen(true)}>
                Select From Gallery
              </Button>
            )}
            <div className="grid w-full grid-cols-5 gap-2 p-3">
              {gallery?.map((img: string) => {
                return (
                  <div key={img} className="relative max-h-32">
                    <div
                      onClick={() => handleRemoveFromGallery(img)}
                      className="absolute left-2 top-2 z-40 cursor-pointer bg-lavender-mist text-red"
                    >
                      <IoMdClose />
                    </div>
                    <Image
                      src={img}
                      height={200}
                      width={200}
                      alt="gallery img"
                      className="h-full w-full object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <ImageGallery
        open={galleryOpen}
        multiselect={true}
        setOpen={setGalleryOpen}
        onChange={(val) => handleChange('gallery', val as string[])}
      />
    </>
  );
};

export default React.memo(AddBasicData);
