import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useDeleteImagesMutation, useGetAllImagesQuery, useUploadImageMutation } from '@/redux/api/uploadFiles'
import { TImage } from '@/interface/image'
import Image from 'next/image'
import { Checkbox } from '../ui/checkbox'
import { Button } from '../ui/button'
import { BiSelectMultiple } from 'react-icons/bi'
import { AiOutlineCloudUpload, AiOutlineDelete, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { MdOutlineAdd } from 'react-icons/md'
import { toast } from 'sonner'
import { useAppDispatch } from '@/redux/hooks'
import { updateProduct } from '@/redux/products/productSlice'
import { useCreateFolderMutation, useGetFoldersQuery } from '@/redux/api/galleryFolderApi'
import { FcFolder } from "react-icons/fc";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '../ui/breadcrumb'
import { FaChevronRight } from 'react-icons/fa6'
import { LuFolderPlus } from 'react-icons/lu'
import { Input } from '../ui/input'

type TProp = {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

type TSelectedImages = {
    public_id: string,
    id: string,
    image: string
}

export interface TGalleryFolder {
    _id: string
    name: string,
    parent_id?: string | null,
}

type TFolderCrumb = {
    id: string,
    name: string
}

const ImageGallery = ({ open, setOpen }: TProp) => {

    const [selected, setSelected] = useState<TSelectedImages[]>([])
    const [deleteImages] = useDeleteImagesMutation()
    const [uploadImage, { isLoading: isUploadLoading }] = useUploadImageMutation()
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)
    const uploadImageRef = useRef<HTMLInputElement | null>(null)
    const dispatch = useAppDispatch()
    const [parentFolder, setParentFolder] = useState('')
    const { data: folders, isLoading: isFolderLoading, refetch: refetchFolders } = useGetFoldersQuery(parentFolder)
    const { data, isLoading, error, refetch: refetchGallery } = useGetAllImagesQuery(parentFolder)
    const [createFolder] = useCreateFolderMutation()
    const [addFolderModal, setAddFolderModal] = useState(false)
    const [folderName, setFolderName] = useState("")

    const [folderCrumb, setFolderCrumb] = useState<TFolderCrumb[]>([{
        id: "",
        name: 'home'
    }])

    const handleImageSelect = (img: TImage) => {
        if (isSelected(img._id)) {
            setSelected(prev => prev.filter((image: TSelectedImages) => image.id !== img._id))
        }
        else {
            setSelected(prev => [...prev, {
                public_id: img.public_id,
                id: img._id,
                image: img.image
            }])
        }
    }

    useEffect(() => {
        refetchFolders()
        refetchGallery()
    }, [parentFolder])


    const isSelected = (id: string) => {
        const exist = selected.find((img: TSelectedImages) => img.id === id)

        if (exist) {
            return true
        }
        return false
    }

    const handleDeleteImages = async () => {

        const public_ids: string[] = []
        const database_ids: string[] = []

        selected.forEach((item: TSelectedImages) => {
            public_ids.push(item.public_id)
            database_ids.push(item.id)
        })

        try {
            const res = await deleteImages({ public_ids, database_ids }).unwrap()
            if (res.success) {
                toast.success(res.message)
                setSelected([])
                setDeleteModalOpen(false)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleUploadClick = () => {
        if (uploadImageRef && uploadImageRef.current) {
            uploadImageRef.current.click()
        }
    }


    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const formData = new FormData();
            Array.from(e.target.files).forEach((file) => {
                formData.append('photos', file);
            });

            formData.append('type', 'product');
            formData.append('folder', parentFolder)

            try {
                const res = await uploadImage(formData).unwrap()
                console.log(res)
                toast.success(res.message)
            } catch (err) {
                console.error('Error uploading images:', err); // Handle the error
            }
        }
    };

    const handleAdd = () => {
        const gallery: string[] = selected.map((item: TSelectedImages) => item.image)

        dispatch(updateProduct({ key: 'gallery', value: gallery }))
        setOpen(false)
    }

    const handleFolderClick = (id: string, name: string) => {
        setParentFolder(id)
        const exist = folderCrumb.find(item => item.id === id)
        if (exist) {
            setFolderCrumb(prev => prev.filter(item => item.id !== id))
        }
        else {
            setFolderCrumb(prev => [...prev, { id, name }])
        }
    }

    const handleAddFolder = async () => {
        try {
            const res = await createFolder({ name: folderName, parent_id: parentFolder }).unwrap()
            if (res.success) {
                setAddFolderModal(false)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const renderFolders = (folders: TGalleryFolder[]) => {
        return <div className='flex flex-wrap gap-5'>
            <div onClick={() => setAddFolderModal(true)} className='bg-lavender-mist size-32 rounded-md flex flex-col gap-2 justify-center items-center'>
                <LuFolderPlus size={25} />
                <p className='text-sm'>Add Folder</p>
            </div>
            {
                folders.map((folder: TGalleryFolder) => {
                    return <div onDoubleClick={() => handleFolderClick(folder._id, folder.name)} key={folder._id} className='bg-background text-black gap-2 w-32 min-h-32 flex flex-col shadow-sm rounded-md p-2 justify-center items-center'>
                        <FcFolder className='text-gray' size={40} />
                        <p className='text-xs line-clamp-2 text-ellipsis'>{folder.name}</p>
                    </div>
                })
            }
        </div>
    }

    const handleCrumbClick = (item: TFolderCrumb, index: number) => {
        setParentFolder(item.id)
        setFolderCrumb(prev => prev.slice(0, index + 1))
    }

    return (
        <>
            <Dialog open={open} onOpenChange={() => setOpen(!open)}>
                <DialogContent className='lg:max-w-[70vw] md:max-w-[80vw] sm:max-w-[85vw] max-w-[95vw]'>
                    <DialogTitle>
                        Image gallery
                    </DialogTitle>
                    {
                        selected.length > 0 && <div className='sticky -top-6 z-50 bg-background-foreground px-3 flex justify-between items-center py-2'>
                            <h2 className='font-semibold'>{selected.length} Selected</h2>

                            <div className='flex gap-3'>
                                <Button onClick={handleAdd} className='gap-2'><MdOutlineAdd size={18} /> Add</Button>
                                <Button variant={'edit'} className='gap-2' onClick={() => setSelected([])}><BiSelectMultiple /> Deselect All</Button>
                                <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant={'delete_solid'} className='gap-2'><AiOutlineDelete /> Delete</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>Delete Photos?</DialogTitle>
                                        <DialogDescription className="text-gray">Do you really want to delete this photos?</DialogDescription>

                                        <div className="flex w-full gap-3 pt-4">
                                            <Button className="w-full" onClick={() => setDeleteModalOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button onClick={handleDeleteImages} className="w-full" variant={"delete_solid"}>
                                                Yes, delete it
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>

                        </div>
                    }

                    {
                        folderCrumb.length > 0 && <Breadcrumb>
                            <BreadcrumbList>
                                {
                                    folderCrumb.map((item, index) => <BreadcrumbItem key={item.id}>
                                        <BreadcrumbPage>
                                            <div className={`flex items-center gap-1 cursor-pointer ${item.id === parentFolder ? 'text-primary' : ''}`} onClick={() => handleCrumbClick(item, index)}>
                                                {item.name} <FaChevronRight size={12} />
                                            </div>
                                        </BreadcrumbPage>
                                    </BreadcrumbItem>)
                                }
                            </BreadcrumbList>
                        </Breadcrumb>
                    }

                    {
                        !isFolderLoading && folders.data.length !== 0 ? renderFolders(folders.data) : <div onClick={() => setAddFolderModal(true)} className='bg-lavender-mist size-32 rounded-md flex flex-col gap-2 justify-center items-center'>
                            <LuFolderPlus size={25} />
                            <p className='text-sm'>Add Folder</p>
                        </div>
                    }

                    <div>
                        {
                            error && <div>
                                <h2>Could not get gallery images. Please try again later</h2>
                            </div>
                        }

                        {
                            !isLoading && !error ? <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 [&>div:not(:first-child)]:mt-4 rounded-md'>
                                {
                                    data?.data?.map((imgData: TImage) => {
                                        return <div key={imgData._id} className='relative group h-fit image-wrapper'>
                                            <Checkbox checked={isSelected(imgData._id)} onClick={() => handleImageSelect(imgData)} className={`${isSelected(imgData._id) ? 'visible' : 'invisible'} transition-all absolute top-4 left-4 checkbox group-hover:visible size-6 bg-lavender-mist`} />
                                            <Image className='h-auto cursor-pointer w-full rounded-md border border-border-color' src={imgData.image} height={imgData.height} width={imgData.width} alt={imgData.name} />

                                            <p className='absolute invisible group-hover:visible z-30 text-xs text-pure-white bg-purple-400/30 bottom-0 p-4 break-all w-full'>{imgData.name}</p>
                                        </div>
                                    })
                                }
                            </div> : <div></div>
                        }


                        <div className='min-h-52 flex justify-center items-center flex-col gap-3'>
                            <h3>upload photos to this folder</h3>
                            <div onClick={handleUploadClick} className='border-2 cursor-pointer flex-1 w-1/3 border-dashed h-full rounded-md border-lavender-mist bg-background text-8xl flex flex-col justify-center items-center'>
                                {
                                    isUploadLoading ? <div className='flex flex-col gap-2 justify-center items-center'>
                                        <AiOutlineLoading3Quarters className='animate-spin text-primary text-6xl' />
                                        <p className='text-base'>uploading, please wait</p>
                                    </div> : <>
                                        <AiOutlineCloudUpload className='text-lavender-mist' />
                                        <h3 className='text-base'><span className='text-primary'>Click</span> or drag and drop here</h3>
                                        <input name='photos' onChange={handleImageUpload} ref={uploadImageRef} type="file" className='hidden' multiple accept='image/*' />
                                    </>
                                }
                            </div>
                        </div>

                    </div>


                </DialogContent>
            </Dialog>




            {/* ====================create folder dialog===================== */}
            <Dialog open={addFolderModal} onOpenChange={setAddFolderModal}>
                <DialogContent>
                    <DialogTitle>
                        Add new folder
                    </DialogTitle>
                    <div className='flex flex-col gap-4'>
                        <Input placeholder='folder name' value={folderName} onChange={(e) => setFolderName(e.target.value)} type='text' />
                        <Button onClick={handleAddFolder}>Add</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ImageGallery