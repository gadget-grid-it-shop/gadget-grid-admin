'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { globalError } from '@/lib/utils'
import { TRole } from '@/interface/auth.interface'
import { useGetRolesQuery } from '@/redux/api/rolesApi'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import TableSkeleton from '@/components/shared/TableSkeleton'
import ViewRoleModal from '@/components/roles/ViewRoleModal'

const Roles = () => {

    const { data: rolesData, isLoading, error } = useGetRolesQuery(undefined)
    const [veiwData, setViewData] = useState<TRole | null>(null)

    if (!isLoading && error) {
        globalError(error)
    }

    console.log(rolesData?.data)

    return (
        <div className='w-full'>
            <div className="flex justify-between items-center pb-4">
                <h4 className="page-title">User Roles</h4>
                {/* <CreateCategory open={open} setOpen={setOpen} parent={parent} setParent={setParent} /> */}
            </div>

            {!isLoading && error !== undefined && <div className="h-48 flex justify-center items-center text-gray">Could not get roles</div>}

            {
                isLoading ? <TableSkeleton /> :

                    <Table className=''>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Serial</TableHead>
                                <TableHead>Role Title</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                rolesData?.data?.map((role: TRole, i: number) => <TableRow key={role._id}>
                                    <TableCell className="font-medium w-48">{i + 1}</TableCell>
                                    <TableCell className='text-primary font-semibold capitalize w-80'>{role.role}</TableCell>
                                    <TableCell>
                                        <p className='line-clamp-2 overflow-hidden text-ellipsis whitespace-normal max-w-[400px]'>
                                            {role.description}
                                        </p>
                                    </TableCell>
                                    <TableCell className="flex gap-3">
                                        <Button onClick={() => setViewData(role)} variant={'view_button'} size={'base'}></Button>
                                        <Button variant={'edit_button'} size={'base'}></Button>
                                        <Button variant={'delete_button'} size={'base'}></Button>
                                    </TableCell>
                                </TableRow>)
                            }
                        </TableBody>
                    </Table>
            }

            <ViewRoleModal viewData={veiwData} setOpen={setViewData} />
        </div>
    )
}

export default Roles