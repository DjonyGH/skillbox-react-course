import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { tokenContext } from '../shared/context/tokenContext'
import { TRootState } from '../strore'

interface IUserData {
  name?: string
  iconImg?: string
}

export function useUserData() {
  const [data, setData] = useState<IUserData>({})
  // const token = useContext(tokenContext)
  const token = useSelector<TRootState, string>((state) => state.token)

  useEffect(() => {
    if (!!token) {
      axios
        .get('https://oauth.reddit.com/api/v1/me', {
          headers: { Authorization: `bearer ${token}` },
        })
        .then((resp) => {
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
