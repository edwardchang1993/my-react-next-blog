import { useCurrentEditor } from "@tiptap/react";

type EditorType = ReturnType<typeof useCurrentEditor>["editor"];

function isImageUrl(text: string) {
  return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(text);
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
    return true;
  }

  const selection = editor.state.selection;

  if (selection.node) {
    return selection.node.type.name === "image" ? "is-active" : "";
  } else {
    return selection.toJSON().type === "image" ? "is-active" : "";
  }
}
