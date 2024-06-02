import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Datatable {
  key: string;
  name: string;
  gender: string;
  mobile_phone: string;
  nationality: string;
}

export interface DataTableState {
  selectedRowKeys: React.Key[];
  currentPage: number;
  dataTable: Datatable[];
  editKey: string | null | undefined;
  page_size: number;
}

const initialState: DataTableState = {
  selectedRowKeys: [],
  currentPage: 1,
  dataTable: [],
  editKey: null,
  page_size: 10,
};

export const dataTableSlice = createSlice({
  name: "dataTable",
  initialState,
  reducers: {
    setSelectRowKey: (state, action: PayloadAction<React.Key[]>) => {
      console.log("action", action.payload);

      state.selectedRowKeys = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setDataTable: (state, action: PayloadAction<Datatable[]>) => {
      state.dataTable = action.payload;
    },
    setEditKey: (state, action: PayloadAction<string | undefined | null>) => {
      state.editKey = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSelectRowKey, setCurrentPage, setDataTable, setEditKey } =
  dataTableSlice.actions;

export default dataTableSlice.reducer;
