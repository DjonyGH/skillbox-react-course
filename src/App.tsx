import React, { useEffect, useState } from "react";
import "./main.global.css";
import { hot } from "react-hot-loader/root";
import { Layout } from "./shared/Layout/Layout";
import { Header } from "./shared/Header";
import { Content } from "./shared/Content";
import { CardsList } from "./shared/CardsList";
import { useToken } from "./hooks/useToken";
import { tokenContext } from "./shared/context/tokenContext";

function AppComponent() {
  const [token] = useToken();

  const { Provider } = tokenContext;

  return (
    <Provider value={token}>
      <Layout>
        <Header />
        <Content>
          <CardsList />
        </Content>
      </Layout>
    </Provider>
  );
}

export const App = hot(AppComponent);
