import { Reducer } from 'redux'
import {
  IUserData,
  ME_REQUEST,
  ME_REQUEST_ERROR,
  ME_REQUEST_SUCCESS,
  TMeRequestAction,
  TMeRequestErrorAction,
  TMeRequestSuccessAction,
} from './actions'

export type TMeState = {
  loading: boolean
  error: string
  data: IUserData
}

const initialMeState: TMeState = {
  loading: false,
  error: '',
  data: {},
}

type TMeActions = TMeRequestAction | TMeRequestSuccessAction | TMeRequestErrorAction

export const meReducer: Reducer<TMeState, TMeActions> = (state = initialMeState, action) => {
  switch (action.type) {
    case ME_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ME_REQUEST_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false,
      }
    case ME_REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      }
    default:
      return state
  }
}
