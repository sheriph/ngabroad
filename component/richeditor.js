import React, { useState } from "react";
import { ContentState, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Box, Button, Stack } from "@mui/material";
import { convertFromHTML, convertToHTML } from "draft-convert";
import htmlToDraft from "html-to-draftjs";
import { Storage } from "aws-amplify";

export default function RichEditor({
  value,
  onChange,
  minHeight = "100px",
  toolbarHidden = false,
}) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML({
      entityToHTML: (entity, originalText) => {
        if (entity.type === "IMAGE") {
          return (
            <img
              src={entity.data.src}
              width={entity.data.width}
              height={entity.data.height}
              alt="replaceableAlt"  

            />
          );
        }
        return originalText;
      },
    })(editorState.getCurrentContent());
    onChange(currentContentAsHTML);
  };

  const handleChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  React.useEffect(() => {
    // @ts-ignore
    const editorState = EditorState.createWithContent(convertFromHTML(value));

    // const editorState = EditorState.createWithContent(contentState);
    console.log("editorState", editorState);
    handleChange(editorState);
  }, [null]);

  const generateColors = () => {
    const colors = [];
    while (colors.length < 100) {
      do {
        var color = Math.floor(Math.random() * 1000000 + 1);
        // @ts-ignore
      } while (colors.indexOf(color) >= 0);
      colors.push("#" + ("000000" + color.toString(16)).slice(-6));
    }
    return colors;
  };

  async function uploadCallback(file) {
    console.log("file", file);
    try {
      const upload = await Storage.put(`media/${file.name}`, file, {});
      console.log("upload", upload.key);
      return new Promise((resolve, reject) => {
        resolve({
          data: {
            link: `https://ngabroadbucket210504-dev.s3.eu-west-2.amazonaws.com/public/${upload.key}`,
          },
        });
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  return (
    <Stack
      sx={{
        "& .wrapper-class": {
          minHeight: minHeight,
          border: "1px solid",
          borderColor: "primary.main",
        },
        "& .editor-class": { px: "5px" },
      }}
    >
      <Editor
        toolbarHidden={toolbarHidden}
        toolbar={{
          image: {
            //  icon: image,
            //   colorPicker: generateColors(),
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: true,
            uploadCallback: uploadCallback,
            previewImage: true,
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            //  alt: { present: true, mandatory: true },
          },
          emoji: {
            className: undefined,
            component: undefined,
            popupClassName: undefined,
            emojis: [
              "😀",
              "😁",
              "😂",
              "😃",
              "😉",
              "😋",
              "😎",
              "😍",
              "😗",
              "🤗",
              "🤔",
              "😣",
              "😫",
              "😴",
              "😌",
              "🤓",
              "😛",
              "😜",
              "😠",
              "😇",
              "😷",
              "😈",
              "👻",
              "😺",
              "😸",
              "😹",
              "😻",
              "😼",
              "😽",
              "🙀",
              "🙈",
              "🙉",
              "🙊",
              "👼",
              "👮",
              "🕵",
              "💂",
              "👳",
              "🎅",
              "👸",
              "👰",
              "👲",
              "🙍",
              "🙇",
              "🚶",
              "🏃",
              "💃",
              "⛷",
              "🏂",
              "🏌",
              "🏄",
              "🚣",
              "🏊",
              "⛹",
              "🏋",
              "🚴",
              "👫",
              "💪",
              "👈",
              "👉",
              "👉",
              "👆",
              "🖕",
              "👇",
              "🖖",
              "🤘",
              "🖐",
              "👌",
              "👍",
              "👎",
              "✊",
              "👊",
              "👏",
              "🙌",
              "🙏",
              "🐵",
              "🐶",
              "🐇",
              "🐥",
              "🐸",
              "🐌",
              "🐛",
              "🐜",
              "🐝",
              "🍉",
              "🍄",
              "🍔",
              "🍤",
              "🍨",
              "🍪",
              "🎂",
              "🍰",
              "🍾",
              "🍷",
              "🍸",
              "🍺",
              "🌍",
              "🚑",
              "⏰",
              "🌙",
              "🌝",
              "🌞",
              "⭐",
              "🌟",
              "🌠",
              "🌨",
              "🌩",
              "⛄",
              "🔥",
              "🎄",
              "🎈",
              "🎉",
              "🎊",
              "🎁",
              "🎗",
              "🏀",
              "🏈",
              "🎲",
              "🔇",
              "🔈",
              "📣",
              "🔔",
              "🎵",
              "🎷",
              "💰",
              "🖊",
              "📅",
              "✅",
              "❎",
              "💯",
            ],
          },
        }}
        editorState={editorState}
        // defaultEditorState={editorState}
        onEditorStateChange={handleChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </Stack>
  );
}
