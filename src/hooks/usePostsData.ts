import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { tokenContext } from "../shared/context/tokenContext";

interface IPostsData {
  author?: string;
  previewImg?: string;
  title?: string;
  created?: number;
  score?: number;
  comments?: number;
}

export function usePostsData() {
  const [data, setData] = useState<IPostsData[]>([]);
  const token = useContext(tokenContext)

  useEffect(() => {
    if(!!token) {
      axios
        .get("https://oauth.reddit.com/new", {
          headers: { Authorization: `bearer ${token}` },
        })
        .then((resp) => {
          const postsData = resp.data.data.children;
          const posts:IPostsData[] = postsData.map((post:any) => {
            return {
              author: post.data.author ? post.data.author : '',
              previewImg: post.data.preview ? post.data.preview.images[0].resolutions[0].url : '',
              title: post.data.title ? post.data.title : '',
            }
          })        
          setData(posts);
        })
        .catch(console.log);
    }    
  }, [token]);

  return [data]
}