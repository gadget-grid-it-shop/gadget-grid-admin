"use client";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import React, {useEffect, useState} from "react";
import {FaPlus} from "react-icons/fa6";
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "../ui/dialog";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {HiMiniXMark} from "react-icons/hi2";
import {useForm} from "react-hook-form";
import {Form, FormField, FormItem, FormMessage} from "../ui/form";

interface Field {
  field: string;
  id: string;
}

const nameSchema = z.object({
  name: z
    .string({
      required_error: "Product category name is required",
    })
    .min(1, {message: "Product category name is required"})
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

const CreateNewDetailsCategory = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [fieldError, setFieldError] = useState(false);

  useEffect(() => {
    setFields([
      {
        field: "",
        id: generateID(),
      },
    ]);
  }, []);

  const form = useForm<z.infer<typeof nameSchema>>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof nameSchema>) {
    setFieldError(false);
    console.log(values);

    const result = fieldSchema.safeParse(fields);

    if (result.success === false) {
      setFieldError(true);
      return;
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

  console.log(fields);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <button className="primary-btn">
            <FaPlus /> Create Details Category
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Create details category</DialogTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({field, fieldState}) => (
                  <FormItem className="flex flex-col">
                    <label>Name *</label>
                    <Input {...field} className="bg-white border-gray" placeholder="Enter Product Category Name" type="text"></Input>

                    {fieldState.error && <FormMessage className="text-red text-sm">{fieldState.error.message}</FormMessage>}
                  </FormItem>
                )}
              />

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label>Fields *</label>
                  <Button onClick={handleAddField} type="button">
                    Add Field
                  </Button>
                </div>
                {fields?.map((field) => (
                  <div key={field.id}>
                    <div className="flex items-center gap-2">
                      <Input
                        onChange={(e) => handleFieldChange(e.target.value, field.id)}
                        className="bg-white border-gray"
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
                {fields.length === 0 && <p className="text-red text-sm">Please add at least one field</p>}
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateNewDetailsCategory;
