'use client';
import { TSelectOptions } from '@/components/categories/interface';
import CustomAvatar from '@/components/custom/CustomAvatar';
import { DataTable } from '@/components/custom/DataTable';
import EllipsisText from '@/components/custom/EllipsisText';
import TableSkeleton from '@/components/shared/TableSkeleton';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';
import Select from '@/components/ui/select';
import { TAdminData } from '@/interface/admin.interface';
import { TUser } from '@/interface/auth.interface';
import { TBrand } from '@/interface/brand.interface';
import { TCategory } from '@/interface/category';
import { TProduct, TProductWarrenty } from '@/interface/product.interface';
import { useGetAllBrandsQuery } from '@/redux/api/brandApi';
import { useGetAllProductsQuery } from '@/redux/api/productApi';
import { useGetAllAdminsQuery } from '@/redux/api/usersApi';
import { ColumnDef } from '@tanstack/react-table';
import React, { useState } from 'react';

const AllProducts = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [createdBy, setCreatedBy] = useState('');
  const [brand, setBrand] = useState('');
  const {
    data: productData,
    error,
    isLoading,
    isFetching,
  } = useGetAllProductsQuery({
    page,
    limit,
    ...(createdBy ? { createdBy } : {}),
    ...(brand ? { brand } : {}),
  });
  const { data: adminData } = useGetAllAdminsQuery(undefined);
  const { data: brandData } = useGetAllBrandsQuery(undefined);

  const paginationData = productData?.data?.pagination;

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
        const category: TCategory = row.getValue('category');
        return <div className="">{category?.name}</div>;
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
            <EllipsisText width={60} className="text-gray" text={brand.name} />
          </div>
        );
      },
    },

    {
      accessorKey: 'model',
      header: 'Model',
      cell: ({ row }) => {
        return <EllipsisText width={70} text={row.getValue('model')} />;
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
      header: 'CreatedBy',
      cell: ({ row }) => {
        const createdBy: TUser = row.getValue('createdBy');
        return (
          <div className="">
            <EllipsisText
              text={createdBy.email}
              className="text-gray"
              width={150}
            />
          </div>
        );
      },
    },
    {
      accessorKey: 'actions',
      header: 'Actions',
      cell: () => {
        return (
          <div className="flex gap-2">
            <Button variant={'view_button'} size={'base'} />
            <Button variant={'edit_button'} size={'base'} />
            <Button variant={'delete_button'} size={'base'} />
          </div>
        );
      },
    },
  ];

  const adminSelectData: TSelectOptions[] = adminData?.data?.map(
    (admin: TAdminData) => ({
      label: admin?.fullName,
      value: admin?.user?._id,
    }),
  );
  const brandSelectData: TSelectOptions[] = brandData?.data?.map(
    (brand: TBrand) => ({
      label: brand?.name,
      value: brand?._id,
    }),
  );

  const handlePageChange = (page: number, limit: number) => {
    console.log({ page }, { limit });
    setPage(page);
    setLimit(limit);
  };

  console.log({ isLoading });

  return (
    <div>
      <div className="flex gap-3">
        <Select
          placeholder="Brand"
          value={brand}
          data={brandSelectData}
          onChange={(val) => setBrand(val as string)}
        />
        <Select
          placeholder="Created By"
          value={createdBy}
          data={adminSelectData}
          onChange={(val) => setCreatedBy(val as string)}
        />
      </div>

      {isFetching ? (
        <TableSkeleton />
      ) : !error && productData?.data ? (
        <DataTable columns={columns} data={productData?.data?.products || []} />
      ) : (
        <div>Error loading data</div> // Handle the error case
      )}
      <Pagination
        currentPage={page}
        totalItems={paginationData ? paginationData?.total : 0}
        itemsPerPage={20}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllProducts;
