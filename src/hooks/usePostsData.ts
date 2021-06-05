import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { TRootState } from '../store/reducer'

interface IPostsData {
  id?: string
  author?: string
  previewImg?: string
  title?: string
  created?: number
  score?: number
  comments?: number
}

export function usePostsData() {
  const [data, setData] = useState<IPostsData[]>([])
  const token = useSelector<TRootState, string>((state) => state.token)

  useEffect(() => {
    if (!!token) {
      axios
        .get('https://oauth.reddit.com/best', {
          headers: { Authorization: `bearer ${token}` },
        })
        .then((resp) => {
          const postsData = resp.data.data.children
          const posts: IPostsData[] = postsData.map((post: any) => {
            return {
              id: post.data.id ? post.data.id : '',
              author: post.data.author ? post.data.author : '',
              previewImg: post.data.thumbnail !== 'self' ? post.data.thumbnail : '',
              title: post.data.title ? post.data.title : '',
              created: post.data.created_utc ? post.data.created_utc : 0,
              score: post.data.score ? post.data.score : 0,
              comments: post.data.num_comments ? post.data.num_comments : 0,
            }
          })
          setData(posts)
        })
        .catch(console.log)
    }
  }, [token])

  return [data]
}
