'use client';
import CustomAvatar from '@/components/custom/CustomAvatar';
import { DataTable } from '@/components/custom/DataTable';
import EllipsisText from '@/components/custom/EllipsisText';
import TableSkeleton from '@/components/shared/TableSkeleton';
import { TUser } from '@/interface/auth.interface';
import { TBrand } from '@/interface/brand.interface';
import {
  TProduct,
  TProductCategory,
  TProductWarrenty,
} from '@/interface/product.interface';
import { useGetAllProductsQuery } from '@/redux/api/productApi';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

type TPopulatedProductCategory = TProductCategory & { id: { name: string } };

const AllProducts = () => {
  const { data: productData, error } = useGetAllProductsQuery(undefined);
  console.log(productData);

  const columns: ColumnDef<TProduct>[] = [
    {
      accessorKey: '_id',
      header: 'Serial',
      cell: ({ row }) => {
        return <p>{row.index + 1}</p>;
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        return (
          <div>
            <EllipsisText className="text-gray" text={row.getValue('name')} />
          </div>
        );
      },
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => {
        const categories: TPopulatedProductCategory[] =
          row.getValue('category') || [];
        const category: TPopulatedProductCategory | undefined =
          categories?.find((cat: TPopulatedProductCategory) => cat.main);
        return <div className="">{category?.id?.name}</div>;
      },
    },
    {
      accessorKey: 'brand',
      header: 'Brand',
      cell: ({ row }) => {
        const brand: TBrand = row.getValue('brand');
        return (
          <div className="flex items-center gap-1">
            <CustomAvatar src={brand.image} />
            <p className="text-gray">{brand.name}</p>
          </div>
        );
      },
    },

    {
      accessorKey: 'model',
      header: 'Model',
      cell: ({ row }) => {
        return <div className="">{row.getValue('model')}</div>;
      },
    },
    {
      accessorKey: 'sku',
      header: 'SKU',
      cell: ({ row }) => {
        return <div className="">{row.getValue('sku')}</div>;
      },
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => {
        return <div className="">${row.getValue('price')}</div>;
      },
    },
    {
      accessorKey: 'quantity',
      header: 'Stock',
      cell: ({ row }) => {
        return <div className="">{row.getValue('quantity')}</div>;
      },
    },
    {
      accessorKey: 'warranty',
      header: 'Warranty',
      cell: ({ row }) => {
        const warranty: TProductWarrenty = row.getValue('warranty');
        return (
          <div>
            <p className="text-gray">
              {warranty?.lifetime ? 'Lifetime' : `${warranty?.days} days`}
            </p>
          </div>
        );
      },
    },
    {
      accessorKey: 'createdBy',
      header: 'createdBy',
      cell: ({ row }) => {
        const createdBy: TUser = row.getValue('createdBy');
        return <div className="">{createdBy.email}</div>;
      },
    },
  ];

  return (
    <div>
      {!error && productData?.data ? (
        <DataTable columns={columns} data={productData?.data || []} />
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
};

export default AllProducts;
