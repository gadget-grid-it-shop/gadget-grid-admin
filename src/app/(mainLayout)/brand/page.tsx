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
import {
    useDeleteBrandMutation,
    useGetAllBrandsQuery,
} from '@/redux/api/brandApi';
import { TBrand } from '@/interface/brand.interface';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { globalError, isValidUrl } from '@/lib/utils';
import CreateBrand from '@/components/brand/CreateBrand';
import Modal from '@/components/custom/Modal';
import { toast } from 'sonner';
import EditBrand from '@/components/brand/EditBrand';
import PageHeader from '@/components/common/PageHeader';

const BrandPage = () => {
    const {
        data: brandData,
        isLoading,
        error,
    } = useGetAllBrandsQuery(undefined);
    const [deleteOpen, setDeleteOpen] = useState<string | null>(null);
    const [editOpen, setEditOpen] = useState<TBrand | null>(null);
    const [deleteBrand, { isLoading: isDeleting }] = useDeleteBrandMutation();

    if (!isLoading && error) {
        globalError(error);
    }

    const handleDeleteBrand = async () => {
        if (deleteOpen) {
            try {
                const res = await deleteBrand(deleteOpen).unwrap();
                if (res) {
                    toast.success(res.message);
                }
                setDeleteOpen(null);
            } catch (err) {
                globalError(err);
            }
        }
    };

    return (
        <>
            <PageHeader
                subtitle='Create and Organize Product Brands'
                title='Brands'
                buttons={<CreateBrand />}
            />

            {isLoading ? (
                <TableSkeleton />
            ) : (
                <Table className=''>
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
                                            ((
                                                e.currentTarget as HTMLImageElement
                                            ).src = '/brand-fallback.png')
                                        }
                                        className='object-contain'
                                        height={50}
                                        width={50}
                                        alt='brand image'
                                    />
                                </TableCell>
                                <TableCell className='flex items-center gap-3'>
                                    {brand?.createdBy?.email || 'N/A'}
                                </TableCell>

                                <TableCell className='font-semibold'>
                                    {brand?.isActive ? (
                                        <p className='text-green-600'>True</p>
                                    ) : (
                                        <p className='text-red'>False</p>
                                    )}
                                </TableCell>

                                <TableCell>
                                    <div className='flex items-center gap-3'>
                                        <Button
                                            variant={'view_button'}
                                            size={'base'}
                                        ></Button>
                                        <Button
                                            onClick={() => setEditOpen(brand)}
                                            variant={'edit_button'}
                                            size={'base'}
                                        ></Button>
                                        <Button
                                            onClick={() =>
                                                setDeleteOpen(brand._id)
                                            }
                                            variant={'delete_button'}
                                            size={'base'}
                                        ></Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {!isLoading && error !== undefined && (
                <div className='flex h-48 items-center justify-center text-gray'>
                    Admin data unavailable
                </div>
            )}

            <EditBrand openBrand={editOpen} setOpen={setEditOpen} />

            {/* ================= delete brand modal================ */}
            <Modal
                open={deleteOpen !== null}
                onOpenChange={() => setDeleteOpen(null)}
                title='Delete Brand'
            >
                <>
                    <div>
                        <h2 className='pb-4 text-red-orange'>
                            Warning: You are about to delete a brand.
                        </h2>
                        <h3 className='pb-2 text-sm'>
                            Deleting a brand can have significant consequences
                            for your product catalog and customer experience.
                            Please ensure the following before proceeding:
                        </h3>
                        <ul className='list-decimal ps-5 text-sm text-gray'>
                            <li>
                                Verify that the brand is no longer associated
                                with any active products or campaigns.
                            </li>
                            <li>
                                Ensure that there are no ongoing dependencies
                                related to this brand. This action will
                                permanently remove the brand from your system
                                and may affect product visibility and inventory
                                management.
                            </li>
                        </ul>
                    </div>

                    <div className='flex w-full gap-3 pt-4'>
                        <Button
                            className='w-full'
                            variant={'delete_solid'}
                            onClick={() => setDeleteOpen(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            loading={isDeleting}
                            onClick={handleDeleteBrand}
                            className='w-full'
                        >
                            Delete
                        </Button>
                    </div>
                </>
            </Modal>
        </>
    );
};

export default BrandPage;
