import { styled, useTheme } from "styled-components";
import type { ThemeAttributesType } from "@/types/theme";
import type { EditionTagListPropsType } from "./types";

const EditionTagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const EditionTag = styled.span<{ $theme: ThemeAttributesType }>`
  font-size: 20px;
  line-height: 32px;
  padding: 0 12px;
  height: 32px;
  border-radius: 20px;
  color: ${(props) => props.$theme.text};
  border: 1px ${(props) => props.$theme.text} solid;

  &:not(:first-child) {
    margin-left: 8px;
  }
`;

export default function EditionTagList(props: EditionTagListPropsType) {
  const theme = useTheme();

  if (!props.editionTagList) {
    return null;
  }

  return (
    <EditionTagWrapper>
      {props.editionTagList.map((tag, index) => {
        return (
          <EditionTag $theme={theme} key={tag + index}>
            {tag}
          </EditionTag>
        );
      })}
    </EditionTagWrapper>
  );
}
