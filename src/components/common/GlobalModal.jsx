import { Modal } from 'antd'
import React from 'react'
import { IoClose } from "react-icons/io5";

const GlobalModal = ({ children, open, onCancel, width = 600, title, ...restOfProps }) => {
    return (
        <Modal
            open={open}
            onCancel={onCancel}
            centered
            width={width}
            footer={false}
            maskClosable={false}
            closable={false}
            title={<div className='bg-primary flex justify-between items-center py-4 text-white px-2 rounded-md'>
                {title}
                <button onClick={onCancel}>
                    <IoClose className='text-xl' />
                </button>
            </div>}
            {...restOfProps}
        >
            {children}
        </Modal>
    )
}

export default GlobalModal