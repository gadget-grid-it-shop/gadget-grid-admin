'use client';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import TableSkeleton from '@/components/shared/TableSkeleton';
import { useGetAllBrandsQuery } from '@/redux/api/brandApi';
import { TBrand } from '@/interface/brand.interface';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { isValidUrl } from '@/lib/utils';
import CreateBrand from '@/components/brand/CreateBrand';

const BrandPage = () => {
  const { data: brandData, isLoading } = useGetAllBrandsQuery(undefined);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <h4 className="page-title">Brands</h4>
        <CreateBrand />
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>Serial</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>CreatedBy</TableHead>
              <TableHead>isActive</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brandData?.data?.map((brand: TBrand, i: number) => (
              <TableRow key={brand?._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{`${brand?.name}`}</TableCell>
                <TableCell>
                  <Image
                    src={
                      isValidUrl(brand?.image)
                        ? brand.image
                        : '/brand-fallback.png'
                    }
                    onError={(e) =>
                      ((e.currentTarget as HTMLImageElement).src =
                        '/brand-fallback.png')
                    }
                    className="object-contain"
                    height={50}
                    width={50}
                    alt="brand image"
                  />
                </TableCell>
                <TableCell className="flex items-center gap-3">
                  {brand?.createdBy?.email || 'N/A'}
                </TableCell>

                <TableCell className="font-semibold">
                  {brand?.isActive ? (
                    <p className="text-green-600">True</p>
                  ) : (
                    <p className="text-red">False</p>
                  )}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-3">
                    <Button variant={'view_button'} size={'base'}></Button>
                    <Button variant={'edit_button'} size={'base'}></Button>
                    <Dialog
                      open={deleteOpen}
                      onOpenChange={() => setDeleteOpen(!deleteOpen)}
                    >
                      <DialogTrigger>
                        <Button
                          variant={'delete_button'}
                          size={'base'}
                        ></Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Delete Brand</DialogTitle>
                        <div>
                          <h2 className="pb-4 text-red-orange">
                            Warning: You are about to delete a brand.
                          </h2>
                          <h3 className="pb-2 text-sm">
                            Deleting a brand can have significant consequences
                            for your product catalog and customer experience.
                            Please ensure the following before proceeding:
                          </h3>
                          <ul className="list-decimal ps-5 text-sm text-gray">
                            <li>
                              Verify that the brand is no longer associated with
                              any active products or campaigns.
                            </li>
                            <li>
                              Ensure that there are no ongoing dependencies
                              related to this brand. This action will
                              permanently remove the brand from your system and
                              may affect product visibility and inventory
                              management.
                            </li>
                          </ul>
                        </div>

                        <div className="flex w-full gap-3 pt-4">
                          <Button
                            className="w-full"
                            variant={'delete_solid'}
                            onClick={() => setDeleteOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button
                            // loading={isDeleting}
                            // onClick={() => handleDeleteAdmin(admin.user._id)}
                            className="w-full"
                          >
                            Delete
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BrandPage;
