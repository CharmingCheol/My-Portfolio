import React, { createContext, useMemo, useReducer } from "react";
import Profile from "./index";
import { CLICK_GEAR_ICON, CLICK_LP_COVER, DRAG_TEXT_VOLUME, ProfileActions } from "./action";
import { palatte, vinylRecords } from "./data";
import { ReducerState, Context } from "./type";

export const ProfileContext = createContext<Context>({
  dispatch: () => {},
  printMenu: false,
  backgroundColor: palatte.keyword,
  keywordList: { title: "", list: [] },
  resume: { name: "", birth: "", skills: [], careerSummary: [], education: [], careerDetail: [] },
  selectedVinylRecord: "",
  textRatio: 0,
});

const initialValue: ReducerState = {
  printMenu: false,
  backgroundColor: palatte.keyword,
  keywordList: { title: "", list: [] },
  resume: { name: "", birth: "", skills: [], careerSummary: [], education: [], careerDetail: [] },
  selectedVinylRecord: "",
  textRatio: 0,
};

const reducer = (state = initialValue, action: ProfileActions): ReducerState => {
  switch (action.type) {
    case CLICK_GEAR_ICON:
      return { ...state, printMenu: !action.payload };
    case CLICK_LP_COVER:
      if (action.payload === "resume") {
        return {
          ...state,
          backgroundColor: palatte[action.payload],
          resume: { ...vinylRecords.resume },
          selectedVinylRecord: action.payload,
        };
      }
      return {
        ...state,
        backgroundColor: palatte[action.payload],
        keywordList: { ...vinylRecords[action.payload] },
        selectedVinylRecord: action.payload,
      };
    case DRAG_TEXT_VOLUME:
      return { ...state, textRatio: action.payload };
    default:
      return state;
  }
};

const ProfileReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const { backgroundColor, keywordList, printMenu, resume, selectedVinylRecord, textRatio } = state;
  const value = useMemo(
    () => ({ backgroundColor, dispatch, keywordList, printMenu, resume, selectedVinylRecord, textRatio }),
    [backgroundColor, keywordList, printMenu, resume, selectedVinylRecord, textRatio],
  );

  return (
    <>
      <ProfileContext.Provider value={value}>
        <Profile />
      </ProfileContext.Provider>
    </>
  );
};

export default ProfileReducer;
