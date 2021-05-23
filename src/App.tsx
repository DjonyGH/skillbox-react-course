import React from 'react'
import './main.global.css'
import { hot } from 'react-hot-loader/root'
import { Layout } from './shared/Layout/Layout'
import { Header } from './shared/Header'
import { Content } from './shared/Content'
import { CardsList } from './shared/CardsList'
import { useToken } from './hooks/useToken'
import { tokenContext } from './shared/context/tokenContext'
import { UserContextProvider } from './shared/context/userContext'
import { PostsContextProvider } from './shared/context/postsContext'
import { createStore } from 'redux'
import { rootReducer, setToken } from './strore'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider, useDispatch } from 'react-redux'

const store = createStore(rootReducer, composeWithDevTools())

function AppComponent() {
  const [token] = useToken()
  const dispatch = useDispatch()
  dispatch(setToken(token))
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
