
export interface ModalsState {
  isShow: boolean,
  currentModalKey: string,
  options: Record<any, unknown>,
}

export const initState = (): ModalsState => ({
  isShow: false,
  currentModalKey: '',
  options: {}
})

export default initState
