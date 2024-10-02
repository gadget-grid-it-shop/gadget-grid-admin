'use client'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axiosInstance from '@/lib/axiosInstance'
// import { verifyToken } from '@/lib/utils'
import { useAppDispatch } from '@/redux/hooks'
import { updateAuthData } from '@/redux/reducers/auth/authSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { toast } from 'sonner'
// import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string({ required_error: "Please enter your password" })
})

const LoginPage = () => {

    const [passwordHidden, setPasswordHidden] = useState(true)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: 'khanmahmud994@gmail.com',
            password: 'Mahmud@994'
        }
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        const { email, password } = values

        axiosInstance.post(`/auth/admin-login`, { email, password })
            .then(res => {
                toast.success(res.data.message)
                // const decodedData = verifyToken(res?.data?.data?.accessToken as string)
                dispatch(updateAuthData({
                    isAuthenticated: true,
                    token: res.data.data.accessToken,
                    isVerified: false,
                    permissions: [],
                    role: null,
                    user: null
                }))
                setTimeout(() => {
                    router.push('/')
                }, 100);
            }).catch(err => {
                console.log(err)
            })
    }

    return (
        <div className='h-screen bg-background-foreground text-black relative w-screen overflow-hidden flex justify-center items-center'>
            <div className='lg:size-80 md:size-64 size-40 rounded-full bg-lavender-mist absolute -left-16 -bottom-9'></div>
            <div className='lg:size-[500px] md:size-[400px] size-80 rounded-full bg-light-cyan absolute -right-20 -top-36'></div>

            <div className='min-h-[60vh] bg-background shadow-lg 2xl:w-1/3 lg:w-1/2 md:w-[70vw] w-[90vw] rounded-lg p-8 min-[540px]:px-10 px-5 flex flex-col justify-center z-50'>
                <Image className='mx-auto pb-4' src={'/gadget-grid-logo.png'} height={100} width={200} alt='gadget grid logo' />
                <h2 className='text-2xl font-bold text-center pb-6 text-primary'>Welcome Back!</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <label>Email *</label>
                                    <Input className='bg-background-foreground' {...field} type='email' placeholder='Enter your email' />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
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
                                </FormItem>
                            )}
                        />

                        <Button className='mt-3'>Login</Button>

                        <button type='button' className='text-sm'>Forgot password? <span className='text-primary text-base'>reset</span></button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage