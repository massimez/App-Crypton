
export interface LoaderState {
  isLoading: boolean,
  loaderStatusText: string,
  isBgHider: boolean,
}

export const initState = (): LoaderState => ({
  isLoading: false,
  loaderStatusText: 'Loading',
  isBgHider: true
})

export default initState
