import axios from 'axios'
import { useEffect, useState } from 'react'

interface IUseCommentData {
  id?: string
  author?: string
  text?: string
  created?: number
}

export function useCommentsData(id: string = '') {
  const [data, setData] = useState<IUseCommentData[]>([])

  useEffect(() => {
    if (!!id) {
      axios
        .get(`https://www.reddit.com/comments/${id}.json?limit=10`)
        .then((resp) => {
          const commentsData = resp.data[1].data.children

          const comments: IUseCommentData[] = commentsData
            .filter((comment: any) => comment.kind === 't1')
            .map((comment: any) => {
              return {
                id: comment.data.id ? comment.data.id : '',
                author: comment.data.author ? comment.data.author : '',
                text: comment.data.body ? comment.data.body : '',
                created: comment.data.created_utc ? comment.data.created_utc : 0,
              }
            })
          setData(comments)
        })
        .catch(console.log)
    }
  }, [id])

  return [data]
}
