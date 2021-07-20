import { createGlobalStyle } from "styled-components";
import fontSize from "./fontSize";

const StyleReset = createGlobalStyle`
    html, body, h1, h2, h3, h4, h5, h6, p, blockquote, code, img, dl, dt, dd, ol, ul, li, fieldset, legend, caption { margin: 0; padding: 0; border: 0; }
    div, span, article, section, header, footer, p, ul, li, fieldset, legend, label, a, nav { 
        box-sizing: border-box;
    }
    html {
        height: 100%;
    }
    body {
        min-height: 100%;
    }
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video, button, textarea {
        display: block;
        margin: 0;
        padding: 0;
        border: 0;
        outline:0;
        font-size:1rem;
        color:black;
        box-sizing: border-box;
        font-size: 17px;
    }
    article, aside, details, figcaption, figure,
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    ol, ul, li {
        list-style: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    a {
        text-decoration: none;
        outline: none;
    }
    input {
        outline: none;
        border: none;
    }
    #root {
        min-height: 100vh;
        background:white;
        overflow-x: hidden;
    }
    h1 {
        font-size: ${fontSize.h1}px;
    }
    h2 {
        font-size: ${fontSize.h2}px;
    }
    h3 {
        font-size: ${fontSize.h3}px;
    }
    h4, h5, h6, p {
        font-size: ${fontSize.base}px;
    }
    p {
        line-height: 1.75;
    }
`;

export default StyleReset;
