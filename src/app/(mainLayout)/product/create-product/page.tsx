'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  resetProductData,
  setCreateProductStep,
} from '@/redux/reducers/products/productSlice';
import React, { ReactNode, useState } from 'react';
import AddBasicData from '@/components/product/createProduct/AddBasicData';
import AddSpecifications from '@/components/product/createProduct/AddSpecifications';
import { Button } from '@/components/ui/button';
import Modal from '@/components/custom/Modal';
import { useAddNewProductMutation } from '@/redux/api/productApi';
import { toast } from 'sonner';
import { globalError } from '@/lib/utils';
import AddDescription from '@/components/product/createProduct/AddDescription';
import { ProductValidations } from '@/validations/createProductValidations';
import { ZodError } from 'zod';

type TCompByStep = {
  step: number;
  title: string;
  element: ReactNode;
};

const CreateProduct = () => {
  const dispatch = useAppDispatch();
  const { step, product } = useAppSelector((state) => state.products);
  const [addNewProduct] = useAddNewProductMutation();

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
      title: 'Meta Data',
      element: <AddDescription />,
    },
  ];

  const renderSteps = () => {
    const match = compByStep.find((s) => s.step === step);
    return match ? match.element : <></>;
  };

  const handleNext = async () => {
    console.log(product);

    if (step === 1) {
      try {
        await ProductValidations.generalDataValidationSchema.parseAsync(
          product,
        );
      } catch (err) {
        console.log(err);
        if (err instanceof ZodError) {
          console.log(err.issues[0].message);
          toast.error(err.issues[0].message);
        }
      }
    }

    // if (step < 4) {
    //   dispatch(setCreateProductStep(step + 1 as 1 | 2 | 3 | 4))
    // }
  };

  const handleBack = () => {
    if (step > 1) {
      dispatch(setCreateProductStep((step - 1) as 1 | 2 | 3 | 4));
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-between pb-4">
          <h4 className="page-title">Create Product</h4>
          <Button onClick={() => setResetOpen(true)} variant={'edit'}>
            Reset Form
          </Button>
        </div>

        {renderSteps()}

        <div className="flex justify-between pt-3">
          <Button variant={'edit'} onClick={handleBack}>
            Back
          </Button>
          <Button onClick={hanldeAddProduct}>Add Product</Button>
          <Button onClick={handleNext}>Next</Button>
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
