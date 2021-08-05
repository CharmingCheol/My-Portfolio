import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { AiFillGithub } from "react-icons/ai";
import Icon, { Props } from "./index";

const initialProps: Props = {
  icon: AiFillGithub,
};

describe("atoms/Icon", () => {
  const setup = (props: Partial<Props> = {}) => {
    return render(<Icon {...initialProps} {...props} />);
  };

  it("onClick props를 주고 icon 클릭 시, 클릭 이벤트가 발생한다", () => {
    const onClick = jest.fn();
    setup({ onClick });
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toBeCalledTimes(1);
  });
});
