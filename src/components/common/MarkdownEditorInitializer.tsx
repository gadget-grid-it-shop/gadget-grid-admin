'use client'
// InitializedMDXEditor.tsx




import type { ForwardedRef } from 'react'
import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    type MDXEditorMethods,
    type MDXEditorProps,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    BlockTypeSelect,
    ChangeAdmonitionType,
    directivesPlugin,
    AdmonitionDirectiveDescriptor,
    frontmatterPlugin,
    InsertFrontmatter,
    InsertThematicBreak,
    ListsToggle
} from '@mdxeditor/editor'
import { useTheme } from 'next-themes'

// Only import this to the next file
export default function MarkdownEditorInitializer({
    editorRef,
    ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {

    const { theme } = useTheme()

    return (
        <MDXEditor
            className={`${theme} bg-background-foreground rounded-md`}
            plugins={[
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                directivesPlugin({
                    directiveDescriptors: [AdmonitionDirectiveDescriptor]
                }),
                frontmatterPlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
                toolbarPlugin({
                    toolbarContents: () => (
                        <>
                            {' '}
                            <UndoRedo />
                            <BoldItalicUnderlineToggles />

                            <BlockTypeSelect />

                            <InsertThematicBreak />
                            <ListsToggle />
                        </>
                    )
                })
            ]}
            {...props}
            ref={editorRef}
        />
    )
}
