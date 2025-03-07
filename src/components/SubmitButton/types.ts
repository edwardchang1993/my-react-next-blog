export type SubmitButtonLabelType = string;
export type SubmitButtonOnClickType = () => void;

export interface SubmitButtonPropsTypes {
  label: SubmitButtonLabelType;
  onClick: SubmitButtonOnClickType;
}
