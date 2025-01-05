import {
    TCategory,
    TProductCategory,
    TUpdateCategory,
} from '@/interface/category';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, FormField, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import MultipleSelector, { Option } from '../ui/multiselect';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useUpdateCategoryMutation } from '@/redux/api/categories';
import { useGetDetailsCategoriesQuery } from '@/redux/api/detailsCategory';

type TProps = {
    editOpen: boolean;
    setEditOpen: Dispatch<SetStateAction<boolean>>;
    category: TCategory | null;
};

const CategorySchema = z.object({
    name: z
        .string({
            required_error: 'Category name is required',
            invalid_type_error: 'Category name is required',
        })
        .min(1, { message: 'Category name is required' }),
});

const EditCategory = ({ category, setEditOpen }: TProps) => {
    const [detailsCategoryError, setDetailsCategoryError] = useState<{
        error: boolean;
        message: string;
    }>({ error: false, message: '' });
    const {
        data: detailsCategoryData,
        error,
        isLoading,
    } = useGetDetailsCategoriesQuery(undefined);
    const [detailsCategories, setDetailsCategories] = useState<Option[]>([]);
    const [updateCategory] = useUpdateCategoryMutation();

    const selectOptions = detailsCategoryData?.data?.map(
        (item: TProductCategory) => {
            return {
                label: item.name,
                value: item._id,
            };
        },
    );

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: '',
        },
    });

    useEffect(() => {
        if (category && form) {
            form.reset({
                name: category.name,
            });

            setDetailsCategories(
                category.product_details_categories.map((item) => {
                    return {
                        label: item.name,
                        value: item._id,
                    };
                }),
            );
        }
    }, [category, form]);

    const onsubmit = async (values: z.infer<typeof CategorySchema>) => {
        console.log('works');

        setDetailsCategoryError({ error: false, message: '' });

        const detailsCategorySchema = z
            .array(z.string())
            .min(1, { message: 'Please select at least one details category' });

        const product_details_categories = detailsCategories.map(
            (item) => item.value,
        );

        const check = detailsCategorySchema.safeParse(
            product_details_categories,
        );

        if (!check.success) {
            setDetailsCategoryError({
                error: true,
                message: check.error.errors[0]?.message,
            });

            return;
        }

        const payload: TUpdateCategory = {
            name: values.name,
            product_details_categories,
        };

        if (category) {
            try {
                const res = await updateCategory({
                    id: category._id,
                    payload,
                }).unwrap();

                console.log(res);

                if (res.success) {
                    toast.success(res.message);

                    setEditOpen(false);
                    form.reset({
                        name: '',
                    });
                    setDetailsCategories([]);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onsubmit)}
                className='flex flex-col gap-4'
            >
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <label className='text-black'>Name *</label>
                            <Input
                                {...field}
                                placeholder='Enter category name'
                                type='text'
                            />

                            {fieldState.error && (
                                <FormMessage className='text-sm text-red'>
                                    {fieldState.error.message}
                                </FormMessage>
                            )}
                        </FormItem>
                    )}
                />

                <div className='flex flex-col gap-2'>
                    <label className='text-black'>
                        Product Details Category *
                    </label>
                    {!isLoading && !error && (
                        <MultipleSelector
                            options={selectOptions}
                            value={detailsCategories}
                            onChange={(value) => setDetailsCategories(value)}
                        />
                    )}
                    {detailsCategoryError.error && (
                        <p className='text-sm text-red'>
                            {detailsCategoryError.message}
                        </p>
                    )}
                </div>
                <Button>Update Category</Button>
            </form>
        </Form>
    );
};

export default EditCategory;
