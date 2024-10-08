'use client'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axiosInstance from '@/lib/axiosInstance'
import { globalError } from '@/components/utilities/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    password: z.string({ required_error: "Please enter your password" }).min(6, 'Password has to be at least 6 charecters'),
    confirmPassword: z.string({ required_error: "Please enter your password" })
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords does not match',
    path: ['confirmPassword']
})

const ResetPassword = () => {

    const [passwordHidden, setPasswordHidden] = useState(true)
    const router = useRouter()

    const params = useSearchParams()

    const token = params.get('token')
    const email = params.get('email')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        const { password } = values

        axiosInstance.post(`/auth/reset-password`, { password: password, email }, { headers: { Authorization: token } })
            .then(res => {
                toast.success(res.data.message)
                router.push('/login')
            })
            .catch(err => {
                globalError(err)
            })
    }

    return (

        <div className='min-h-[60vh] bg-background shadow-lg 2xl:w-1/3 lg:w-1/2 md:w-[70vw] w-[90vw] rounded-lg p-8 min-[540px]:px-10 px-5 flex flex-col justify-center z-50'>
            <Image className='mx-auto pb-4' src={'/gadget-grid-logo.png'} height={100} width={200} alt='gadget grid logo' />
            <h2 className='text-2xl font-bold text-center pb-4 text-primary'>Reset Password!</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <label>Password *</label>
                                <div className='relative'>
                                    <Input className='bg-background-foreground' {...field} type={passwordHidden ? 'password' : 'text'} placeholder='Enter your password' />
                                    <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2' onClick={() => setPasswordHidden(!passwordHidden)}>
                                        {
                                            passwordHidden ? <FaRegEyeSlash /> : <FaRegEye />
                                        }
                                    </button>
                                </div>
                                {
                                    fieldState.error && <p className='text-red text-sm'>{fieldState.error.message}</p>
                                }
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='confirmPassword'
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <label>Confirm Password *</label>
                                <div className='relative'>
                                    <Input className='bg-background-foreground' {...field} type={passwordHidden ? 'password' : 'text'} placeholder='Enter your password' />
                                    <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2' onClick={() => setPasswordHidden(!passwordHidden)}>
                                        {
                                            passwordHidden ? <FaRegEyeSlash /> : <FaRegEye />
                                        }
                                    </button>
                                </div>
                                {
                                    fieldState.error && <p className='text-red text-sm'>{fieldState.error.message}</p>
                                }
                            </FormItem>
                        )}
                    />

                    <Button className='mt-3'>Reset</Button>

                </form>
            </Form>
        </div>

    )
}

export default ResetPassword