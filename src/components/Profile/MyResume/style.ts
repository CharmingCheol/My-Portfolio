import styled from "styled-components";

interface Props {
  visibled: boolean;
}

export const Layout = styled.div<Props>`
  display: ${(props) => (props.visibled ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  visibility: ${(props) => (props.visibled ? "visible" : "hidden")};
  transition: visibility 2s;
  h1,
  h2 {
    margin-bottom: 8px;
  }
  h1 {
    font-size: 48px;
  }
  @media (max-width: 576px) {
    h1 {
      font-size: 24px;
    }
    h2 {
      font-size: 16px;
    }
    p {
      font-size: 12px;
    }
  }
`;

export const ResumeWrapper = styled.div`
  width: 90%;
  height: 85%;
  padding: 32px;
  background: white;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background: #fcfcfc;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 769px) {
    width: 70%;
  }
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 32px;
`;

export const TagListWrapper = styled.div`
  margin-bottom: 32px;
`;

export const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  li {
    width: 33%;
    height: 40px;
    padding: 2px;
    margin-bottom: 8px;
  }
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    border: 1px solid black;
    border-radius: 8px;
  }
  @media (max-width: 576px) {
    li {
      width: 50%;
    }
  }
`;

export const TableWrapper = styled.div`
  margin-bottom: 40px;
  table {
    width: 100%;
    border-top: 1px solid #444444;
    border-collapse: collapse;
  }
  tr {
    height: 32px;
  }
  th,
  td {
    padding: 10px;
    border-bottom: 1px solid #444444;
    text-align: center;
  }
  @media (max-width: 576px) {
    td {
      font-size: 10px;
    }
  }
`;

export const CareerDetailList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 8px;
`;

export const CareerDetailItem = styled.li`
  min-height: 250px;
  padding: 32px 16px;
  margin-bottom: 16px;
  border: 1px solid black;
  border-radius: 8px;
  .header {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 16px;
  }
  h3 {
    margin-bottom: 8px;
  }
  @media (max-width: 769px) {
    h3 {
      text-align: right;
    }
    p {
      text-align: left;
    }
  }
`;
