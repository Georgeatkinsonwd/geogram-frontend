import {useState, useEffect} from 'react'
import axios from 'axios'
import '../styles/exploreStyle.css'
import Likes from '../components/Likes'

function Explore() {
  const [posts, setPosts] = useState([])

  useEffect(() => {

    const fetchPosts = async () => {
      try { 
        const response = await axios.get("https://pear-faithful-chipmunk.cyclic.app/posts")
        setPosts(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPosts()

  },[])

  return (
    <div>
      <h1 className="exploreTitle">Explore other user's posts</h1>
      <ul className="explorePage">
        {posts.sort(() => .5 - Math.random()).map((post)=>(
          <li className="individualPost" key={post._id}>
            <div className="postAuthor">
                <h3>{post.username}</h3>
            </div>
            <div className="exploreImgContainer">
              <img className="exploreImg" src={post.imgUrl} alt={post.title} />
            </div>
            <div className="exploreLikes">
            <Likes currentLikes={post.likedBy} postId={post._id}/>
        
              </div>
              <div className="exploreCaption">
              <p>{post.caption}</p>
              
            </div>
          </li>
        ))}
      </ul>
      </div>
  )
}

export default Explore