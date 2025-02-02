"use client";

import { useState } from "react";
import { styled, useTheme } from "styled-components";
import { collection, addDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { db } from "@/sdk/firebase";
import FullScreenLoading from "@/components/FullscreenLoading";
import EditionTagList from "@/components/EditionTagList";
import TiptapContentEditor from "@/components/TiptapContentEditor";
import SubmitButton from "@/components/SubmitButton";
import type { ThemeAttributesType } from "@/types/theme";
import type {
  EditionDataType,
  EditionDataEditionContentType,
  EditionDataEditionNameType,
  EditionDataEditionTagType,
  EditionDataEditionTagListType,
} from "@/types/editor";
import { DEFAULT_EDITOR_CONTENT } from "@/constants/editor";

const NewEditionLabel = styled.div`
  font-size: 16px;
  line-height: 16px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  &:not(:first-child) {
    margin-top: 16px;
  }
`;

const NewEditionInput = styled.input<{ $theme: ThemeAttributesType }>`
  background-color: inherit;
  border-radius: 10px;
  font-size: 16px;
  line-height: 16px;
  padding: 6px 12px;
  border: 1px ${(props) => props.$theme.text} solid;
  color: ${(props) => props.$theme.text};
  &:focus {
    outline: none;
    border: 1px #994639 solid;
  }
`;

const NewEditionTiptapWrapper = styled.div<{ $theme: ThemeAttributesType }>`
  padding: 24px;
  border-radius: 12px;
  border: 1px ${(props) => props.$theme.text} solid;
  & .tiptap {
    padding: 10px;
    border-radius: 12px;
    border: 1px ${(props) => props.$theme.text} solid;
  }
`;

const NewEditionTiptapFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const SubTitle = styled.div`
  font-size: 32px;
  line-height: 32px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  &:not(:first-child) {
    margin-top: 32px;
  }
`;

export default function NewAEditionPage() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [editorContent, setEditorContent] =
    useState<EditionDataEditionContentType>(DEFAULT_EDITOR_CONTENT);
  const [editionName, setEditionName] =
    useState<EditionDataEditionNameType>("");
  const [editionTagList, setEditionTagList] =
    useState<EditionDataEditionTagListType>([]);
  const [newEditionTagName, setNewEditionTagName] =
    useState<EditionDataEditionTagType>("");

  function handleUpdateEditionName(e: React.ChangeEvent<HTMLInputElement>) {
    setEditionName(e.currentTarget.value);
  }

  function handleUpdateEditionTagName(e: React.ChangeEvent<HTMLInputElement>) {
    setNewEditionTagName(e.currentTarget.value);
  }

  function handleUpdateEditionTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setEditionTagList([...editionTagList, newEditionTagName]);
      setNewEditionTagName("");
    }
  }

  async function submit() {
    if (!editionName) {
      toast.error("請輸入部落格名稱");
      return;
    }

    if (!editorContent) {
      toast.error("請輸入部落格內容");
      return;
    }

    if (!editionTagList.length) {
      toast.error("請填入至少一個標籤");
      return;
    }

    const data = {
      create_timestamp: new Date().getTime(),
      edition_content: editorContent,
      edition_name: editionName,
      edition_tag_list: editionTagList,
    } as EditionDataType;

    setIsLoading(true);

    await addDoc(collection(db, "edition_list"), data);

    setIsLoading(false);
  }

  return (
    <>
      <SubTitle>
        <img
          src="https://pic.sopili.net/pub/emoji/twitter/2/72x72/1f4dd.png"
          height={32}
        />
        &thinsp;New a Edition
      </SubTitle>
      <NewEditionTiptapWrapper $theme={theme}>
        <NewEditionLabel>
          <img
            src="https://pic.sopili.net/pub/emoji/twitter/2/72x72/1f538.png"
            width={20}
            height={20}
          />
          &thinsp;Name
        </NewEditionLabel>
        <NewEditionInput
          $theme={theme}
          type="text"
          value={editionName}
          onInput={handleUpdateEditionName}
        />
        <NewEditionLabel>
          {" "}
          <img
            src="https://pic.sopili.net/pub/emoji/twitter/2/72x72/1f538.png"
            width={20}
            height={20}
          />
          &thinsp;Content
        </NewEditionLabel>
        <TiptapContentEditor
          editorContent={editorContent}
          setEditorContent={setEditorContent}
        />
        <NewEditionLabel>
          {" "}
          <img
            src="https://pic.sopili.net/pub/emoji/twitter/2/72x72/1f538.png"
            width={20}
            height={20}
          />
          &thinsp;Tags
        </NewEditionLabel>
        <NewEditionInput
          $theme={theme}
          type="text"
          value={newEditionTagName}
          onInput={handleUpdateEditionTagName}
          onKeyDown={handleUpdateEditionTag}
        />
        <div style={{ marginTop: "16px" }}>
          <EditionTagList editionTagList={editionTagList} />
        </div>
        <NewEditionTiptapFooter>
          <SubmitButton label="送出" onClick={submit} />
        </NewEditionTiptapFooter>
        <Toaster />
        <FullScreenLoading isLoading={isLoading} />
      </NewEditionTiptapWrapper>
    </>
  );
}
