import { MarkdownEditor } from '@/components/common/MarkdownEditor';
import { TProduct } from '@/interface/product.interface';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateProduct } from '@/redux/reducers/products/productSlice';
import { MDXEditorMethods } from '@mdxeditor/editor';
import React, { useCallback, useEffect, useRef } from 'react';

const AddDescription = () => {
  const descriptionRef = useRef<MDXEditorMethods>(null);
  const {
    product: { description },
  } = useAppSelector((s) => s.products);
  const dispatch = useAppDispatch();

  const handleChange = useCallback(
    <K extends keyof TProduct>(key: K, value: TProduct[K]) => {
      dispatch(updateProduct({ key, value }));
    },
    [dispatch],
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
      <h2 className="text-lg font-semibold text-black">Product Description</h2>
      <p className="pb-5 text-sm text-gray">
        Write a detailed description of the product
      </p>
      <MarkdownEditor
        ref={descriptionRef}
        className="h-[60vh] overflow-y-auto overflow-x-hidden scrollbar-thin"
        markdown={description}
        onChange={handleKeyFeatureChange}
      />
    </div>
  );
};

export default AddDescription;
