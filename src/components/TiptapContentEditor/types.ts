import { useCurrentEditor } from "@tiptap/react";

type EditorType = ReturnType<typeof useCurrentEditor>["editor"];

export type MenuConfigButtonItemType = {
  label: string;
  onClick: (editor: EditorType) => void;
  isDisabled: (editor: EditorType) => boolean | undefined;
  className: (editor: EditorType) => string | undefined;
};

export interface TiptapContentEditorPropsTypes {
  editorContent: string;
  setEditorContent: (content: string) => void;
}
