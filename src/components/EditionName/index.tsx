import { styled, useTheme } from "styled-components";
import type { ThemeAttributesType } from "@/types/theme";
import type { EditionNamePropsType } from "./types";

const EditionNameComponent = styled.div<{ $theme: ThemeAttributesType }>`
  font-size: 32px;
  line-height: 32px;
  font-weight: 700;
  margin-top: 12px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export default function EditionName(props: EditionNamePropsType) {
  const theme = useTheme();

  function redirectToEdition() {
    if (props.redirectToEdition) {
      props.redirectToEdition();
    }
  }

  return (
    <EditionNameComponent $theme={theme} onClick={() => redirectToEdition()}>
      {props.editionName}
    </EditionNameComponent>
  );
}

EditionName.defaultProps = {
  redirectToEdition: () => {},
};
