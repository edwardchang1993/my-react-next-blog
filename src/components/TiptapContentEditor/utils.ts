import { NodeSelection } from "prosemirror-state";
import { useCurrentEditor } from "@tiptap/react";

type EditorType = ReturnType<typeof useCurrentEditor>["editor"];

function isImageUrl(text: string) {
  return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(text);
}

function isVideoUrl(text: string) {
  return /^https?:\/\/.+\.(mp4|wmv|avi|mov|avchd|f4v|flv|swf)(\?.*)?$/i.test(
    text
  );
}

export function TiptapReplaceLinkToImageButtonOnClick(editor: EditorType) {
  if (!editor) {
    return;
  }

  const { from, to, empty } = editor.state.selection;

  if (empty) {
    return;
  }

  const selectedText = editor.state.doc.textBetween(from, to, " ");

  if (isImageUrl(selectedText)) {
    editor
      .chain()
      .focus()
      .deleteRange({ from, to })
      .setImage({ src: selectedText })
      .run();
  }
}

export function TiptapReplaceLinkToImageButtonIsDisabled(editor: EditorType) {
  if (!editor) {
    return true;
  }

  const { from, to } = editor.state.selection;
  const selectedText = editor.state.doc.textBetween(from, to, " ");

  return !isImageUrl(selectedText);
}

export function TiptapReplaceLinkToImageButtonClassName(editor: EditorType) {
  if (!editor) {
    return "";
  }

  const selection = editor.state.selection as NodeSelection;

  if (selection.node) {
    return selection.node.type.name === "image" ? "is-active" : "";
  } else {
    return selection.toJSON().type === "image" ? "is-active" : "";
  }
}

export function TiptapReplaceLinkToVideoButtonOnClick(editor: EditorType) {
  if (!editor) {
    return;
  }

  const { from, to, empty } = editor.state.selection;

  if (empty) {
    return;
  }

  const selectedText = editor.state.doc.textBetween(from, to, " ");

  if (isVideoUrl(selectedText)) {
    editor
      .chain()
      .focus()
      .deleteRange({ from, to })
      .insertContent({
        type: "video",
        attrs: {
          src: selectedText,
        },
      })
      .run();
  }
}

export function TiptapReplaceLinkToVideoButtonIsDisabled(editor: EditorType) {
  if (!editor) {
    return true;
  }

  const { from, to } = editor.state.selection;
  const selectedText = editor.state.doc.textBetween(from, to, " ");

  return !isVideoUrl(selectedText);
}

export function TiptapReplaceLinkToVideoButtonClassName(editor: EditorType) {
  if (!editor) {
    return "";
  }

  const selection = editor.state.selection as NodeSelection;

  if (selection.node) {
    return selection.node.type.name === "video" ? "is-active" : "";
  } else {
    return selection.toJSON().type === "video" ? "is-active" : "";
  }
}
