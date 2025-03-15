"use client";

import React from "react";
import { styled, keyframes, useTheme } from "styled-components";
import { TECH_LIST } from "./constants";
import type { ThemeAttributesType } from "@/types/theme";

const TechListContainer = styled.div<{ $theme: ThemeAttributesType }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 20px;
  background: ${(props) => props.$theme.background};
`;

const TechItem = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconContainer = styled.svg`
  width: 50px;
  height: 50px;
`;

const iconPathAnimation = keyframes`
    0% {
      stroke-dasharray: 4917;
      stroke-dashoffset: 4917;
    }
  
    40% {
      stroke-dasharray: 4917;
      stroke-dashoffset: 0;
    }
  
    60% {
      stroke-dasharray: 4917;
      stroke-dashoffset: 0;
    }
  
    100% {
      stroke-dasharray: 4917;
      stroke-dashoffset: 0;
    }
`;

const IconPath = styled.path<{ $theme: ThemeAttributesType }>`
  fill: none;
  stroke: ${(props) => props.$theme.text};
  stroke-width: 0.5;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: ${iconPathAnimation} 30s ease-in-out forwards;
`;

const TechName = styled.span<{ $theme: ThemeAttributesType }>`
  font-size: 1.2rem;
  word-break: break-all;
  color: ${(props) => props.$theme.text};
`;

export default function TechList() {
  const theme = useTheme();

  return (
    <TechListContainer $theme={theme}>
      {TECH_LIST.map((tech, index) => (
        <TechItem key={index} href={tech.href} target="_blank">
          <IconContainer viewBox="0 0 24 24">
            <IconPath d={tech.iconPath} $theme={theme} />
          </IconContainer>
          <TechName $theme={theme}>{tech.name}</TechName>
        </TechItem>
      ))}
    </TechListContainer>
  );
}
