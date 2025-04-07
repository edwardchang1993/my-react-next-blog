"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/sdk/firebase";
import { EditionDate, EditionName, EditorContentPreview } from "@/components";
import type {
  EditionDataType,
  FirestoreCollectionIdType,
} from "@/types/editor";

export default function SingleEditionPage() {
  const searchParams = useSearchParams();
  const [editionData, setEditionData] = useState<EditionDataType | null>(null);
  const editionId = searchParams.get(
    "editionId"
  ) as FirestoreCollectionIdType | null;

  async function fetchSingleDocument(id: FirestoreCollectionIdType) {
    const docRef = doc(db, "edition_list", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setEditionData(docSnap.data() as EditionDataType);
    } else {
      console.log("[docSnap not exists]", docSnap);
    }
  }

  useEffect(() => {
    if (!editionId) {
      return;
    }

    fetchSingleDocument(
      searchParams.get("editionId") as FirestoreCollectionIdType
    );
  }, [editionId, searchParams]);

  if (!editionData) {
    return null;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditionDate timestamp={editionData.create_timestamp} />
      <EditionName editionName={editionData.edition_name} />
      <EditorContentPreview
        editionContent={editionData.edition_content}
        hasReadMore={false}
      />
    </Suspense>
  );
}
