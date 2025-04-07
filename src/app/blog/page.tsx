"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/sdk/firebase";
import { styled, useTheme } from "styled-components";
import {
  EditionDate,
  EditionName,
  EditorContentPreview,
  Title,
} from "@/components";
import type { ThemeAttributesType } from "@/types/theme";
import type {
  EditionDataType,
  FirestoreCollectionIdType,
} from "@/types/editor";

const BlogEditionItem = styled.div<{ $theme: ThemeAttributesType }>`
  padding: 12px 0;
  border-bottom: 1px ${(props) => props.$theme.text} solid;
  margin-bottom: 32px;
`;

export default function BlogPage() {
  const router = useRouter();
  const theme = useTheme();

  const [isFetchingBlogs, setIsFetchingBlogs] = useState<boolean>(false);
  const [editionList, setEditionList] = useState<EditionDataType[]>([]);

  async function fetchEditionList() {
    if (isFetchingBlogs) {
      return;
    }

    await getDocs(collection(db, "edition_list")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as EditionDataType[];

      setEditionList(newData);
    });

    setIsFetchingBlogs(true);
  }

  function redirectToEdition(id: FirestoreCollectionIdType) {
    router.push(`/blog-post/?editionId=${id}`);
  }

  useEffect(() => {
    fetchEditionList();
  });

  if (!isFetchingBlogs) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Title>Recent blog posts</Title>
      {editionList.map((edition, index) => {
        return (
          <BlogEditionItem key={index} $theme={theme}>
            <EditionDate timestamp={edition.create_timestamp} />
            <EditionName
              editionName={edition.edition_name}
              redirectToEdition={() => redirectToEdition(edition.id)}
            />
            <EditorContentPreview
              editionContent={edition.edition_content}
              hasReadMore={true}
              redirectToEdition={() => redirectToEdition(edition.id)}
            />
          </BlogEditionItem>
        );
      })}
    </>
  );
}
