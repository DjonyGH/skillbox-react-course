import React, { useEffect } from 'react'
import './main.global.css'
import { hot } from 'react-hot-loader/root'
import { Layout } from './shared/Layout/Layout'
import { Header } from './shared/Header'
import { Content } from './shared/Content'
import { CardsList } from './shared/CardsList'
import { useToken } from './hooks/useToken'
import { UserContextProvider } from './shared/context/userContext'
import { Action, applyMiddleware, createStore, Middleware } from 'redux'
import { rootReducer, saveToken, setToken, TRootState } from './store/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider, useDispatch, useSelector } from 'react-redux'
import thunk, { ThunkAction } from 'redux-thunk'

// const logger: Middleware = (store) => (next) => (action) => {
//   console.log('dispatching', action)
//   next(action)
// }

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

function AppComponent() {
  // const [token] = useToken()

  // useEffect(() => {
  //   if (token) {
  //     store.dispatch(setToken(token))
  //   }
  // }, [token])

  // const token = useSelector<TRootState, string>((state) => state.token)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(saveToken())
  }, [])

  return (
    <UserContextProvider>
      <Layout>
        <Header />
        <Content>
          <CardsList />
        </Content>
      </Layout>
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
