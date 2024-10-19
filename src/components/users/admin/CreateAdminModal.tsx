// import Divider from '@/components/custom/Divider'
import { TSelectOptions } from '@/components/categories/interface';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import SingleSelector from '@/components/ui/singleSelect';
import { TRole } from '@/interface/auth.interface';
import { useGetRolesQuery } from '@/redux/api/rolesApi';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'sonner';
import { z } from 'zod';

type TProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const createAdminSchema = z.object({
  email: z
    .string({ required_error: 'User name is required' })
    .email('Not a valid email'),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(6, 'Password must be at least 6 characters'),
});

const CreateAdminModal = ({ open, setOpen }: TProps) => {
  const { data: roleData } = useGetRolesQuery(undefined);
  const [selectedRole, setSelectedRole] = useState<TSelectOptions | null>(null);
  const [roleError, setRoleError] = useState(false);
  const form = useForm<z.infer<typeof createAdminSchema>>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const selectOptions = roleData?.data?.map((role: TRole) => {
    return {
      label: role.role,
      value: role._id,
    };
  });

  function onSubmit(values: z.infer<typeof createAdminSchema>) {
    setRoleError(false);
    if (!selectedRole) {
      setRoleError(true);
      toast.error('Please select role');
    }
    console.log(values, selectedRole);
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="primary-btn">
          <FiPlus size={18} />
          Create Admin
        </DialogTrigger>
        <DialogContent className="medium-modal">
          <DialogTitle>Create new admin</DialogTitle>

          {/* <Divider text={"credentials"} /> */}
          <Form {...form}>
            <form
              className="flex flex-col gap-3"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <div className="flex flex-col gap-2">
                      <label>Email *</label>
                      <Input {...field} placeholder="Enter user email" />
                    </div>
                    {fieldState.error && (
                      <p className="text-red">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <div className="flex flex-col gap-2">
                      <label>Password *</label>
                      <Input {...field} placeholder="Enter a simple password" />
                    </div>
                    {fieldState.error && (
                      <p className="text-red">{fieldState.error.message}</p>
                    )}
                  </FormItem>
                )}
              />
              {/* <FormField
                control={form.control}
                name="role"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <div className="flex flex-col gap-2">
                      <label>Role *</label>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roleData?.data?.map((role: TRole) => (
                            <SelectItem key={role._id} value={role._id}>
                              {role.role}
                            </SelectItem>
                          ))}

                          <SelectItem value="m@examdfdple.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@googdfdle.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@supfdfdport.com">
                            m@support.com
                          </SelectItem>
                          <SelectItem value="m@exfdfdample.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@gofdfdogle.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@supfdf dsfport.com">
                            m@support.com
                          </SelectItem>
                          <SelectItem value="m@exafdfdmple.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@goo sdf sdf gle.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@supdfsd fsdport.com">
                            m@support.com
                          </SelectItem>
                          <SelectItem value="m@exaf sdfsd mple.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@goosdfsdgle.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@supfsd fsdf port.com">
                            m@support.com
                          </SelectItem>
                          <SelectItem value="m@goo sdfd  sdf gle.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@supdfsdd fds ds fsdport.com">
                            m@support.com
                          </SelectItem>
                          <SelectItem value="m@exaf  dfs sdfsd mple.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@goosdd sf sdfsdgle.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@supff sdfdsd fsdf port.com">
                            m@support.com
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.error && (
                        <p className="text-red">{fieldState.error.message}</p>
                      )}
                    </div>
                  </FormItem>
                )}
              /> */}

              <div className="flex flex-col gap-2">
                <label>Role *</label>
                <SingleSelector
                  options={selectOptions}
                  value={selectedRole || undefined}
                  onChange={(value) => {
                    setSelectedRole(value);
                    setRoleError(false);
                  }}
                />

                {roleError && <p className="text-red">Select role</p>}
              </div>

              <div className="flex w-full justify-between gap-3">
                <Button
                  type="button"
                  className="w-full"
                  variant={'delete_solid'}
                >
                  Cancel
                </Button>
                <Button className="w-full">Create</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateAdminModal;
