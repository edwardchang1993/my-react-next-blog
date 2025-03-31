"use client";

import { useState } from "react";
import Image from "next/image";
import { styled, useTheme } from "styled-components";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "@/sdk/firebase";
import { useGoogleAuth } from "@/context/GoogleAuthContext";
// import { useLoading } from "@/context/LoadingContext";
// import EditionTagList from "@/components/EditionTagList";
import TiptapContentEditor from "@/components/TiptapContentEditor";
import SubmitButton from "@/components/SubmitButton";
import Title from "@/components/Title";
import SubTitle from "@/components/SubTitle";
import type { ThemeAttributesType } from "@/types/theme";
import type {
  // EditionDataType,
  EditionDataEditionContentType,
  EditionDataEditionNameType,
  // EditionDataEditionTagType,
  // EditionDataEditionTagListType,
} from "@/types/editor";
import { DEFAULT_EDITOR_CONTENT } from "@/constants/editor";

const NewEditionInput = styled.input<{ $theme: ThemeAttributesType }>`
  width: -webkit-fill-available;
  background-color: inherit;
  border-radius: 10px;
  font-size: 16px;
  line-height: 16px;
  padding: 6px 12px;
  border: 1px ${(props) => props.$theme.text} solid;
  color: ${(props) => props.$theme.text};
  &:focus {
    outline: none;
    border: 1px var(--active-color) solid;
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

export default function NewAEditionPage() {
  const theme = useTheme();
  const { isAdmin } = useGoogleAuth();
  // const { setIsLoading } = useLoading();

  const [editorContent, setEditorContent] =
    useState<EditionDataEditionContentType>(DEFAULT_EDITOR_CONTENT);
  const [editionName, setEditionName] =
    useState<EditionDataEditionNameType>("");
  // const [editionTagList, setEditionTagList] =
  //   useState<EditionDataEditionTagListType>([]);
  // const [newEditionTagName, setNewEditionTagName] =
  //   useState<EditionDataEditionTagType>("");

  function handleUpdateEditionName(e: React.ChangeEvent<HTMLInputElement>) {
    setEditionName(e.currentTarget.value);
  }

  // function handleUpdateEditionTagName(e: React.ChangeEvent<HTMLInputElement>) {
  //   setNewEditionTagName(e.currentTarget.value);
  // }

  // function handleUpdateEditionTag(e: React.KeyboardEvent<HTMLInputElement>) {
  //   if (e.key === "Enter") {
  //     setEditionTagList([...editionTagList, newEditionTagName]);
  //     setNewEditionTagName("");
  //   }
  // }

  async function submit() {
    if (!editionName) {
      toast.error("請輸入部落格名稱");
      return;
    }

    if (!editorContent) {
      toast.error("請輸入部落格內容");
      return;
    }

    try {
      // setIsLoading(true);

      // if (!editionTagList.length) {
      //   toast.error("請填入至少一個標籤");
      //   return;
      // }

      const data = {
        create_timestamp: new Date().getTime(),
        edition_content: editorContent,
        edition_name: editionName,
        // edition_tag_list: editionTagList,
      };

      await addDoc(collection(db, "edition_list"), data);

      toast.success("新增成功");
    } catch (e) {
      console.error(e);

      toast.error("新增失敗");
    } finally {
      // setIsLoading(false);
    }
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Title>
        <Image
          src="https://pic.sopili.net/pub/emoji/twitter/2/72x72/1f4dd.png"
          alt="blog-new-icon"
          width={32}
          height={32}
        />
        &thinsp;New a Edition
      </Title>
      <NewEditionTiptapWrapper $theme={theme}>
        <SubTitle>Name</SubTitle>
        <NewEditionInput
          $theme={theme}
          type="text"
          value={editionName}
          onInput={handleUpdateEditionName}
        />
        <SubTitle>Content</SubTitle>
        <TiptapContentEditor
          editorContent={editorContent}
          setEditorContent={setEditorContent}
        />
        {/* <SubTitle>
          {" "}
          <img
            src="https://pic.sopili.net/pub/emoji/twitter/2/72x72/1f538.png"
            width={20}
            height={20}
          />
          &thinsp;Tags
        </SubTitle>
        <NewEditionInput
          $theme={theme}
          type="text"
          value={newEditionTagName}
          onInput={handleUpdateEditionTagName}
          onKeyDown={handleUpdateEditionTag}
        /> */}
        {/* <div style={{ marginTop: "16px" }}>
          <EditionTagList editionTagList={editionTagList} />
        </div> */}
        <NewEditionTiptapFooter>
          <SubmitButton label="送出" onClick={submit} />
        </NewEditionTiptapFooter>
      </NewEditionTiptapWrapper>
    </>
  );
}
