import React, { createContext, useMemo, useReducer, Dispatch } from "react";
import { ProfileActions, CLICK_PHOTO_FRAME, CLICK_POPUP_CLOSE } from "./action";
import Project from "./index";
import projectData from "./data";

interface PopupData {
  date: string;
  description: string[];
  team: string;
  tech: string[];
  title: string;
  link: string;
}

interface ReducerState {
  clickedArtName: string;
  togglePopup: boolean;
  popupData: PopupData;
}

interface Context extends ReducerState {
  dispatch: Dispatch<ProfileActions>;
}

export const projectContext = createContext<Context>({
  clickedArtName: "",
  dispatch: () => {},
  togglePopup: false,
  popupData: {
    date: "",
    link: "",
    title: "",
    team: "",
    description: [],
    tech: [],
  },
});

const initialValue: ReducerState = {
  clickedArtName: "",
  togglePopup: false,
  popupData: {
    date: "",
    link: "",
    title: "",
    team: "",
    description: [],
    tech: [],
  },
};

const reducer = (state = initialValue, action: ProfileActions): ReducerState => {
  switch (action.type) {
    case CLICK_PHOTO_FRAME: {
      const index = projectData.findIndex((value) => value.name === action.payload);
      const copy = { ...projectData[index] };
      return { ...state, clickedArtName: action.payload, popupData: copy.payload, togglePopup: true };
    }
    case CLICK_POPUP_CLOSE:
      return { ...state, togglePopup: false };
    default:
      return state;
  }
};

const ProjectReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const { clickedArtName, togglePopup, popupData } = state;
  const value = useMemo(() => ({ dispatch, clickedArtName, togglePopup, popupData }), [
    clickedArtName,
    togglePopup,
    popupData,
  ]);

  return (
    <>
      <projectContext.Provider value={value}>
        <Project />
      </projectContext.Provider>
    </>
  );
};

export default ProjectReducer;
