import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'
import { FiPlus } from 'react-icons/fi'
import { Form, FormField, FormItem } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { MultiSelect } from '../ui/multiselect'

type TCategoryProps = {
    parent_id?: string | null | undefined,
    fetchCategories: () => void
}

const CategorySchema = z.object({
    name: z.string({ required_error: 'Category name is required' }),
    parent_id: z.string().optional(),
})

const CreateCategory = ({ parent_id, fetchCategories }: TCategoryProps) => {

    const [open, setOpen] = useState(false)
    const [productDetailsCategories, setProductDetailsCategories] = useState<string[]>([])

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            name: '',
            parent_id: undefined,
        }
    })

    useEffect(() => {
        if (parent_id) {
            form.reset({
                name: 'dfsdfsdfsdf',
                parent_id: parent_id
            })
        }
    }, [parent_id, form])

    const onsubmit = (values: z.infer<typeof CategorySchema>) => {
        console.log(values)
    }

    console.log(form.formState.errors)

    return (
        <div>
            <Dialog open={open} onOpenChange={() => setOpen(!open)}>
                <DialogTrigger className='primary-btn'>
                    <FiPlus size={18} /> Create Category
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Create New Category</DialogTitle>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onsubmit)} className='flex flex-col gap-4'>
                            <FormField control={form.control} name='name' render={({ field }) => (
                                <FormItem>
                                    <label className='text-black'>Name *</label>
                                    <Input {...field} placeholder='Enter category name' type='text' />
                                </FormItem>
                            )} />
                            {
                                parent_id && <FormField control={form.control} name='parent_id' render={({ field }) => (
                                    <FormItem>
                                        <label className='text-black'>Parent Id</label>
                                        <Input {...field} placeholder='Enter category name' type='text' />
                                    </FormItem>
                                )} />
                            }
                            <div>
                                <label className='text-black'>Product Details Category *</label>
                                <MultiSelect
                                    className='mt-2 text-gray'
                                    onValueChange={setProductDetailsCategories}
                                    defaultValue={productDetailsCategories}
                                    placeholder='Select product details category'
                                    options={[]}

                                />
                            </div>
                        </form>


                        <Button>Create</Button>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateCategory