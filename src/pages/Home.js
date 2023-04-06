import {useState, useEffect} from 'react'
import axios from 'axios'

function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {

    const fetchPosts = async () => {
      try { 
        const response = await axios.get("http://localhost:3001/posts/")
        setPosts(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchPosts()

  },[])
  return (
    <div>
      <h1>Feed</h1>
      <ul>
        {posts.map((post)=>(
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

export default Home