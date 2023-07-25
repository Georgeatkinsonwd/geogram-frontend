import {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useGetUserID} from '../hooks/useGetUserID'
import {useCookies} from 'react-cookie'
import '../styles/createPostStyle.css'

function CreatePost() {
  const userID = useGetUserID()
  const [cookies,] = useCookies(["access_token"]);

  const [post, setPost] = useState({
    imgUrl: "",
    caption: "",
    user: userID,
    username: "",
  })

  useEffect(()=> {
    const getUsername = async () => {
    try { 
      const getUsername = await axios.get(`http://localhost:3001/auth/getUsername/${userID}`)
      setPost(post => ({...post, username: getUsername.data}))
    } catch (error) {
      console.error(error)
    }
  }
  getUsername()
},[userID,post])

 const navigate = useNavigate()

  const handleChange = (event) => {
    const {name, value} = event.target
    setPost({...post, [name]: value})
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log(post)
      await axios.post("http://localhost:3001/posts",post,{
        headers: {authorization: cookies.access_token},
      })
      alert('Post created')
      navigate("/profile")
      
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="createContainer">
    <div className="create-post">
      <h2>CreatePost</h2>
      <form onSubmit={onSubmit}>
    
        <label htmlFor="imgUrl">Image Url</label>
        <input type="text" id="imgUrl" name="imgUrl" onChange={handleChange} />

        <label htmlFor="caption">Caption</label>
        <textarea id="caption" name="caption" onChange={handleChange}></textarea>


        <button type="submit">Submit</button>
      </form>
      
    </div>
    </div>
  )
}

export default CreatePost