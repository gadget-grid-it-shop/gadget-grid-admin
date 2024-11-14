import React, { useState } from 'react';
import Modal from '../custom/Modal';
import { Form, FormField, FormItem } from '../ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '../ui/input';

// type TProps = {
//     open: boolean,
//     setOpen: Dispatch<SetStateAction<boolean>>
// }

const CreateBrand = () => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      name: '',
    },
  });

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Add new brand"
      triggerText="Add Brand"
    >
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <div className="flex flex-col gap-2">
                  <label>First Name *</label>
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
