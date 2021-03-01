import {
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsTypeBold,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsCardImage,
  BsChevronRight,
  BsLink45Deg,
} from "react-icons/bs";
import { BiCodeAlt } from "react-icons/bi";

export type MarkDownToolBar =
  | "h1"
  | "h2"
  | "h3"
  | "bold"
  | "strike"
  | "italic"
  | "quote"
  | "link"
  | "codeBlock"
  | "image";

const data = [
  {
    icon: BsTypeH1,
    type: "h1",
  },
  {
    icon: BsTypeH2,
    type: "h2",
  },
  {
    icon: BsTypeH3,
    type: "h3",
  },
  {
    icon: BsTypeBold,
    type: "bold",
  },
  {
    icon: BsTypeItalic,
    type: "italic",
  },
  {
    icon: BsTypeStrikethrough,
    type: "strike",
  },
  {
    icon: BsChevronRight,
    type: "quote",
  },
  {
    icon: BsLink45Deg,
    type: "link",
  },
  {
    icon: BiCodeAlt,
    type: "codeBlock",
  },
  {
    icon: BsCardImage,
    type: "image",
  },
];

export default data;
