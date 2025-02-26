import { styled } from "styled-components";
import { DISPLAY_DAY_LIST, DISPLAY_MONTH_LIST } from "./constants";
import type { EditionDataCreateTimestampType } from "@/types/editor";
import type { EditionDatePropsType } from "./types";

const EditionDateComponent = styled.span`
  font-size: 20px;
  line-height: 20px;
  white-space: nowrap;
  color: var(--purple);
`;

function getDateFromTimestamp(timestamp: EditionDataCreateTimestampType) {
  const date = new Date(timestamp);
  const day = DISPLAY_DAY_LIST[date.getUTCDay()];
  const dateNumber = date.getUTCDate();
  const month = DISPLAY_MONTH_LIST[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${day}, ${dateNumber} ${month} ${year}`;
}

export default function EditionDate(props: EditionDatePropsType) {
  return (
    <EditionDateComponent>
      {getDateFromTimestamp(props.timestamp)}
    </EditionDateComponent>
  );
}
