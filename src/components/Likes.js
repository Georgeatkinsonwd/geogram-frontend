import {useState} from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import axios from 'axios'




function Likes({currentLikes, postId}) {
    const [likes,setLikes] = useState(currentLikes)

    const increaseLike = () => {
        const id = postId
        try {
            axios.put(`http://localhost:3001/posts/increaseLike/${id}`,{
            likes: likes + 1
        }).then((response)=>{
            console.log(response)
            setLikes(response.data.likes)
        })
        } catch (error) {
            console.log(error)
        }
    }

    const decreaseLike = () => {
        const id = postId
        if(likes>0){
        try {
            
            axios.put(`http://localhost:3001/posts/increaseLike/${id}`,{
            likes: likes - 1
        }).then((response)=>{
            console.log(response)
            setLikes(response.data.likes)
        })
        } catch (error) {
            console.log(error)
        }
    }
    }
  return (
    <div>
        <button className="exploreLikeBtn" onClick={increaseLike}><FavoriteIcon fontSize="large" /></button>
        <span>{likes}</span>
        <button className="exploreLikeBtn" onClick={decreaseLike}><HeartBrokenIcon fontSize="large" /></button>
    </div>
  )
}

export default Likes