"use client";

import { useState, useEffect } from "react";
import { styled } from "styled-components";
import toast from "react-hot-toast";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/sdk/firebase";
import { useGoogleAuth } from "@/context/GoogleAuthContext";
// import { useLoading } from "@/context/LoadingContext";
import TiptapContentEditor from "@/components/TiptapContentEditor";
import SubmitButton from "@/components/SubmitButton";
import EditorContentPreview from "@/components/EditorContentPreview";
import type { AboutMeDataType, AboutMeDataContentType } from "@/types/editor";

const AboutMeTiptapFooter = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

export default function AboutMePage() {
  const collectionId = process.env
    .NEXT_PUBLIC_FIRESTORE_ABOUT_ME_COLLECTION_ID as string;

  const { isAdmin } = useGoogleAuth();
  // const { isLoading, setIsLoading } = useLoading();

  const [isFirestoreDataLoaded, setIsFirestoreDataLoaded] =
    useState<boolean>(false);
  const [isFetchingAboutMe, setIsFetchingAboutMe] = useState<boolean>(false);
  const [originAboutMe, setOriginAboutMe] =
    useState<AboutMeDataContentType>("");
  const [newAboutMe, setNewAboutMe] = useState<AboutMeDataContentType>("");

  async function fetchAboutMeDocument() {
    if (isFetchingAboutMe) {
      return;
    }

    const docRef = doc(db, "about_me", collectionId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const aboutMeData = docSnap.data() as AboutMeDataType;

      setOriginAboutMe(aboutMeData.about_me_content);
      setNewAboutMe(aboutMeData.about_me_content);
      setIsFetchingAboutMe(true);
      // setIsLoading(false);
    } else {
      console.log("[docSnap not exists]", docSnap);

      // setIsLoading(false);
    }
  }

  async function submit() {
    // if (isLoading) {
    //   return;
    // }

    if (!newAboutMe) {
      toast.error("內容不可為空");
      return;
    }

    try {
      const data = {
        about_me_content: newAboutMe,
        update_timestamp: new Date().getTime(),
      };

      // setIsLoading(true);

      const docRef = doc(db, "about_me", collectionId);

      await updateDoc(docRef, data);

      setOriginAboutMe(newAboutMe);

      toast.success("更新成功");
    } catch (e) {
      console.error(e);

      toast.error("更新失敗");
    } finally {
      // setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchAboutMeDocument();
  });

  useEffect(() => {
    if (newAboutMe) {
      setIsFirestoreDataLoaded(true);
    }
  }, [newAboutMe]);

  if (!isFetchingAboutMe) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {isFirestoreDataLoaded ? (
        <>
          <EditorContentPreview
            editionContent={originAboutMe}
            hasReadMore={false}
          />

          {isAdmin ? (
            <>
              <div style={{ padding: "16px 0" }} />
              <TiptapContentEditor
                editorContent={newAboutMe}
                setEditorContent={(newContent) => setNewAboutMe(newContent)}
              />
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      <AboutMeTiptapFooter>
        {isAdmin ? (
          // && !isLoading
          <SubmitButton label="儲存" onClick={submit} />
        ) : (
          <></>
        )}
      </AboutMeTiptapFooter>
    </>
  );
}
