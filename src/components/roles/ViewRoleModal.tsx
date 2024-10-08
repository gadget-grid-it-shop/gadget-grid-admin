import { TPermission, TRole } from '@/interface/auth.interface'
import React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog'

type TProps = {
    viewData: TRole | null,
    setOpen: React.Dispatch<React.SetStateAction<null | TRole>>
}

const ViewRoleModal = ({ viewData, setOpen }: TProps) => {
    return (
        <div>
            <Dialog open={viewData !== null} onOpenChange={() => setOpen(null)}>
                <DialogContent className='max-w-[50vw]'>
                    <DialogTitle>
                        Role Details
                    </DialogTitle>
                    <DialogDescription className='capitalize font-semibold text-base'>
                        <h3>Role: <span className='text-primary'>{viewData?.role}</span></h3>
                    </DialogDescription>

                    <div>
                        <h3 className='text-black font-semibold text-base'>Description:</h3>
                        <p className='border border-border-color bg-background p-4 rounded-md mt-3 text-gray'>{viewData?.description}</p>
                    </div>

                    <div>
                        <h3 className='text-black font-semibold text-base'>Permissions:</h3>
                        <div className='pt-2 grid lg:grid-cols-3 gap-2'>
                            {
                                viewData?.permissions.map((permission: TPermission) => <div className='p-3 rounded-md bg-background' key={permission.feature}>
                                    <h4 className='capitalize'>{permission.feature}</h4>
                                </div>)
                            }
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ViewRoleModal