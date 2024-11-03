import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PriorityType from "../../types/PriorityType";
import { RootState } from "..";

interface FilterState {
  priority: PriorityType;
}

const initialState: FilterState = {
  priority: PriorityType.all
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<PriorityType>) => {
      state.priority = action.payload;
    }
  }
});
export const selectedPriority = (state: RootState) => state.filter.priority;
export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
