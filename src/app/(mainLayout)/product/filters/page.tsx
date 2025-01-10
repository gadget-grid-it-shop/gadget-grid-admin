'use client';
import PageHeader from '@/components/common/PageHeader';
import Modal from '@/components/custom/Modal';
import DetailsCategorySkeleton from '@/components/details-category/DetailsCategorySkeleton';
import ProductFilterCard from '@/components/productFilter/ProductFilterCard';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { globalError } from '@/lib/utils';
import {
    TCreateProductFilter,
    useGetAllProductFiltersQuery,
    useUpdateProductFilterMutation,
} from '@/redux/api/filtersApi';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { HiMiniXMark } from 'react-icons/hi2';
import { toast } from 'sonner';
import { z } from 'zod';

const nameSchema = z.object({
    title: z
        .string({
            required_error: 'Product category name is required',
        })
        .min(1, { message: 'Product category name is required' })
        .max(50),
    options: z.array(z.string().min(1, 'Option is required')),
});

const ProductFilterPage = () => {
    const { data, isLoading, error } = useGetAllProductFiltersQuery(undefined);
    const [updateFilter, setUpdateFilter] =
        useState<TCreateProductFilter | null>(null);
    const [updateProductFilter, { isLoading: isUpdating }] =
        useUpdateProductFilterMutation();

    if (error) {
        globalError(error);
    }

    const form = useForm<z.infer<typeof nameSchema>>({
        resolver: zodResolver(nameSchema),
        defaultValues: {
            title: '',
            options: [''],
        },
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = form;

    const { fields, append, remove } = useFieldArray<any>({
        control: control,
        name: 'options',
    });

    const onSubmit = async (values: z.infer<typeof nameSchema>) => {
        if (updateFilter === null) {
            return;
        }
        try {
            const res = await updateProductFilter({
                payload: {
                    title: values.title,
                    options: values.options,
                },
                id: updateFilter?._id as string,
            }).unwrap();
            toast.success(res.message);
            setUpdateFilter(null);
        } catch (err) {
            globalError(err);
        }
    };

    useEffect(() => {
        if (updateFilter) {
            form.setValue('title', updateFilter.title);
            form.setValue('options', updateFilter.options);
        }
    }, [updateFilter]);

    return (
        <div>
            <PageHeader
                title='Product Filters'
                subtitle='Set Up Filter Attributes for Enhanced Inventory Search'
                buttons={<></>}
            />

            {isLoading ? (
                <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
                    {Array.from({ length: 8 }, (_, i) => {
                        return <DetailsCategorySkeleton key={i} />;
                    })}
                </div>
            ) : (
                <ProductFilterCard
                    setUpdateFilter={setUpdateFilter}
                    data={data?.data || []}
                />
            )}

            {/* ================ update filter modal================= */}
            <Modal
                open={updateFilter !== null}
                onOpenChange={() => setUpdateFilter(null)}
                title='Update Filter'
            >
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col gap-5'
                    >
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field, fieldState }) => (
                                <FormItem className='flex flex-col'>
                                    <label className='text-gray'>Name *</label>
                                    <Input
                                        autoFocus={false}
                                        {...field}
                                        className='border-gray bg-white text-gray'
                                        placeholder='Enter Product Category Name'
                                        type='text'
                                    ></Input>

                                    {fieldState.error && (
                                        <FormMessage className='text-sm text-red'>
                                            {fieldState.error.message}
                                        </FormMessage>
                                    )}
                                </FormItem>
                            )}
                        />
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center justify-between'>
                                <label className='text-gray'>Fields *</label>
                                <Button
                                    onClick={() => append('')}
                                    type='button'
                                >
                                    Add Attribute
                                </Button>
                            </div>

                            {fields.map((field, index) => (
                                <div key={field.id}>
                                    <div className='flex items-center gap-2'>
                                        <Input
                                            {...register(`options.${index}`)}
                                            className='border-gray bg-white text-gray'
                                            placeholder='Enter Option'
                                            type='text'
                                        ></Input>
                                        <div
                                            onClick={() => remove(index)}
                                            className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-red text-lg text-red hover:bg-red hover:text-white'
                                        >
                                            <HiMiniXMark />
                                        </div>
                                    </div>
                                    {errors.options?.[index] && (
                                        <p className='text-red text-sm'>
                                            {errors.options[index]?.message}
                                        </p>
                                    )}
                                </div>
                            ))}
                            {/* <DialogDescription>
                                {fields.length === 0 && (
                                    <p className='text-sm text-red'>
                                        Please add at least one field
                                    </p>
                                )}
                            </DialogDescription> */}
                        </div>
                        <Button type='submit' loading={isUpdating}>
                            Submit
                        </Button>
                    </form>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductFilterPage;
