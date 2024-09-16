'use client'
import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog'


const CreateNewDetailsCategory = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger>

                    <button className='primary-btn'><FaPlus />  Create Details Category</button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Create details category</DialogTitle>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateNewDetailsCategory