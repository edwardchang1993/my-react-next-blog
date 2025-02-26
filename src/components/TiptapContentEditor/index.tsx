import React from "react";
import { styled, useTheme } from "styled-components";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import MenuBar from "./components/MenuBar";
import { TIPTAP_EXTENSIONS } from "./components/MenuBar/constants";
import type { ThemeAttributesType } from "@/types/theme";
import type { TiptapContentEditorPropsTypes } from "./types";

type EditorType = ReturnType<typeof useCurrentEditor>["editor"];

const TiptapWrapper = styled.div<{ $theme: ThemeAttributesType }>`
  padding: 24px;
  border-radius: 12px;
  border: 1px ${(props) => props.$theme.text} solid;
  & .tiptap {
    padding: 10px;
    border-radius: 12px;
    border: 1px ${(props) => props.$theme.text} solid;
  }
`;

export default function TiptapContentEditor(
  props: TiptapContentEditorPropsTypes
) {
  const theme = useTheme();

  function editorOnUpdate({ editor }: { editor: EditorType }) {
    if (!editor) {
      return;
    }

    if (!props.setEditorContent) {
      return;
    }

    props.setEditorContent(editor.getHTML());
  }

  return (
    <TiptapWrapper $theme={theme}>
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={TIPTAP_EXTENSIONS}
        content={props.editorContent}
        immediatelyRender={false}
        onUpdate={editorOnUpdate}
      />
    </TiptapWrapper>
  );
}
