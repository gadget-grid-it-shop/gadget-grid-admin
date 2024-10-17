'use client'
import TableSkeleton from '@/components/shared/TableSkeleton'
import { TAdminData } from '@/interface/admin.interface'
import { globalError } from '@/lib/utils'
import { useGetAllAdminsQuery } from '@/redux/api/usersApi'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { FaUser, FaAdjust } from 'react-icons/fa'

const Admins = () => {

    const { data: adminData, isLoading, error } = useGetAllAdminsQuery(undefined)

    if (!isLoading && error) {
        globalError(error)
    }

    return (
        <div>
            <div className="flex justify-between items-center pb-4">
                <h4 className="page-title">Admins</h4>
                {/* <CreateCategory open={open} setOpen={setOpen} parent={parent} setParent={setParent} /> */}
            </div>


            {isLoading ? <TableSkeleton />
                :
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Serial</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead>Varified</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            adminData?.data?.map((admin: TAdminData, i: number) => <TableRow key={admin?._id}>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{`${admin?.name?.firstName} ${admin?.name?.lastName}`}</TableCell>
                                <TableCell className='flex items-center gap-3'>
                                    {/* <Image src={admin?.profilePicture} alt={admin?.name?.firstName} width={30} height={30} className='size-8 rounded-full' /> */}
                                    <Avatar>
                                        <AvatarImage className='object-cover size-10' src={admin?.profilePicture} />
                                        <AvatarFallback className="capitalize">
                                            <div className='size-10 flex justify-center items-center bg-background rounded-full'>
                                                <FaUser />
                                            </div>
                                        </AvatarFallback>
                                    </Avatar>
                                    {admin?.email}
                                </TableCell>
                                <TableCell className='font-semibold'>
                                    {
                                        !admin?.role?.isDeleted ? <p className='text-gray'>{admin?.role?.role}</p> : <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger><p className='text-red'>{admin?.role?.role}</p></TooltipTrigger>
                                                <TooltipContent>The role was probably deleted</TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    }
                                </TableCell>
                                <TableCell className='font-semibold'>{admin?.user?.isActive ? <p className='text-green-600'>True</p> : <p className='text-red'>False</p>}</TableCell>
                                <TableCell className='font-semibold'>{admin?.user?.isVerified ? <p className='text-green-600'>True</p> : <p className='text-red'>False</p>}</TableCell>
                                <TableCell>
                                    <div className='flex gap-3 items-center'>
                                        <Button variant={'view_button'} size={'base'}></Button>
                                        <Button variant={'edit_button'} size={'base'}></Button>
                                        <Button variant={'delete_button'} size={'base'}></Button>
                                    </div>
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
            }

            {!isLoading && error !== undefined && (<div className="h-48 flex justify-center items-center text-gray">Admin data unavailable</div>)}
        </div>
    )
}

export default Admins