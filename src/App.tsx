import React, { useEffect, useState } from 'react'
import './main.global.css'
import { hot } from 'react-hot-loader/root'
import { Layout } from './shared/Layout/Layout'
import { Header } from './shared/Header'
import { Content } from './shared/Content'
import { CardsList } from './shared/CardsList'
import { NotFound } from './shared/NotFound'
import { UserContextProvider } from './shared/context/userContext'
import { applyMiddleware, createStore } from 'redux'
import { rootReducer, saveToken } from './store/reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider, useDispatch } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

function AppComponent() {
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])
  return (
    <Provider store={store}>
      {mounted && (
        <BrowserRouter>
          {/* <AppComponent /> */}
          <Switch>
            <Route exact path={['/posts', '/posts/:id']} component={AppComponent} />
            <Route exact path={['/', '/auth']}>
              <Redirect to='/posts' />
            </Route>
            <Route path='/404' component={NotFound} />
            <Redirect to='/404' />
          </Switch>
        </BrowserRouter>
      )}
    </Provider>
  )
}

export const App: React.FC = hot(() => <AppComponentProvider />)
