import React from "react";
import { styled, useTheme } from "styled-components";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { MENU_BUTTON_CONFIG_LIST, TIPTAP_EXTENSIONS } from "./constants";
import type { ThemeAttributesType } from "@/types/theme";
import type { TiptapContentEditorPropsTypes } from "./types";

type EditorType = ReturnType<typeof useCurrentEditor>["editor"];

const MenuButton = styled.button<{
  $theme: ThemeAttributesType;
}>`
  border-radius: 12px;
  margin: none;
  border: none;
  font-family: inherit;
  font-size: 16px;
  font-weight: 500;
  line-height: 16px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);
  color: ${(props) => props.$theme.revertText};
  background-color: ${(props) => props.$theme.buttonBackground};

  &:hover {
    background-color: ${(props) => props.$theme.menuButtonHoverBackground};
  }

  &.is-active {
    color: #994639;
    background-color: ${(props) => props.$theme.buttonBackground};
  }
`;

const MenuBar = React.memo(function MenuBar() {
  const { editor } = useCurrentEditor();
  const theme = useTheme();

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-menu-control-group">
      <div className="tiptap-menu-button-group">
        {MENU_BUTTON_CONFIG_LIST.map((button) => (
          <MenuButton
            key={button.label}
            $theme={theme}
            className={button.className(editor)}
            onClick={() => button.onClick(editor)}
            disabled={button.isDisabled(editor)}
          >
            {button.label}
          </MenuButton>
        ))}
      </div>
    </div>
  );
});

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
