import React from "react";
import { render } from "@testing-library/react";
import Date, { Props } from "./index";

const day = "12";
const year = "2022";

const initialProps: Props = {
  date: `Wed Jan ${day} ${year} 23:50:58 GM`,
};

describe("atoms/Date", () => {
  const setup = (props: Partial<Props> = {}) => {
    return render(<Date {...initialProps} {...props} />);
  };

  it("date props를 줬을 때, YYYY.MM.DD으로 변환한다", () => {
    const january = setup({ date: `Wed Jan ${day} ${year} 23:50:58 GM` });
    const feburary = setup({ date: `Wed Feb ${day} ${year} 23:50:58 GM` });
    const march = setup({ date: `Wed Mar ${day} ${year} 23:50:58 GM` });
    const april = setup({ date: `Wed Apr ${day} ${year} 23:50:58 GM` });
    const may = setup({ date: `Wed May ${day} ${year} 23:50:58 GM` });
    const june = setup({ date: `Wed Jun ${day} ${year} 23:50:58 GM` });
    const july = setup({ date: `Wed Jul ${day} ${year} 23:50:58 GM` });
    const august = setup({ date: `Wed Aug ${day} ${year} 23:50:58 GM` });
    const september = setup({ date: `Wed Sep ${day} ${year} 23:50:58 GM` });
    const october = setup({ date: `Wed Oct ${day} ${year} 23:50:58 GM` });
    const november = setup({ date: `Wed Nov ${day} ${year} 23:50:58 GM` });
    const december = setup({ date: `Wed Dec ${day} ${year} 23:50:58 GM` });

    expect(january.getByText(`${year}.${1}.${day}`)).toBeInTheDocument();
    expect(feburary.getByText(`${year}.${2}.${day}`)).toBeInTheDocument();
    expect(march.getByText(`${year}.${3}.${day}`)).toBeInTheDocument();
    expect(april.getByText(`${year}.${4}.${day}`)).toBeInTheDocument();
    expect(may.getByText(`${year}.${5}.${day}`)).toBeInTheDocument();
    expect(june.getByText(`${year}.${6}.${day}`)).toBeInTheDocument();
    expect(july.getByText(`${year}.${7}.${day}`)).toBeInTheDocument();
    expect(august.getByText(`${year}.${8}.${day}`)).toBeInTheDocument();
    expect(september.getByText(`${year}.${9}.${day}`)).toBeInTheDocument();
    expect(october.getByText(`${year}.${10}.${day}`)).toBeInTheDocument();
    expect(november.getByText(`${year}.${11}.${day}`)).toBeInTheDocument();
    expect(december.getByText(`${year}.${12}.${day}`)).toBeInTheDocument();
  });
});
