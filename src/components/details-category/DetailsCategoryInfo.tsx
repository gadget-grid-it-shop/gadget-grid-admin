"use client";
import { TProductCategory } from "@/interface/category";
import { Button } from "../ui/button";
import { BiSolidEditAlt } from "react-icons/bi";
import { PiTrashSimpleFill } from "react-icons/pi";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { HiMiniXMark } from "react-icons/hi2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDeleteDetailsCategoryMutation, useUpdateDetailsCategoryMutation } from "@/redux/api/detailsCategory";

type TProps = {
  data: TProductCategory[];
};

interface Field {
  field: string;
  id: string;
}

const nameSchema = z.object({
  name: z
    .string({
      required_error: "Product category name is required",
    })
    .min(1, { message: "Product category name is required" })
    .max(50),
});

const fieldSchema = z.array(
  z.object({
    field: z
      .string({
        required_error: "Field cannot be empty",
      })
      .min(1, "Field cannot be an empty string"), // Field must be at least 1 character
    id: z.string(), // Assuming ID is a string
  })
);

const generateID = () => {
  return Math.random().toString(36).slice(2, 9) + "-" + Date.now();
};

const DetailsCategoryInfo = ({ data }: TProps) => {
  const [openDeleteId, setOpenDeleteId] = useState<null | string>(null);
  const [openEditId, setOpenEditId] = useState<null | string>(null);
  const [selectedCat, setSelectedCat] = useState<null | TProductCategory>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [fieldError, setFieldError] = useState(false);
  const [deleteDetailsCategory] = useDeleteDetailsCategoryMutation();
  const [updateDetailsCategory] = useUpdateDetailsCategoryMutation();

  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof nameSchema>) {
    setFieldError(false);
    console.log(values);

    const result = fieldSchema.safeParse(fields);

    if (result.success === false) {
      setFieldError(true);
      return;
    }

    const payload = {
      name: values.name,
      fields: fields.map((f) => f.field),
    };

    const res = await updateDetailsCategory({ id: selectedCat?._id || "", payload });
    if (res.data.success) {
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
      handleCloseModal();
      setFields([
        {
          field: "",
          id: generateID(),
        },
      ]);
      form.reset({
        name: "",
      });
    }
  }

  const handleAddField = () => {
    setFields((prev) => [
      ...prev,
      {
        field: "",
        id: generateID(),
      },
    ]);
  };

  const handleRemoveField = (id: string) => {
    console.log(fields);
    console.log(id);
    const filteredFields = fields.filter((f) => f.id !== id);

    setFields(filteredFields);
  };

  const handleFieldChange = (value: string, id: string) => {
    setFields((prev) => {
      const updatedFields = prev.map((f) => {
        if (f.id === id) {
          return {
            field: value,
            id: f.id,
          };
        } else {
          return f;
        }
      });

      return updatedFields;
    });
  };

  const handleDelete = async (id: string | null) => {
    const res = await deleteDetailsCategory(id);

    console.log(res);
    if (res.data.success) {
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });

      setOpenDeleteId(null);
    }
  };

  const handleCloseModal = () => {
    setOpenDeleteId(null);
    setOpenEditId(null);
    setSelectedCat(null);
  };

  useEffect(() => {
    if (openEditId !== null && selectedCat !== null) {
      setFields(
        selectedCat.fields.map((f) => ({
          field: f,
          id: generateID(),
        }))
      );
      form.reset({
        name: selectedCat.name || "",
      });
    }
  }, [openEditId, selectedCat, form]);

  console.log(fields);

  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
      {data.length !== 0 &&
        data?.map((cat: TProductCategory) => (
          <div className="bg-light-gray border border-border-color p-4 rounded-md flex flex-col h-full hover:shadow-md hover:scale-[1.01] transition-all z-0" key={cat._id}>
            <h3 className="text-black text-lg font-semibold">{cat.name}</h3>
            <div className="flex flex-col gap-2 pt-3 flex-grow">
              {cat.fields?.map((field) => (
                <div className="text-gray bg-white px-3 py-[6px] rounded-[5px]" key={field}>
                  {field}
                </div>
              ))}
            </div>
            <div className="flex gap-3 w-full mt-3">
              <Button
                className="text-gray"
                onClick={() => {
                  setOpenEditId(cat?._id);
                  setSelectedCat(cat);
                }}
                variant={"icon"}
                size={"icon"}
              >
                <BiSolidEditAlt size={20} />
              </Button>

              <Button
                className="text-gray"
                variant={"icon"}
                size={"icon"}
                onClick={() => {
                  setOpenDeleteId(cat?._id);
                  setSelectedCat(cat);
                }}
              >
                <PiTrashSimpleFill />
              </Button>
            </div>
          </div>
        ))}



      {/* ==============edit category modal============ */}

      <Dialog open={openEditId !== null} onOpenChange={handleCloseModal}>
        <DialogContent>
          <DialogTitle>Edit details category</DialogTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col">
                    <label className="text-gray">Name *</label>
                    <Input {...field} className="bg-white border-gray text-gray" placeholder="Enter Product Category Name" type="text"></Input>

                    {fieldState.error && <FormMessage className="text-red text-sm">{fieldState.error.message}</FormMessage>}
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-gray">Fields *</label>
                  <Button onClick={handleAddField} type="button">
                    Add Field
                  </Button>
                </div>
                {fields?.map((field) => (
                  <div key={field.id}>
                    <div className="flex items-center gap-2">
                      <Input
                        defaultValue={field.field}
                        onChange={(e) => handleFieldChange(e.target.value, field.id)}
                        className="bg-white border-gray text-gray"
                        placeholder="Enter Field Name"
                        type="text"
                      ></Input>
                      <div
                        onClick={() => handleRemoveField(field.id)}
                        className="h-10 w-10 rounded-md flex justify-center items-center text-lg border-red border text-red cursor-pointer hover:bg-red hover:text-white"
                      >
                        <HiMiniXMark />
                      </div>
                    </div>
                    {fieldError && fields.find((f) => f.id === field.id)?.field === "" && (
                      <p className="text-red text-sm pt-1">Please enter field name</p>
                    )}
                  </div>
                ))}
                <DialogDescription>{fields.length === 0 && <p className="text-red text-sm">Please add at least one field</p>}</DialogDescription>
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* ===========delete confimation modal=========== */}
      <Dialog open={openDeleteId !== null} onOpenChange={handleCloseModal}>
        <DialogContent>
          <DialogTitle>
            <h1 className="text-red">Detete Category</h1>
          </DialogTitle>
          <div>
            <h3 className="text-gray pb-3">Name: {selectedCat?.name}</h3>
            <DialogDescription className="text-gray">Do you really want to delete this details category?</DialogDescription>

            <div className="flex w-full gap-3 pt-4">
              <Button className="w-full" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button onClick={() => handleDelete(openDeleteId)} className="w-full" variant={"delete_solid"}>
                Yes, delete it
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetailsCategoryInfo;
