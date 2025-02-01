import type { EditionDataEditionContent } from "@/types/editor";

export interface EditorContentPreviewPropsType {
  editionContent: EditionDataEditionContent;
  hasReadMore: boolean;
  redirectToEdition: Function;
}
