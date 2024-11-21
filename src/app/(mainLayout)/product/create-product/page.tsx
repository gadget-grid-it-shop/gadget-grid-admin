'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  resetProductData,
  setCreateProductStep,
} from '@/redux/reducers/products/productSlice';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AddBasicData from '@/components/product/createProduct/AddBasicData';
import AddSpecifications from '@/components/product/createProduct/AddSpecifications';
import { Button } from '@/components/ui/button';
import Modal from '@/components/custom/Modal';

const CreateProduct = () => {
  const dispatch = useAppDispatch();
  const { step } = useAppSelector((state) => state.products);
  const searchParams = useSearchParams();

  useEffect(() => {
    const step = searchParams.get('step') || '';

    if (step) {
      dispatch(setCreateProductStep(parseInt(step)));
    } else {
      dispatch(setCreateProductStep(1));
    }
  }, [searchParams, dispatch]);
  const [resetOpen, setResetOpen] = useState(false);

  const handleReset = () => {
    dispatch(resetProductData());
    setResetOpen(false);
  };

  return (
    <>
      {searchParams && (
        <div>
          <div className="flex items-center justify-between pb-4">
            <h4 className="page-title">Create Product</h4>
            <Button onClick={() => setResetOpen(true)} variant={'edit'}>
              Reset Form
            </Button>
          </div>

          {step === 1 && <AddBasicData />}

          {/* ===============step 2 specification====================== */}
          {step === 1 && <AddSpecifications />}

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
      )}
    </>
  );
};

export default CreateProduct;
