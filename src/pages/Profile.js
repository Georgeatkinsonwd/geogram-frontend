import {useState, useEffect} from 'react'
import axios from 'axios'
import { useGetUserID } from "../hooks/useGetUserID";
import {useCookies} from 'react-cookie'
import {Link} from 'react-router-dom'
import "../styles/profileStyles.css"
import Likes from '../components/Likes'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate} from 'react-router-dom'




function Profile() {
  const [userPosts, setUserPosts] = useState([]) 
  const [cookies,] = useCookies(["access_token"]);
  const [username, setUsername] = useState("")

  const userID = useGetUserID()
  const navigate = useNavigate()


  useEffect(()=> {
    if(!userID){
      navigate('/auth')
    }
    const fetchUserPosts =async () => {
    try { 
      const response = await axios.get(`https://geogram-backend.onrender.com/posts/userPosts/${userID}`,{
        headers: {authorization: cookies.access_token },
      })
      const getUsername = await axios.get(`https://geogram-backend.onrender.com/auth/getUsername/${userID}`)
      setUsername(getUsername.data)
      setUserPosts(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  fetchUserPosts()
  },[userID, cookies.access_token, navigate])



  const getProfileFeed = async () => {
    try { 
      const response = await axios.get(`https://geogram-backend.onrender.com/posts/userPosts/${userID}`,{
        headers: {authorization: cookies.access_token},
      })
      setUserPosts(response.data)
    } catch (error) {
      console.error(error)
    }
  }
 


  const deletePost = (id) => {
    const deleteId = id
    try {
      axios.delete(`https://geogram-backend.onrender.com/posts/deletePost/${deleteId}`,{
        headers: {authorization: cookies.access_token },
      }).then((response)=>{
        console.log(response)
        getProfileFeed()
      })
    } catch (error) {
      console.error(error)
    }
   
  }



  return (
    <div className="headerCont">
       <h1 className="profileInfo">{username}'s Profile</h1>
       <Link className="profileInfo" to="/createpost"><button className="profileInfo">Create Post</button></Link>
      <ul className="userPosts">
        {userPosts.map((post)=>(
          <li className="sepPost" key={post._id}>
            <div className="imgContainer">
              <img className="postImg" src={post.imgUrl} alt={post.title} />
            </div>
            <div className="likesAndDelete">
              <Likes  currentLikes={post.likedBy} postId={post._id}/>
                 
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