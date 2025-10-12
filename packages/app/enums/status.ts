export const LOAD_MORE_STATUS = {
  LOADING: 'loading',
  MORE: 'more',
  NO_MORE: 'noMore',
} as const

export type LoadMoreType = typeof LOAD_MORE_STATUS[keyof typeof LOAD_MORE_STATUS];
