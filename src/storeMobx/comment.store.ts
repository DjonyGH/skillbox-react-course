import { makeAutoObservable } from 'mobx'

class CommentStore {
  public comment: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  public setComment = (value: string) => {
    this.comment = value
  }
}

export default new CommentStore()

export interface ICommentStore extends CommentStore {}
