"use client";

import { CSSProperties } from "react";
import { styled } from "styled-components";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useLoading } from "@/context/LoadingContext";

const ClipLoaderCssOverride: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  opacity: 0.7;
`;

export default function FullScreenLoading() {
  const { isLoading } = useLoading();

  if (!isLoading) {
    return null;
  }

  return (
    <Wrapper>
      <PacmanLoader
        color="#FFFFFF"
        loading={isLoading}
        cssOverride={ClipLoaderCssOverride}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Wrapper>
  );
}
