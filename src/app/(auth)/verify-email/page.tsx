'use client'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axiosInstance from '@/lib/axiosInstance'
import { globalError } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const formSchema = z.object({
    email: z.string().email('Invalid email'),
})

const VerifyEmail = () => {

    const router = useRouter()
    const searchParams = useSearchParams()

    const [isSending, setSending] = useState(false)

    useEffect(() => {
        const token = searchParams.get('token')
        const email = searchParams.get('email')

        if (email && token) {
            axiosInstance.post('/auth/verify-email', { email }, { headers: { Authorization: token } })
                .then(res => {
                    console.log(res)
                    if (res.data.data) {
                        toast.success(res.data?.message)
                        router.push('/login')
                    }
                }).catch(err => {
                    console.log(err)
                    globalError(err.response)
                    router.push('/login')
                })
        }
    }, [searchParams])

    const resetForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: 'khanmahmud994@gmail.com',
        }
    })


    function resetFormSubmit(values: z.infer<typeof formSchema>) {
        const { email } = values
        setSending(true)

        axiosInstance.post(`/auth/send-verification`, { email })
            .then(res => {
                toast.success(res.data.message)
                setSending(false)
            }).catch(err => {
                console.log(err.response)
                globalError(err.response)
                setSending(false)
            })
    }

    return (

        <div className='min-h-[40vh] bg-background shadow-lg 2xl:w-1/3 lg:w-1/2 md:w-[70vw] w-[90vw] rounded-lg p-8 min-[540px]:px-10 px-5 flex flex-col justify-center z-50'>

            <Form {...resetForm}>
                <form onSubmit={resetForm.handleSubmit(resetFormSubmit)} className='flex flex-col gap-5'>
                    <Image className='mx-auto' src={'/gadget-grid-logo.png'} height={100} width={200} alt='gadget grid logo' />
                    <h2 className='text-2xl font-bold text-center text-primary'>Verify Your Email!</h2>
                    <FormField
                        control={resetForm.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <label>Email *</label>
                                <Input className='bg-background-foreground' {...field} type='email' placeholder='Enter your email' />
                            </FormItem>
                        )}
                    />

                    <Button loading={isSending} className='mt-3'>Send Verification Link</Button>
                </form>
            </Form>

            <button type='button' className='text-base mt-3'>Go back to <span onClick={() => router.push('/login')} className='text-primary text-base'>login</span></button>


        </div>
    )
}

export default VerifyEmail