import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isEnquiryOpen: false,
    selectedProduct: null,
  },
  reducers: {
    openEnquiryModal(state, action) {
      state.isEnquiryOpen = true;
      state.selectedProduct = action.payload || null;
    },
    closeEnquiryModal(state) {
      state.isEnquiryOpen = false;
      state.selectedProduct = null;
    },
  },
});

export const { openEnquiryModal, closeEnquiryModal } = modalSlice.actions;
export default modalSlice.reducer;
