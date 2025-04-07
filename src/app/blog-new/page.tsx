"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { styled, useTheme } from "styled-components";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/sdk/firebase";
import { useGoogleAuth } from "@/context/GoogleAuthContext";
import {
  TiptapContentEditor,
  SubmitButton,
  Title,
  SubTitle,
} from "@/components";
import type { ThemeAttributesType } from "@/types/theme";
import type {
  EditionDataEditionContentType,
  EditionDataEditionNameType,
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
  const router = useRouter();
  const { isAdmin } = useGoogleAuth();

  const [editorContent, setEditorContent] =
    useState<EditionDataEditionContentType>(DEFAULT_EDITOR_CONTENT);
  const [editionName, setEditionName] =
    useState<EditionDataEditionNameType>("");

  function handleUpdateEditionName(e: React.ChangeEvent<HTMLInputElement>) {
    setEditionName(e.currentTarget.value);
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

    try {
      const data = {
        create_timestamp: new Date().getTime(),
        edition_content: editorContent,
        edition_name: editionName,
      };

      await addDoc(collection(db, "edition_list"), data);

      toast.success("新增成功");

      router.push("/blog");
    } catch (e) {
      console.error(e);

      toast.error("新增失敗");
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
        <NewEditionTiptapFooter>
          <SubmitButton label="送出" onClick={submit} />
        </NewEditionTiptapFooter>
      </NewEditionTiptapWrapper>
    </>
  );
}
