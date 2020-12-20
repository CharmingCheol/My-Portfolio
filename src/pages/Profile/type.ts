import { Dispatch } from "react";
import { ProfileActions } from "./action";

interface CareerSummaryState {
  company: string;
  department: string;
  period: string;
}

interface EducationState {
  school: string;
  major: string;
  period: string;
}

interface CareerDetailState {
  title: string;
  period: string;
  description: string[];
}

interface ResumeState {
  name: string;
  birth: string;
  skills: string[];
  careerSummary: CareerSummaryState[];
  education: EducationState[];
  careerDetail: CareerDetailState[];
}

export interface BackgroundColor {
  keyword: "#0ac4c1";
  skills: "#2cc3f8";
  resume: "#fbbc28";
}

export interface ReducerState {
  printMenu: boolean;
  backgroundColor: BackgroundValue;
  keywordList: KeywordListState;
  resume: ResumeState;
  selectedVinylRecord: string;
  textRatio: number;
}

export interface Context extends ReducerState {
  dispatch: Dispatch<ProfileActions>;
}

export interface KeywordListState {
  title: string;
  list: string[];
}

export type BackgroundValue = BackgroundColor[keyof BackgroundColor];

export type BackgroundColorKey = keyof BackgroundColor;
