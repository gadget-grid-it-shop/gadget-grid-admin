import React, { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useRef, useState } from 'react'
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
import { updateProduct } from '@/redux/reducers/products/productSlice'
import { useCreateFolderMutation, useGetFoldersQuery, useUpdateFolderMutation } from '@/redux/api/galleryFolderApi'
import { FcFolder } from "react-icons/fc";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '../ui/breadcrumb'
import { FaChevronRight } from 'react-icons/fa6'
import { LuFolderPlus } from 'react-icons/lu'
import { Input } from '../ui/input'
import { BiSolidEditAlt } from "react-icons/bi";
import { PiTrashSimpleFill } from "react-icons/pi";

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
    const { data: folders, isLoading: isFolderLoading, refetch: refetchFolders, error: folderFetchError } = useGetFoldersQuery(parentFolder)
    const { data, isLoading, error, refetch: refetchGallery } = useGetAllImagesQuery(parentFolder)
    const [updateFolder] = useUpdateFolderMutation()
    const [createFolder] = useCreateFolderMutation()
    const [addFolderModal, setAddFolderModal] = useState(false)
    const [folderName, setFolderName] = useState("")
    const [editOpen, setEditOpen] = useState(false)
    const [deleteFolderOpen, setDeleteFolderOpen] = useState(false)
    const [contextOpen, setContextOpen] = useState<string | null>(null)

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
    }, [parentFolder, refetchFolders, refetchGallery])


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
                setFolderName('')
            }
            else {
                toast.error(res?.message)
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (err: any) {
            console.log(err)
            toast.error(err?.data?.message)
        }
    }

    const handleEditFolder = async (id: string) => {
        if (folderName) {
            try {
                const res = await updateFolder({ id, name: folderName }).unwrap()
                if (res.success) {
                    toast.success(res.message)
                    setEditOpen(false)
                    setFolderName("")
                    setContextOpen(null)
                }
            }
            catch (err) {
                console.log(err)
                toast.error("Update failed, please try again later")
            }
        }
        else {
            toast.warning('Please write something')
        }
    }

    console.log(folderName)

    // const handleDeleteFolder = async (id: string) => {

    // }

    const handleContextMenu = (e: MouseEvent<HTMLDivElement>, folder: TGalleryFolder) => {
        e.preventDefault()
        if (contextOpen === folder._id) {
            setContextOpen(null)
            setFolderName('')
        }
        else {
            setContextOpen(folder._id)
            setFolderName(folder.name)
        }
    }

    const renderFolders = (folders: TGalleryFolder[]) => {
        return <div className='flex flex-wrap gap-5'>
            <div onClick={() => setAddFolderModal(true)} className='bg-lavender-mist size-32 rounded-md flex flex-col gap-2 justify-center items-center'>
                <LuFolderPlus className='text-gray' size={25} />
                <p className='text-sm'>Add Folder</p>
            </div>
            {
                folders.map((folder: TGalleryFolder) => {
                    return <div
                        onContextMenu={(e) => handleContextMenu(e, folder)}
                        onTouchEnd={() => handleFolderClick(folder._id, folder.name)}
                        onDoubleClick={() => handleFolderClick(folder._id, folder.name)}
                        key={folder._id}
                        className='bg-background text-black gap-2 w-32 min-h-32 flex flex-col shadow-sm rounded-md p-2 justify-center items-center relative'>
                        <FcFolder className='text-gray' size={40} />
                        <p className='text-xs line-clamp-2 text-ellipsis'>{folder.name}</p>


                        {
                            contextOpen && contextOpen === folder._id && <div className='absolute bottom-0 flex w-full justify-between transition-all'>
                                <Dialog open={editOpen} onOpenChange={setEditOpen}>
                                    <DialogTrigger>
                                        <Button variant={'icon'} className='text-sm'><BiSolidEditAlt /></Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>
                                            Edit folder name
                                        </DialogTitle>
                                        <div className='flex flex-col gap-4'>
                                            <Input placeholder='folder name' defaultValue={folderName} onChange={(e) => setFolderName(e.target.value)} type='text' />
                                            <Button onClick={() => handleEditFolder(folder._id)}>Edit</Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <Dialog open={deleteFolderOpen} onOpenChange={setDeleteFolderOpen}>
                                    <DialogTrigger>
                                        <Button variant={'icon'} className='text-sm'><PiTrashSimpleFill /></Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>
                                            Delete folder
                                        </DialogTitle>

                                        <DialogDescription className='text-red'>
                                            <h2>Warning!</h2>
                                            <p>This is a desctructive </p>
                                        </DialogDescription>
                                        <div className='flex flex-col gap-4'>
                                            {/* <Button onClick={() => handleDeleteFolder(folder._id)}>Edit</Button> */}
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        }

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
                        !isFolderLoading && !folderFetchError && folders?.data?.length !== 0 ? renderFolders(folders.data) : <div onClick={() => setAddFolderModal(true)} className='bg-lavender-mist size-32 rounded-md flex flex-col gap-2 justify-center items-center'>
                            <LuFolderPlus className='text-gray' size={25} />
                            <p className='text-sm'>Add Folder</p>
                        </div>
                    }

                    <div>
                        {
                            error && <div>
                                <h2 className='text-center'>Could not get gallery images. Please try again later</h2>
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


                        <div className='min-h-52 flex justify-center items-center flex-col gap-3 mt-4'>
                            <div onClick={handleUploadClick} className='border-2 min-w-44 px-3 cursor-pointer flex-1 w-1/3 border-dashed h-full rounded-md border-lavender-mist bg-background text-8xl flex flex-col justify-center items-center'>
                                {
                                    isUploadLoading ? <div className='flex flex-col gap-2 justify-center items-center'>
                                        <AiOutlineLoading3Quarters className='animate-spin text-primary text-6xl' />
                                        <p className='text-base'>uploading, please wait</p>
                                    </div> : <>
                                        <h3 className='text-base'>upload photos to this folder</h3>
                                        <AiOutlineCloudUpload className='text-lavender-mist' />
                                        <h3 className='text-base text-primary'>Click here</h3>
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