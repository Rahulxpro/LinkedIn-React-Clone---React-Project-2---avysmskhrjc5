import React, { useState } from "react";
import Picker from "@emoji-mart/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";

interface EmojiData {
  native: string;
}

interface EmojiSelectorProps {
  addEmoji: (content: string) => void;
  style: {};
}

const EmojiSelector: React.FC<EmojiSelectorProps> = ({ addEmoji, style }) => {
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

  const handleEmojiSelect = (emoji: EmojiData) => {
    if (emoji && emoji.native) {
      addEmoji(emoji.native);
      console.log("Selected emoji:", emoji.native);
    }
    setEmojiPickerVisible(false);
  };

  return (
    <div className="flex flex-col-reverse w-5">
      <button
        className="py-2 pr-6 absolute top-0 right-6"
        onClick={() => setEmojiPickerVisible(!emojiPickerVisible)}
      >
        <FontAwesomeIcon className="size-6 text-gray-500" icon={faFaceSmile} />
      </button>
      <div className="flex items-center justify-center z-50 mt-10 left-0 max-w-full sticky inset-0">
        {emojiPickerVisible && (
          <Picker
            onEmojiSelect={handleEmojiSelect}
            title="Pick your emoji…"
            emoji="point_up"
            style={style}
          />
        )}
      </div>
    </div>
  );
};

export default EmojiSelector;
