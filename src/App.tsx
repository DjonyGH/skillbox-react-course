import React, { useEffect, useState } from "react";
import "./main.global.css";
import { hot } from "react-hot-loader/root";
import { Layout } from "./shared/Layout/Layout";
import { Header } from "./shared/Header";
import { Content } from "./shared/Content";
import { CardsList } from "./shared/CardsList";
import { useToken } from "./hooks/useToken";
import { tokenContext } from "./shared/context/tokenContext";
import { UserContextProvider } from "./shared/context/userContext";
import { PostsContextProvider } from "./shared/context/postsContext";
import { CommentContextProvider } from "./shared/context/commentContext";

function AppComponent() {
  const [token] = useToken();
  return (
    <tokenContext.Provider value={token}>
      <UserContextProvider>
        <PostsContextProvider>
          <CommentContextProvider>
            <Layout>
              <Header />
              <Content>
                <CardsList />
              </Content>
            </Layout>
          </CommentContextProvider>
        </PostsContextProvider>
      </UserContextProvider>
    </tokenContext.Provider>
  );
}

export const App: React.FC = hot(() => <AppComponent />);
