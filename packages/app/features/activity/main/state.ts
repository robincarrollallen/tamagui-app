import { create } from 'zustand'

interface ActivityState {
  activeTab: string
  setActiveTab: (activeTab: string) => void
}

const initialState = {
  activeTab: 'tab1',
}

export const useActivityState = create<ActivityState>((set) => ({
  ...initialState,

  setActiveTab: (activeTab: string) => set({ activeTab }),
}))