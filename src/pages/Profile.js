import {useState, useEffect} from 'react'
import axios from 'axios'
import { useGetUserID } from "../hooks/useGetUserID";
import {useCookies} from 'react-cookie'


function Profile() {
  const [userPosts, setUserPosts] = useState([]) 
  const [cookies,] = useCookies(["access_token"]);

  const userID = useGetUserID()


  useEffect(()=> {
    const fetchUserPosts =async () => {
    try { 
      const response = await axios.get(`http://localhost:3001/posts/userPosts/${userID}`,{
        headers: {authorization: cookies.access_token },
      })
      setUserPosts(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  fetchUserPosts()
  },[userID, cookies.access_token])

  return (
    <div>
       <h1>Profile</h1>
      <ul>
        {userPosts.map((post)=>(
          <li key={post._id}>
            <div>
              <h2>{post.title}</h2>
            </div>
            <div>
              <img src={post.imgUrl} alt={post.title} />
            </div>
            <div>
              <span>Likes:{post.likes}</span>
              <h4>{post.caption}</h4>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile