import { styled } from "styled-components";

const TitleComponent = styled.h1.attrs({
  className: "ellipsis",
})`
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: 2rem;
  display: flex;
  align-items: center;

  &:not(:first-child) {
    margin-top: 32px;
  }
`;

export default function Title({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <TitleComponent>{children}</TitleComponent>;
}
