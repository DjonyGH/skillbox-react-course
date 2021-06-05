import React, { useEffect } from 'react'
import './main.global.css'
import { hot } from 'react-hot-loader/root'
import { Layout } from './shared/Layout/Layout'
import { Header } from './shared/Header'
import { Content } from './shared/Content'
import { CardsList } from './shared/CardsList'
import { useToken } from './hooks/useToken'
import { UserContextProvider } from './shared/context/userContext'
import { PostsContextProvider } from './shared/context/postsContext'
import { Action, applyMiddleware, createStore, Middleware } from 'redux'
import { rootReducer, setToken, TRootState } from './strore'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider, useDispatch } from 'react-redux'
import thunk, { ThunkAction } from 'redux-thunk'

// const logger: Middleware = (store) => (next) => (action) => {
//   console.log('dispatching', action)
//   next(action)
// }

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

const timout = (): ThunkAction<void, TRootState, unknown, Action<string>> => (dispatch, _getState) => {
  dispatch({ type: 'START' })
  setTimeout(() => {
    dispatch({ type: 'FINISH' })
  }, 2000)
}

function AppComponent() {
  const [token] = useToken()

  useEffect(() => {
    if (token) {
      store.dispatch(setToken(token))
      //@ts-ignore
      store.dispatch(timout())
    }
  }, [token])

  return (
    <UserContextProvider>
      <PostsContextProvider>
        <Layout>
          <Header />
          <Content>
            <CardsList />
          </Content>
        </Layout>
      </PostsContextProvider>
    </UserContextProvider>
  )
}

function AppComponentProvider() {
  return (
    <Provider store={store}>
      <AppComponent />
    </Provider>
  )
}

export const App: React.FC = hot(() => <AppComponentProvider />)
