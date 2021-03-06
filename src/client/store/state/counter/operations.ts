import { Dispatch } from '@lib'
import * as Actions from './actions'
import { State } from './types'

const incrementComplexy = (payload: State) => (dispatch: Dispatch) => {
  dispatch(Actions.increment({ count: 1 }))
  dispatch(Actions.increment({ count: 2 }))
}

export default {
  ...Actions,
  incrementComplexy,
}
