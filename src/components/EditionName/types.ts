import type { EditionDataEditionNameType } from "@/types/editor";

export interface EditionNamePropsType {
  editionName: EditionDataEditionNameType;
  redirectToEdition: () => void;
}
