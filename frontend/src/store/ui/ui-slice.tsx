import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ModalActionType = "create" | "edit" | "view" | "status" | "";
export type ModalEntityType = "task" | "";

interface UiState {
  activeTab: string;
  isDropdownOpen: boolean;
  activeDropdownId: string | null;
  isModalOpen: boolean;
  modalActionType: ModalActionType;
  modalEntityType: ModalEntityType;
  selectedTaskId: string | null;
}

const initialState: UiState = {
  activeTab: "All",
  isDropdownOpen: false,
  activeDropdownId: null,
  isModalOpen: false,
  modalActionType: "",
  modalEntityType: "",
  selectedTaskId: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },

    openDropdown: (state, action: PayloadAction<string>) => {
      state.isDropdownOpen = true;
      state.activeDropdownId = action.payload;
    },

    closeDropdown: (state) => {
      state.isDropdownOpen = false;
      state.activeDropdownId = null;
    },

    openModal: (
      state,
      action: PayloadAction<{
        actionType: ModalActionType;
        entityType: ModalEntityType;
        taskId?: string;
      }>,
    ) => {
      state.isModalOpen = true;
      state.modalActionType = action.payload.actionType;
      state.modalEntityType = action.payload.entityType;
      state.selectedTaskId = action.payload.taskId || null;
    },

    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalActionType = "";
      state.modalEntityType = "";
      state.selectedTaskId = null;
    },
  },
});

export const { changeTab, openDropdown, closeDropdown, openModal, closeModal } = uiSlice.actions;

export const uiReducer = uiSlice.reducer;
