type DialogVisibleType = boolean;
type DialogTiggerButtonType = React.ReactNode;
type DialogTitleType = string;
type DialogDescriptionType = string;
type DialogChildrenType = React.ReactNode;
type DialogFooterButtonTextType = string;
type DialogToggleVisibleType = (status: boolean) => void;
type DialogSubmitType = () => void;

export interface DialogPropsTypes {
  visible: DialogVisibleType;
  triggerButton: DialogTiggerButtonType;
  title: DialogTitleType;
  description: DialogDescriptionType;
  children: DialogChildrenType;
  footerButtonText: DialogFooterButtonTextType;
  toggleVisible: DialogToggleVisibleType;
  submit: DialogSubmitType;
}
