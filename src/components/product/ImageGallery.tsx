import React, { Dispatch, SetStateAction, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { useDeleteImagesMutation, useGetAllImagesQuery } from '@/redux/api/uploadFiles'
import { TImage } from '@/interface/image'
import Image from 'next/image'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import { BiSelectMultiple } from 'react-icons/bi'
import { AiOutlineDelete } from 'react-icons/ai'
import { MdOutlineAdd } from 'react-icons/md'

type TProp = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

type TSelectedImages = {
    public_id: string,
    id: string
}

const ImageGallery = ({ open, setOpen }: TProp) => {


    const { data, isLoading, error } = useGetAllImagesQuery(undefined)
    const [selected, setSelected] = useState<TSelectedImages[]>([])
    const [deleteImages] = useDeleteImagesMutation()

    const handleImageSelect = (img: TImage) => {
        if (isSelected(img._id)) {
            setSelected(prev => prev.filter((image: TSelectedImages) => image.id !== img._id))
        }
        else {
            setSelected(prev => [...prev, {
                public_id: img.public_id,
                id: img._id
            }])
        }
    }


    const isSelected = (id: string) => {
        const exist = selected.find((img: TSelectedImages) => img.id === id)

        if (exist) {
            return true
        }
        return false
    }

    const handleDeleteImages = async () => {
        console.log('clicked delete')

        const public_ids: string[] = []
        const database_ids: string[] = []

        selected.forEach((item: TSelectedImages) => {
            public_ids.push(item.public_id)
            database_ids.push(item.id)
        })

        try {
            const res = await deleteImages({ public_ids, database_ids }).unwrap()
            console.log(res)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)}>
            <DialogContent className='lg:max-w-[70vw] md:max-w-[80vw] sm:max-w-[85vw] max-w-[95vw]'>
                <DialogTitle>
                    Image gallery
                </DialogTitle>
                {
                    selected.length > 0 && <div className='sticky -top-6 z-50 bg-background-foreground px-3 flex justify-between items-center py-2'>
                        <h2 className='font-semibold'>{selected.length} Selected</h2>

                        <div className='flex gap-3'>
                            <Button className='gap-2'><MdOutlineAdd size={18} /> Add</Button>
                            <Button variant={'edit'} className='gap-2' onClick={() => setSelected([])}><BiSelectMultiple /> Deselect All</Button>
                            <Button onClick={handleDeleteImages} variant={'delete_solid'} className='gap-2'><AiOutlineDelete /> Delete</Button>
                        </div>

                    </div>
                }
                {
                    error && <div>
                        <h2>Could not get gallery images. Please try again later</h2>
                    </div>
                }

                {
                    !isLoading && !error ? <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [&>img:not(:first-child)]:pt-4 rounded-md'>
                        {
                            data?.data?.map((imgData: TImage) => {
                                return <div key={imgData._id} className='relative group'>
                                    <Checkbox checked={isSelected(imgData._id)} onClick={() => handleImageSelect(imgData)} className={`${isSelected(imgData._id) ? 'visible' : 'invisible'} transition-all absolute top-4 left-4 checkbox group-hover:visible size-6 bg-lavender-mist`} />
                                    <Image className='h-auto cursor-pointer w-full rounded-md border border-border-color' src={imgData.image} height={imgData.height} width={imgData.width} alt={imgData.name} />

                                    <p className='absolute invisible group-hover:visible z-30 text-xs text-pure-white bg-purple-400/30 bottom-0 p-4 break-all w-full'>{imgData.name}</p>
                                </div>
                            })
                        }
                    </div> : <></>
                }


            </DialogContent>
        </Dialog>
    )
}

export default ImageGallery