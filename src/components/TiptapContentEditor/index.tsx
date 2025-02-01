import { styled, useTheme } from "styled-components";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import type { ThemeAttributesType } from "@/types/theme";
import type { TiptapContentEditorPropsTypes } from "./types";

const MenuButton = styled.button<{ $theme: ThemeAttributesType }>`
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

function MenuBar() {
  const { editor } = useCurrentEditor();
  const theme = useTheme();

  if (!editor) {
    return null;
  }

  return (
    <div className="tiptap-menu-control-group">
      <div className="tiptap-menu-button-group">
        <MenuButton
          $theme={theme}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          Bold
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          Italic
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          Strike
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          Paragraph
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          H4
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          H5
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          H6
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          Bullet list
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          Ordered list
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          Code block
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          Blockquote
        </MenuButton>
        {/* <MenuButton
            $theme={theme}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            Horizontal rule
          </MenuButton> */}
        <MenuButton
          $theme={theme}
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          Hard break
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          Undo
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          Redo
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
        >
          Remove all marks
        </MenuButton>
        <MenuButton
          $theme={theme}
          onClick={() => editor.chain().focus().clearNodes().run()}
        >
          Remove all nodes
        </MenuButton>
      </div>
    </div>
  );
}

export default function TiptapContentEditor(
  props: TiptapContentEditorPropsTypes
) {
  const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
    }),
  ];

  function setEditorContent(html: string) {
    if (props.setEditorContent) {
      props.setEditorContent(html);
    }
  }

  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={props.editorContent}
      onUpdate={({ editor }) => {
        setEditorContent(editor.getHTML());
      }}
    />
  );
}
