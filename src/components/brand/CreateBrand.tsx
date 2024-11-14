import React, { useState } from 'react';
import Modal from '../custom/Modal';
import { Form, FormField, FormItem } from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const addBrandSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name should be string',
  }),
  image: z.string({ invalid_type_error: 'Name should be string' }).optional(),
});

const CreateBrand = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof addBrandSchema>>({
    resolver: zodResolver(addBrandSchema),
    defaultValues: {
      name: '',
      image: '',
    },
  });

  const handleAddAdmin = async (values: z.infer<typeof addBrandSchema>) => {
    console.log(values);
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Add new brand"
      triggerText="Add Brand"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAddAdmin)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <div className="flex flex-col gap-2">
                  <label>Name *</label>
                  <Input {...field} placeholder="Enter first name" />
                </div>
                {fieldState.error && (
                  <p className="text-red">{fieldState.error.message}</p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <div className="flex flex-col gap-2">
                  <label>Name *</label>
                  <Input {...field} placeholder="Enter first name" />
                </div>
                {fieldState.error && (
                  <p className="text-red">{fieldState.error.message}</p>
                )}
              </FormItem>
            )}
          />
        </form>
      </Form>
    </Modal>
  );
};

export default CreateBrand;
