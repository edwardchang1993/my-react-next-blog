import { styled } from "styled-components";

const SubTitleComponent = styled.h2`
  font-size: 1rem;
  line-height: 1rem;
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  &:not(:first-child) {
    margin-top: 16px;
  }
`;

export default function SubTitle({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SubTitleComponent>{children}</SubTitleComponent>;
}
