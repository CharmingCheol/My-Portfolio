import React, { useCallback, useEffect, useRef, useState } from "react";
import * as S from "./style";

export interface TextareaProps {
  onChange: (text: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  textProps?: string;
}

const Textarea = ({ onChange, onKeyDown, placeholder, textProps }: TextareaProps) => {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const changeTextarea = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!textareaRef.current) return;
      textareaRef.current.style.height = "1px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setText(e.target.value);
      onChange(e.target.value);
    },
    [onChange],
  );

  useEffect(() => {
    if (textProps) return;
    setText("");
  }, [textProps]);

  return (
    <>
      <S.Textarea
        ref={textareaRef}
        value={text}
        onKeyDown={onKeyDown}
        onChange={changeTextarea}
        placeholder={placeholder}
      />
    </>
  );
};

export default Textarea;
