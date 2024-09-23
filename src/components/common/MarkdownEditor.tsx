import { MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor'
import dynamic from 'next/dynamic'
import React, { forwardRef } from 'react'

const Editor = dynamic(() => import('./MarkdownEditorInitializer'), {
    // Make sure we turn SSR off
    ssr: false
})

export const MarkdownEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => <Editor {...props} editorRef={ref} />)

MarkdownEditor.displayName = 'ForwardRefEditor'