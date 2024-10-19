'use client';
// InitializedMDXEditor.tsx

import '@mdxeditor/editor/style.css';

import type { ForwardedRef } from 'react';
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
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  frontmatterPlugin,
  InsertThematicBreak,
  ListsToggle,
  InsertTable,
  tablePlugin,
} from '@mdxeditor/editor';

// Only import this to the next file
export default function MarkdownEditorInitializer({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        directivesPlugin({
          directiveDescriptors: [AdmonitionDirectiveDescriptor],
        }),
        frontmatterPlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
        tablePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <div className="flex w-full gap-3 bg-lavender-mist py-1">
              {' '}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              {/* <ChangeAdmonitionType /> */}
              <BlockTypeSelect />
              <InsertTable />
              <InsertThematicBreak />
              <ListsToggle />
            </div>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
