// store.js
import { configureStore } from "@reduxjs/toolkit";
import dataTableReduce from "./redux/dataTableSlice";

const store = configureStore({
  reducer: {
    dataTable: dataTableReduce,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
