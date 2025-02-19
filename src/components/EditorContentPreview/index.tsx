import { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import { EditorContent, useEditor } from "@tiptap/react";
import type { EditorContentPreviewPropsType } from "./types";
import { TIPTAP_EXTENSIONS } from "@/components/TiptapContentEditor/constants";

const Wrapper = styled.div<{ $isNeedReadMore: boolean }>`
  display: ${(props) => (props.$isNeedReadMore ? "-webkit-box" : "block")};
  -webkit-box-orient: vertical;
  overflow: ${(props) => (props.$isNeedReadMore ? "hidden" : "unset")};
  -webkit-line-clamp: ${(props) => (props.$isNeedReadMore ? 5 : "none")};
  margin-bottom: ${(props) => (props.$isNeedReadMore ? "16px" : 0)};
`;

const ReadMoreButton = styled.div`
  cursor: pointer;
  display: inline-block;
  color: #b4b5b4;
  font-size: 16px;
  line-height: 16px;
  margin: 12px;

  &:hover {
    text-decoration: underline;
  }
`;

export default function EditorContentPreview(
  props: EditorContentPreviewPropsType
) {
  const contentRef = useRef<HTMLDivElement>(null);
  const editor = useEditor({
    shouldRerenderOnTransaction: false,
    editable: false,
    content: props.editionContent,
    immediatelyRender: false,
    extensions: TIPTAP_EXTENSIONS,
  });
  const [isNeedReadMore, setIsNeedReadMore] = useState<boolean>(false);

  const maxLines = 8;
  const lineHeight = 16;

  useEffect(() => {
    if (!props.hasReadMore) {
      setIsNeedReadMore(false);
      return;
    }

    setTimeout(() => {
      if (contentRef.current) {
        const maxHeight = maxLines * lineHeight;
        const actualHeight = contentRef.current.scrollHeight;

        setIsNeedReadMore(actualHeight > maxHeight);
      }
    }, 0);
  }, [props.hasReadMore]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    editor.commands.setContent(props.editionContent);
  }, [editor, props.editionContent]);

  function clickReadMoreButton() {
    if (props.redirectToEdition) {
      props.redirectToEdition();
    }
  }

  if (!props.editionContent) {
    return null;
  }

  return (
    <>
      <Wrapper ref={contentRef} $isNeedReadMore={isNeedReadMore}>
        <EditorContent editor={editor} />
      </Wrapper>
      {isNeedReadMore ? (
        <ReadMoreButton onClick={clickReadMoreButton}>閱讀更多</ReadMoreButton>
      ) : (
        <></>
      )}
    </>
  );
}

EditorContentPreview.defaultProps = {
  redirectToEdition: () => {},
};
