import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FiPlus } from "react-icons/fi";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { useForm, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useGetDetailsCategoriesQuery } from "@/redux/api/detailsCategory";
import { TProductCategory } from "@/interface/category";
import MultipleSelector from "../ui/multiselect";
import { useCreateCategoryMutation } from "@/redux/api/categories";
import { toast } from 'sonner'
import { TParentCat } from "@/app/(mainLayout)/category/page";
import { TSelectOptions } from "./interface";
import { globalError } from "@/components/utilities/utils";

type TCategoryProps = {
    parent: TParentCat;
    setParent: Dispatch<SetStateAction<TParentCat>>,
    setOpen: Dispatch<SetStateAction<boolean>>,
    open: boolean
};

const CategorySchema = z.object({
    name: z
        .string({ required_error: "Category name is required", invalid_type_error: "Category name is required" })
        .min(1, { message: "Category name is required" }),
    parent_id: z.string().optional(),
});

const CreateCategory = ({ parent, open, setOpen, setParent }: TCategoryProps) => {
    const [detailsCategories, setDetailsCategories] = useState<TSelectOptions[]>([]);
    const { data: detailsCategoryData, error, isLoading } = useGetDetailsCategoriesQuery(undefined);
    const [detailsCategoryError, setDetailsCategoryError] = useState<{ error: boolean; message: string }>({ error: false, message: "" });

    const [createCategory, { isLoading: isCreatingCategory }] = useCreateCategoryMutation();

    const selectOptions = detailsCategoryData?.data?.map((item: TProductCategory) => {
        return {
            label: item.name,
            value: item._id,
        };
    });

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: "",
            parent_id: "",
        },
    });

    const errors: FieldErrors<FormData> = form.formState.errors;

    console.log(errors)

    useEffect(() => {
        if (parent) {
            form.reset({
                name: "",
                parent_id: parent.id || "",
            });
        }
    }, [parent, form]);

    const onsubmit = async (values: z.infer<typeof CategorySchema>) => {
        console.log("works");

        setDetailsCategoryError({ error: false, message: "" });

        const detailsCategorySchema = z.array(z.string()).min(1, { message: "Please select at least one details category" });

        const product_details_categories = detailsCategories.map((item) => item.value);

        const check = detailsCategorySchema.safeParse(product_details_categories);

        if (!check.success) {
            setDetailsCategoryError({
                error: true,
                message: check.error.errors[0]?.message,
            });

            return;
        }

        const payload = {
            name: values.name,
            parent_id: values.parent_id || null,
            product_details_categories,
        };

        try {
            const res = await createCategory(payload).unwrap();

            if (res.success) {
                toast.success(res.message)

                setOpen(false);
                form.reset({
                    name: "",
                    parent_id: "",
                });
                setDetailsCategories([])
            }
        } catch (err) {
            globalError(err)
        }
    };


    console.log(parent)


    return (
        <div>
            <Dialog open={open} onOpenChange={() => {
                setOpen(!open)
                setParent({
                    name: "",
                    id: ""
                })
            }}>
                <DialogTrigger className="primary-btn">
                    <FiPlus size={18} /> Create Category
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Create New Category</DialogTitle>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onsubmit)} className="flex flex-col gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field, fieldState }) => (
                                    <FormItem>
                                        <label className="text-black">Name *</label>
                                        <Input {...field} placeholder="Enter category name" type="text" />

                                        {fieldState.error && <FormMessage className="text-red text-sm">{fieldState.error.message}</FormMessage>}
                                    </FormItem>
                                )}
                            />
                            {parent.id && (
                                <FormField
                                    control={form.control}
                                    name="parent_id"
                                    render={({ field }) => (
                                        <FormItem>
                                            <label className="text-black">Parent</label>
                                            <Input disabled {...field} value={parent.name} type="text" />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <div className="flex flex-col gap-2">
                                <label className="text-black">Product Details Category *</label>
                                {!isLoading && !error && (
                                    <MultipleSelector options={selectOptions} value={detailsCategories} onChange={(value) => setDetailsCategories(value)} />
                                )}
                                {detailsCategoryError.error && <p className="text-red text-sm">{detailsCategoryError.message}</p>}
                            </div>
                            <Button loading={isCreatingCategory}>Create</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CreateCategory;
