"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/sdk/firebase";
import { styled, useTheme } from "styled-components";
import EditionDate from "@/components/EditionDate";
import EditionName from "@/components/EditionName";
import EditionContentPreview from "@/components/EditorContentPreview";
import EditionTagList from "@/components/EditionTagList";
import type { ThemeAttributesType } from "@/types/theme";
import type { EditionDataType, EditionDataId } from "@/types/editor";

const BlogEditionItem = styled.div<{ $theme: ThemeAttributesType }>`
  padding: 12px 0;
  border-bottom: 1px ${(props) => props.$theme.text} solid;
  margin-bottom: 32px;
`;

const SubTitle = styled.div.attrs({
  className: "ellipsis",
})`
  font-size: 24px;
  height: 32px;
  line-height: 32px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-top: 32px;
  }
`;

export default function BlogPage() {
  const router = useRouter();
  const theme = useTheme();
  const [editionList, setEditionList] = useState<EditionDataType[]>([]);

  async function fetchEditionList() {
    await getDocs(collection(db, "edition_list")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as EditionDataType[];

      setEditionList(newData);
    });
  }

  function redirectToEdition(id: EditionDataId) {
    router.push(`/single-edition/?editionId=${id}`);
  }

  useEffect(() => {
    fetchEditionList();
  }, []);

  if (!editionList.length) {
    return null;
  }

  return (
    <div>
      <SubTitle>
        <img
          src="https://pic.sopili.net/pub/emoji/twitter/2/72x72/1f5d2.png"
          width={32}
          height={32}
        />
        &thinsp;Recent blog posts
      </SubTitle>
      {editionList.map((edition, index) => {
        return (
          <BlogEditionItem key={index} $theme={theme}>
            <EditionDate timestamp={edition.create_timestamp} />
            <EditionName
              editionName={edition.edition_name}
              redirectToEdition={() => redirectToEdition(edition.id)}
            />
            <EditionContentPreview
              editionContent={edition.edition_content}
              hasReadMore={true}
              redirectToEdition={() => redirectToEdition(edition.id)}
            />
            <EditionTagList editionTagList={edition.edition_tag_list} />
          </BlogEditionItem>
        );
      })}
    </div>
  );
}
