import { ReactNode, RefObject } from "react";
import ReactDOM from "react-dom";

interface Props {
  children: ReactNode;

  container: RefObject<HTMLElement>;
}

const Portal = (props: Props) => {
  const { children, container } = props;

  return ReactDOM.createPortal(children, container.current as HTMLElement);
};

export default Portal;
