import React, { useContext } from "react";
import { ProfileContext } from "@pages/Profile/reducer";
import * as S from "./style";

interface MyResumeProps {
  visibled: boolean;
}

const MyResume = ({ visibled }: MyResumeProps) => {
  const { resume } = useContext(ProfileContext);

  return (
    <>
      <S.Layout visibled={visibled}>
        <S.ResumeWrapper>
          <S.HeaderWrapper>
            <h1>{resume.name}</h1>
            <h3>{resume.birth}</h3>
          </S.HeaderWrapper>
          <S.TagListWrapper>
            <h2>Skills</h2>
            <S.TagList>
              {resume.skills.map((skill) => (
                <li key={skill}>
                  <p>{skill}</p>
                </li>
              ))}
            </S.TagList>
          </S.TagListWrapper>
          <S.TableWrapper>
            <h2>학력</h2>
            <table>
              <tbody>
                {resume.education.map((tr) => (
                  <tr key={(Math.random() * 10).toFixed(3)}>
                    {Object.entries(tr).map(([key, value]) => (
                      <td key={key}>{value}</td>
                    ))}
                  </tr>
                ))}
                {Array(3 - resume.education.length)
                  .fill(0)
                  .map(() => (
                    <tr key={(Math.random() * 10).toFixed(3)}>
                      {Array(3)
                        .fill(0)
                        .map(() => (
                          <td key={(Math.random() * 10).toFixed(3)} />
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </S.TableWrapper>
          <S.TableWrapper>
            <h2>경력 요약</h2>
            <table>
              <tbody>
                {resume.careerSummary.map((tr) => (
                  <tr key={(Math.random() * 10).toFixed(3)}>
                    {Object.entries(tr).map(([key, value]) => (
                      <td key={key}>{value}</td>
                    ))}
                  </tr>
                ))}
                {Array(3 - resume.careerSummary.length)
                  .fill(0)
                  .map(() => (
                    <tr key={(Math.random() * 10).toFixed(3)}>
                      {Array(3)
                        .fill(0)
                        .map(() => (
                          <td key={(Math.random() * 10).toFixed(3)} />
                        ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </S.TableWrapper>
          <div>
            <h2>경력 상세</h2>
            <S.CareerDetailList>
              {resume.careerDetail.map((value) => (
                <S.CareerDetailItem key={value.title}>
                  <div className="header">
                    <h3>{value.title}</h3>
                    <h4>{value.period}</h4>
                  </div>
                  <div>
                    {value.description.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </S.CareerDetailItem>
              ))}
            </S.CareerDetailList>
          </div>
        </S.ResumeWrapper>
      </S.Layout>
    </>
  );
};

export default MyResume;
