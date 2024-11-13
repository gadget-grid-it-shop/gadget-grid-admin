'use client';

import { Input } from '@/components/ui/input';

import { TCategory, TProductCategory } from '@/interface/category';
import { TProductAttribute } from '@/interface/product.interface';
import { useGetAllCategoriesQuery } from '@/redux/api/categories';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateProduct } from '@/redux/reducers/products/productSlice';
import React, { useEffect } from 'react';

const AddSpecifications = () => {
  const {
    data: categoryData,
    // error: cateoryError,
    // isLoading: categoryLoading,
  } = useGetAllCategoriesQuery(false);
  const { product } = useAppSelector((state) => state.products);
  const { attributes } = product;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product.category.length !== 0) {
      const category: TCategory = categoryData?.data.find(
        (cat: TCategory) =>
          cat._id === product.category.find((c) => c.main)?.id,
      );

      console.log(category);

      if (category) {
        const attributes = category.product_details_categories.map(
          (item: TProductCategory) => {
            return {
              name: item.name,
              fields: item.fields.map((field: string) => {
                return {
                  [field]: '',
                };
              }),
            };
          },
        );
        dispatch(updateProduct({ key: 'attributes', value: attributes }));
      }
    } else {
      dispatch(updateProduct({ key: 'attributes', value: [] }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.category]);

  return (
    <div className="flex w-1/2 flex-col gap-6">
      {attributes && attributes.length !== 0 && (
        <div>
          <label className="text-lg font-semibold text-black">
            Attributes *
          </label>
          <p className="pb-5 text-sm text-gray">
            Please fill up all the attribute informations
          </p>
          <div className="flex flex-col gap-3">
            {attributes.map((attr: TProductAttribute) => (
              <div key={attr.name}>
                <h1 className="text-md font-semibold text-black">
                  {attr.name} *
                </h1>
                {attr.fields.map((field: Record<string, string>, i) => (
                  <div
                    key={i}
                    className="my-2 grid grid-cols-8 items-center gap-3 border border-border-color ps-3"
                  >
                    <label className="col-span-2 text-sm font-semibold text-gray">
                      {Object.entries(field)[0]}
                    </label>
                    <Input
                      placeholder={`Enter ${Object.entries(field)[0]}`}
                      className="col-span-6 rounded-none bg-background-foreground"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSpecifications;
