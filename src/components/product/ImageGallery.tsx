import React, { Dispatch, SetStateAction } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { useGetAllImagesQuery } from '@/redux/api/uploadFiles'
import { TImage } from '@/interface/image'
import Image from 'next/image'

type TProp = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ImageGallery = ({ open, setOpen }: TProp) => {


    const { data, isLoading, error } = useGetAllImagesQuery(undefined)

    console.log(data?.data)

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent className='lg:max-w-[70vw] md:max-w-[80vw] sm:max-w-[85vw] max-w-[95vw]'>
                <DialogTitle>
                    Image gallery
                </DialogTitle>
                {
                    error && <div>
                        <h2>Could not get gallery images. Please try again later</h2>
                    </div>
                }

                {
                    !isLoading && !error ? <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [&>img:not(:first-child)]:mt-4 rounded-md'>
                        {
                            data?.data?.map((imgData: TImage) => {
                                return <Image key={imgData._id} className='h-auto cursor-pointer w-full rounded-md border border-border-color' src={imgData.image} height={imgData.height} width={imgData.width} alt={imgData.name} />
                            })
                        }
                    </div> : <></>
                }


            </DialogContent>
        </Dialog>
    )
}

export default ImageGallery