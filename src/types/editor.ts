export type FirestoreCollectionIdType = string;

export type EditionDataCreateTimestampType = number;
export type EditionDataEditionContentType = string;
export type EditionDataEditionNameType = string;
export type EditionDataEditionTagType = string;
export type EditionDataEditionTagListType = EditionDataEditionTagType[];

export interface EditionDataType {
  id: FirestoreCollectionIdType;
  create_timestamp: EditionDataCreateTimestampType;
  edition_content: EditionDataEditionContentType;
  edition_name: EditionDataEditionNameType;
  edition_tag_list: EditionDataEditionTagListType;
}

export type AboutMeDataUpdateTimestampType = number;
export type AboutMeDataContentType = string;

export interface AboutMeDataType {
  update_timestamp: AboutMeDataUpdateTimestampType;
  about_me_content: AboutMeDataContentType;
}
