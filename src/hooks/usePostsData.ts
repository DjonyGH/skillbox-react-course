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
    if (!!token) {
      console.log('Load')
      setLoading(true)
      axios
        .get('https://oauth.reddit.com/rising', {
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
          // console.log('after', after)
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
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('manualLoadMore', manualLoadMore)
          console.log('LoadMore', loadMore)
          if (loadMore || manualLoadMore) {
            load()
          }
        }
      },
      { rootMargin: '10px' }
    )
    // if (manualLoadMore) {
    //   load()
    // }

    endOfList && observer.observe(endOfList)
    return () => {
      endOfList && observer.unobserve(endOfList)
    }
  }, [token, endOfList, nextPage, manualLoadMore])

  return { posts, loading, loadMore }
}
