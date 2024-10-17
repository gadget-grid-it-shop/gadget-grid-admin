'use client'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axiosInstance from '@/lib/axiosInstance'
import { globalError } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { setVerificationSentTime } from '@/redux/reducers/auth/authSlice'
import dayjs from '@/components/utilities/Customdayjs'

const formSchema = z.object({
    email: z.string().email('Invalid email'),
})

const VerifyEmail = () => {

    const router = useRouter()
    const searchParams = useSearchParams()
    const [isSending, setSending] = useState(false)
    const { verificationSentTime } = useAppSelector(s => s.auth)
    const dispatch = useAppDispatch()


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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    const verifyForm = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: 'khanmahmud994@gmail.com',
        }
    })


    function verifySubmit(values: z.infer<typeof formSchema>) {

        const verifyLinkSentMinutes = dayjs().diff(dayjs(verificationSentTime), 'minutes')

        if (verificationSentTime !== null && verifyLinkSentMinutes <= 5) {
            return toast.warning(`A email with reset link has already been sent to your address. Please try again ${dayjs(verificationSentTime)?.add(5, 'minutes')?.from(dayjs())}`)
        }

        const { email } = values
        setSending(true)

        axiosInstance.post(`/auth/send-verification`, { email })
            .then(res => {
                toast.success(res.data.message)
                dispatch(setVerificationSentTime(dayjs().toISOString()))
                setSending(false)
            }).catch(err => {
                dispatch(setVerificationSentTime(null))
                console.log(err.response)
                globalError(err.response)
                setSending(false)

            })
    }


    return (

        <div className='min-h-[40vh] bg-background shadow-lg 2xl:w-1/3 lg:w-1/2 md:w-[70vw] w-[90vw] rounded-lg p-8 min-[540px]:px-10 px-5 flex flex-col justify-center z-50'>

            <Form {...verifyForm}>
                <form onSubmit={verifyForm.handleSubmit(verifySubmit)} className='flex flex-col gap-5'>
                    <Image className='mx-auto' src={'/gadget-grid-logo.png'} height={100} width={200} alt='gadget grid logo' />
                    <h2 className='text-2xl font-bold text-center text-primary'>Verify Your Email!</h2>
                    <FormField
                        control={verifyForm.control}
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