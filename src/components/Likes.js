import {useState} from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios'
import {useCookies} from 'react-cookie'
import {useGetUserID} from '../hooks/useGetUserID'






function Likes({currentLikes, postId}) {
    const userID = useGetUserID()
    const [isLiked, setIsLiked] = useState(currentLikes.includes(userID))
    const [cookies,] = useCookies(["access_token"]);
    const [likedByUser, setIsLikedByUser] = useState(currentLikes.length)
   


    const likePost = async () => {
        const id = postId
        const likedBy = userID
        try {
            await axios.put(`https://pear-faithful-chipmunk.cyclic.app/posts/likePost/${id}`,{
                likedBy},
                {
                    headers: {authorization: cookies.access_token }}
            ).then((response)=>{
            setIsLikedByUser(response.data.likedBy.length)
            setIsLiked(true)
            
        })
        } catch (error) {
            alert('Must be logged in to like posts')
            console.log(error)
        }
    }

 

    const removeLike = async () => {
        const id = postId
        const likedBy = userID
        try {
            await axios.put(`https://pear-faithful-chipmunk.cyclic.app/posts/removeLike/${id}`,{
                likedBy},
                {
                    headers: {authorization: cookies.access_token }}
            ).then((response)=>{
            setIsLikedByUser(response.data.likedBy.length)
            setIsLiked(false)
            
        })
        } catch (error) {
            alert('Must be logged in to like posts')
            console.log(error)
        }
    }

  return (
    <div>
        {isLiked ? (<button className="exploreLikeBtn" onClick={removeLike}><FavoriteIcon fontSize="large" /></button>)  : (<button className="exploreLikeBtn" onClick={likePost}><FavoriteBorderIcon fontSize="large" /></button>)  }
        <span>{likedByUser}</span>
    </div>
  )
}

export default Likes