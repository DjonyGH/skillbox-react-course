import React, { useState } from 'react'

export const commentContext = React.createContext<string>('')

interface ICommentContextProviderProps {
  children?: React.ReactNode
}

export function CommentContextProvider({ children }: ICommentContextProviderProps) {
  const [commentValue, setCommentValue] = useState<string>('')
  return <commentContext.Provider value={commentValue}>{children}</commentContext.Provider>
}
