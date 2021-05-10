import React from "react";
import { usePostsData } from "../../hooks/usePostsData";

export interface IPostsContextData {
  author?: string;
  previewImg?: string;
  title?: string;
  created?: number;
  score?: number;
  comments?: number;
}

export const postsContext = React.createContext<IPostsContextData[]>([])

interface IPostsContextProviderProps {
  children?: React.ReactNode
}

export function PostsContextProvider({children}: IPostsContextProviderProps) {
  const [data] = usePostsData();
  return (
    <postsContext.Provider value={data}>
      {children}
    </postsContext.Provider>
  )
}