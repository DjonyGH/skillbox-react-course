import { makeObservable, observable, action } from 'mobx'

class CommentStore {
  public comment: string = ''

  constructor() {
    makeObservable<CommentStore>(this, {
      comment: observable,
      setComment: action,
    })
  }

  public setComment(value: string) {
    this.comment = value
  }
}

export default CommentStore

export interface ICommentStore extends CommentStore {}
