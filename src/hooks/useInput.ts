import { useCallback, useState, Dispatch, SetStateAction } from "react";

type eventType = React.ChangeEvent<HTMLInputElement>;
type returnType = [string, (e: eventType) => void, Dispatch<SetStateAction<string>>];

const useInput = (initialValue: string): returnType => {
  const [text, setText] = useState(initialValue);

  const changeText = useCallback((e: eventType) => {
    setText(e.target.value);
  }, []);

  return [text, changeText, setText];
};

export default useInput;
