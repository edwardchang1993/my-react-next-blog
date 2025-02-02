"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/sdk/firebase";
import EditionDate from "@/components/EditionDate";
import EditionName from "@/components/EditionName";
import EditionContentPreview from "@/components/EditorContentPreview";
import EditionTagList from "@/components/EditionTagList";
import type {
  EditionDataType,
  FirestoreCollectionIdType,
} from "@/types/editor";

export default function SingleEditionPage() {
  const searchParams = useSearchParams();
  const [editionData, setEditionData] = useState<EditionDataType | null>(null);

  const fetchSingleDocument = async (id: FirestoreCollectionIdType) => {
    const docRef = doc(db, "edition_list", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setEditionData(docSnap.data() as EditionDataType);
    } else {
      console.log("[docSnap not exists]", docSnap);
    }
  };

  useEffect(() => {
    fetchSingleDocument(
      searchParams.get("editionId") as FirestoreCollectionIdType
    );
  }, []);

  if (!editionData) {
    return null;
  }

  return (
    <>
      <EditionDate timestamp={editionData.create_timestamp} />
      <EditionName editionName={editionData.edition_name} />
      <EditionContentPreview
        editionContent={editionData.edition_content}
        hasReadMore={false}
      />
      <EditionTagList editionTagList={editionData.edition_tag_list} />
    </>
  );
}
