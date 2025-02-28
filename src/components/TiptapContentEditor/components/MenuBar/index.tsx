import { useState } from "react";
import { styled, useTheme } from "styled-components";
import { useCurrentEditor } from "@tiptap/react";
import ButtonDialog from "@/components/ButtonDialog";
import { MENU_BUTTON_CONFIG_LIST } from "./constants";
import { NodeSelection } from "prosemirror-state";
import toast from "react-hot-toast";
import { isUrl, isVideoUrl } from "@/utils/regexValidate";
import type { ThemeAttributesType } from "@/types/theme";

type EditorType = ReturnType<typeof useCurrentEditor>["editor"];

const MenuButton = styled.button<{
  $theme: ThemeAttributesType;
}>`
  border-radius: 12px;
  margin: none;
  border: none;
  font-family: inherit;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1rem;
  padding: 6px 12px;
  transition: all 0.2s cubic-bezier(0.65, 0.05, 0.36, 1);
  cursor: pointer;
  color: ${(props) => props.$theme.revertText};
  background-color: ${(props) => props.$theme.buttonBackground};

  &:hover {
    background-color: ${(props) => props.$theme.menuButtonHoverBackground};
  }

  &.is-active {
    color: var(--active-color);
    background-color: ${(props) => props.$theme.buttonBackground};
  }
`;

const Fieldset = styled.fieldset<{ $theme: ThemeAttributesType }>`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 15px;
  border: none;
`;

const FieldsetLabel = styled.label<{ $theme: ThemeAttributesType }>`
  font-size: 1rem;
  color: ${(props) => props.$theme.text};
  min-width: 120px;
  max-width: 120px;
  text-align: right;
`;

const FieldsetInput = styled.input<{ $theme: ThemeAttributesType }>`
  width: -webkit-fill-available;
  background-color: inherit;
  border-radius: 10px;
  font-size: 1rem;
  line-height: 1rem;
  padding: 6px 12px;
  border: 1px ${(props) => props.$theme.text} solid;
  color: ${(props) => props.$theme.text};

  &:focus {
    outline: none;
    border: 1px var(--active-color) solid;
  }
`;

function ImageButtonClassName(editor: EditorType) {
  if (!editor) {
    return "";
  }

  const selection = editor.state.selection as NodeSelection;

  if (selection.node) {
    return selection.node.type.name === "image" ? "is-active" : "";
  } else {
    return selection.toJSON().type === "image" ? "is-active" : "";
  }
}

function VideoButtonClassName(editor: EditorType) {
  if (!editor) {
    return "";
  }

  const selection = editor.state.selection as NodeSelection;

  if (selection.node) {
    return selection.node.type.name === "video" ? "is-active" : "";
  } else {
    return selection.toJSON().type === "video" ? "is-active" : "";
  }
}

export default function MenuBar() {
  const { editor } = useCurrentEditor();
  const theme = useTheme();
  const [isInsertImageDialogVisible, setIsInsertImageDialogVisible] =
    useState(false);
  const [isInsertVideoDialogVisible, setIsInsertVideoDialogVisible] =
    useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  if (!editor) {
    return null;
  }

  function insertImageWithLink() {
    if (!editor) {
      return;
    }

    if (!isUrl(imageUrl)) {
      toast.error("請輸入正確的圖片網址格式");
      return;
    }

    if (!isUrl(link)) {
      toast.error("請輸入正確的連結格式");
      return;
    }

    setIsInsertImageDialogVisible(false);

    editor
      .chain()
      .focus()
      .setImage({ src: imageUrl })
      .selectParentNode()
      .setLink({ href: link })
      .run();
  }

  function insertVideo() {
    if (!editor) {
      return;
    }

    if (!isVideoUrl(videoUrl)) {
      toast.error("請輸入正確的影片格式");
      return;
    }

    setIsInsertVideoDialogVisible(false);

    editor
      .chain()
      .focus()
      .insertContent({
        type: "video",
        attrs: {
          src: videoUrl,
        },
      })
      .run();
  }

  return (
    <div className="tiptap-menu-control-group">
      <div className="tiptap-menu-button-group">
        {MENU_BUTTON_CONFIG_LIST.map((button) => (
          <MenuButton
            key={button.label}
            $theme={theme}
            className={button.className(editor)}
            onClick={() => button.onClick(editor)}
            disabled={button.isDisabled(editor)}
          >
            {button.label}
          </MenuButton>
        ))}
        <ButtonDialog
          visible={isInsertImageDialogVisible}
          triggerButton={
            <MenuButton
              $theme={theme}
              disabled={false}
              className={ImageButtonClassName(editor)}
              onClick={() => setIsInsertImageDialogVisible(true)}
            >
              Insert Image With Link
            </MenuButton>
          }
          title="插入圖片及對應連結"
          description="請輸入圖片網址及對應點擊連結"
          footerButtonText="完成"
          toggleVisible={(status) => setIsInsertImageDialogVisible(status)}
          submit={insertImageWithLink}
        >
          <Fieldset $theme={theme}>
            <FieldsetLabel $theme={theme} htmlFor="imageUrl">
              圖片網址
            </FieldsetLabel>
            <FieldsetInput
              $theme={theme}
              id="imageUrl"
              defaultValue={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Fieldset>
          <Fieldset $theme={theme}>
            <FieldsetLabel $theme={theme} htmlFor="link">
              點擊連結網址
            </FieldsetLabel>
            <FieldsetInput
              $theme={theme}
              id="link"
              defaultValue={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </Fieldset>
        </ButtonDialog>
        <ButtonDialog
          visible={isInsertVideoDialogVisible}
          triggerButton={
            <MenuButton
              $theme={theme}
              disabled={false}
              className={VideoButtonClassName(editor)}
              onClick={() => setIsInsertVideoDialogVisible(true)}
            >
              Insert Video
            </MenuButton>
          }
          title="插入影片"
          description="請輸入影片網址"
          footerButtonText="完成"
          toggleVisible={(status) => setIsInsertVideoDialogVisible(status)}
          submit={insertVideo}
        >
          <Fieldset $theme={theme}>
            <FieldsetLabel $theme={theme} htmlFor="videoUrl">
              影片網址
            </FieldsetLabel>
            <FieldsetInput
              $theme={theme}
              id="videoUrl"
              defaultValue={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </Fieldset>
        </ButtonDialog>
      </div>
    </div>
  );
}
