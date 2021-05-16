import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { tokenContext } from '../shared/context/tokenContext'

interface IUseCommentsData {
  name?: string
  iconImg?: string
}

export function useCommentsData(id: string = '') {
  const [data, setData] = useState<IUseCommentsData>({})
  const token = useContext(tokenContext)
  console.log('id >>', id)

  useEffect(() => {
    if (!!token) {
      axios
        .get(`https://www.reddit.com/r/redditdev/comments/${id}`, {
          headers: {
            Authorization: `bearer ${token}`,
            article: `${id}`,
            depth: 1,
            limit: 10,
          },
        })
        .then((resp) => {
          console.log('resp >>>', resp)

          const userData = resp.data
          setData({
            name: userData.name,
            iconImg: userData.icon_img,
          })
        })
        .catch(console.log)
    }
  }, [token])

  return [data]
}
