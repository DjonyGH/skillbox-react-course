import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { tokenContext } from '../shared/context/tokenContext'

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
  const token = useContext(tokenContext)

  useEffect(() => {
    if (!!token) {
      axios
        .get('https://oauth.reddit.com/best', {
          headers: { Authorization: `bearer ${token}` },
        })
        .then((resp) => {
          const postsData = resp.data.data.children
          console.log('>>>', postsData)

          const posts: IPostsData[] = postsData.map((post: any) => {
            return {
              id: post.data.id ? post.data.id : '',
              author: post.data.author ? post.data.author : '',
              // previewImg: post.data.preview ? post.data.preview.images[0].source.url : '',
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
