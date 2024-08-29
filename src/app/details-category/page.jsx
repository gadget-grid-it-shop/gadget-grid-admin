'use client'
import GlobalModal from '@/components/common/GlobalModal';
import { Button, Form, Input } from 'antd';
import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import DetailsCategoryInfo from '@/components/details-category/DetailsCategoryInfo';

const DetailsCategory = () => {

    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = (values) => {
        axios.post(`${process.env.NEXT_PUBLIC_URL}/product-details-category/create`, values)
            .then(res => {
                console.log(res)
            })
            .then(err => {
                console.log(err)
            })
    }

    const onFinishFailed = (error) => {
        console.log(error)
    }

    return (
        <>
            <div className='pt-4'>
                <div className='flex justify-between items-center'>
                    <h4 className="text-black page-title">Product Details Category </h4>
                    <button className='primary-btn' onClick={() => setIsOpen(true)}> <FaPlus /> Create Details Category</button>
                </div>

                {/* <DetailsCategoryInfo /> */}
            </div>

            <GlobalModal
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                title="Create Details Category"
            >
                <Form
                    layout="vertical"
                    name='create_details_category'
                    onFinish={handleSubmit}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item name={'name'} label="Name" rules={[
                        {
                            required: true,
                            message: "please enter the details category name"
                        }
                    ]}>
                        <Input placeholder='Enter Details Category Name'>
                        </Input>
                    </Form.Item>

                    <Form.List
                        name="fields"
                        label="fields *"
                        rules={[
                            {
                                validator: async (_, names) => {
                                    if (!names || names.length < 1) {
                                        return Promise.reject(new Error('Add at least 1 field'));
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                        label={index === 0 ? 'fields' : ''}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Form.Item
                                            {...field}
                                            validateTrigger={['onChange', 'onBlur']}
                                            rules={[
                                                {
                                                    required: true,
                                                    whitespace: true,
                                                    message: "Please input field name or delete this field.",
                                                },
                                            ]}
                                            noStyle
                                        >
                                            <Input
                                                placeholder="field name"
                                                style={{
                                                    width: '95%',
                                                }}
                                            />
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <MinusCircleOutlined
                                                className="ps-3"
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{
                                            width: '60%',
                                        }}
                                        icon={<PlusOutlined />}
                                    >
                                        Add field
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <button>submit</button>
                </Form>
            </GlobalModal>
        </>
    )
}

export default DetailsCategory