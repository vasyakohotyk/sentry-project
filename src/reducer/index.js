import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const initialState = {
  toSave: false,
  toAdd: false,
  toCreate: false,
  toNewName: ''
};

export const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    changeToSave: (state, action) => {
      state.toSave = action.payload.toSave;
    },
    changeAddForm: (state, action) => {
      state.toAdd = action.payload.toAdd;
    },
    createBlock: (state, action) => {
      state.toCreate = action.payload.toCreate;
    },
    changeHeaderName: (state, action) => {
      state.toNewName = action.payload.newName;
    }

  },
});


export const { changeToSave, changeAddForm, createBlock, changeHeaderName } = workflowSlice.actions;


export default workflowSlice.reducer;