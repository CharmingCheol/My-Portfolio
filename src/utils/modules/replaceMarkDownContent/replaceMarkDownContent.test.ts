import replaceMarkDownContent from "./index";

describe("replaceMarkDownContent", () => {
  it("↵을 공백 문자로 대체한다", () => {
    const singleTest = replaceMarkDownContent("ㄱㄴㄷㄹㅁㅂㅅㅇㅈ↵");
    const multipleTest = replaceMarkDownContent("ㅁㅁ↵ㅁㅁ↵ㅁㅁ↵ㅁㅁ↵ㅁㅁ↵");
    expect(singleTest).toBe("ㄱㄴㄷㄹㅁㅂㅅㅇㅈ ");
    expect(multipleTest).toBe("ㅁㅁ ㅁㅁ ㅁㅁ ㅁㅁ ㅁㅁ ");
  });

  it("# 을 전부 제거한다", () => {
    const h1 = replaceMarkDownContent("# asd↵");
    const h2 = replaceMarkDownContent("## asd↵");
    const h3 = replaceMarkDownContent("### asd↵");
    const h4 = replaceMarkDownContent("#### asd↵");
    const h5 = replaceMarkDownContent("##### asd↵");
    const h6 = replaceMarkDownContent("###### asd↵");
    const mutiple = replaceMarkDownContent("# aaa↵## bbb↵### ccc↵#### ddd↵##### eee↵");
    expect(h1).toBe("asd ");
    expect(h2).toBe("asd ");
    expect(h3).toBe("asd ");
    expect(h4).toBe("asd ");
    expect(h5).toBe("asd ");
    expect(h6).toBe("asd ");
    expect(mutiple).toBe("aaa bbb ccc ddd eee ");
  });

  it("좌우에 **을 전부 제거한다", () => {
    const defaultBold = replaceMarkDownContent("**defaultBold**↵");
    const existsSpace = replaceMarkDownContent("**exists space**↵");
    const notNewLine = replaceMarkDownContent("**not new line**");
    expect(defaultBold).toBe("defaultBold ");
    expect(existsSpace).toBe("exists space ");
    expect(notNewLine).toBe("not new line");
  });

  it("좌우에 _을 전부 제거한다", () => {
    const defaultItalic = replaceMarkDownContent("_defaultItalic_↵");
    const existsSpace = replaceMarkDownContent("_exists space_↵");
    const notNewLine = replaceMarkDownContent("_not new line_");
    expect(defaultItalic).toBe("defaultItalic ");
    expect(existsSpace).toBe("exists space ");
    expect(notNewLine).toBe("not new line");
  });

  it("좌우에 ~~을 전부 제거한다", () => {
    const defaultStrike = replaceMarkDownContent("~~defaultStrike~~↵");
    const existsSpace = replaceMarkDownContent("~~exists space~~↵");
    const notNewLine = replaceMarkDownContent("~~not new line~~");
    expect(defaultStrike).toBe("defaultStrike ");
    expect(existsSpace).toBe("exists space ");
    expect(notNewLine).toBe("not new line");
  });

  it("``` 사이에 있는 텍스트와 ```울 전부 제거한다", () => {
    const example = "```javascript↵    import React from 'react';↵    const Test = 'test';↵    ```";
    const code = replaceMarkDownContent(example);
    expect(code).toBe("");
  });

  it("이미지 링크 텍스트를 전부 제거한다", () => {
    const example =
      "차민철![](https://charmingcheol.s3.ap-northeast-2.amazonaws.com/posts/1613793084375.jpeg) 차민철어어어어얼";
    const code = replaceMarkDownContent(example);
    expect(code).toBe("차민철 차민철어어어어얼");
  });

  it(">와 >에 포함되는 텍스트틀 전부 제거한다", () => {
    const example = "> ㄴㄹㄴㅇㄹㅇㄴㄹ ffdgfdgdfg↵차민철";
    const code = replaceMarkDownContent(example);
    expect(code).toBe("차민철");
  });

  it("URL 링크 텍스트를 전부 제거한다", () => {
    const example = "차민철 [ㄴㅇㄹㄴㅇㄹ](https://github.com/CharmingCheol/My-Portfolio/tree/develop)차민철";
    const code = replaceMarkDownContent(example);
    expect(code).toBe("차민철 차민철");
  });
});
