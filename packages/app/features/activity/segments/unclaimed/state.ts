import { LOAD_MORE_STATUS, LoadMoreType, RANGE_TIME } from 'app/enums'
import { create } from 'zustand'

interface UnclaimedState {
  date: number
  page: number
  recordList: Recordable[]
  loadingMore: LoadMoreType
  setLoadingMore: (loadingMore: LoadMoreType) => void
  setRecordList: (list: Recordable[]) => void
  setDate: (date: number) => void
  setPage: (page: number) => void
}

const initialState = {
  date: RANGE_TIME.TODAY,
  page: 1,
  recordList: [],
  loadingMore: LOAD_MORE_STATUS.MORE,
}

export const useUnclaimedState = create<UnclaimedState>((set) => ({
  ...initialState,

  setLoadingMore: (loadingMore: LoadMoreType) => set({ loadingMore }),
  setRecordList: (list: Recordable[]) => {
    set({ recordList: list })
  },
  setDate: (date: number) => set({ date }),
  setPage: (page: number) => set({ page }),

  reset: () => set(initialState),
}))