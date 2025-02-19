export type SubmitButtonLabel = string;
export type SubmitButtonOnClickType = () => void;

export interface SubmitButtonPropsTypes {
  label: SubmitButtonLabel;
  onClick: SubmitButtonOnClickType;
}
