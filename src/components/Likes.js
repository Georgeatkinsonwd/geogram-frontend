import {useState} from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios'
import {useCookies} from 'react-cookie'






function Likes({currentLikes, postId}) {
    const [likes,setLikes] = useState(currentLikes)
    const [isLiked, setIsLiked] = useState(false)
    const [cookies,] = useCookies(["access_token"]);


    const increaseLike = async () => {
        const id = postId
        try {
            await axios.put(`http://localhost:3001/posts/increaseLike/${id}`,{
                likes: likes + 1},
                {headers: {authorization: cookies.access_token }}
            ).then((response)=>{
            console.log(response)
            setLikes(response.data.likes)
            setIsLiked(true)
        })
        } catch (error) {
            alert('Must be logged in to like posts')
            console.log(error)
        }
    }

    const decreaseLike = async () => {
        const id = postId
        if(likes>0){
        try {
            await axios.put(`http://localhost:3001/posts/increaseLike/${id}`,{
                likes: likes - 1},
                {
                headers: {authorization: cookies.access_token }}
              ).then((response)=>{
            console.log(response)
            setLikes(response.data.likes)
            setIsLiked(false)
        })
        } catch (error) {
            console.log(error)
        }
    }
    }
  return (
    <div>
        {isLiked ? (<button className="exploreLikeBtn" onClick={decreaseLike}><FavoriteIcon fontSize="large" /></button>)  : (<button className="exploreLikeBtn" onClick={increaseLike}><FavoriteBorderIcon fontSize="large" /></button>)  }
        <span>{likes}</span>
    </div>
  )
}

export default Likes