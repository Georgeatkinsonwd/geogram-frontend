import {useState, useEffect} from 'react'
import axios from 'axios'
import { useGetUserID } from "../hooks/useGetUserID";
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import "../styles/profileStyles.css"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';




function Profile() {
  const [userPosts, setUserPosts] = useState([]) 
  const [cookies,] = useCookies(["access_token"]);

  const userID = useGetUserID()

  const navigate = useNavigate()


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



  const getProfileFeed = async () => {
    try { 
      const response = await axios.get(`http://localhost:3001/posts/userPosts/${userID}`,{
        headers: {authorization: cookies.access_token },
      })
      setUserPosts(response.data)
    } catch (error) {
      console.error(error)
    }
  }
 


  const deletePost = (id) => {
    const deleteId = id
    try {
      axios.delete(`http://localhost:3001/posts/deletePost/${deleteId}`).then((response)=>{
        console.log(response)
        getProfileFeed()
      })
    } catch (error) {
      console.error(error)
    }
   
  }

  return (
    <div>
       <h1 className="profileInfo">Your Profile</h1>
       <h1 className="profileInfo">Your Posts</h1>
      <ul className="userPosts">
        {userPosts.map((post)=>(
          <li className="sepPost" key={post._id}>
            <div>
              <h2 className="title">{post.title}</h2>
            </div>
            <div className="imgContainer">
              <img className="postImg" src={post.imgUrl} alt={post.title} />
            </div>
            <div className="likesAndDelete">
              <button className="likePost"><FavoriteBorderIcon fontSize="large" /></button>
              <span>{post.likes}</span>
              <button className="delete" onClick={()=>deletePost(post._id)}><DeleteForeverIcon fontSize='large' /></button>
              </div>
              <div>
              <p className="caption">{post.caption}</p>
      
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile