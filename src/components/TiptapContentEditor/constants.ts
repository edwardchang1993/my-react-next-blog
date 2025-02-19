import { useCurrentEditor } from "@tiptap/react";
import { Node } from "@tiptap/core";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import StarterKit from "@tiptap/starter-kit";
import {
  TiptapReplaceLinkToImageButtonOnClick,
  TiptapReplaceLinkToImageButtonIsDisabled,
  TiptapReplaceLinkToImageButtonClassName,
  TiptapReplaceLinkToVideoButtonOnClick,
  TiptapReplaceLinkToVideoButtonIsDisabled,
  TiptapReplaceLinkToVideoButtonClassName,
} from "./utils";
import type { MenuConfigButtonItemType } from "./types";

type EditorType = ReturnType<typeof useCurrentEditor>["editor"];

export const MENU_BUTTON_CONFIG_LIST: MenuConfigButtonItemType[] = [
  {
    label: "Bold",
    onClick: (editor: EditorType) => editor?.chain().focus().toggleBold().run(),
    isDisabled: (editor: EditorType) =>
      !editor?.can().chain().focus().toggleBold().run(),
    className: (editor: EditorType) =>
      editor?.isActive("bold") ? "is-active" : "",
  },
  {
    label: "Italic",
    onClick: (editor: EditorType) =>
      editor?.chain().focus().toggleItalic().run(),
    isDisabled: (editor: EditorType) =>
      !editor?.can().chain().focus().toggleItalic().run(),
    className: (editor: EditorType) =>
      editor?.isActive("italic") ? "is-active" : "",
  },
  {
    label: "Strike",
    onClick: (editor: EditorType) =>
      editor?.chain().focus().toggleStrike().run(),
    isDisabled: (editor: EditorType) =>
      !editor?.can().chain().focus().toggleStrike().run(),
    className: (editor: EditorType) =>
      editor?.isActive("strike") ? "is-active" : "",
  },
  {
    label: "Paragraph",
    onClick: (editor: EditorType) =>
      editor?.chain().focus().setParagraph().run(),
    isDisabled: () => false, // Paragraph 按鈕通常不需要禁用
    className: (editor: EditorType) =>
      editor?.isActive("paragraph") ? "is-active" : "",
  },
  {
    label: "H1",
    onClick: (editor: EditorType) =>
      editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    isDisabled: () => false, // 標題按鈕通常不需要禁用
    className: (editor: EditorType) =>
      editor?.isActive("heading", { level: 1 }) ? "is-active" : "",
  },
  {
    label: "H2",
    onClick: (editor: EditorType) =>
      editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    isDisabled: () => false,
    className: (editor: EditorType) =>
      editor?.isActive("heading", { level: 2 }) ? "is-active" : "",
  },
  {
    label: "H3",
    onClick: (editor: EditorType) =>
      editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    isDisabled: () => false,
    className: (editor: EditorType) =>
      editor?.isActive("heading", { level: 3 }) ? "is-active" : "",
  },
  {
    label: "H4",
    onClick: (editor: EditorType) =>
      editor?.chain().focus().toggleHeading({ level: 4 }).run(),
    isDisabled: () => false,
    className: (editor: EditorType) =>
      editor?.isActive("heading", { level: 4 }) ? "is-active" : "",
  },
  {
    label: "H5",
    onClick: (editor: EditorType) =>
      editor?.chain().focus().toggleHeading({ level: 5 }).run(),
    isDisabled: () => false,
    className: (editor: EditorType) =>
      editor?.isActive("heading", { level: 5 }) ? "is-active" : "",
  },
  {
    label: "H6",
    onClick: (editor: EditorType) =>
      editor?.chain().focus().toggleHeading({ level: 6 }).run(),
    isDisabled: () => false,
    className: (editor: EditorType) =>
      editor?.isActive("heading", { level: 6 }) ? "is-active" : "",
  },
  {
    label: "Bullet List",
    onClick: (editor: EditorType) =>
      editor?.chain().focus().toggleBulletList().run(),
    isDisabled: (editor: EditorType) =>
      !editor?.can().chain().focus().toggleBulletList().run(),
    className: (editor: EditorType) =>
      editor?.isActive("bulletList") ? "is-active" : "",
  },
  {
    label: "Ordered List",
    onClick: (editor: EditorType) =>
      editor?.chain().focus().toggleOrderedList().run(),
    isDisabled: (editor: EditorType) =>
      !editor?.can().chain().focus().toggleOrderedList().run(),
    className: (editor: EditorType) =>
      editor?.isActive("orderedList") ? "is-active" : "",
  },
  {
    label: "Code Block",
    onClick: (editor: EditorType) =>
      editor?.chain().focus().toggleCodeBlock().run(),
    isDisabled: (editor: EditorType) =>
      !editor?.can().chain().focus().toggleCodeBlock().run(),
    className: (editor: EditorType) =>
      editor?.isActive("codeBlock") ? "is-active" : "",
  },
  {
    label: "Replace Link To Image",
    onClick: TiptapReplaceLinkToImageButtonOnClick,
    isDisabled: TiptapReplaceLinkToImageButtonIsDisabled,
    className: TiptapReplaceLinkToImageButtonClassName,
  },
  {
    label: "Replace Link To Video",
    onClick: TiptapReplaceLinkToVideoButtonOnClick,
    isDisabled: TiptapReplaceLinkToVideoButtonIsDisabled,
    className: TiptapReplaceLinkToVideoButtonClassName,
  },
  {
    label: "Blockquote",
    onClick: (editor: EditorType) =>
      editor?.chain().focus().toggleBlockquote().run(),
    isDisabled: (editor: EditorType) =>
      !editor?.can().chain().focus().toggleBlockquote().run(),
    className: (editor: EditorType) =>
      editor?.isActive("blockquote") ? "is-active" : "",
  },
  {
    label: "Hard Break",
    onClick: (editor: EditorType) =>
      editor?.chain().focus().setHardBreak().run(),
    isDisabled: () => false, // Hard Break 按鈕通常不需要禁用
    className: () => "", // Hard Break 沒有 active 狀態
  },
  {
    label: "Undo",
    onClick: (editor: EditorType) => editor?.chain().focus().undo().run(),
    isDisabled: (editor: EditorType) =>
      !editor?.can().chain().focus().undo().run(),
    className: () => "", // Undo 沒有 active 狀態
  },
  {
    label: "Redo",
    onClick: (editor: EditorType) => editor?.chain().focus().redo().run(),
    isDisabled: (editor: EditorType) =>
      !editor?.can().chain().focus().redo().run(),
    className: () => "", // Redo 沒有 active 狀態
  },
  {
    label: "Remove All Marks",
    onClick: (editor: EditorType) =>
      editor?.chain().focus().unsetAllMarks().run(),
    isDisabled: () => false, // Remove All Marks 按鈕通常不需要禁用
    className: () => "", // Remove All Marks 沒有 active 狀態
  },
  {
    label: "Remove All Nodes",
    onClick: (editor: EditorType) => editor?.chain().focus().clearNodes().run(),
    isDisabled: () => false, // Remove All Nodes 按鈕通常不需要禁用
    className: () => "", // Remove All Nodes 沒有 active 狀態
  },
];

const videoNode = Node.create({
  name: "video",
  group: "block",
  content: "text*",
  inline: false,
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  renderHTML({ node }) {
    return [
      "video",
      {
        src: node.attrs.src,
        controls: true,
        autoplay: true,
        class: "tiptap-default-video",
      },
    ];
  },

  parseHTML() {
    return [
      {
        tag: "video",
        getAttrs: (dom) => ({
          src: dom.getAttribute("src"),
        }),
      },
    ];
  },
});

export const TIPTAP_EXTENSIONS = [
  Color,
  TextStyle,
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
  Image.configure({
    inline: true,
    allowBase64: false,
    HTMLAttributes: {
      class: "tiptap-default-image",
    },
  }),
  videoNode,
];
