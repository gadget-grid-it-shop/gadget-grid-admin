import { MarkdownEditor } from '@/components/common/MarkdownEditor';
import { TProduct } from '@/interface/product.interface';
import { handleProductChange } from '@/lib/utils';
import { useAppSelector } from '@/redux/hooks';
import { MDXEditorMethods } from '@mdxeditor/editor';
import React, { useCallback, useEffect, useRef } from 'react';

const AddDescription = ({ edit }: { edit: boolean }) => {
    const descriptionRef = useRef<MDXEditorMethods>(null);
    const { editProduct, product } = useAppSelector((s) => s.products);
    const currentProduct = edit ? editProduct : product;

    const { description } = currentProduct;

    const handleChange = useCallback(
        <K extends keyof TProduct>(key: K, value: TProduct[K]) => {
            handleProductChange(key, value, edit);
        },
        [edit],
    );

    useEffect(() => {
        if (descriptionRef.current && description === '') {
            descriptionRef.current.setMarkdown('');
        }
    }, [description]);

    const handleKeyFeatureChange = () => {
        const val: string = descriptionRef.current
            ? descriptionRef.current.getMarkdown()
            : '';
        handleChange('description', val);
    };

    return (
        <div>
            <h2 className='text-lg font-semibold text-black'>
                Product Description
            </h2>
            <p className='pb-5 text-sm text-gray'>
                Write a detailed description of the product
            </p>
            <MarkdownEditor
                ref={descriptionRef}
                className='h-[60vh] overflow-y-auto overflow-x-hidden scrollbar-thin'
                markdown={description}
                onChange={handleKeyFeatureChange}
            />
        </div>
    );
};

export default AddDescription;
