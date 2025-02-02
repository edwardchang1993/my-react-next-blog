import { styled, useTheme } from "styled-components";
import type { ThemeAttributesType } from "@/types/theme";
import type { SubmitButtonPropsTypes, SubmitButtonOnClickType } from "./types";

const SubmitButtonComponent = styled.button<{ $theme: ThemeAttributesType }>`
  border-radius: 10px;
  padding: 6px 12px;
  font-size: 16px;
  line-height: 16px;
  font-weight: 500;
  margin-left: auto;
  cursor: pointer;
  color: ${(props) => props.$theme.text};
  background-color: ${(props) => props.$theme.background};
  border: 1px ${(props) => props.$theme.text} solid;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.$theme.buttonHoverBackground};
  }
`;

function submitButtonOnClick(onClick: SubmitButtonOnClickType) {
  if (onClick) {
    onClick();
  }
}

export default function SubmitButton(props: SubmitButtonPropsTypes) {
  const theme = useTheme();

  return (
    <SubmitButtonComponent
      $theme={theme}
      onClick={() => submitButtonOnClick(props.onClick)}
    >
      {props.label}
    </SubmitButtonComponent>
  );
}
