import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

const CreateNewDetailsCategory = () => {
    return (
        <div>
            <Dialog>
                <DialogTrigger>

                    <button className='primary-btn'> <FaPlus /> Create Details Category</button>
                </DialogTrigger>
                <DialogContent>
                    <div className='text-black'>
                        hello
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CreateNewDetailsCategory