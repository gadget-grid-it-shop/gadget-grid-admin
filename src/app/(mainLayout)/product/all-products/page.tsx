'use client';
import CustomAvatar from '@/components/custom/CustomAvatar';
import { DataTable } from '@/components/custom/DataTable';
import { TBrand } from '@/interface/brand.interface';
import { TProduct } from '@/interface/product.interface';
import { useGetAllProductsQuery } from '@/redux/api/productApi';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

const AllProducts = () => {
  const { data: productData } = useGetAllProductsQuery(undefined);
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
        return <div className="">{row.getValue('name')}</div>;
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
            <p>{brand.name}</p>
          </div>
        );
      },
    },
  ];

  console.log(columns);

  return (
    <div>
      {productData?.data?.length !== 0 && (
        <DataTable columns={columns} data={productData?.data || []} />
      )}
    </div>
  );
};

export default AllProducts;
