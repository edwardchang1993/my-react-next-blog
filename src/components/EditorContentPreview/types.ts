import type { EditionDataEditionContentType } from "@/types/editor";

export interface EditorContentPreviewPropsType {
  editionContent: EditionDataEditionContentType;
  hasReadMore: boolean;
  redirectToEdition: () => void;
}
