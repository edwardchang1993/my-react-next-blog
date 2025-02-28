import { Node } from "@tiptap/core";
import { Color } from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";

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
  Link,
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
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
    defaultAlignment: "left",
  }),
  videoNode,
];
