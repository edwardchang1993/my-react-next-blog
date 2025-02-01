export type EditionDataId = string;
export type EditionDataCreateTimestamp = number;
export type EditionDataEditionContent = string;
export type EditionDataEditionName = string;
export type EditionDataEditionTag = string;
export type EditionDataEditionTagList = EditionDataEditionTag[];

export interface EditionDataType {
  id: EditionDataId;
  create_timestamp: EditionDataCreateTimestamp;
  edition_content: EditionDataEditionContent;
  edition_name: EditionDataEditionName;
  edition_tag_list: EditionDataEditionTagList;
}
