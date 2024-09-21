import React, {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "../ui/dialog";
import {FiPlus} from "react-icons/fi";
import {Form, FormField, FormItem, FormMessage} from "../ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {useGetDetailsCategoriesQuery} from "@/redux/api/detailsCategory";

import {TProductCategory} from "@/interface/category";
import MultipleSelector from "../ui/multiselect";
import {useCreateCategoryMutation} from "@/redux/api/categories";
import {toast} from "react-toastify";

type TCategoryProps = {
  parent_id?: string | null | undefined;
};

type TSelectOptions = {
  label: string;
  value: string;
};

const CategorySchema = z.object({
  name: z
    .string({required_error: "Category name is required", invalid_type_error: "Category name is required"})
    .min(1, {message: "Category name is required"}),
  parent_id: z.string().min(1, {message: "Parent id cannot be empty"}).optional(),
});

const CreateCategory = ({parent_id}: TCategoryProps) => {
  const [open, setOpen] = useState(false);
  const [detailsCategories, setDetailsCategories] = useState<TSelectOptions[]>([]);
  const {data: detailsCategoryData, error, isLoading} = useGetDetailsCategoriesQuery(undefined);
  const [detailsCategoryError, setDetailsCategoryError] = useState<{error: boolean; message: string}>({error: false, message: ""});

  const [createCategory] = useCreateCategoryMutation();

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

  useEffect(() => {
    if (parent_id) {
      form.reset({
        name: "",
        parent_id: parent_id,
      });
    }
  }, [parent_id, form]);

  const onsubmit = async (values: z.infer<typeof CategorySchema>) => {
    console.log("works");

    setDetailsCategoryError({error: false, message: ""});

    const detailsCategorySchema = z.array(z.string()).min(1, {message: "Please select at least one details category"});

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

      console.log(res);

      if (res.success) {
        toast.success(res.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });

        setOpen(false);
        form.reset({
          name: "",
          parent_id: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  //   console.log(createError);

  return (
    <div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
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
                render={({field, fieldState}) => (
                  <FormItem>
                    <label className="text-black">Name *</label>
                    <Input {...field} placeholder="Enter category name" type="text" />

                    {fieldState.error && <FormMessage className="text-red text-sm">{fieldState.error.message}</FormMessage>}
                  </FormItem>
                )}
              />
              {parent_id && (
                <FormField
                  control={form.control}
                  name="parent_id"
                  render={({field}) => (
                    <FormItem>
                      <label className="text-black">Parent Id</label>
                      <Input {...field} placeholder="Enter category name" type="text" />
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
              <Button>Create</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateCategory;
