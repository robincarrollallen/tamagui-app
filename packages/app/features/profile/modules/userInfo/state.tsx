import { create } from 'zustand'

interface UserInfoState {
  confirmDialogOpen: boolean
  setConfirmDialogOpen: (confirmDialogOpen: boolean) => void
}

const initialState = {
  confirmDialogOpen: false,
}

export const useUserInfoState = create<UserInfoState>((set) => ({
  ...initialState,

  setConfirmDialogOpen: (confirmDialogOpen: boolean) => set({ confirmDialogOpen }),
  
}))