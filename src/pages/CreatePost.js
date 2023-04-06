import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {useGetUserID} from '../hooks/useGetUserID'
import {useCookies} from 'react-cookie'

function CreatePost() {
  const userID = useGetUserID()
  const [cookies,] = useCookies(["access_token"]);

  const [post, setPost] = useState({
    title: "",
    imgUrl: "",
    caption: "",
    user: userID,
    likes: 0,
  })

 const navigate = useNavigate()

  const handleChange = (event) => {
    const {name, value} = event.target
    setPost({...post, [name]: value})
  }

  const onSubmit = (event) => {
    event.preventDefault()
    try {
      axios.post("http://localhost:3001/posts",post,{
        headers: {authorization: cookies.access_token},
      })
      alert('Post created')
      navigate("/profile")
      
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="create-recipe">
      <h2>CreatePost</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Name</label>
        <input type="text" id="title" name="title" onChange={handleChange} />

        <label htmlFor="imgUrl">Image Url</label>
        <input type="text" id="imgUrl" name="imgUrl" onChange={handleChange} />

        <label htmlFor="caption">Caption</label>
        <textarea id="caption" name="caption" onChange={handleChange}></textarea>


        <button type="submit">Submit</button>
      </form>
      
    </div>
  )
}

export default CreatePost