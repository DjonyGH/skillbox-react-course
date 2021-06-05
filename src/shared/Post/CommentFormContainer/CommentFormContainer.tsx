import React, { ChangeEvent, FormEvent, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TRootState, updateComment } from '../../../store/reducer'
import { commentContext } from '../../context/commentContext'
import { CommentForm } from '../CommentForm/CommentForm'

interface ICommentFormContainer {
  refCommentInput: React.RefObject<HTMLTextAreaElement>
}

export const CommentFormContainer: React.FC<ICommentFormContainer> = ({ refCommentInput }) => {
  const value = useSelector<TRootState, string>((state) => state.commentText)
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateComment(e.target.value))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return <CommentForm value={value} onChange={handleChange} onSubmit={handleSubmit} refCommentInput={refCommentInput} />
}
