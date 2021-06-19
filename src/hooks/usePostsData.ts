import axios from 'axios'
import { Ref, useEffect, useState } from 'react'
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

let p = 0

export function usePostsData(endOfList: HTMLDivElement | null, manualLoadMore: boolean) {
  const token = useSelector<TRootState, string>((state) => state.token)
  const [posts, setPosts] = useState<IPostsData[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [nextPage, setNexPage] = useState<string>('')
  const [loadMore, setLoadMore] = useState<boolean>(true)

  const load = () => {
    console.log('Load', token)
    if (!!token) {
      setLoading(true)
      axios
        .get('https://oauth.reddit.com/best', {
          headers: { Authorization: `bearer ${token}` },
          params: { limit: 10, after: nextPage },
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
          p++
          p % 3 === 0 ? setLoadMore(false) : setLoadMore(true)
          const after = resp.data.data.after
          setNexPage(after)
          setPosts((prevPosts) => prevPosts.concat(...posts))
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
          console.log('Page', p)
        })
    }
  }

  useEffect(() => {
    console.log('useEffect', endOfList)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('test', loadMore, manualLoadMore)
          if (loadMore || manualLoadMore) {
            load()
          }
        }
      },
      { rootMargin: '10px' }
    )

    endOfList && observer.observe(endOfList)
    return () => {
      endOfList && observer.unobserve(endOfList)
    }
  }, [token, endOfList, nextPage, manualLoadMore])

  const uniqPosts: IPostsData[] = posts.filter(
    (post, index, posts) => index === posts.findIndex((t) => t.id === post.id)
  )

  return { uniqPosts, loading, loadMore }
}
