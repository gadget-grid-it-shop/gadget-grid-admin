'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  resetProductData,
  setCreateProductStep,
  setProductForUpdate,
} from '@/redux/reducers/products/productSlice';
import React, { ReactNode, useEffect, useState } from 'react';
import AddBasicData from '@/components/product/createProduct/AddBasicData';
import AddSpecifications from '@/components/product/createProduct/AddSpecifications';
import { Button } from '@/components/ui/button';
import Modal from '@/components/custom/Modal';
import {
  useAddNewProductMutation,
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
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';

type TCompByStep = {
  step: number;
  title: string;
  element: ReactNode;
};

const CreateProduct = () => {
  const dispatch = useAppDispatch();
  const { step, product } = useAppSelector((state) => state.products);
  const [addNewProduct, { isLoading: isCreating }] = useAddNewProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const updateId = searchParams.get('updateId');

  const { data: updateProductData } = useGetSingleProductQuery(
    updateId as string,
    { skip: !updateId },
  );

  const productData: TProduct | undefined = updateProductData?.data;

  useEffect(() => {
    if (productData) {
      dispatch(setProductForUpdate(productData));
    } else {
      dispatch(resetProductData());
    }
  }, [productData]);

  const [resetOpen, setResetOpen] = useState(false);

  const handleReset = () => {
    dispatch(resetProductData());
    setResetOpen(false);
  };

  const hanldeAddProduct = async () => {
    try {
      const res = await addNewProduct(product).unwrap();
      if (res) {
        toast.success(res.message);
        dispatch(resetProductData());
      }
    } catch (err) {
      globalError(err);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const res = await updateProduct({
        id: updateId as string,
        payload: product,
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
      element: <AddBasicData />,
    },
    {
      step: 2,
      title: 'Attributes',
      element: <AddSpecifications />,
    },
    {
      step: 3,
      title: 'Description',
      element: <AddDescription />,
    },
    {
      step: 4,
      title: 'Meta Data',
      element: <AddMetaData />,
    },
  ];

  const renderSteps = () => {
    const match = compByStep.find((s) => s.step === step);
    return match ? match.element : <></>;
  };

  const handleNext = async () => {
    if (step === 1) {
      try {
        await ProductValidations.generalDataValidationSchema.parseAsync(
          product,
        );
        dispatch(setCreateProductStep((step + 1) as 1 | 2 | 3 | 4));
      } catch (err) {
        console.log(err);
        if (err instanceof ZodError) {
          console.log(err.issues[0].message);
          toast.error(err.issues[0].message);
        }
        return;
      }
    }

    if (step < 4) {
      dispatch(setCreateProductStep((step + 1) as 1 | 2 | 3 | 4));
    }
  };

  const handleBack = () => {
    if (step > 1) {
      dispatch(setCreateProductStep((step - 1) as 1 | 2 | 3 | 4));
    }
  };

  const handleStepClick = (clickedStep: number) => {
    if (clickedStep === step) {
      return;
    }

    if (clickedStep > step) {
      handleNext();
    } else {
      handleBack();
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between pb-4">
          <h4 className="page-title">
            {updateId === null ? 'Create Product' : 'Update Product'}
          </h4>
          <Button onClick={() => setResetOpen(true)} variant={'edit'}>
            Reset Form
          </Button>
        </div>

        <div className="mb-7 mt-3 flex justify-center px-8 sm:mb-16 sm:px-14 md:px-20">
          {compByStep.map((s) => {
            return (
              <div
                key={s.step}
                className={`flex items-center ${s.step !== compByStep.length ? 'w-full' : ''}`}
              >
                <div
                  className="relative flex cursor-pointer flex-col items-center"
                  onClick={() => handleStepClick(s.step)}
                >
                  <div
                    className={`flex size-7 items-center justify-center rounded-full ${s.step <= step ? 'bg-primary text-pure-white' : 'bg-lavender-mist text-gray'}`}
                  >
                    {s.step}
                  </div>
                  <div
                    className={`absolute top-0 mt-9 hidden text-nowrap text-center sm:block ${s.step <= step ? 'text-primary' : 'text-gray'}`}
                  >
                    {s.title}
                  </div>
                </div>
                {s.step !== compByStep.length && (
                  <div
                    className={`flex-auto border-t-2 border-dashed border-border-color transition duration-500 ease-in-out ${s.step < step ? 'border-primary' : 'text-gray'}`}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        {renderSteps()}

        <div className="flex justify-between pt-3">
          {step !== 1 && (
            <Button variant={'edit'} onClick={handleBack}>
              Back
            </Button>
          )}
          {step === 4 && (
            <>
              {updateId ? (
                <Button
                  onClick={handleUpdateProduct}
                  loading={isUpdating}
                  className="mx-auto"
                >
                  Update Product
                </Button>
              ) : (
                <Button
                  onClick={hanldeAddProduct}
                  loading={isCreating}
                  className="mx-auto"
                >
                  Add Product
                </Button>
              )}
            </>
          )}
          {step !== compByStep.length && (
            <Button className="ms-auto" onClick={handleNext}>
              Next
            </Button>
          )}
        </div>

        <Modal
          open={resetOpen}
          setOpen={setResetOpen}
          title="Reset product form"
        >
          <h3>
            Are you sure you want to reset the form. All the data you entered
            will be lost
          </h3>
          <div className="flex w-full gap-2">
            <Button
              variant={'delete_solid'}
              className="w-full"
              onClick={() => setResetOpen(false)}
            >
              Cancel
            </Button>
            <Button className="w-full" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default CreateProduct;
