import React, { useState } from "react";

interface ICommentContext {
  value: string;
  onChange: (value: string) => void;
}

export const commentContext = React.createContext<ICommentContext>({
  value: "",
  onChange: () => {},
});

interface ICommentContextProviderProps {
  children?: React.ReactNode;
}

export function CommentContextProvider({
  children,
}: ICommentContextProviderProps) {
  const [commentValue, setCommentValue] = useState<string>("");
  return (
    <commentContext.Provider
      value={{ value: commentValue, onChange: setCommentValue }}
    >
      {children}
    </commentContext.Provider>
  );
}
