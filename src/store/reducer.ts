import { Action, ActionCreator, Reducer } from 'redux'
import { ThunkAction } from 'redux-thunk'
import {
  TMeRequestAction,
  TMeRequestErrorAction,
  TMeRequestSuccessAction,
  ME_REQUEST,
  ME_REQUEST_ERROR,
  ME_REQUEST_SUCCESS,
} from './me/actions'
import { meReducer, TMeState } from './me/reducer'

export type TRootState = {
  commentText: string
  token: string
  me: TMeState
}

const initialState: TRootState = {
  commentText: '',
  token: '',
  me: {
    loading: false,
    error: '',
    data: {},
  },
}

const UPDATE_COMMENT = 'UPDATE_COMMENT'
type TUpdateCommentAction = {
  type: typeof UPDATE_COMMENT
  text: string
}
export const updateComment: ActionCreator<TUpdateCommentAction> = (text: string) => ({
  type: UPDATE_COMMENT,
  text,
})

const SET_TOKEN = 'SET_TOKEN'
type TSetTokenAction = {
  type: typeof SET_TOKEN
  token: string
}
export const setToken: ActionCreator<TSetTokenAction> = (token: string) => ({
  type: SET_TOKEN,
  token,
})

export const saveToken = (): ThunkAction<void, TRootState, unknown, Action<string>> => (dispatch, _getState) => {
  if (window.__token__ !== 'undefined') {
    dispatch(setToken(window.__token__))
    localStorage.setItem('token', window.__token__)
  }
}

type TMyAction =
  | TUpdateCommentAction
  | TSetTokenAction
  | TMeRequestAction
  | TMeRequestSuccessAction
  | TMeRequestErrorAction
export const rootReducer: Reducer<TRootState, TMyAction> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COMMENT:
      return {
        ...state,
        commentText: action.text,
      }
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      }
    case ME_REQUEST:
    case ME_REQUEST_SUCCESS:
    case ME_REQUEST_ERROR:
      return {
        ...state,
        me: meReducer(state.me, action),
      }
    default:
      return state
  }
}
