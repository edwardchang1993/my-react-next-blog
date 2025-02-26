import * as Dialog from "@radix-ui/react-dialog";
import { styled, useTheme } from "styled-components";
import { IoClose } from "react-icons/io5";
import SubmitButton from "@/components/SubmitButton";
import type { ThemeAttributesType } from "@/types/theme";
import type { DialogPropsTypes } from "./types";

const DialogOverlay = styled(Dialog.Overlay)<{ $theme: ThemeAttributesType }>`
  position: fixed;
  inset: 0;
  animation: dialogOverlayShow 300ms cubic-bezier(0.16, 1, 0.3, 1);
  background-color: ${(props) => props.$theme.menuButtonHoverBackground};
`;

const DialogContent = styled(Dialog.Content)<{ $theme: ThemeAttributesType }>`
  background-color: ${(props) => props.$theme.background};
  border-radius: 6px;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 90vw;
  max-width: 500px;
  max-height: 85vh;
  padding: 25px;
  border: 1px solid ${(props) => props.$theme.dialogBorder};
  transform: translate(-50%, -50%);
  animation: dialogContentShow 300ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }
`;

const DialogTitle = styled(Dialog.Title)<{ $theme: ThemeAttributesType }>`
  margin: 0;
  font-weight: 500;
  color: ${(props) => props.$theme.text};
`;

const DialogDescription = styled(Dialog.Description)<{
  $theme: ThemeAttributesType;
}>`
  margin: 10px 0 20px;
  color: ${(props) => props.$theme.subText};
  font-size: 1rem;
  line-height: 1.5rem;
`;

const DialogIconWrapper = styled.button<{ $theme: ThemeAttributesType }>`
  all: unset;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.$theme.text};
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.$theme.buttonHoverBackground};
  }
`;

const DialogFooter = styled.div`
  display: flex;
  margin-top: 25;
  justify-content: flex-end;
`;

export default function DialogComponent(props: DialogPropsTypes) {
  const theme = useTheme();

  return (
    <Dialog.Root open={props.visible}>
      <Dialog.Trigger asChild>{props.triggerButton}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay $theme={theme} />
        <DialogContent $theme={theme}>
          <DialogTitle $theme={theme}>{props.title}</DialogTitle>
          <DialogDescription $theme={theme}>
            {props.description}
          </DialogDescription>
          {props.children}
          <DialogFooter>
            <SubmitButton
              label={props.footerButtonText}
              onClick={() => props.submit()}
            />
          </DialogFooter>
          <DialogIconWrapper
            $theme={theme}
            aria-label="Close"
            onClick={() => props.toggleVisible(false)}
          >
            <IoClose color={theme.revertBackground} size={24} />
          </DialogIconWrapper>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
