'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
    resetProductData,
    setProductForUpdate,
    setUpdateProductStep,
} from '@/redux/reducers/products/productSlice';
import React, { ReactNode, useEffect, useState } from 'react';
import AddBasicData from '@/components/product/createProduct/AddBasicData';
import AddSpecifications from '@/components/product/createProduct/AddSpecifications';
import { Button } from '@/components/ui/button';
import {
    useGetSingleProductQuery,
    useUpdateProductMutation,
} from '@/redux/api/productApi';
import { toast } from 'sonner';
import { globalError } from '@/lib/utils';
import AddDescription from '@/components/product/createProduct/AddDescription';
import { ProductValidations } from '@/validations/createProductValidations';
import { ZodError } from 'zod';
import AddMetaData from '@/components/product/createProduct/AddMetaData';
import { TProduct } from '@/interface/product.interface';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import PageHeader from '@/components/common/PageHeader';

type TCompByStep = {
    step: number;
    title: string;
    element: ReactNode;
};

const UpdateProduct = () => {
    const dispatch = useAppDispatch();
    const { editStep, editProduct } = useAppSelector((state) => state.products);
    const [updateProduct, { isLoading: isUpdating }] =
        useUpdateProductMutation();
    const router = useRouter();
    const params = useParams();
    const updateId = params.updateId;

    const { data: updateProductData } = useGetSingleProductQuery(
        updateId as string,
        { skip: !updateId },
    );

    const productData: TProduct | undefined = updateProductData?.data;

    useEffect(() => {
        if (!updateId) {
            router.push('/product/create-product');
        }

        if (productData) {
            dispatch(setProductForUpdate(productData));
        }
    }, [dispatch, productData, updateId]);

    const handleUpdateProduct = async () => {
        try {
            const res = await updateProduct({
                id: updateId as string,
                payload: editProduct,
            }).unwrap();

            if (res) {
                toast.success(res.message);
                dispatch(resetProductData());
                router.push('/product/all-products');
            }
        } catch (err) {
            globalError(err);
        }
    };

    const compByStep: TCompByStep[] = [
        {
            step: 1,
            title: 'General Information',
            element: <AddBasicData edit={true} />,
        },
        {
            step: 2,
            title: 'Attributes',
            element: <AddSpecifications edit={true} />,
        },
        {
            step: 3,
            title: 'Description',
            element: <AddDescription edit={true} />,
        },
        {
            step: 4,
            title: 'Meta Data',
            element: <AddMetaData edit={true} />,
        },
    ];

    const renderSteps = () => {
        const match = compByStep.find((s) => s.step === editStep);
        return match ? match.element : <></>;
    };

    console.log({ editProduct });

    const handleNext = async () => {
        if (editStep === 1) {
            try {
                await ProductValidations.generalDataValidationSchema.parseAsync(
                    editProduct,
                );
                dispatch(setUpdateProductStep((editStep + 1) as 1 | 2 | 3 | 4));
            } catch (err) {
                if (err instanceof ZodError) {
                    console.log(err.issues[0].message);
                    toast.error(err.issues[0].message);
                }
                return;
            }
        }

        if (editStep < 4) {
            dispatch(setUpdateProductStep((editStep + 1) as 1 | 2 | 3 | 4));
        }
    };

    const handleBack = () => {
        if (editStep > 1) {
            dispatch(setUpdateProductStep((editStep - 1) as 1 | 2 | 3 | 4));
        }
    };

    const handleStepClick = (clickedStep: number) => {
        if (clickedStep === editStep) {
            return;
        }

        if (clickedStep > editStep) {
            handleNext();
        } else {
            handleBack();
        }
    };

    return (
        <>
            <div>
                <PageHeader
                    title={
                        updateId === null ? 'Create Product' : 'Update Product'
                    }
                    subtitle='Add New Products to Your Inventory'
                />

                <div className='mb-7 mt-3 flex justify-center px-8 sm:mb-16 sm:px-14 md:px-20'>
                    {compByStep.map((s) => {
                        return (
                            <div
                                key={s.step}
                                className={`flex items-center ${s.step !== compByStep.length ? 'w-full' : ''}`}
                            >
                                <div
                                    className='relative flex cursor-pointer flex-col items-center'
                                    onClick={() => handleStepClick(s.step)}
                                >
                                    <div
                                        className={`flex size-7 items-center justify-center rounded-full ${s.step <= editStep ? 'bg-primary text-pure-white' : 'bg-lavender-mist text-gray'}`}
                                    >
                                        {s.step}
                                    </div>
                                    <div
                                        className={`absolute top-0 mt-9 hidden text-nowrap text-center sm:block ${s.step <= editStep ? 'text-primary' : 'text-gray'}`}
                                    >
                                        {s.title}
                                    </div>
                                </div>
                                {s.step !== compByStep.length && (
                                    <div
                                        className={`flex-auto border-t-2 border-dashed border-border-color transition duration-500 ease-in-out ${s.step < editStep ? 'border-primary' : 'text-gray'}`}
                                    ></div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {renderSteps()}

                <div className='flex justify-between pt-3'>
                    {editStep !== 1 && (
                        <Button variant={'edit'} onClick={handleBack}>
                            Back
                        </Button>
                    )}
                    {editStep === 4 && (
                        <>
                            <Button
                                onClick={handleUpdateProduct}
                                loading={isUpdating}
                                className='mx-auto'
                            >
                                Update Product
                            </Button>
                        </>
                    )}
                    {editStep !== compByStep.length && (
                        <Button className='ms-auto' onClick={handleNext}>
                            Next
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default UpdateProduct;
