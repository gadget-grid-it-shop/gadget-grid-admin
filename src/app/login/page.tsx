'use client'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import login from '@/serverActions/auth/login'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
// import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    email: z.string().email('Invalid email'),
    password: z.string({ required_error: "Please enter your password" })
})

const LoginPage = () => {

    const [passwordHidden, setPasswordHidden] = useState(true)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })


    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await login(values.email, values.password);

        if ('err' in res) {
            // Handle error case
            console.error(res.err);
        } else {
            // Handle success case
            console.log('Login successful:', res.token);
        }
    }

    return (
        <div className='h-screen bg-background-foreground text-black relative w-screen overflow-hidden flex justify-center items-center'>
            <div className='size-80 rounded-full bg-lavender-mist absolute -left-16 -bottom-9'></div>
            <div className='size-[500px] rounded-full bg-light-cyan absolute -right-20 -top-36'></div>

            <div className='min-h-[60vh] bg-background shadow-lg w-1/3 rounded-lg p-8 px-10 flex flex-col justify-center'>
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