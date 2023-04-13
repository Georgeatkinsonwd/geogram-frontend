import {useState, useEffect} from 'react'
import axios from 'axios'
import { useGetUserID } from "../hooks/useGetUserID";
import {useCookies} from 'react-cookie'
import {Link} from 'react-router-dom'
import "../styles/profileStyles.css"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';




function Profile() {
  const [userPosts, setUserPosts] = useState([]) 
  const [cookies,] = useCookies(["access_token"]);
  const [liked, setIsLiked] = useState(false)

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


  const addLike =  () => {
    try {
      setIsLiked(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="headerCont">
       <h1 className="profileInfo">Your Profile</h1>
       <Link className="profileInfo" to="/createpost"><button className="profileInfo">Create Post</button></Link>
      <ul className="userPosts">
        {userPosts.map((post)=>(
          <li className="sepPost" key={post._id}>
            <div className="imgContainer">
              <img className="postImg" src={post.imgUrl} alt={post.title} />
            </div>
            <div className="likesAndDelete">
              {!liked ? (<button onClick={addLike} className="likePost"><FavoriteBorderIcon fontSize="large" /></button>) : (<button onClick={addLike} className="likePost"><FavoriteIcon fontSize="large" /></button>)}
              
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