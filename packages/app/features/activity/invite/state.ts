import { create } from 'zustand'

interface InviteState {
  activeTab: string
  setActiveTab: (activeTab: string) => void
}

const initialState = {
  activeTab: 'tab1',
}

export const useInviteState = create<InviteState>((set) => ({
  ...initialState,

  setActiveTab: (activeTab: string) => set({ activeTab }),
}))