import { cn } from '@/lib/utils';
import { MDXEditorMethods, MDXEditorProps } from '@mdxeditor/editor';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';
import React, { forwardRef } from 'react';

const Editor = dynamic(() => import('./MarkdownEditorInitializer'), {
    // Make sure we turn SSR off
    ssr: false,
});

export const MarkdownEditor = forwardRef<
    MDXEditorMethods,
    MDXEditorProps & { className?: string }
>(({ className, ...props }, ref) => {
    const { theme } = useTheme();

    return (
        <Editor
            className={cn(
                theme,
                `markdown-editor rounded-md bg-background-foreground`,
                className,
            )}
            {...props}
            editorRef={ref}
        />
    );
});

MarkdownEditor.displayName = 'ForwardRefEditor';
