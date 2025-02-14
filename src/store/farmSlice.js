import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  livestockCount: 100,
  dailyMilkProduction: 500,
  revenue: 10000,
};

const farmSlice = createSlice({
  name: "farm",
  initialState,
  reducers: {
    updateFarmData: (state, action) => {
      state.livestockCount = action.payload.livestockCount;
      state.dailyMilkProduction = action.payload.dailyMilkProduction;
      state.revenue = action.payload.revenue;
    },
  },
});

export const { updateFarmData } = farmSlice.actions;
export default farmSlice.reducer;
